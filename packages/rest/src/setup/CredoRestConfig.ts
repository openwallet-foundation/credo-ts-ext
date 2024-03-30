import type { RestRootAgent, RestRootAgentWithTenants } from '../utils/agent'
import type { NetworkConfig as CheqdNetworkConfig } from '@credo-ts/cheqd/build/CheqdModuleConfig'
import type { WalletConfig, AutoAcceptCredential, AutoAcceptProof, LogLevel } from '@credo-ts/core'
import type { IndyVdrPoolConfig } from '@credo-ts/indy-vdr'
import type { Express } from 'express'

import { HttpOutboundTransport, WsOutboundTransport } from '@credo-ts/core'
import { HttpInboundTransport, WsInboundTransport } from '@credo-ts/node'

export type Transports = 'ws' | 'http'
export type InboundTransport = {
  transport: Transports
  port: number
}

export const inboundTransportMapping = {
  http: HttpInboundTransport,
  ws: WsInboundTransport,
} as const

export const outboundTransportMapping = {
  http: HttpOutboundTransport,
  ws: WsOutboundTransport,
} as const

export interface CredoRestAgentConfig {
  label: string
  walletConfig: WalletConfig

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
   * @default {@link AutoAcceptCredential.ContentApproved}
   */
  autoAcceptCredentials?: AutoAcceptCredential

  /**
   * @default {@link AutoAcceptProof.ContentApproved}
   */
  autoAcceptProofs?: AutoAcceptProof

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
   * @default {@link LogLevel.off}
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
  cheqdLedgers?: CheqdNetworkConfig[]
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
}
