import type { EmitEventConfig } from './emitEvent'
import type { Agent,  } from '@credo-ts/core'

import { DidCommCredentialEventTypes, DidCommCredentialStateChangedEvent } from '@credo-ts/didcomm'

import { credentialExchangeRecordToApiModel } from '../controllers/didcomm/credentials/CredentialsControllerTypes'

import { emitEvent } from './emitEvent'

export const didcommCredentialEvents = async (agent: Agent, emitEventConfig: EmitEventConfig) => {
    agent.events.on(DidCommCredentialEventTypes.DidCommCredentialStateChanged, async (event: DidCommCredentialStateChangedEvent) => {
    const { credentialExchangeRecord, ...payload } = event.payload
    const webhookPayload = {
      ...event,
      payload: {
        ...payload,
        credentialExchange: credentialExchangeRecordToApiModel(credentialExchangeRecord),
      },
    }

    await emitEvent(webhookPayload, emitEventConfig)
  })
}
