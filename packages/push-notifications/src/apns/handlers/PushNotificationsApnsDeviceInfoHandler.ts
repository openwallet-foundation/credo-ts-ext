import type { DidCommMessageHandler, DidCommMessageHandlerInboundMessage } from '@credo-ts/didcomm'

import { DidCommOutboundMessageContext } from '@credo-ts/didcomm'

import { PushNotificationsApnsDeviceInfoMessage } from '../messages'

export class PushNotificationsApnsDeviceInfoHandler implements DidCommMessageHandler {
  public supportedMessages = [PushNotificationsApnsDeviceInfoMessage]

  public async handle(
    inboundMessage: DidCommMessageHandlerInboundMessage<PushNotificationsApnsDeviceInfoHandler>,
  ): Promise<DidCommOutboundMessageContext | undefined> {
    inboundMessage.assertReadyConnection()
    return undefined
  }
}