import { AgentMessage, IsValidMessageType, parseMessageType } from '@aries-framework/core'

interface PushNotificationsGetDeviceInfoOptions {
  id?: string
}

/**
 * Message to get fcm  the device information from another agent for push notifications
 *
 * @todo ADD RFC
 */
export class PushNotificationsGetDeviceInfoMessage extends AgentMessage {
  public constructor(options: PushNotificationsGetDeviceInfoOptions) {
    super()

    if (options) {
      this.id = options.id ?? this.generateId()
    }
  }

  @IsValidMessageType(PushNotificationsGetDeviceInfoMessage.type)
  public readonly type = PushNotificationsGetDeviceInfoMessage.type.messageTypeUri
  public static readonly type = parseMessageType('https://didcomm.org/push-notifications-fcm/1.0/get-device-info')
}
