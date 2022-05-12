import type { FcmAndroidDeviceInfo } from '../services'

import { ConnectionService, Dispatcher, MessageSender } from '@aries-framework/core'
import { createOutboundMessage } from '@aries-framework/core/build/agent/helpers'
import { Lifecycle, scoped } from 'tsyringe'

import { PushNotificationsFcmAndroidDeviceInfoHandler } from '../handlers'
import { PushNotificationsFcmAndroidService } from '../services'

/**
 * Module that exposes push notification fcm Android get and set functionality
 */
@scoped(Lifecycle.ContainerScoped)
export class PushNotificationsFcmAndroidModule {
  public constructor(
    private pushNotificationFcmAndroidService: PushNotificationsFcmAndroidService,
    private connectionService: ConnectionService,
    private messageSender: MessageSender,
    dispatcher: Dispatcher
  ) {
    this.registerHandlers(dispatcher)
  }

  /**
   * Sends a set request with the fcm Android device info (token) to another agent via a `connectionId`
   */
  public async setDeviceInfo(connectionId: string, deviceInfo: FcmAndroidDeviceInfo) {
    const connection = await this.connectionService.getById(connectionId)
    connection.assertReady()

    const message = this.pushNotificationFcmAndroidService.createSetDeviceInfo(deviceInfo)

    const outbound = createOutboundMessage(connection, message)
    await this.messageSender.sendMessage(outbound)
  }

  /**
   * Sends the requested fcm Android device info (token) to another agent via a `connectionId`
   * Response for `push-notifications-fcm-android/get-device-info`
   *
   */
  public async deviceInfo(connectionId: string, deviceInfo: FcmAndroidDeviceInfo) {
    const connection = await this.connectionService.getById(connectionId)
    connection.assertReady()

    const message = this.pushNotificationFcmAndroidService.createDeviceInfo(deviceInfo)

    const outbound = createOutboundMessage(connection, message)
    await this.messageSender.sendMessage(outbound)
  }

  /**
   * Gets the fcm Android device info (token) from another agent via the `connectionId`
   *
   */
  public async getDeviceInfo(connectionId: string) {
    const connection = await this.connectionService.getById(connectionId)
    connection.assertReady()

    const message = this.pushNotificationFcmAndroidService.createGetDeviceInfo()

    const outbound = createOutboundMessage(connection, message)
    await this.messageSender.sendMessage(outbound)
  }

  private registerHandlers(dispatcher: Dispatcher) {
    dispatcher.registerHandler(new PushNotificationsFcmAndroidDeviceInfoHandler())
  }
}
