import type { FcmDeviceInfo } from '../../services/fcm'

import { AgentMessage } from '@aries-framework/core'
import { Expose } from 'class-transformer'
import { Equals, IsString } from 'class-validator'

interface PushNotificationsFcmDeviceInfoOptions extends FcmDeviceInfo {
  id?: string
}

/**
 * Message to send the fcm device information from another agent for push notifications
 * This is used as a response for the `get-device-info` message
 *
 * @todo ADD RFC
 */
export class PushNotificationsFcmDeviceInfoMessage extends AgentMessage {
  @Equals(PushNotificationsFcmDeviceInfoMessage.type)
  public readonly type = PushNotificationsFcmDeviceInfoMessage.type
  public static readonly type = 'https://didcomm.org/push-notifications-fcm/1.0/device-info'

  public constructor(options: PushNotificationsFcmDeviceInfoOptions) {
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
