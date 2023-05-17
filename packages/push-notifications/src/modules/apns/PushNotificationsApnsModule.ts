import type { DependencyManager, Module } from '@aries-framework/core'

import { PushNotificationsApnsApi } from '../../api'
import { PushNotificationsApnsService } from '../../services'

/**
 * Module that exposes push notification get and set functionality
 */
export class PushNotificationsApnsModule implements Module {
  public readonly api = PushNotificationsApnsApi

  public register(dependencyManager: DependencyManager): void {
    dependencyManager.registerContextScoped(PushNotificationsApnsApi)

    dependencyManager.registerSingleton(PushNotificationsApnsService)
  }
}
