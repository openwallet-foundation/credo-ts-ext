import type { DependencyManager, Module } from '@aries-framework/core'

import { PushNotificationsFcmApi } from './PushNotificationsFcmApi'
import { PushNotificationsFcmService } from './PushNotificationsFcmService'
import {
  PushNotificationsFcmDeviceInfoHandler,
  PushNotificationsFcmGetDeviceInfoHandler,
  PushNotificationsFcmSetDeviceInfoHandler,
} from './handlers'

/**
 * Module that exposes push notification get and set functionality
 */
export class PushNotificationsFcmModule implements Module {
  public readonly api = PushNotificationsFcmApi

  public register(dependencyManager: DependencyManager): void {
    dependencyManager.registerContextScoped(PushNotificationsFcmApi)

    dependencyManager.registerSingleton(PushNotificationsFcmService)

    dependencyManager.registerMessageHandlers([
      new PushNotificationsFcmDeviceInfoHandler(),
      new PushNotificationsFcmGetDeviceInfoHandler(),
      new PushNotificationsFcmSetDeviceInfoHandler(),
    ])
  }
}
