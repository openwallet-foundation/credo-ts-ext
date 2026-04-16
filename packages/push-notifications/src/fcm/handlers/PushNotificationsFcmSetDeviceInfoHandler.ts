import type { DidCommMessageHandler, DidCommMessageHandlerInboundMessage } from '@credo-ts/didcomm'

import { DidCommOutboundMessageContext } from '@credo-ts/didcomm'

import { PushNotificationsFcmService } from '../PushNotificationsFcmService'
import { PushNotificationsFcmSetDeviceInfoMessage } from '../messages'

export class PushNotificationsFcmSetDeviceInfoHandler implements DidCommMessageHandler {
  public supportedMessages = [PushNotificationsFcmSetDeviceInfoMessage]

  public async handle(
    inboundMessage: DidCommMessageHandlerInboundMessage<PushNotificationsFcmSetDeviceInfoHandler>,
  ): Promise<DidCommOutboundMessageContext | undefined> {
    inboundMessage.assertReadyConnection()

    const pushNotificationsFcmService =
      inboundMessage.agentContext.dependencyManager.resolve(PushNotificationsFcmService)
    pushNotificationsFcmService.processSetDeviceInfo(inboundMessage)
    return undefined
  }
}