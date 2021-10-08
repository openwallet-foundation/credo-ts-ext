import type { DeviceInfo } from './services'

import { MessageSender } from '@aries-framework/core/build/agent/MessageSender'
import { createOutboundMessage } from '@aries-framework/core/build/agent/helpers'
import { Lifecycle, scoped } from 'tsyringe'

import { PushNotificationsService } from './services'

/**
 * Module that exposes push notification get and set functionality
 */
@scoped(Lifecycle.ContainerScoped)
export class PushNotificationsModule {
  public constructor(private pushNotificationService: PushNotificationsService, private messageSender: MessageSender) {}

  // Sends the native device info (token and vendor) to another agent via a `connectionId`
  public async sendNativeDeviceInfo(deviceInfo: DeviceInfo, connectionId: string) {
    const { message, connection } = await this.pushNotificationService.processSetDeviceInfo(deviceInfo, connectionId)
    const outbound = createOutboundMessage(connection, message)
    await this.messageSender.sendMessage(outbound)
  }

  // Sends the expo device info (token and vendor) to another agent via a `connectionId`
  public async sendExpoDeviceInfo(deviceInfo: DeviceInfo, connectionId: string) {
    const { message, connection } = await this.pushNotificationService.processSetDeviceInfo(deviceInfo, connectionId)
    const outbound = createOutboundMessage(connection, message)
    await this.messageSender.sendMessage(outbound)
  }

  // Sends the fcm device info (token and vendor) to another agent via a `connectionId`
  public async sendFcmDeviceInfo(deviceInfo: DeviceInfo, connectionId: string) {
    const { message, connection } = await this.pushNotificationService.processSetDeviceInfo(deviceInfo, connectionId)
    const outbound = createOutboundMessage(connection, message)
    await this.messageSender.sendMessage(outbound)
  }

  // Gets the device info (token, vendor, service) from another agent via the `connectionId`
  public async getDeviceInfo(connectionId: string) {
    const { message, connection } = await this.pushNotificationService.processGetDeviceInfo(connectionId)
    const outbound = createOutboundMessage(connection, message)
    await this.messageSender.sendMessage(outbound)
  }
}
