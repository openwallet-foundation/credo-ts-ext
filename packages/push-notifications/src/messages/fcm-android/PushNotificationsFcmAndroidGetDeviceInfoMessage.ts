import { AgentMessage } from '@aries-framework/core'
import { Equals } from 'class-validator'

interface PushNotificationsFcmAndroidGetDeviceInfoOptions {
  id?: string
}

/**
 * Message to get fcm android the device information from another agent for push notifications
 *
 * @todo ADD RFC
 */
export class PushNotificationsFcmAndroidGetDeviceInfoMessage extends AgentMessage {
  @Equals(PushNotificationsFcmAndroidGetDeviceInfoMessage.type)
  public readonly type = PushNotificationsFcmAndroidGetDeviceInfoMessage.type
  public static readonly type = 'https://didcomm.org/push-notifications-fcm-android/1.0/get-device-info'

  public constructor(options: PushNotificationsFcmAndroidGetDeviceInfoOptions) {
    super()

    if (options) {
      this.id = options.id ?? this.generateId()
    }
  }
}
