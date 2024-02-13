import type { ApnsDeviceInfo } from '../models'

import { AgentMessage, IsValidMessageType, parseMessageType } from '@credo-ts/core'
import { Expose } from 'class-transformer'
import { IsString, ValidateIf } from 'class-validator'

interface PushNotificationsApnsDeviceInfoOptions extends ApnsDeviceInfo {
  id?: string
  threadId: string
}

/**
 * Message to send the apns device information from another agent for push notifications
 * This is used as a response for the `get-device-info` message
 *
 * @see https://github.com/hyperledger/aries-rfcs/tree/main/features/0699-push-notifications-apns#device-info
 */
export class PushNotificationsApnsDeviceInfoMessage extends AgentMessage {
  public constructor(options: PushNotificationsApnsDeviceInfoOptions) {
    super()

    if (options) {
      this.id = options.id ?? this.generateId()
      this.setThread({ threadId: options.threadId })
      this.deviceToken = options.deviceToken
    }
  }

  @IsValidMessageType(PushNotificationsApnsDeviceInfoMessage.type)
  public readonly type = PushNotificationsApnsDeviceInfoMessage.type.messageTypeUri
  public static readonly type = parseMessageType('https://didcomm.org/push-notifications-apns/1.0/device-info')

  @Expose({ name: 'device_token' })
  @IsString()
  @ValidateIf((object, value) => value !== null)
  public deviceToken!: string | null
}
