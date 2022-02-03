import type { ServerConfig } from '../utils/ServerConfig'
import type { Agent, ProofStateChangedEvent } from '@aries-framework/core'

import { ProofEventTypes } from '@aries-framework/core'

import { webhookEvent } from './WebhookEvent'

export const proofEvents = async (agent: Agent, config: ServerConfig) => {
  agent.events.on(ProofEventTypes.ProofStateChanged, async ({ payload }: ProofStateChangedEvent) => {
    const record = payload.proofRecord
    const body = record.toJSON()
    webhookEvent(config.webhookUrl + '/proofs', body)
  })
}
