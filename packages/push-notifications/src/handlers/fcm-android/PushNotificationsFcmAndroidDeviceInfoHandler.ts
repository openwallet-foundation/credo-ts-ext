import type { Handler, HandlerInboundMessage } from '@aries-framework/core/build/agent/Handler'

import { PushNotificationsFcmAndroidDeviceInfoMessage } from '../../messages'

/**
 * Handler for incoming fcm android push notification device info messages
 */
export class PushNotificationsFcmAndroidDeviceInfoHandler implements Handler {
  public supportedMessages = [PushNotificationsFcmAndroidDeviceInfoMessage]

  /**
  /* We don't really need to do anything with this at the moment
  /* The result can be hooked into through the generic message processed event
   */
  public async handle(inboundMessage: HandlerInboundMessage<PushNotificationsFcmAndroidDeviceInfoHandler>) {
    inboundMessage.assertReadyConnection()
  }
}
