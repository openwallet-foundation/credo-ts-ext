import type { EmitEventConfig } from './emitEvent'
import type { Agent, BasicMessageStateChangedEvent } from '@credo-ts/core'

import { BasicMessageEventTypes } from '@credo-ts/core'

import { basicMessageRecordToApiModel } from '../controllers/didcomm/basic-messages/BasicMessagesControllerTypes'

import { emitEvent } from './emitEvent'

export const didcommBasicMessageEvents = async (agent: Agent, emitEventConfig: EmitEventConfig) => {
  agent.events.on<BasicMessageStateChangedEvent>(BasicMessageEventTypes.BasicMessageStateChanged, async (event) => {
    const { basicMessageRecord, message, ...payload } = event.payload
    const webhookPayload = {
      ...event,
      payload: {
        ...payload,
        message: message.toJSON(),
        basicMessageRecord: basicMessageRecordToApiModel(basicMessageRecord),
      },
    }

    await emitEvent(webhookPayload, emitEventConfig)
  })
}
