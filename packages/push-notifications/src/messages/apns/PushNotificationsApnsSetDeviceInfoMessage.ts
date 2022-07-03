import type { ApnsDeviceInfo } from '../../services'

import { AgentMessage, IsValidMessageType, parseMessageType } from '@aries-framework/core'
import { Expose } from 'class-transformer'
import { IsString } from 'class-validator'

interface PushNotificationsApnsSetDeviceInfoOptions extends ApnsDeviceInfo {
  id?: string
}

/**
 * Message to set the apns device information at another agent for push notifications
 *
 * @todo ADD RFC
 */
export class PushNotificationsApnsSetDeviceInfoMessage extends AgentMessage {
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

  @IsValidMessageType(PushNotificationsApnsSetDeviceInfoMessage.type)
  public readonly type = PushNotificationsApnsSetDeviceInfoMessage.type.messageTypeUri
  public static readonly type = parseMessageType('https://didcomm.org/push-notifications-apns/1.0/set-device-info')
}
