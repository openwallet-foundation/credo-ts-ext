import { AgentMessage, IsValidMessageType, parseMessageType } from '@aries-framework/core'

interface PushNotificationsApnsGetDeviceInfoOptions {
  id?: string
}

/**
 * Message to get the apns device information from another agent for push notifications
 *
 * @todo ADD RFC
 */
export class PushNotificationsApnsGetDeviceInfoMessage extends AgentMessage {
  public constructor(options: PushNotificationsApnsGetDeviceInfoOptions) {
    super()

    if (options) {
      this.id = options.id ?? this.generateId()
    }
  }

  @IsValidMessageType(PushNotificationsApnsGetDeviceInfoMessage.type)
  public readonly type = PushNotificationsApnsGetDeviceInfoMessage.type.messageTypeUri
  public static readonly type = parseMessageType('https://didcomm.org/push-notifications-apns/1.0/get-device-info')
}
