import type { DependencyManager, Module } from '@aries-framework/core'

import { BasicMessagesApi } from '@aries-framework/core'

import { PushNotificationsModuleConfig } from '../PushNotificationsModuleConfig'
import { PushNotificationsApi } from '../api'
import { PushNotificationsService } from '../services'

/**
 * Module that exposes push notification get and set functionality
 */
export class PushNotificationsModule implements Module {
  public readonly config: PushNotificationsModuleConfig | undefined
  public readonly api = undefined

  public constructor(config?: PushNotificationsModuleConfig) {
    this.config = config
  }

  public register(dependencyManager: DependencyManager): void {
    dependencyManager.registerContextScoped(PushNotificationsApi)

    dependencyManager.registerInstance(PushNotificationsModuleConfig, this.config)
    dependencyManager.registerSingleton(PushNotificationsService)
    //   dependencyManager.registerSingleton()
  }
}
