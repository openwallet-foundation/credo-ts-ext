import type { ApnsDeviceInfo } from '../../services'

import { AgentMessage } from '@aries-framework/core'
import { Expose } from 'class-transformer'
import { Equals, IsString } from 'class-validator'

interface PushNotificationsFcmAndroidSetDeviceInfoOptions extends ApnsDeviceInfo {
  id?: string
}

/**
 * Message to set the fcm android device information at another agent for push notifications
 *
 * @todo ADD RFC
 */
export class PushNotificationsFcmAndroidSetDeviceInfoMessage extends AgentMessage {
  @Equals(PushNotificationsFcmAndroidSetDeviceInfoMessage.type)
  public readonly type = PushNotificationsFcmAndroidSetDeviceInfoMessage.type
  public static readonly type = 'https://didcomm.org/push-notifications-fcm-android/1.0/set-device-info'

  public constructor(options: PushNotificationsFcmAndroidSetDeviceInfoOptions) {
    super()

    if (options) {
      this.id = options.id ?? this.generateId()
      this.deviceToken = options.deviceToken
    }
  }

  @Expose({ name: 'device_token' })
  @IsString()
  public deviceToken!: string
}
