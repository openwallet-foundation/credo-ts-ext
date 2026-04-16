import type { AgentContext, DependencyManager, Module } from '@credo-ts/core'

import { DidCommFeatureRegistry, DidCommMessageHandlerRegistry, DidCommProtocol } from '@credo-ts/didcomm'

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

  public register(dependencyManager: DependencyManager): void {
    dependencyManager.registerContextScoped(PushNotificationsApnsApi)
    dependencyManager.registerSingleton(PushNotificationsApnsService)
  }

  public async initialize(agentContext: AgentContext): Promise<void> {
    const featureRegistry = agentContext.dependencyManager.resolve(DidCommFeatureRegistry)
    const messageHandlerRegistry = agentContext.dependencyManager.resolve(DidCommMessageHandlerRegistry)

    messageHandlerRegistry.registerMessageHandler(new PushNotificationsApnsDeviceInfoHandler())
    messageHandlerRegistry.registerMessageHandler(new PushNotificationsApnsGetDeviceInfoHandler())
    messageHandlerRegistry.registerMessageHandler(new PushNotificationsApnsSetDeviceInfoHandler())
    messageHandlerRegistry.registerMessageHandler(new PushNotificationsApnsProblemReportHandler())

    featureRegistry.register(
      new DidCommProtocol({
        id: 'https://didcomm.org/push-notifications-apns/1.0',
        roles: [PushNotificationsApnsRole.Sender, PushNotificationsApnsRole.Receiver],
      }),
    )
  }
}
