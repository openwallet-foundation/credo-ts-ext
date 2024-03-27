import type { ServerConfig } from '../utils/ServerConfig'
import type { Agent, CredentialStateChangedEvent } from '@credo-ts/core'

import { CredentialEventTypes } from '@credo-ts/core'

import { credentialExchangeRecordToApiModel } from '../controllers/didcomm/credentials/CredentialsControllerTypes'

import { sendWebSocketEvent } from './WebSocketEvents'
import { sendWebhookEvent } from './WebhookEvent'

export const credentialEvents = async (agent: Agent, config: ServerConfig) => {
  agent.events.on(CredentialEventTypes.CredentialStateChanged, async (event: CredentialStateChangedEvent) => {
    const { credentialRecord, ...payload } = event.payload
    const webhookPayload = {
      ...event,
      payload: {
        ...payload,
        credentialExchange: credentialExchangeRecordToApiModel(credentialRecord),
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
