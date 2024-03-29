import type { EmitEventConfig } from './emitEvent'
import type { Agent } from '@credo-ts/core'
import type { OpenId4VcIssuanceSessionStateChangedEvent } from '@credo-ts/openid4vc'

import { OpenId4VcIssuerEvents } from '@credo-ts/openid4vc'

import { openId4VcIssuanceSessionRecordToApiModel } from '../controllers/openid4vc/issuance-sessions/OpenId4VcIssuanceSessionsControllerTypes'

import { emitEvent } from './emitEvent'

export const openId4VcIssuanceSessionEvents = async (agent: Agent, emitEventConfig: EmitEventConfig) => {
  agent.events.on(
    OpenId4VcIssuerEvents.IssuanceSessionStateChanged,
    async (event: OpenId4VcIssuanceSessionStateChangedEvent) => {
      const { issuanceSession, ...payload } = event.payload
      const webhookPayload = {
        ...event,
        payload: {
          ...payload,
          issuanceSession: openId4VcIssuanceSessionRecordToApiModel(issuanceSession),
        },
      }

      await emitEvent(webhookPayload, emitEventConfig)
    },
  )
}
