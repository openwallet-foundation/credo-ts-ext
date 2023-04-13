import type { FcmDeviceInfo } from '../../services'

import {
  AgentContext,
  ConnectionService,
  MessageSender,
  DependencyManager,
  OutboundMessageContext,
} from '@aries-framework/core'
import { Lifecycle, scoped } from 'tsyringe'

import { PushNotificationsFcmDeviceInfoHandler } from '../../handlers'
import { PushNotificationsFcmService } from '../../services'

/**
 * Module that exposes push notification fcm  get and set functionality
 */
@scoped(Lifecycle.ContainerScoped)
export class PushNotificationsFcmModule {
  public constructor(
    private pushNotificationFcmService: PushNotificationsFcmService,
    private connectionService: ConnectionService,
    private messageSender: MessageSender,
    private agentContext: AgentContext, // dispatcher: Dispatcher
    private dependencyManager: DependencyManager
  ) {
    this.register()
  }

  /**
   * Sends a set request with the fcm  device info (token) to another agent via a `connectionId`
   */
  public async setDeviceInfo(connectionId: string, deviceInfo: FcmDeviceInfo) {
    const connection = await this.connectionService.getById(this.agentContext, connectionId)
    connection.assertReady()

    const message = this.pushNotificationFcmService.createSetDeviceInfo(deviceInfo)

    const outbound = new OutboundMessageContext(message, { agentContext: this.agentContext })
    await this.messageSender.sendMessage(outbound)
  }

  /**
   * Sends the requested fcm  device info (token) to another agent via a `connectionId`
   * Response for `push-notifications-fcm/get-device-info`
   *
   */
  public async deviceInfo(connectionId: string, deviceInfo: FcmDeviceInfo) {
    const connection = await this.connectionService.getById(this.agentContext, connectionId)
    connection.assertReady()

    const message = this.pushNotificationFcmService.createDeviceInfo(deviceInfo)

    const outbound = new OutboundMessageContext(message, { agentContext: this.agentContext })
    await this.messageSender.sendMessage(outbound)
  }

  /**
   * Gets the fcm  device info (token) from another agent via the `connectionId`
   *
   */
  public async getDeviceInfo(connectionId: string) {
    const connection = await this.connectionService.getById(this.agentContext, connectionId)
    connection.assertReady()

    const message = this.pushNotificationFcmService.createGetDeviceInfo()

    const outbound = new OutboundMessageContext(message, { agentContext: this.agentContext })
    await this.messageSender.sendMessage(outbound)
  }

  private register() {
    this.dependencyManager.registerMessageHandlers([new PushNotificationsFcmDeviceInfoHandler()])
  }
}
