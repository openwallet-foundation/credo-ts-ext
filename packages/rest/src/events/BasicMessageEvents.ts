import type { EmitEventConfig } from './emitEvent'
import type { Agent, BasicMessageStateChangedEvent } from '@credo-ts/core'

import { BasicMessageEventTypes } from '@credo-ts/core'

import { basicMessageRecordToApiModel } from '../controllers/didcomm/basic-messages/BasicMessagesControllerTypes'

import { emitEvent } from './emitEvent'

export const basicMessageEvents = async (agent: Agent, emitEventConfig: EmitEventConfig) => {
  agent.events.on(BasicMessageEventTypes.BasicMessageStateChanged, async (event: BasicMessageStateChangedEvent) => {
    const { basicMessageRecord, ...payload } = event.payload
    const webhookPayload = {
      ...event,
      payload: {
        ...payload,
        basicMessageRecord: basicMessageRecordToApiModel(basicMessageRecord),
      },
    }

    await emitEvent(webhookPayload, emitEventConfig)
  })
}
