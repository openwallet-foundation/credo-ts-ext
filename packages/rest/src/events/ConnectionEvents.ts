import type { ServerConfig } from '../utils/ServerConfig'
import type { Agent, ConnectionStateChangedEvent } from '@credo-ts/core'

import { ConnectionEventTypes } from '@credo-ts/core'

import { connectionRecordToApiModel } from '../controllers/didcomm/connections/ConnectionsControllerTypes'

import { sendWebSocketEvent } from './WebSocketEvents'
import { sendWebhookEvent } from './WebhookEvent'

export const connectionEvents = async (agent: Agent, config: ServerConfig) => {
  agent.events.on(ConnectionEventTypes.ConnectionStateChanged, async (event: ConnectionStateChangedEvent) => {
    const { connectionRecord, ...payload } = event.payload
    const webhookPayload = {
      ...event,
      payload: {
        ...payload,
        connectionRecord: connectionRecordToApiModel(connectionRecord),
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
