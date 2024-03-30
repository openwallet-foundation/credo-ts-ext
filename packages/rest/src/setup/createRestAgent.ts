import type { CredoRestAgentConfig } from './CredoRestConfig'
import type { RestRootAgent, RestRootAgentWithTenants } from '../utils/agent'
import type { NetworkConfig as CheqdNetworkConfig } from '@credo-ts/cheqd/build/CheqdModuleConfig'
import type { InitConfig } from '@credo-ts/core'
import type { IndyVdrPoolConfig } from '@credo-ts/indy-vdr'

import { AutoAcceptCredential, AutoAcceptProof, LogLevel, Agent } from '@credo-ts/core'
import { agentDependencies, HttpInboundTransport } from '@credo-ts/node'

import { getAgentModules } from '../utils/agent'
import { TsLogger } from '../utils/logger'

import { outboundTransportMapping, inboundTransportMapping } from './CredoRestConfig'

export async function createRestAgent(config: CredoRestAgentConfig): Promise<RestRootAgent | RestRootAgentWithTenants> {
  const {
    logLevel,
    inboundTransports = [],
    outboundTransports = [],
    indyLedgers = [],
    cheqdLedgers = [],
    autoAcceptConnections = true,
    autoAcceptCredentials = AutoAcceptCredential.ContentApproved,
    autoAcceptMediationRequests = true,
    autoAcceptProofs = AutoAcceptProof.ContentApproved,
    multiTenant = false,
    ...credoConfig
  } = config

  const logger = new TsLogger(logLevel ?? LogLevel.error)

  const agentConfig: InitConfig = {
    ...credoConfig,
    logger,
  }

  const httpEndpoint = credoConfig.endpoints?.find(
    (endpoint) => endpoint.startsWith('http://') || endpoint.startsWith('https://'),
  )
  if (!httpEndpoint) {
    throw new Error('No http endpoint found in config, unable to set up OpenID4VC modules.')
  }

  const maybeIndyLedgers =
    indyLedgers.length > 0 ? (indyLedgers as [IndyVdrPoolConfig, ...IndyVdrPoolConfig[]]) : undefined
  const maybeCheqdLedgers = cheqdLedgers.length > 0 ? (cheqdLedgers as CheqdNetworkConfig[]) : undefined
  const modules = getAgentModules({
    autoAcceptConnections,
    autoAcceptProofs,
    autoAcceptCredentials,
    autoAcceptMediationRequests,
    indyLedgers: maybeIndyLedgers,
    cheqdLedgers: maybeCheqdLedgers,
    multiTenant,
    baseUrl: httpEndpoint,
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
    const transport = new InboundTransport({ port: inboundTransport.port })
    agent.registerInboundTransport(transport)

    // Configure the oid4vc routers on the http inbound transport
    if (transport instanceof HttpInboundTransport) {
      transport.app.use('/oid4vci', modules.openId4VcIssuer.config.router)
      transport.app.use('/siop', modules.openId4VcVerifier.config.router)
    }
  }

  await agent.initialize()
  return agent
}
