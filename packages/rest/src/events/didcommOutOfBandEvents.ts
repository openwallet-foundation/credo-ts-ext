import type { Agent, OutOfBandStateChangedEvent } from '@credo-ts/core'

import { OutOfBandEventTypes } from '@credo-ts/core'

import { outOfBandRecordToApiModel } from '../controllers/didcomm/out-of-band/OutOfBandControllerTypes'

import { emitEvent, type EmitEventConfig } from './emitEvent'

export const didcommOutOfBandEvents = async (agent: Agent, emitEventConfig: EmitEventConfig) => {
  agent.events.on<OutOfBandStateChangedEvent>(OutOfBandEventTypes.OutOfBandStateChanged, async (event) => {
    const { outOfBandRecord, ...payload } = event.payload
    const webhookPayload = {
      ...event,
      payload: {
        ...payload,
        outOfBandRecord: outOfBandRecordToApiModel(outOfBandRecord),
      },
    }

    await emitEvent(webhookPayload, emitEventConfig)
  })
}
