import type { DeviceInfo } from './services'

import { ConnectionService, Dispatcher, MessageSender } from '@aries-framework/core'
import { createOutboundMessage } from '@aries-framework/core/build/agent/helpers'
import { Lifecycle, scoped } from 'tsyringe'

import { PushNotificationsDeviceInfoHandler } from './handlers/PushNotificationsDeviceInfoHandler'
import { PushNotificationsService } from './services'

/**
 * Module that exposes push notification get and set functionality
 */
@scoped(Lifecycle.ContainerScoped)
export class PushNotificationsModule {
  public constructor(
    private pushNotificationService: PushNotificationsService,
    private connectionService: ConnectionService,
    private messageSender: MessageSender,
    dispatcher: Dispatcher
  ) {
    this.registerHandlers(dispatcher)
  }

  /**
   * Sends the native device info (token and vendor) to another agent via a `connectionId`
   */
  public async setDeviceInfo(connectionId: string, deviceInfo: DeviceInfo) {
    const connection = await this.connectionService.getById(connectionId)
    connection.assertReady()

    const message = this.pushNotificationService.createSetNativeDeviceInfo(deviceInfo)

    const outbound = createOutboundMessage(connection, message)
    await this.messageSender.sendMessage(outbound)
  }

  /**
   * Gets the device info (token, vendor, service) from another agent via the `connectionId`
   */
  public async getDeviceInfo(connectionId: string) {
    const connection = await this.connectionService.getById(connectionId)
    connection.assertReady()

    const message = this.pushNotificationService.createGetDeviceInfo()

    const outbound = createOutboundMessage(connection, message)
    await this.messageSender.sendMessage(outbound)
  }

  private registerHandlers(dispatcher: Dispatcher) {
    dispatcher.registerHandler(new PushNotificationsDeviceInfoHandler())
  }
}
