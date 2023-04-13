import type { ApnsDeviceInfo } from '../../services'

import {
  AgentContext,
  ConnectionService,
  DependencyManager,
  MessageSender,
  OutboundMessageContext,
} from '@aries-framework/core'
import { Lifecycle, scoped } from 'tsyringe'

import { PushNotificationsFcmDeviceInfoHandler } from '../../handlers'
import { PushNotificationsApnsService } from '../../services'

/**
 * Module that exposes push notification apns get and set functionality
 */
@scoped(Lifecycle.ContainerScoped)
export class PushNotificationsApnsModule {
  public constructor(
    private pushNotificationApnsService: PushNotificationsApnsService,
    private connectionService: ConnectionService,
    private messageSender: MessageSender,
    private agentContext: AgentContext, // dispatcher: Dispatcher
    private dependencyManager: DependencyManager
  ) {
    this.register()
  }

  /**
   * Sends a set request with the apns device info (token) to another agent via a `connectionId`
   */
  public async setDeviceInfo(connectionId: string, deviceInfo: ApnsDeviceInfo) {
    const connection = await this.connectionService.getById(this.agentContext, connectionId)
    connection.assertReady()

    const message = this.pushNotificationApnsService.createSetDeviceInfo(deviceInfo)

    const outbound = new OutboundMessageContext(message, { agentContext: this.agentContext })
    await this.messageSender.sendMessage(outbound)
  }

  /**
   * Sends the requested apns device info (token) to another agent via a `connectionId`
   * Response for `push-notifications-apns/get-device-info`
   *
   */
  public async deviceInfo(connectionId: string, deviceInfo: ApnsDeviceInfo) {
    const connection = await this.connectionService.getById(this.agentContext, connectionId)
    connection.assertReady()

    const message = this.pushNotificationApnsService.createDeviceInfo(deviceInfo)

    const outbound = new OutboundMessageContext(message, { agentContext: this.agentContext })
    await this.messageSender.sendMessage(outbound)
  }

  /**
   * Gets the apns device info (token) from another agent via the `connectionId`
   *
   */
  public async getDeviceInfo(connectionId: string) {
    const connection = await this.connectionService.getById(this.agentContext, connectionId)
    connection.assertReady()

    const message = this.pushNotificationApnsService.createGetDeviceInfo()

    const outbound = new OutboundMessageContext(message, { agentContext: this.agentContext })
    await this.messageSender.sendMessage(outbound)
  }

  private register() {
    this.dependencyManager.registerMessageHandlers([new PushNotificationsFcmDeviceInfoHandler()])
  }
}
