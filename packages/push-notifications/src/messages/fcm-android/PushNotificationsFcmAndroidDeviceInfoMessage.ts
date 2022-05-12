import type { FcmAndroidDeviceInfo } from '../../services/fcm-android'

import { AgentMessage } from '@aries-framework/core'
import { Expose } from 'class-transformer'
import { Equals, IsString } from 'class-validator'

interface PushNotificationsFcmAndroidDeviceInfoOptions extends FcmAndroidDeviceInfo {
  id?: string
}

/**
 * Message to send the fcm android device information from another agent for push notifications
 * This is used as a response for the `get-device-info` message
 *
 * @todo ADD RFC
 */
export class PushNotificationsFcmAndroidDeviceInfoMessage extends AgentMessage {
  @Equals(PushNotificationsFcmAndroidDeviceInfoMessage.type)
  public readonly type = PushNotificationsFcmAndroidDeviceInfoMessage.type
  public static readonly type = 'https://didcomm.org/push-notifications-fcm-android/1.0/device-info'

  public constructor(options: PushNotificationsFcmAndroidDeviceInfoOptions) {
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
