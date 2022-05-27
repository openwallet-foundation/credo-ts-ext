import type { ApnsDeviceInfo } from '../../services'

import { AgentMessage } from '@aries-framework/core'
import { Expose } from 'class-transformer'
import { Equals, IsString } from 'class-validator'

interface PushNotificationsApnsSetDeviceInfoOptions extends ApnsDeviceInfo {
  id?: string
}

/**
 * Message to set the apns device information at another agent for push notifications
 *
 * @todo ADD RFC
 */
export class PushNotificationsApnsSetDeviceInfoMessage extends AgentMessage {
  @Equals(PushNotificationsApnsSetDeviceInfoMessage.type)
  public readonly type = PushNotificationsApnsSetDeviceInfoMessage.type
  public static readonly type = 'https://didcomm.org/push-notifications-apns/1.0/set-device-info'

  public constructor(options: PushNotificationsApnsSetDeviceInfoOptions) {
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
