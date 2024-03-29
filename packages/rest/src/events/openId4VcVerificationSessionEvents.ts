import type { EmitEventConfig } from './emitEvent'
import type { Agent } from '@credo-ts/core'
import type { OpenId4VcVerificationSessionStateChangedEvent } from '@credo-ts/openid4vc'

import { OpenId4VcVerifierEvents } from '@credo-ts/openid4vc'

import { openId4VcVerificationSessionRecordToApiModel } from '../controllers/openid4vc/verification-sessions/OpenId4VcVerificationSessionsControllerTypes'

import { emitEvent } from './emitEvent'

export const openId4VcVerificationSessionEvents = async (agent: Agent, emitEventConfig: EmitEventConfig) => {
  agent.events.on(
    OpenId4VcVerifierEvents.VerificationSessionStateChanged,
    async (event: OpenId4VcVerificationSessionStateChangedEvent) => {
      const { verificationSession, ...payload } = event.payload
      const webhookPayload = {
        ...event,
        payload: {
          ...payload,
          verificationSession: openId4VcVerificationSessionRecordToApiModel(verificationSession),
        },
      }

      await emitEvent(webhookPayload, emitEventConfig)
    },
  )
}
