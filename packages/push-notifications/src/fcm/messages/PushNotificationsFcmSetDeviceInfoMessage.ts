import type { FcmDeviceInfo } from '../models'

import { AgentMessage, IsValidMessageType, parseMessageType } from '@aries-framework/core'
import { Expose } from 'class-transformer'
import { IsString, ValidateIf } from 'class-validator'

interface PushNotificationsFcmSetDeviceInfoOptions extends FcmDeviceInfo {
  id?: string
}

/**
 * Message to set the fcm  device information at another agent for push notifications
 *
 * @see https://github.com/hyperledger/aries-rfcs/tree/main/features/0734-push-notifications-fcm#set-device-info
 */
export class PushNotificationsFcmSetDeviceInfoMessage extends AgentMessage {
  public constructor(options: PushNotificationsFcmSetDeviceInfoOptions) {
    super()

    if (options) {
      this.id = options.id ?? this.generateId()
      this.deviceToken = options.deviceToken
      this.devicePlatform = options.devicePlatform
    }
  }

  @Expose({ name: 'device_token' })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  public deviceToken!: string | null

  @Expose({ name: 'device_platform' })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  public devicePlatform!: string | null

  @IsValidMessageType(PushNotificationsFcmSetDeviceInfoMessage.type)
  public readonly type = PushNotificationsFcmSetDeviceInfoMessage.type.messageTypeUri
  public static readonly type = parseMessageType('https://didcomm.org/push-notifications-fcm/1.0/set-device-info')
}
