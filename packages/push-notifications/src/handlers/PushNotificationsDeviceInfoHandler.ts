import type { MessageHandler, MessageHandlerInboundMessage } from '@aries-framework/core'

import {
  PushNotificationsDeviceInfoMessage,
  PushNotificationsGetDeviceInfoMessage,
  PushNotificationsSetDeviceInfoMessage,
} from '../messages'

/**
 * Handler for incoming apns push notification device info messages
 */
export class PushNotificationsDeviceInfoHandler implements MessageHandler {
  public supportedMessages = [
    PushNotificationsDeviceInfoMessage,
    PushNotificationsGetDeviceInfoMessage,
    PushNotificationsSetDeviceInfoMessage,
  ]

  /**
  /* We don't really need to do anything with this at the moment
  /* The result can be hooked into through the generic message processed event
   */
  public async handle(inboundMessage: MessageHandlerInboundMessage<PushNotificationsDeviceInfoHandler>) {
    inboundMessage.assertReadyConnection()
  }
}
