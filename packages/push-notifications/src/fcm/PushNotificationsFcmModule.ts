import type { DependencyManager, FeatureRegistry, Module } from '@credo-ts/core'

import { Protocol } from '@credo-ts/core'

import { PushNotificationsFcmApi } from './PushNotificationsFcmApi'
import { PushNotificationsFcmService } from './PushNotificationsFcmService'
import {
  PushNotificationsFcmDeviceInfoHandler,
  PushNotificationsFcmGetDeviceInfoHandler,
  PushNotificationsFcmProblemReportHandler,
  PushNotificationsFcmSetDeviceInfoHandler,
} from './handlers'
import { PushNotificationsFcmRole } from './models'

/**
 * Module that exposes push notification get and set functionality
 */
export class PushNotificationsFcmModule implements Module {
  public readonly api = PushNotificationsFcmApi

  public register(dependencyManager: DependencyManager, featureRegistry: FeatureRegistry): void {
    dependencyManager.registerContextScoped(PushNotificationsFcmApi)

    dependencyManager.registerSingleton(PushNotificationsFcmService)

    featureRegistry.register(
      new Protocol({
        id: 'https://didcomm.org/push-notifications-fcm/1.0',
        roles: [PushNotificationsFcmRole.Sender, PushNotificationsFcmRole.Receiver],
      }),
    )

    dependencyManager.registerMessageHandlers([
      new PushNotificationsFcmDeviceInfoHandler(),
      new PushNotificationsFcmGetDeviceInfoHandler(),
      new PushNotificationsFcmSetDeviceInfoHandler(),
      new PushNotificationsFcmProblemReportHandler(),
    ])
  }
}
