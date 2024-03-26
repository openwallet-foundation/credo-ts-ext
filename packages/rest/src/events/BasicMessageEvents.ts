import type { ServerConfig } from '../utils/ServerConfig'
import type { Agent, BasicMessageStateChangedEvent } from '@credo-ts/core'

import { BasicMessageEventTypes } from '@credo-ts/core'

import { basicMessageRecordToApiModel } from '../controllers/didcomm/basic-messages/BasicMessagesControllerTypes'

import { sendWebSocketEvent } from './WebSocketEvents'
import { sendWebhookEvent } from './WebhookEvent'

export const basicMessageEvents = async (agent: Agent, config: ServerConfig) => {
  agent.events.on(BasicMessageEventTypes.BasicMessageStateChanged, async (event: BasicMessageStateChangedEvent) => {
    const { basicMessageRecord, ...payload } = event.payload
    const webhookPayload = {
      ...event,
      payload: {
        ...payload,
        basicMessageRecord: basicMessageRecordToApiModel(basicMessageRecord),
      },
    }

    // Only send webhook if webhook url is configured
    if (config.webhookUrl) {
      await sendWebhookEvent(config.webhookUrl, webhookPayload, agent.config.logger)
    }

    if (config.socketServer) {
      // Always emit websocket event to clients (could be 0)
      await sendWebSocketEvent(config.socketServer, webhookPayload)
    }
  })
}
