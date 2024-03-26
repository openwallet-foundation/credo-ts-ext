import type { AgentConfig } from '@credo-ts/core'

// NOTE: using export type generated weird tsoa model name
export interface ApiAgentConfig
  extends Omit<ReturnType<AgentConfig['toJSON']>, 'walletConfig' | 'logger' | 'agentDependencies'> {}

export interface AgentInfo {
  /**
   * The config of the agent.
   */
  config: ApiAgentConfig

  /**
   * Whether the agent has been initialized.
   */
  isInitialized: boolean
}
