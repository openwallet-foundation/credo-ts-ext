import { AgentMessage, IsValidMessageType, parseMessageType } from '@credo-ts/core'

interface PushNotificationsFcmGetDeviceInfoOptions {
  id?: string
}

/**
 * Message to get fcm  the device information from another agent for push notifications
 *
 * @see https://github.com/hyperledger/aries-rfcs/tree/main/features/0734-push-notifications-fcm#get-device-info
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
