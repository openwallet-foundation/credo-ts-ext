import type { DidCommMessageHandler, DidCommMessageHandlerInboundMessage } from '@credo-ts/didcomm'

import { DidCommOutboundMessageContext } from '@credo-ts/didcomm'

import { PushNotificationsFcmGetDeviceInfoMessage } from '../messages'

/**
 * Handler for incoming push notification device info messages
 */
export class PushNotificationsFcmGetDeviceInfoHandler implements DidCommMessageHandler {
  public supportedMessages = [PushNotificationsFcmGetDeviceInfoMessage]

  public async handle(
    inboundMessage: DidCommMessageHandlerInboundMessage<PushNotificationsFcmGetDeviceInfoHandler>,
  ): Promise<DidCommOutboundMessageContext | undefined> {
    inboundMessage.assertReadyConnection()
    return undefined
  }
}