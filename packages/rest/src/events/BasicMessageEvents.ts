import type { ServerConfig } from '../utils/ServerConfig'
import type { Agent, BasicMessageStateChangedEvent } from '@aries-framework/core'

import { BasicMessageEventTypes } from '@aries-framework/core'

import { sendWebhookEvent } from './WebhookEvent'

export const basicMessageEvents = async (agent: Agent, config: ServerConfig) => {
  agent.events.on(
    BasicMessageEventTypes.BasicMessageStateChanged,
    async ({ payload }: BasicMessageStateChangedEvent) => {
      const record = payload.basicMessageRecord
      const body = record.toJSON()
      await sendWebhookEvent(config.webhookUrl + '/basic-messages', body)
    }
  )
}
