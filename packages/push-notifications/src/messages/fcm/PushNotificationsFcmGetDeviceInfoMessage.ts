import { AgentMessage, IsValidMessageType, parseMessageType } from '@aries-framework/core'

interface PushNotificationsFcmGetDeviceInfoOptions {
  id?: string
}

/**
 * Message to get fcm  the device information from another agent for push notifications
 *
 * @todo ADD RFC
 */
export class PushNotificationsFcmGetDeviceInfoMessage extends AgentMessage {
  public constructor(options: PushNotificationsFcmGetDeviceInfoOptions) {
    super()

    if (options) {
      this.id = options.id ?? this.generateId()
    }
  }

  @IsValidMessageType(PushNotificationsFcmGetDeviceInfoMessage.type)
  public readonly type = PushNotificationsFcmGetDeviceInfoMessage.type.messageTypeUri
  public static readonly type = parseMessageType('https://didcomm.org/push-notifications-fcm/1.0/get-device-info')
}
