import type { MessageHandler, MessageHandlerInboundMessage } from '@credo-ts/core'

import { PushNotificationsApnsProblemReportMessage } from '../messages'

/**
 * Handler for incoming push notification problem report messages
 */
export class PushNotificationsApnsProblemReportHandler implements MessageHandler {
  public supportedMessages = [PushNotificationsApnsProblemReportMessage]

  /**
  /* We don't really need to do anything with this at the moment
  /* The result can be hooked into through the generic message processed event
   */
  public async handle(inboundMessage: MessageHandlerInboundMessage<PushNotificationsApnsProblemReportHandler>) {
    inboundMessage.assertReadyConnection()
  }
}
