import { AgentMessage } from '@aries-framework/core'
import { Equals } from 'class-validator'

interface PushNotificationsApnsGetDeviceInfoOptions {
  id?: string
}

/**
 * Message to get the apns device information from another agent for push notifications
 *
 * @todo ADD RFC
 */
export class PushNotificationsApnsGetDeviceInfoMessage extends AgentMessage {
  @Equals(PushNotificationsApnsGetDeviceInfoMessage.type)
  public readonly type = PushNotificationsApnsGetDeviceInfoMessage.type
  public static readonly type = 'https://didcomm.org/push-notifications-apns/1.0/get-device-info'

  public constructor(options: PushNotificationsApnsGetDeviceInfoOptions) {
    super()

    if (options) {
      this.id = options.id ?? this.generateId()
    }
  }
}
