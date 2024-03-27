import type { InitConfig, WalletConfig } from '@credo-ts/core'
import type { IndyVdrPoolConfig } from '@credo-ts/indy-vdr'

import {
  HttpOutboundTransport,
  WsOutboundTransport,
  LogLevel,
  Agent,
  AutoAcceptCredential,
  AutoAcceptProof,
} from '@credo-ts/core'
import { agentDependencies, HttpInboundTransport, WsInboundTransport } from '@credo-ts/node'
import { readFile } from 'fs/promises'

import { setupServer } from './server'
import { getAgentModules } from './utils/agent'
import { TsLogger } from './utils/logger'

export type Transports = 'ws' | 'http'
export type InboundTransport = {
  transport: Transports
  port: number
}

const inboundTransportMapping = {
  http: HttpInboundTransport,
  ws: WsInboundTransport,
} as const

const outboundTransportMapping = {
  http: HttpOutboundTransport,
  ws: WsOutboundTransport,
} as const

export interface AriesRestConfig {
  label: string
  multiTenant: boolean
  walletConfig: WalletConfig
  indyLedgers: IndyVdrPoolConfig[]
  endpoints?: string[]
  autoAcceptConnections?: boolean
  autoAcceptCredentials?: AutoAcceptCredential
  autoAcceptProofs?: AutoAcceptProof
  autoUpdateStorageOnStartup?: boolean
  useDidKeyInProtocols?: boolean
  useDidSovPrefixWhereAllowed?: boolean
  logLevel?: LogLevel
  inboundTransports?: InboundTransport[]
  outboundTransports?: Transports[]
  autoAcceptMediationRequests?: boolean
  connectionImageUrl?: string

  webhookUrl?: string
  adminPort: number
}

export async function readRestConfig(path: string) {
  const configString = await readFile(path, { encoding: 'utf-8' })
  const config = JSON.parse(configString)

  return config
}

export async function runRestAgent(restConfig: AriesRestConfig) {
  const {
    logLevel,
    inboundTransports = [],
    outboundTransports = [],
    webhookUrl,
    adminPort,
    indyLedgers,
    autoAcceptConnections = true,
    autoAcceptCredentials = AutoAcceptCredential.ContentApproved,
    autoAcceptMediationRequests = true,
    autoAcceptProofs = AutoAcceptProof.ContentApproved,
    multiTenant,
    ...credoConfig
  } = restConfig

  const logger = new TsLogger(logLevel ?? LogLevel.error)

  const agentConfig: InitConfig = {
    ...credoConfig,
    logger,
  }

  const maybeLedgers = indyLedgers.length > 0 ? (indyLedgers as [IndyVdrPoolConfig, ...IndyVdrPoolConfig[]]) : undefined
  const modules = getAgentModules({
    autoAcceptConnections,
    autoAcceptProofs,
    autoAcceptCredentials,
    autoAcceptMediationRequests,
    indyLedgers: maybeLedgers,
    multiTenant,
  })

  const agent = new Agent({
    config: agentConfig,
    dependencies: agentDependencies,
    modules,
  })

  // Register outbound transports
  for (const outboundTransport of outboundTransports) {
    const OutboundTransport = outboundTransportMapping[outboundTransport]
    agent.registerOutboundTransport(new OutboundTransport())
  }

  // Register inbound transports
  for (const inboundTransport of inboundTransports) {
    const InboundTransport = inboundTransportMapping[inboundTransport.transport]
    agent.registerInboundTransport(new InboundTransport({ port: inboundTransport.port }))
  }

  await agent.initialize()
  const app = await setupServer(agent, {
    webhookUrl,
    port: adminPort,
  })

  const server = app.listen(adminPort, () => {
    logger.info(`Successfully started server on port ${adminPort}`)
  })

  return {
    shutdown: async () => {
      agent.config.logger.info('Agent shutdown initiated')
      server.close()
      await agent.shutdown()
      agent.config.logger.info('Agent shutdown complete')
    },
  }
}
