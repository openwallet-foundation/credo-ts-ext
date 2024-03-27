import type { ServerConfig } from '../utils/ServerConfig'
import type { Agent, ProofStateChangedEvent } from '@credo-ts/core'

import { ProofEventTypes } from '@credo-ts/core'

import { proofExchangeRecordToApiModel } from '../controllers/didcomm/proofs/ProofsControllerTypes'

import { sendWebSocketEvent } from './WebSocketEvents'
import { sendWebhookEvent } from './WebhookEvent'

export const proofEvents = async (agent: Agent, config: ServerConfig) => {
  agent.events.on(ProofEventTypes.ProofStateChanged, async (event: ProofStateChangedEvent) => {
    const { proofRecord, ...payload } = event.payload
    const webhookPayload = {
      ...event,
      payload: {
        ...payload,
        proofExchange: proofExchangeRecordToApiModel(proofRecord),
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
