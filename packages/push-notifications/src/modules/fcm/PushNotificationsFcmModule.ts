import type { DependencyManager, Module } from '@aries-framework/core'

import { PushNotificationsModuleConfig } from '../../PushNotificationsModuleConfig'
import { PushNotificationsFcmApi } from '../../api'
import { PushNotificationsFcmService } from '../../services'

/**
 * Module that exposes push notification get and set functionality
 */
export class PushNotificationsFcmModule implements Module {
  public readonly config: PushNotificationsModuleConfig | undefined
  public readonly api = undefined

  public constructor(config?: PushNotificationsModuleConfig) {
    this.config = config
  }

  public register(dependencyManager: DependencyManager): void {
    dependencyManager.registerContextScoped(PushNotificationsFcmApi)

    dependencyManager.registerInstance(PushNotificationsModuleConfig, this.config)
    dependencyManager.registerSingleton(PushNotificationsFcmService)
  }
}
