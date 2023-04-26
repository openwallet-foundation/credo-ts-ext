import type { DependencyManager, Module } from '@aries-framework/core'

import { PushNotificationsModuleConfig } from '../../PushNotificationsModuleConfig'
import { PushNotificationsApnsApi } from '../../api'
import { PushNotificationsApnsService } from '../../services'

/**
 * Module that exposes push notification get and set functionality
 */
export class PushNotificationsApnsModule implements Module {
  public readonly config: PushNotificationsModuleConfig | undefined
  public readonly api = undefined

  public constructor(config?: PushNotificationsModuleConfig) {
    this.config = config
  }

  public register(dependencyManager: DependencyManager): void {
    dependencyManager.registerContextScoped(PushNotificationsApnsApi)

    dependencyManager.registerInstance(PushNotificationsModuleConfig, this.config)
    dependencyManager.registerSingleton(PushNotificationsApnsService)
  }
}
