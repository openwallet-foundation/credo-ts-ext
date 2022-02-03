import type { ServerConfig } from '../utils/ServerConfig'
import type { Agent, ConnectionStateChangedEvent } from '@aries-framework/core'

import { ConnectionEventTypes } from '@aries-framework/core'

import { webhookEvent } from './WebhookEvent'

export const connectionEvents = async (agent: Agent, config: ServerConfig) => {
  agent.events.on(ConnectionEventTypes.ConnectionStateChanged, async ({ payload }: ConnectionStateChangedEvent) => {
    const record = payload.connectionRecord
    const body = record.toJSON()
    webhookEvent(config.webhookUrl + '/connections', body)
  })
}
