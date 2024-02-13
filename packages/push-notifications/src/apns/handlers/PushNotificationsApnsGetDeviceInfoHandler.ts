import type { MessageHandler, MessageHandlerInboundMessage } from '@credo-ts/core'

import { PushNotificationsApnsGetDeviceInfoMessage } from '../messages'

/**
 * Handler for incoming get apns push notification device info messages
 */
export class PushNotificationsApnsGetDeviceInfoHandler implements MessageHandler {
  public supportedMessages = [PushNotificationsApnsGetDeviceInfoMessage]

  /**
  /* We don't really need to do anything with this at the moment
  /* The result can be hooked into through the generic message processed event
   */
  public async handle(inboundMessage: MessageHandlerInboundMessage<PushNotificationsApnsGetDeviceInfoHandler>) {
    inboundMessage.assertReadyConnection()
  }
}
