import type { DeviceInfo } from '../services'

import { AgentMessage } from '@aries-framework/core'
import { Expose } from 'class-transformer'
import { Equals, IsString } from 'class-validator'

import { DevicePlatform } from '../services'

export interface PushNotificationsSetNativeDeviceInfoOptions extends DeviceInfo {
  id?: string
}

/**
 * Message to set the native device information at another agent for push notifications
 *
 * @todo ADD RFC
 */
export class PushNotificationsSetNativeDeviceInfoMessage extends AgentMessage {
  public constructor(options: PushNotificationsSetNativeDeviceInfoOptions) {
    super()

    if (options) {
      this.id = options.id ?? this.generateId()
      this.devicePlatform = options.devicePlatform
      this.deviceToken = options.deviceToken
    }
  }

  @Equals(PushNotificationsSetNativeDeviceInfoMessage.type)
  public readonly type = PushNotificationsSetNativeDeviceInfoMessage.type
  public static readonly type = 'https://didcomm.org/push-notifications-native/1.0/set-device-info'

  @Expose({ name: 'device_platform' })
  @IsString()
  public devicePlatform!: DevicePlatform

  @Expose({ name: 'device_token' })
  @IsString()
  public deviceToken!: string
}
