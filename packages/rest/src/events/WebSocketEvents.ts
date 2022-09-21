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

const sendWebSocketEvent = async (server: WebSocket.Server, data: unknown) => {
  server.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      typeof data === 'string' ? client.send(data) : client.send(JSON.stringify(data))
    }
  })
}

export const emitEventToClient = async (server: WebSocket.Server, stream: WebSocket, agent: Agent) => {

  agent.events.on(
    BasicMessageEventTypes.BasicMessageStateChanged,
    async ({ payload }: BasicMessageStateChangedEvent) => {
      const record = payload.basicMessageRecord
      const body = record.toJSON()

      await sendWebSocketEvent(server, body)
    }
  )

  agent.events.on(ConnectionEventTypes.ConnectionStateChanged, async ({ payload }: ConnectionStateChangedEvent) => {
    const record = payload.connectionRecord
    const body = record.toJSON()

    await sendWebSocketEvent(server, body)
  })

  agent.events.on(CredentialEventTypes.CredentialStateChanged, async ({ payload }: CredentialStateChangedEvent) => {
    const record = payload.credentialRecord
    const body = record.toJSON()

    await sendWebSocketEvent(server, body)
  })

  agent.events.on(ProofEventTypes.ProofStateChanged, async ({ payload }: ProofStateChangedEvent) => {
    const record = payload.proofRecord
    const body = record.toJSON()

    await sendWebSocketEvent(server, body)
  })
}
