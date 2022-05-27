import type { ApnsDeviceInfo } from '../../services'

import { AgentMessage } from '@aries-framework/core'
import { Expose } from 'class-transformer'
import { Equals, IsString } from 'class-validator'

interface PushNotificationsFcmSetDeviceInfoOptions extends ApnsDeviceInfo {
  id?: string
}

/**
 * Message to set the fcm  device information at another agent for push notifications
 *
 * @todo ADD RFC
 */
export class PushNotificationsFcmSetDeviceInfoMessage extends AgentMessage {
  @Equals(PushNotificationsFcmSetDeviceInfoMessage.type)
  public readonly type = PushNotificationsFcmSetDeviceInfoMessage.type
  public static readonly type = 'https://didcomm.org/push-notifications-fcm/1.0/set-device-info'

  public constructor(options: PushNotificationsFcmSetDeviceInfoOptions) {
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
