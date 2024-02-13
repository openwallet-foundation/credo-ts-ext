import type { ApnsDeviceInfo } from '../models'

import { AgentMessage, IsValidMessageType, parseMessageType } from '@credo-ts/core'
import { Expose } from 'class-transformer'
import { IsString, ValidateIf } from 'class-validator'

interface PushNotificationsApnsSetDeviceInfoOptions extends ApnsDeviceInfo {
  id?: string
}

/**
 * Message to set the apns device information at another agent for push notifications
 *
 * @see https://github.com/hyperledger/aries-rfcs/tree/main/features/0699-push-notifications-apns#set-device-info
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
  @ValidateIf((object, value) => value !== null)
  public deviceToken!: string | null

  @IsValidMessageType(PushNotificationsApnsSetDeviceInfoMessage.type)
  public readonly type = PushNotificationsApnsSetDeviceInfoMessage.type.messageTypeUri
  public static readonly type = parseMessageType('https://didcomm.org/push-notifications-apns/1.0/set-device-info')
}
