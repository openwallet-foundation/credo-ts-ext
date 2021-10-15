import { AgentMessage } from '@aries-framework/core'
import { Equals } from 'class-validator'

/**
 * Message to get the device information from another agent for push notifications
 *
 * @todo ADD RFC
 */
export class PushNotificationsGetDeviceInfoMessage extends AgentMessage {
  @Equals(PushNotificationsGetDeviceInfoMessage.type)
  public readonly type = PushNotificationsGetDeviceInfoMessage.type
  public static readonly type = 'https://didcomm.org/push-notifications/1.0/get-device-info'
}
