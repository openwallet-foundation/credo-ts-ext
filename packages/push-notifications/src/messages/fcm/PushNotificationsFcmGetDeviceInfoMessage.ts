import { AgentMessage } from '@aries-framework/core'
import { Equals } from 'class-validator'

interface PushNotificationsFcmGetDeviceInfoOptions {
  id?: string
}

/**
 * Message to get fcm  the device information from another agent for push notifications
 *
 * @todo ADD RFC
 */
export class PushNotificationsFcmGetDeviceInfoMessage extends AgentMessage {
  @Equals(PushNotificationsFcmGetDeviceInfoMessage.type)
  public readonly type = PushNotificationsFcmGetDeviceInfoMessage.type
  public static readonly type = 'https://didcomm.org/push-notifications-fcm/1.0/get-device-info'

  public constructor(options: PushNotificationsFcmGetDeviceInfoOptions) {
    super()

    if (options) {
      this.id = options.id ?? this.generateId()
    }
  }
}
