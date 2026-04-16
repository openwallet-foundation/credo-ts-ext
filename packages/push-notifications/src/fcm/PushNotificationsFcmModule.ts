import type { AgentContext, DependencyManager, Module } from '@credo-ts/core'

import { DidCommFeatureRegistry, DidCommMessageHandlerRegistry, DidCommProtocol } from '@credo-ts/didcomm'

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

  public register(dependencyManager: DependencyManager): void {
    dependencyManager.registerContextScoped(PushNotificationsFcmApi)
    dependencyManager.registerSingleton(PushNotificationsFcmService)
  }

  public async initialize(agentContext: AgentContext): Promise<void> {
    const featureRegistry = agentContext.dependencyManager.resolve(DidCommFeatureRegistry)
    const messageHandlerRegistry = agentContext.dependencyManager.resolve(DidCommMessageHandlerRegistry)

    messageHandlerRegistry.registerMessageHandler(new PushNotificationsFcmDeviceInfoHandler())
    messageHandlerRegistry.registerMessageHandler(new PushNotificationsFcmGetDeviceInfoHandler())
    messageHandlerRegistry.registerMessageHandler(new PushNotificationsFcmSetDeviceInfoHandler())
    messageHandlerRegistry.registerMessageHandler(new PushNotificationsFcmProblemReportHandler())

    featureRegistry.register(
      new DidCommProtocol({
        id: 'https://didcomm.org/push-notifications-fcm/1.0',
        roles: [PushNotificationsFcmRole.Sender, PushNotificationsFcmRole.Receiver],
      }),
    )
  }
}
