import type { Agent, CredentialStateChangedEvent } from '@aries-framework/core'

import { CredentialEventTypes } from '@aries-framework/core'

export const credentialEvents = async (agent: Agent, webhookUrl: string) => {
  agent.events.on(CredentialEventTypes.CredentialStateChanged, async ({ payload }: CredentialStateChangedEvent) => {
    const record = payload.credentialRecord
    const body = record.toJSON()

    await fetch(webhookUrl + '/credentials', {
      method: 'POST',
      body: JSON.stringify(body),
    })
  })
}
