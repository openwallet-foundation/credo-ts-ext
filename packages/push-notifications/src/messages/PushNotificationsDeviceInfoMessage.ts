import { AgentMessage } from '@aries-framework/core/build/agent/AgentMessage'
import { Expose } from 'class-transformer'
import { Equals, IsEnum, IsString } from 'class-validator'

import { DeviceVendor } from '../services'

export type NotificationsService = 'fcm' | 'expo' | 'native' | string

export type DeviceInfoResponse = {
  deviceToken: string
  deviceVendor: DeviceVendor
  service: NotificationsService
}

/**
 * Message to get the device information from another agent for push notifications
 *
 * @todo ADD RFC
 */
export class PushNotificationsDeviceInfoMessage extends AgentMessage {
  public constructor(options: DeviceInfoResponse) {
    super()

    if (options) {
      this.deviceToken = options.deviceToken
      this.deviceVendor = options.deviceVendor
      this.notificationsService = options.service
    }
  }

  @Equals(PushNotificationsDeviceInfoMessage.type)
  public readonly type = PushNotificationsDeviceInfoMessage.type
  public static readonly type = 'https://didcomm.org/push-notifications/1.0/device-info'

  @Expose({ name: 'device_token' })
  @IsString()
  public deviceToken!: string

  @Expose({ name: 'device_vendor' })
  @IsString()
  public deviceVendor!: DeviceVendor

  @Expose({ name: 'service' })
  @IsEnum(String)
  public notificationsService!: NotificationsService
}
