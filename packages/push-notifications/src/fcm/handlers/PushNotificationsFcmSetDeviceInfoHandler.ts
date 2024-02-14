import type { MessageHandler, MessageHandlerInboundMessage } from '@credo-ts/core'

import { PushNotificationsFcmService } from '../PushNotificationsFcmService'
import { PushNotificationsFcmSetDeviceInfoMessage } from '../messages'

/**
 * Handler for incoming push notification device info messages
 */
export class PushNotificationsFcmSetDeviceInfoHandler implements MessageHandler {
  public supportedMessages = [PushNotificationsFcmSetDeviceInfoMessage]

  /**
  /* Only perform checks about message fields
  /*
  /* The result can be hooked into through the generic message processed event
   */
  public async handle(inboundMessage: MessageHandlerInboundMessage<PushNotificationsFcmSetDeviceInfoHandler>) {
    inboundMessage.assertReadyConnection()

    const pushNotificationsFcmService =
      inboundMessage.agentContext.dependencyManager.resolve(PushNotificationsFcmService)
    pushNotificationsFcmService.processSetDeviceInfo(inboundMessage)
  }
}
