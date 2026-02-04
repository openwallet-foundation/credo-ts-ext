import type { EmitEventConfig } from './emitEvent'
import type { Agent } from '@credo-ts/core'

import { DidCommBasicMessageEventTypes, DidCommBasicMessageStateChangedEvent } from '@credo-ts/didcomm'

import { basicMessageRecordToApiModel } from '../controllers/didcomm/basic-messages/BasicMessagesControllerTypes'

import { emitEvent } from './emitEvent'

export const didcommBasicMessageEvents = async (agent: Agent, emitEventConfig: EmitEventConfig) => {
    agent.events.on<DidCommBasicMessageStateChangedEvent>(DidCommBasicMessageEventTypes.DidCommBasicMessageStateChanged, async (event) => {
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
