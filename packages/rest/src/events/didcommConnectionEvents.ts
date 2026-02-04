import type { Agent } from '@credo-ts/core'

import { DidCommConnectionEventTypes, DidCommConnectionStateChangedEvent } from '@credo-ts/didcomm'

import { connectionRecordToApiModel } from '../controllers/didcomm/connections/ConnectionsControllerTypes'

import { emitEvent, type EmitEventConfig } from './emitEvent'

export const didcommConnectionEvents = async (agent: Agent, emitEventConfig: EmitEventConfig) => {
    agent.events.on(DidCommConnectionEventTypes.DidCommConnectionStateChanged, async (event: DidCommConnectionStateChangedEvent) => {
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
