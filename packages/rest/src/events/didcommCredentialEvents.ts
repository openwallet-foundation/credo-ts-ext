import type { EmitEventConfig } from './emitEvent'
import type { Agent, CredentialStateChangedEvent } from '@credo-ts/core'

import { CredentialEventTypes } from '@credo-ts/core'

import { credentialExchangeRecordToApiModel } from '../controllers/didcomm/credentials/CredentialsControllerTypes'

import { emitEvent } from './emitEvent'

export const didcommCredentialEvents = async (agent: Agent, emitEventConfig: EmitEventConfig) => {
  agent.events.on(CredentialEventTypes.CredentialStateChanged, async (event: CredentialStateChangedEvent) => {
    const { credentialRecord, ...payload } = event.payload
    const webhookPayload = {
      ...event,
      payload: {
        ...payload,
        credentialExchange: credentialExchangeRecordToApiModel(credentialRecord),
      },
    }

    await emitEvent(webhookPayload, emitEventConfig)
  })
}
