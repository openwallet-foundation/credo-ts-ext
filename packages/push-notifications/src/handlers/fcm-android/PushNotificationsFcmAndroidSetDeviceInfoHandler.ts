import type { Handler, HandlerInboundMessage } from '@aries-framework/core/build/agent/Handler'

import { PushNotificationsFcmAndroidSetDeviceInfoMessage } from '../../messages'

/**
 * Handler for incoming push notification device info messages
 */
export class PushNotificationsFcmAndroidSetDeviceInfoHandler implements Handler {
  public supportedMessages = [PushNotificationsFcmAndroidSetDeviceInfoMessage]

  /**
  /* We don't really need to do anything with this at the moment
  /* The result can be hooked into through the generic message processed event
   */
  public async handle(inboundMessage: HandlerInboundMessage<PushNotificationsFcmAndroidSetDeviceInfoHandler>) {
    inboundMessage.assertReadyConnection()
  }
}
