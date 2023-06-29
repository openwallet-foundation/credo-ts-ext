import type { DependencyManager, Module } from '@aries-framework/core'

import { PushNotificationsApnsApi } from './PushNotificationsApnsApi'
import { PushNotificationsApnsService } from './PushNotificationsApnsService'
import {
  PushNotificationsApnsDeviceInfoHandler,
  PushNotificationsApnsGetDeviceInfoHandler,
  PushNotificationsApnsSetDeviceInfoHandler,
} from './handlers'

/**
 * Module that exposes push notification get and set functionality
 */
export class PushNotificationsApnsModule implements Module {
  public readonly api = PushNotificationsApnsApi

  public register(dependencyManager: DependencyManager): void {
    dependencyManager.registerContextScoped(PushNotificationsApnsApi)

    dependencyManager.registerMessageHandlers([
      new PushNotificationsApnsDeviceInfoHandler(),
      new PushNotificationsApnsGetDeviceInfoHandler(),
      new PushNotificationsApnsSetDeviceInfoHandler(),
    ])

    dependencyManager.registerSingleton(PushNotificationsApnsService)
  }
}
