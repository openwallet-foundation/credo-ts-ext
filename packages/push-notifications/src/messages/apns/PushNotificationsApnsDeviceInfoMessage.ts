import type { ApnsDeviceInfo } from '../../services'

import { AgentMessage } from '@aries-framework/core'
import { Expose } from 'class-transformer'
import { Equals, IsString } from 'class-validator'

interface PushNotificationsApnsDeviceInfoOptions extends ApnsDeviceInfo {
  id?: string
}

/**
 * Message to send the apns device information from another agent for push notifications
 * This is used as a response for the `get-device-info` message
 *
 * @todo ADD RFC
 */
export class PushNotificationsApnsDeviceInfoMessage extends AgentMessage {
  @Equals(PushNotificationsApnsDeviceInfoMessage.type)
  public readonly type = PushNotificationsApnsDeviceInfoMessage.type
  public static readonly type = 'https://didcomm.org/push-notifications-apns/1.0/device-info'

  public constructor(options: PushNotificationsApnsDeviceInfoOptions) {
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
