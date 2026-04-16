import type { DidCommMessageHandler, DidCommMessageHandlerInboundMessage } from '@credo-ts/didcomm'

import { DidCommOutboundMessageContext } from '@credo-ts/didcomm'

import { PushNotificationsApnsGetDeviceInfoMessage } from '../messages'

export class PushNotificationsApnsGetDeviceInfoHandler implements DidCommMessageHandler {
  public supportedMessages = [PushNotificationsApnsGetDeviceInfoMessage]

  public async handle(
    inboundMessage: DidCommMessageHandlerInboundMessage<PushNotificationsApnsGetDeviceInfoHandler>,
  ): Promise<DidCommOutboundMessageContext | undefined> {
    inboundMessage.assertReadyConnection()
    return undefined
  }
}