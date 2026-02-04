import type { Agent } from '@credo-ts/core'

import { DidCommOutOfBandEventTypes, DidCommOutOfBandStateChangedEvent } from '@credo-ts/didcomm'

import { outOfBandRecordToApiModel } from '../controllers/didcomm/out-of-band/OutOfBandControllerTypes'

import { emitEvent, type EmitEventConfig } from './emitEvent'

export const didcommOutOfBandEvents = async (agent: Agent, emitEventConfig: EmitEventConfig) => {
    agent.events.on<DidCommOutOfBandStateChangedEvent>(DidCommOutOfBandEventTypes.OutOfBandStateChanged, async (event) => {
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
