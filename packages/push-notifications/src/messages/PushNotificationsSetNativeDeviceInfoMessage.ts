import type { DeviceInfo } from '../services'

import { AgentMessage } from '@aries-framework/core/build/agent/AgentMessage'
import { Expose } from 'class-transformer'
import { Equals, IsString } from 'class-validator'

import { DeviceVendor } from '../services'

/**
 * Message to set the native device information at another agent for push notifications
 *
 * @todo ADD RFC
 */
export class PushNotificationsSetNativeDeviceInfoMessage extends AgentMessage {
  public constructor(options: DeviceInfo) {
    super()

    if (options) {
      this.deviceToken = options.deviceToken
      this.deviceVendor = options.deviceVendor
    }
  }

  @Equals(PushNotificationsSetNativeDeviceInfoMessage.type)
  public readonly type = PushNotificationsSetNativeDeviceInfoMessage.type
  public static readonly type = 'https://didcomm.org/push-notifications/1.0/set-native-device-info'

  @Expose({ name: 'device_token' })
  @IsString()
  public deviceToken!: string

  @Expose({ name: 'device_vendor' })
  @IsString()
  public deviceVendor!: DeviceVendor
}