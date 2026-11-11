import { AgentConfig, AgentContext, DependencyManager, type InitConfig, type InjectionToken, Kms } from '@credo-ts/core'
import { agentDependencies, NodeInMemoryKeyManagementStorage, NodeKeyManagementService } from '@credo-ts/node'
import { vi } from 'vitest'
import testLogger from './logger'

export { agentDependencies }

export function getAgentConfig(extraConfig: Partial<InitConfig> = {}) {
  return new AgentConfig({ logger: testLogger, ...extraConfig }, agentDependencies)
}

export function getAgentContext({
  dependencyManager = new DependencyManager(),
  agentConfig = getAgentConfig(),
  contextCorrelationId = 'mock',
  registerInstances = [],
  kmsBackends = [new NodeKeyManagementService(new NodeInMemoryKeyManagementStorage())],
  isRootAgentContext = true,
  isInitialized = true,
}: {
  dependencyManager?: DependencyManager
  agentConfig?: AgentConfig
  contextCorrelationId?: string
  registerInstances?: Array<[InjectionToken, unknown]>
  kmsBackends?: Kms.KeyManagementService[]
  isRootAgentContext?: boolean
  isInitialized?: boolean
} = {}) {
  if (!dependencyManager.isRegistered(AgentConfig)) {
    dependencyManager.registerInstance(AgentConfig, agentConfig)
  }

  for (const [token, instance] of registerInstances) {
    dependencyManager.registerInstance(token, instance)
  }

  if (!dependencyManager.isRegistered(Kms.KeyManagementModuleConfig)) {
    dependencyManager.registerInstance(
      Kms.KeyManagementModuleConfig,
      new Kms.KeyManagementModuleConfig({ backends: kmsBackends })
    )
  }
  dependencyManager.registerContextScoped(Kms.KeyManagementApi)

  const agentContext = new AgentContext({ dependencyManager, contextCorrelationId, isRootAgentContext })
  agentContext.isInitialized = isInitialized
  dependencyManager.registerInstance(AgentContext, agentContext)

  return agentContext
}

export const mockFunction: typeof vi.mocked = vi.mocked

export function mockProperty<T extends object, K extends keyof T>(object: T, property: K, value: T[K]) {
  Object.defineProperty(object, property, { configurable: true, get: () => value })
}
