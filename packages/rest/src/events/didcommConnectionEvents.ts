import type { Agent, ConnectionStateChangedEvent } from '@credo-ts/core'

import { ConnectionEventTypes } from '@credo-ts/core'

import { connectionRecordToApiModel } from '../controllers/didcomm/connections/ConnectionsControllerTypes'

import { emitEvent, type EmitEventConfig } from './emitEvent'

export const didcommConnectionEvents = async (agent: Agent, emitEventConfig: EmitEventConfig) => {
  agent.events.on(ConnectionEventTypes.ConnectionStateChanged, async (event: ConnectionStateChangedEvent) => {
    const { connectionRecord, ...payload } = event.payload
    const webhookPayload = {
      ...event,
      payload: {
        ...payload,
        connectionRecord: connectionRecordToApiModel(connectionRecord),
      },
    }

    await emitEvent(webhookPayload, emitEventConfig)
  })
}
