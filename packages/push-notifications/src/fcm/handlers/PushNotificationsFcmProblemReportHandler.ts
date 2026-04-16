import type { DidCommMessageHandler, DidCommMessageHandlerInboundMessage } from '@credo-ts/didcomm'

import { DidCommOutboundMessageContext } from '@credo-ts/didcomm'

import { PushNotificationsFcmProblemReportMessage } from '../messages'

export class PushNotificationsFcmProblemReportHandler implements DidCommMessageHandler {
  public supportedMessages = [PushNotificationsFcmProblemReportMessage]

  public async handle(
    inboundMessage: DidCommMessageHandlerInboundMessage<PushNotificationsFcmProblemReportHandler>,
  ): Promise<DidCommOutboundMessageContext | undefined> {
    inboundMessage.assertReadyConnection()
    return undefined
  }
}