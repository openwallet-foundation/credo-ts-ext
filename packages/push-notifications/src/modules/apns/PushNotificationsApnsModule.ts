import type { ApnsDeviceInfo } from '../../services'

import { ConnectionService, Dispatcher, MessageSender } from '@aries-framework/core'
import { createOutboundMessage } from '@aries-framework/core/build/agent/helpers'
import { Lifecycle, scoped } from 'tsyringe'

import { PushNotificationsApnsDeviceInfoHandler } from '../../handlers'
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
    dispatcher: Dispatcher
  ) {
    this.registerHandlers(dispatcher)
  }

  /**
   * Sends a set request with the apns device info (token) to another agent via a `connectionId`
   */
  public async setDeviceInfo(connectionId: string, deviceInfo: ApnsDeviceInfo) {
    const connection = await this.connectionService.getById(connectionId)
    connection.assertReady()

    const message = this.pushNotificationApnsService.createSetDeviceInfo(deviceInfo)

    const outbound = createOutboundMessage(connection, message)
    await this.messageSender.sendMessage(outbound)
  }

  /**
   * Sends the requested apns device info (token) to another agent via a `connectionId`
   * Response for `push-notifications-apns/get-device-info`
   *
   */
  public async deviceInfo(connectionId: string, deviceInfo: ApnsDeviceInfo) {
    const connection = await this.connectionService.getById(connectionId)
    connection.assertReady()

    const message = this.pushNotificationApnsService.createDeviceInfo(deviceInfo)

    const outbound = createOutboundMessage(connection, message)
    await this.messageSender.sendMessage(outbound)
  }

  /**
   * Gets the apns device info (token) from another agent via the `connectionId`
   *
   */
  public async getDeviceInfo(connectionId: string) {
    const connection = await this.connectionService.getById(connectionId)
    connection.assertReady()

    const message = this.pushNotificationApnsService.createGetDeviceInfo()

    const outbound = createOutboundMessage(connection, message)
    await this.messageSender.sendMessage(outbound)
  }

  private registerHandlers(dispatcher: Dispatcher) {
    dispatcher.registerHandler(new PushNotificationsApnsDeviceInfoHandler())
  }
}
