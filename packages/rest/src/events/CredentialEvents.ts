import type { ServerConfig } from '../utils/ServerConfig'
import type { Agent, CredentialStateChangedEvent } from '@aries-framework/core'

import { CredentialEventTypes } from '@aries-framework/core'

import { sendWebhookEvent } from './WebhookEvent'

export const credentialEvents = async (agent: Agent, config: ServerConfig) => {
  agent.events.on(CredentialEventTypes.CredentialStateChanged, async ({ payload }: CredentialStateChangedEvent) => {
    const record = payload.credentialRecord
    const body = record.toJSON()
    await sendWebhookEvent(config.webhookUrl + '/credentials', body, agent.config.logger)
  })
}
