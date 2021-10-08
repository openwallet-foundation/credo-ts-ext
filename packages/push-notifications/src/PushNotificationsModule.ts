import type { DeviceInfo } from './services'

import { Dispatcher } from '@aries-framework/core/build/agent/Dispatcher'
import { MessageSender } from '@aries-framework/core/build/agent/MessageSender'
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
    private messageSender: MessageSender,
    dispatcher: Dispatcher
  ) {
    this.registerHandlers(dispatcher)
  }

  /**
   * Sends the native device info (token and vendor) to another agent via a `connectionId`
   */
  public async sendNativeDeviceInfo(connectionId: string, deviceInfo: DeviceInfo) {
    const { message, connection } = await this.pushNotificationService.createSetNativeDeviceInfo(
      connectionId,
      deviceInfo
    )
    const outbound = createOutboundMessage(connection, message)
    await this.messageSender.sendMessage(outbound)
  }

  /**
   * Sends the expo device info (token and vendor) to another agent via a `connectionId`
   */
  public async sendExpoDeviceInfo(connectionId: string, deviceInfo: DeviceInfo) {
    const { message, connection } = await this.pushNotificationService.createSetExpoDeviceInfo(connectionId, deviceInfo)
    const outbound = createOutboundMessage(connection, message)
    await this.messageSender.sendMessage(outbound)
  }

  /**
   * Sends the fcm device info (token and vendor) to another agent via a `connectionId`
   */
  public async sendFcmDeviceInfo(connectionId: string, deviceInfo: DeviceInfo) {
    const { message, connection } = await this.pushNotificationService.createSetFcmDeviceInfo(connectionId, deviceInfo)
    const outbound = createOutboundMessage(connection, message)
    await this.messageSender.sendMessage(outbound)
  }

  /**
   * Gets the device info (token, vendor, service) from another agent via the `connectionId`
   */
  public async getDeviceInfo(connectionId: string) {
    const { message, connection } = await this.pushNotificationService.createGetDeviceInfo(connectionId)
    const outbound = createOutboundMessage(connection, message)
    await this.messageSender.sendMessage(outbound)
  }

  private registerHandlers(dispatcher: Dispatcher) {
    dispatcher.registerHandler(new PushNotificationsDeviceInfoHandler())
  }
}
