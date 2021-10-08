import type { DeviceInfo } from '../services'

import { AgentMessage } from '@aries-framework/core/build/agent/AgentMessage'
import { Expose } from 'class-transformer'
import { Equals, IsString } from 'class-validator'

/**
 * Message to set the device information at another agent for push notifications
 *
 * @todo ADD RFC
 */
export class PushNotificationsSetDeviceInfoMessage extends AgentMessage {
  public constructor(options: DeviceInfo) {
    super()

    if (options) {
      this.deviceToken = options.deviceToken
      this.deviceVendor = options.deviceVendor
    }
  }

  @Equals(PushNotificationsSetDeviceInfoMessage.type)
  public readonly type = PushNotificationsSetDeviceInfoMessage.type
  public static readonly type = 'https://didcomm.org/push-notifications/1.0/set-device-info'

  @Expose({ name: 'device_token' })
  @IsString()
  public deviceToken!: string

  @Expose({ name: 'device_vendor' })
  @IsString()
  public deviceVendor!: 'android' | 'ios'
}
