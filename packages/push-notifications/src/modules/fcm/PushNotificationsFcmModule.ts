import type { FcmDeviceInfo } from '../../services'

import { ConnectionService, Dispatcher, MessageSender } from '@aries-framework/core'
import { createOutboundMessage } from '@aries-framework/core/build/agent/helpers'
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
    dispatcher: Dispatcher
  ) {
    this.registerHandlers(dispatcher)
  }

  /**
   * Sends a set request with the fcm  device info (token) to another agent via a `connectionId`
   */
  public async setDeviceInfo(connectionId: string, deviceInfo: FcmDeviceInfo) {
    const connection = await this.connectionService.getById(connectionId)
    connection.assertReady()

    const message = this.pushNotificationFcmService.createSetDeviceInfo(deviceInfo)

    const outbound = createOutboundMessage(connection, message)
    await this.messageSender.sendMessage(outbound)
  }

  /**
   * Sends the requested fcm  device info (token) to another agent via a `connectionId`
   * Response for `push-notifications-fcm/get-device-info`
   *
   */
  public async deviceInfo(connectionId: string, deviceInfo: FcmDeviceInfo) {
    const connection = await this.connectionService.getById(connectionId)
    connection.assertReady()

    const message = this.pushNotificationFcmService.createDeviceInfo(deviceInfo)

    const outbound = createOutboundMessage(connection, message)
    await this.messageSender.sendMessage(outbound)
  }

  /**
   * Gets the fcm  device info (token) from another agent via the `connectionId`
   *
   */
  public async getDeviceInfo(connectionId: string) {
    const connection = await this.connectionService.getById(connectionId)
    connection.assertReady()

    const message = this.pushNotificationFcmService.createGetDeviceInfo()

    const outbound = createOutboundMessage(connection, message)
    await this.messageSender.sendMessage(outbound)
  }

  private registerHandlers(dispatcher: Dispatcher) {
    dispatcher.registerHandler(new PushNotificationsFcmDeviceInfoHandler())
  }
}
