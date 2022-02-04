import type { WebhookData } from './utils/webhook'
import type { Agent, CredentialStateChangedEvent, ProofStateChangedEvent } from '@aries-framework/core'
import type { Server } from 'http'

import {
  ProofEventTypes,
  ProofState,
  ProofRecord,
  CredentialState,
  CredentialRecord,
  CredentialEventTypes,
} from '@aries-framework/core'
import { EventEmitter } from '@aries-framework/core/build/agent/EventEmitter'

import { setupServer } from '../src/server'

import { getTestAgent } from './utils/helpers'
import { sleep, webhookListener } from './utils/webhook'

describe('WebhookTest', () => {
  let agent: Agent
  let server: Server
  const webhooks: WebhookData[] = []

  beforeEach(async () => {
    agent = await getTestAgent('Rest Webhook Test Bob', 3003)
    server = await webhookListener(3000, webhooks)
    await setupServer(agent, { webhookUrl: 'http://localhost:3000', port: 3004 })
  })

  afterEach(async () => {
    await agent.shutdown()
    await agent.wallet.delete()
    server.close()
  })

  test('should return a webhook event when connection state changed', async () => {
    const { connectionRecord } = await agent.connections.createConnection()

    await sleep(100)

    const webhook = webhooks.find(
      (webhook) =>
        webhook.topic === 'connections' &&
        webhook.body.id === connectionRecord.id &&
        webhook.body.state === connectionRecord.state
    )

    expect(JSON.parse(JSON.stringify(connectionRecord.toJSON()))).toMatchObject(webhook?.body as any)
  })

  test('should return a webhook event when credential state changed', async () => {
    const credentialRecord = new CredentialRecord({
      id: 'testest',
      state: CredentialState.OfferSent,
      threadId: 'random',
    })

    const eventEmitter = agent.injectionContainer.resolve(EventEmitter)
    eventEmitter.emit<CredentialStateChangedEvent>({
      type: CredentialEventTypes.CredentialStateChanged,
      payload: {
        previousState: null,
        credentialRecord,
      },
    })

    await sleep(100)

    const webhook = webhooks.find(
      (webhook) =>
        webhook.topic === 'credentials' &&
        webhook.body.id === credentialRecord.id &&
        webhook.body.state === credentialRecord.state
    )

    expect(JSON.parse(JSON.stringify(credentialRecord.toJSON()))).toMatchObject(webhook?.body as any)
  })

  test('should return a webhook event when proof state changed', async () => {
    const proofRecord = new ProofRecord({
      id: 'testest',
      state: ProofState.ProposalSent,
      threadId: 'random',
    })

    const eventEmitter = agent.injectionContainer.resolve(EventEmitter)
    eventEmitter.emit<ProofStateChangedEvent>({
      type: ProofEventTypes.ProofStateChanged,
      payload: {
        previousState: null,
        proofRecord,
      },
    })

    await sleep(100)

    const webhook = webhooks.find(
      (webhook) =>
        webhook.topic === 'proofs' && webhook.body.id === proofRecord.id && webhook.body.state === proofRecord.state
    )

    expect(JSON.parse(JSON.stringify(proofRecord.toJSON()))).toMatchObject(webhook?.body as any)
  })
})
