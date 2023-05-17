import type { DependencyManager, Module } from '@aries-framework/core'

import { PushNotificationsFcmApi } from '../../api'
import { PushNotificationsFcmService } from '../../services'

/**
 * Module that exposes push notification get and set functionality
 */
export class PushNotificationsFcmModule implements Module {
  public readonly api = PushNotificationsFcmApi

  public register(dependencyManager: DependencyManager): void {
    dependencyManager.registerContextScoped(PushNotificationsFcmApi)

    dependencyManager.registerSingleton(PushNotificationsFcmService)
  }
}
