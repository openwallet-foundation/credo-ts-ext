import type { RestRootAgent, RestRootAgentWithTenants } from '../utils/agent'
import type { AskarModuleConfigStoreOptions } from '@credo-ts/askar'
import type { CheqdModuleConfigOptions } from '@credo-ts/cheqd'
import type { InitConfig, LogLevel } from '@credo-ts/core'
import type { DidCommAutoAcceptCredential, DidCommAutoAcceptProof } from '@credo-ts/didcomm'
import type { IndyVdrPoolConfig } from '@credo-ts/indy-vdr'
import type { Express } from 'express'

import { DidCommHttpOutboundTransport, DidCommWsOutboundTransport } from '@credo-ts/didcomm'
import { DidCommHttpInboundTransport, DidCommWsInboundTransport } from '@credo-ts/node'

export type Transports = 'ws' | 'http'
export type InboundTransport = {
  transport: Transports
  port: number
}

export type CheqdNetworkConfig = Pick<CheqdModuleConfigOptions, 'networks'>

export const inboundTransportMapping = {
  http: DidCommHttpInboundTransport,
  ws: DidCommWsInboundTransport,
} as const

export const outboundTransportMapping = {
  http: DidCommHttpOutboundTransport,
  ws: DidCommWsOutboundTransport,
} as const

export interface CredoRestAgentConfig {
  label: string
  walletConfig: InitConfig & AskarModuleConfigStoreOptions

  /**
   * @default false
   */
  multiTenant?: boolean

  endpoints?: string[]

  /**
   * @default false
   */
  autoAcceptConnections?: boolean

  /**
   * @default {@link DidCommAutoAcceptCredential.ContentApproved}
   */
  autoAcceptCredentials?: DidCommAutoAcceptCredential

  /**
   * @default {@link DidCommAutoAcceptProof.ContentApproved}
   */
  autoAcceptProofs?: DidCommAutoAcceptProof

  /**
   * @default false
   */
  autoUpdateStorageOnStartup?: boolean

  /**
   * @default false
   */
  useDidKeyInProtocols?: boolean

  /**
   * @default false
   */
  useDidSovPrefixWhereAllowed?: boolean

  /**
   * @default {@link LogLevel.off }
   */
  logLevel?: LogLevel

  inboundTransports?: InboundTransport[]
  outboundTransports?: Transports[]

  /**
   * @default false
   */
  autoAcceptMediationRequests?: boolean

  connectionImageUrl?: string

  indyLedgers?: IndyVdrPoolConfig[]
  cheqdLedgers?: CheqdModuleConfigOptions
  extraModules?: Record<string, unknown>
}

export interface CredoRestSetupAppConfig {
  /**
   * The agent that will be used to handle requests, MUST be configured with all required modules
   * for the server to function properly
   */
  agent: RestRootAgent | RestRootAgentWithTenants | CredoRestAgentConfig

  /**
   * The port that the admin API server will listen on
   */
  adminPort: number

  /**
   * Webhook url that will be used to send events form the agent to external services. If not provided,
   * the agent will not send events to external services over HTTP
   */
  webhookUrl?: string

  /**
   * Whether to enable sending of websocket events to clients, defaults to false
   */
  enableWebsocketEvents?: boolean

  /**
   * Whether to enable cors on the server, defaults to false
   */
  enableCors?: boolean

  /**
   * The base application to add the rest server routes and middleware to
   */
  baseApp?: Express

  registerExtraRoutes?: (app: Express) => void

  customSwaggerJson?: any
}
