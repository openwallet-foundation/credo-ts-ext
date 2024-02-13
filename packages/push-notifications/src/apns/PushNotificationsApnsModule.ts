import type { DependencyManager, FeatureRegistry, Module } from '@credo-ts/core'

import { Protocol } from '@credo-ts/core'

import { PushNotificationsApnsApi } from './PushNotificationsApnsApi'
import { PushNotificationsApnsService } from './PushNotificationsApnsService'
import {
  PushNotificationsApnsDeviceInfoHandler,
  PushNotificationsApnsGetDeviceInfoHandler,
  PushNotificationsApnsProblemReportHandler,
  PushNotificationsApnsSetDeviceInfoHandler,
} from './handlers'
import { PushNotificationsApnsRole } from './models'

/**
 * Module that exposes push notification get and set functionality
 */
export class PushNotificationsApnsModule implements Module {
  public readonly api = PushNotificationsApnsApi

  public register(dependencyManager: DependencyManager, featureRegistry: FeatureRegistry): void {
    dependencyManager.registerContextScoped(PushNotificationsApnsApi)

    featureRegistry.register(
      new Protocol({
        id: 'https://didcomm.org/push-notifications-apns/1.0',
        roles: [PushNotificationsApnsRole.Sender, PushNotificationsApnsRole.Receiver],
      }),
    )

    dependencyManager.registerMessageHandlers([
      new PushNotificationsApnsDeviceInfoHandler(),
      new PushNotificationsApnsGetDeviceInfoHandler(),
      new PushNotificationsApnsSetDeviceInfoHandler(),
      new PushNotificationsApnsProblemReportHandler(),
    ])

    dependencyManager.registerSingleton(PushNotificationsApnsService)
  }
}
