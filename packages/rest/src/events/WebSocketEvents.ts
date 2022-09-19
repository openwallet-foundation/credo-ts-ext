import type { ServerConfig } from '../utils/ServerConfig'
import type {
  Agent,
  BasicMessageStateChangedEvent,
  ConnectionStateChangedEvent,
  CredentialStateChangedEvent,
  ProofStateChangedEvent,
} from '@aries-framework/core'

import {
  BasicMessageEventTypes,
  ConnectionEventTypes,
  CredentialEventTypes,
  ProofEventTypes,
} from '@aries-framework/core'
import WebSocket from 'ws'

import { sendWebhookEvent } from './WebhookEvent'

export const webSocketEvents = async (
  server: WebSocket.Server,
  stream: WebSocket,
  agent: Agent,
  config: ServerConfig
) => {
  stream.on('message', function message(data) {
    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })
  })

  agent.events.on(
    BasicMessageEventTypes.BasicMessageStateChanged,
    async ({ payload }: BasicMessageStateChangedEvent) => {
      const record = payload.basicMessageRecord
      const body = record.toJSON()

      if (config.webhookUrl) {
        await sendWebhookEvent(config.webhookUrl + '/basic-messages', body, agent.config.logger)
      }

      server.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(body)
        } else if (client.readyState === WebSocket.CLOSED) {
          client.terminate()
        }
      })
    }
  )

  agent.events.on(ConnectionEventTypes.ConnectionStateChanged, async ({ payload }: ConnectionStateChangedEvent) => {
    const record = payload.connectionRecord
    const body = record.toJSON()
    if (config.webhookUrl) {
      await sendWebhookEvent(config.webhookUrl + '/connections', body, agent.config.logger)
    }

    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(body)
      }
    })
  })

  agent.events.on(CredentialEventTypes.CredentialStateChanged, async ({ payload }: CredentialStateChangedEvent) => {
    const record = payload.credentialRecord
    const body = record.toJSON()
    if (config.webhookUrl) {
      await sendWebhookEvent(config.webhookUrl + '/credentials', body, agent.config.logger)
    }

    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(body)
      }
    })
  })

  agent.events.on(ProofEventTypes.ProofStateChanged, async ({ payload }: ProofStateChangedEvent) => {
    const record = payload.proofRecord
    const body = record.toJSON()
    if (config.webhookUrl) {
      await sendWebhookEvent(config.webhookUrl + '/proofs', body, agent.config.logger)
    }

    server.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(body)
      }
    })
  })
}
