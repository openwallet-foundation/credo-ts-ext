import type { MessageHandler, MessageHandlerInboundMessage } from '@aries-framework/core'

import {
  PushNotificationsApnsDeviceInfoMessage,
  PushNotificationsApnsGetDeviceInfoMessage,
  PushNotificationsApnsSetDeviceInfoMessage,
} from '../../messages'

/**
 * Handler for incoming apns push notification device info messages
 */
export class PushNotificationsApnsDeviceInfoHandler implements MessageHandler {
  public supportedMessages = [
    PushNotificationsApnsDeviceInfoMessage,
    PushNotificationsApnsGetDeviceInfoMessage,
    PushNotificationsApnsSetDeviceInfoMessage,
  ]

  /**
  /* We don't really need to do anything with this at the moment
  /* The result can be hooked into through the generic message processed event
   */
  public async handle(inboundMessage: MessageHandlerInboundMessage<PushNotificationsApnsDeviceInfoHandler>) {
    inboundMessage.assertReadyConnection()
  }
}
