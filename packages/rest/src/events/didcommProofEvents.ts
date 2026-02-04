import type { Agent } from '@credo-ts/core'

import { DidCommProofEventTypes, DidCommProofStateChangedEvent } from '@credo-ts/didcomm'

import { proofExchangeRecordToApiModel } from '../controllers/didcomm/proofs/ProofsControllerTypes'

import { emitEvent, type EmitEventConfig } from './emitEvent'

export const didcommProofEvents = async (agent: Agent, emitEventConfig: EmitEventConfig) => {
    agent.events.on(DidCommProofEventTypes.ProofStateChanged, async (event: DidCommProofStateChangedEvent) => {
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
