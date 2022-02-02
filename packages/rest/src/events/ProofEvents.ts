import type { Agent, ProofStateChangedEvent } from '@aries-framework/core'

import { ProofEventTypes } from '@aries-framework/core'

export const proofEvents = async (agent: Agent, webhookUrl: string) => {
  agent.events.on(ProofEventTypes.ProofStateChanged, async ({ payload }: ProofStateChangedEvent) => {
    const record = payload.proofRecord
    const body = record.toJSON()

    await fetch(webhookUrl + '/proofs', {
      method: 'POST',
      body: JSON.stringify(body),
    })
  })
}
