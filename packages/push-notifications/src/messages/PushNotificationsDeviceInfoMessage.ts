import type { DeviceInfo } from '../services'

import { AgentMessage } from '@aries-framework/core'
import { Expose } from 'class-transformer'
import { Equals, IsString } from 'class-validator'

/**
 * Message to get the device information from another agent for push notifications
 *
 * @todo ADD RFC
 */
export class PushNotificationsDeviceInfoMessage extends AgentMessage {
  public constructor(options: DeviceInfo & { notificationsService: string }) {
    super()

    if (options) {
      this.deviceToken = options.deviceToken
      this.devicePlatform = options.devicePlatform
    }
  }

  @Equals(PushNotificationsDeviceInfoMessage.type)
  public readonly type = PushNotificationsDeviceInfoMessage.type
  public static readonly type = 'https://didcomm.org/push-notifications-native/1.0/device-info'

  @Expose({ name: 'device_token' })
  @IsString()
  public deviceToken!: string

  @Expose({ name: 'device_platform' })
  @IsString()
  public devicePlatform!: string
}
