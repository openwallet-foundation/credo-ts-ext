import type { FcmDeviceInfo } from '../../services'

import {
  OutboundMessageContext,
  AgentContext,
  ConnectionService,
  injectable,
  MessageSender,
} from '@aries-framework/core'

import { PushNotificationsFcmDeviceInfoHandler } from '../../handlers'
import { PushNotificationsFcmService } from '../../services'

@injectable()
export class PushNotificationsFcmApi {
  private messageSender: MessageSender
  private pushNotificationsService: PushNotificationsFcmService
  private connectionService: ConnectionService
  private agentContext: AgentContext

  public constructor(
    messageSender: MessageSender,
    pushNotificationsService: PushNotificationsFcmService,
    connectionService: ConnectionService,
    agentContext: AgentContext
  ) {
    this.messageSender = messageSender
    this.pushNotificationsService = pushNotificationsService
    this.connectionService = connectionService
    this.agentContext = agentContext

    this.agentContext.dependencyManager.registerMessageHandlers([new PushNotificationsFcmDeviceInfoHandler()])
  }

  /**
   * Sends a set request with the fcm device info (token) to another agent via a `connectionId`
   *
   * @param connectionId The connection ID string
   * @param deviceInfo The FCM device info
   * @returns Promise<void>
   */
  public async setDeviceInfo(connectionId: string, deviceInfo: FcmDeviceInfo) {
    const connection = await this.connectionService.getById(this.agentContext, connectionId)
    connection.assertReady()

    const message = this.pushNotificationsService.createSetDeviceInfo(deviceInfo)

    const outbound = new OutboundMessageContext(message, {
      agentContext: this.agentContext,
      connection: connection,
    })
    await this.messageSender.sendMessage(outbound)
  }

  /**
   * Sends the requested fcm device info (token) to another agent via a `connectionId`
   * Response for `push-notifications-fcm/get-device-info`
   *
   * @param connectionId The connection ID string
   * @param deviceInfo The FCM device info
   * @returns Promise<void>
   */
  public async deviceInfo(connectionId: string, deviceInfo: FcmDeviceInfo) {
    const connection = await this.connectionService.getById(this.agentContext, connectionId)
    connection.assertReady()

    const message = this.pushNotificationsService.createDeviceInfo(deviceInfo)

    const outbound = new OutboundMessageContext(message, {
      agentContext: this.agentContext,
      connection: connection,
    })
    await this.messageSender.sendMessage(outbound)
  }

  /**
   * Gets the fcm device info (token) from another agent via the `connectionId`
   *
   * @param connectionId The connection ID string
   * @returns Promise<void>
   */
  public async getDeviceInfo(connectionId: string) {
    const connection = await this.connectionService.getById(this.agentContext, connectionId)
    connection.assertReady()

    const message = this.pushNotificationsService.createGetDeviceInfo()

    const outbound = new OutboundMessageContext(message, {
      agentContext: this.agentContext,
      connection: connection,
    })
    await this.messageSender.sendMessage(outbound)
  }
}
