import type { MessageHandler, MessageHandlerInboundMessage } from '@credo-ts/core'

import { PushNotificationsApnsSetDeviceInfoMessage } from '../messages'

/**
 * Handler for incoming push notification device info messages
 */
export class PushNotificationsApnsSetDeviceInfoHandler implements MessageHandler {
  public supportedMessages = [PushNotificationsApnsSetDeviceInfoMessage]

  /**
  /* We don't really need to do anything with this at the moment
  /* The result can be hooked into through the generic message processed event
   */
  public async handle(inboundMessage: MessageHandlerInboundMessage<PushNotificationsApnsSetDeviceInfoHandler>) {
    inboundMessage.assertReadyConnection()
  }
}
