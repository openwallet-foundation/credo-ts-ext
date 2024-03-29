import type { Agent, ProofStateChangedEvent } from '@credo-ts/core'

import { ProofEventTypes } from '@credo-ts/core'

import { proofExchangeRecordToApiModel } from '../controllers/didcomm/proofs/ProofsControllerTypes'

import { emitEvent, type EmitEventConfig } from './emitEvent'

export const didcommProofEvents = async (agent: Agent, emitEventConfig: EmitEventConfig) => {
  agent.events.on(ProofEventTypes.ProofStateChanged, async (event: ProofStateChangedEvent) => {
    const { proofRecord, ...payload } = event.payload
    const webhookPayload = {
      ...event,
      payload: {
        ...payload,
        proofExchange: proofExchangeRecordToApiModel(proofRecord),
      },
    }

    await emitEvent(webhookPayload, emitEventConfig)
  })
}
