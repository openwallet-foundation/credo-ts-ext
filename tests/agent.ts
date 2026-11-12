import { randomUUID } from 'node:crypto'
import { AskarModule, type AskarModuleConfigStoreOptions } from '@credo-ts/askar'
import type { InitConfig, ModulesMap } from '@credo-ts/core'
import { agentDependencies } from '@credo-ts/node'
import { NativeAskar } from '@openwallet-foundation/askar-nodejs'
import testLogger from './logger'

export function getAskarStoreConfig(name: string): AskarModuleConfigStoreOptions {
  return {
    id: `${name}-${randomUUID()}`,
    key: 'DZ9hPqFWTPxemcGea72C1X1nusqk5wFNLq6QPjwXGqAa',
    keyDerivationMethod: 'raw',
    database: { type: 'sqlite', config: { inMemory: true } },
  }
}

export function getAgentOptions<Modules extends ModulesMap>(name: string, modules: Modules, config: InitConfig = {}) {
  return {
    config: { logger: testLogger, ...config },
    dependencies: agentDependencies,
    modules: {
      askar: new AskarModule({ askar: NativeAskar, store: getAskarStoreConfig(name) }),
      ...modules,
    },
  }
}
