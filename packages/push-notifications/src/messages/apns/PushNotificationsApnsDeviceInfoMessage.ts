import type { ApnsDeviceInfo } from '../../services'

import { AgentMessage, IsValidMessageType, parseMessageType } from '@aries-framework/core'
import { Expose } from 'class-transformer'
import { IsString } from 'class-validator'

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
  public constructor(options: PushNotificationsApnsDeviceInfoOptions) {
    super()

    if (options) {
      this.id = options.id ?? this.generateId()
      this.deviceToken = options.deviceToken
    }
  }

  @IsValidMessageType(PushNotificationsApnsDeviceInfoMessage.type)
  public readonly type = PushNotificationsApnsDeviceInfoMessage.type.messageTypeUri
  public static readonly type = parseMessageType('https://didcomm.org/push-notifications-apns/1.0/device-info')

  @Expose({ name: 'device_token' })
  @IsString()
  public deviceToken!: string
}
