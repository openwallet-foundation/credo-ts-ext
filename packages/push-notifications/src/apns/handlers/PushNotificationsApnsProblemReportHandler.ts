import type { DidCommMessageHandler, DidCommMessageHandlerInboundMessage } from '@credo-ts/didcomm'

import { DidCommOutboundMessageContext } from '@credo-ts/didcomm'

import { PushNotificationsApnsProblemReportMessage } from '../messages'

export class PushNotificationsApnsProblemReportHandler implements DidCommMessageHandler {
  public supportedMessages = [PushNotificationsApnsProblemReportMessage]

  public async handle(
    inboundMessage: DidCommMessageHandlerInboundMessage<PushNotificationsApnsProblemReportHandler>,
  ): Promise<DidCommOutboundMessageContext | undefined> {
    inboundMessage.assertReadyConnection()
    return undefined
  }
}
