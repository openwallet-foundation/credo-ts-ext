import type { Agent, ConnectionStateChangedEvent } from '@aries-framework/core'

import { ConnectionEventTypes } from '@aries-framework/core'

export const connectionEvents = async (agent: Agent, webhookUrl: string) => {
  agent.events.on(ConnectionEventTypes.ConnectionStateChanged, async ({ payload }: ConnectionStateChangedEvent) => {
    const record = payload.connectionRecord
    const body = record.toJSON()

    await fetch(webhookUrl + '/connections', {
      method: 'POST',
      body: JSON.stringify(body),
    })
  })
}
