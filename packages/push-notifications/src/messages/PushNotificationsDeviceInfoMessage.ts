import type { DeviceInfo } from '../services'

import { AgentMessage, IsValidMessageType, parseMessageType } from '@aries-framework/core'
import { Expose } from 'class-transformer'
import { IsString } from 'class-validator'

interface PushNotificationsDeviceInfoOptions extends DeviceInfo {
  id?: string
}

/**
 * Message to send the fcm device information from another agent for push notifications
 * This is used as a response for the `get-device-info` message
 *
 * @todo ADD RFC
 */
export class PushNotificationsDeviceInfoMessage extends AgentMessage {
  public constructor(options: PushNotificationsDeviceInfoOptions) {
    super()

    if (options) {
      this.id = options.id ?? this.generateId()
      this.deviceToken = options.deviceToken
    }
  }

  @Expose({ name: 'device_token' })
  @IsString()
  public deviceToken!: string

  @IsValidMessageType(PushNotificationsDeviceInfoMessage.type)
  public readonly type = PushNotificationsDeviceInfoMessage.type.messageTypeUri
  public static readonly type = parseMessageType('https://didcomm.org/push-notifications-fcm/1.0/device-info')
}
