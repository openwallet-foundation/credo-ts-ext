import type { DependencyManager, FeatureRegistry, Module } from '@aries-framework/core'

import { BasicMessagesApi } from '@aries-framework/core'

import config from '../../../jest.config.base'

import { PushNotificationsModuleConfig } from './PushNotificationsModuleConfig'

export class PushNotificationsModule implements Module {
  public readonly config: PushNotificationsModuleConfig | undefined
  public readonly api = undefined

  public constructor(config?: PushNotificationsModuleConfig) {
    this.config = config
  }

  public register(dependencyManager: DependencyManager, featureRegistry: FeatureRegistry): void {
    dependencyManager.registerContextScoped(BasicMessagesApi)

    dependencyManager.registerInstance(PushNotificationsModuleConfig, this.config)
    //   dependencyManager.registerSingleton()
    //   dependencyManager.registerSingleton()
  }
}
