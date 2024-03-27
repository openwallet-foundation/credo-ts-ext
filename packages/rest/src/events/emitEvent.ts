import type { Logger } from '@credo-ts/core'
import type { Server } from 'ws'

import { Agent } from '@credo-ts/core'
import fetch from 'node-fetch'
import { container } from 'tsyringe'
import WebSocket from 'ws'

export interface EmitEventConfig {
  webhookUrl?: string
  socketServer?: Server
}

export async function emitEvent(payload: Record<string, unknown>, config: EmitEventConfig) {
  const agent = container.resolve(Agent)
  const logger = agent.config.logger
  // Only send webhook if webhook url is configured
  if (config.webhookUrl) {
    await emitWebhookEvent(config.webhookUrl, payload, logger)
  }

  if (config.socketServer) {
    // Always emit websocket event to clients (could be 0)
    await emitWebSocketEvent(config.socketServer, payload)
  }
}

async function emitWebhookEvent(webhookUrl: string, body: Record<string, unknown>, logger: Logger) {
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    logger.error(`Error sending ${body.type} webhook event to ${webhookUrl}`, {
      cause: error,
    })
  }
}

export async function emitWebSocketEvent(server: WebSocket.Server, data: unknown) {
  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      typeof data === 'string' ? client.send(data) : client.send(JSON.stringify(data))
    }
  })
}
