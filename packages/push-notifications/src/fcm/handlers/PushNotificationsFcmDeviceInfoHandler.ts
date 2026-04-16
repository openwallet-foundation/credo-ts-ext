import type { DidCommMessageHandler, DidCommMessageHandlerInboundMessage } from '@credo-ts/didcomm'

import { DidCommOutboundMessageContext } from '@credo-ts/didcomm'

import { PushNotificationsFcmDeviceInfoMessage } from '../messages'

/**
 * Handler for incoming fcm push notification device info messages
 */
export class PushNotificationsFcmDeviceInfoHandler implements DidCommMessageHandler {
  public supportedMessages = [PushNotificationsFcmDeviceInfoMessage]

  public async handle(
    inboundMessage: DidCommMessageHandlerInboundMessage<PushNotificationsFcmDeviceInfoHandler>,
  ): Promise<DidCommOutboundMessageContext | undefined> {
    inboundMessage.assertReadyConnection()
    return undefined
  }
}