/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { WebhookData } from './utils/webhook'
import type {
  Agent,
  BasicMessageStateChangedEvent,
  ConnectionStateChangedEvent,
  CredentialStateChangedEvent,
  ProofStateChangedEvent,
} from '@credo-ts/core'
import type { Server } from 'net'

import {
  CredentialExchangeRecord,
  ProofEventTypes,
  ProofState,
  ProofExchangeRecord,
  CredentialState,
  CredentialEventTypes,
  CredentialRole,
  ProofRole,
  ConnectionEventTypes,
  BasicMessageEventTypes,
  BasicMessageRole,
  ConnectionRecord,
  DidExchangeRole,
  DidExchangeState,
  BasicMessageRecord,
  BasicMessage,
} from '@credo-ts/core'

import { setupApp } from '../src'
import { connectionRecordToApiModel } from '../src/controllers/didcomm/connections/ConnectionsControllerTypes'
import { credentialExchangeRecordToApiModel } from '../src/controllers/didcomm/credentials/CredentialsControllerTypes'
import { proofExchangeRecordToApiModel } from '../src/controllers/didcomm/proofs/ProofsControllerTypes'

import { getTestAgent } from './utils/helpers'
import { waitForHook, webhookListener } from './utils/webhook'

describe('WebhookTests', () => {
  let agent: Agent
  let server: Server
  const webhooks: WebhookData[] = []

  beforeAll(async () => {
    agent = await getTestAgent('Webhook REST Agent Test')
    server = await webhookListener(3044, webhooks)
    await setupApp({
      agent: agent,
      adminPort: 3042,
      webhookUrl: 'http://localhost:3044',
    })
  })

  test('should return a webhook event when basic message state changed', async () => {
    const basicMessageRecord = new BasicMessageRecord({
      id: '8220e065-d884-4df4-88d8-9c33e9b2f788',
      connectionId: 'random',
      content: 'Hello!',
      role: BasicMessageRole.Sender,
      sentTime: 'now',
      threadId: 'randomt',
    })

    agent.events.emit<BasicMessageStateChangedEvent>(agent.context, {
      type: BasicMessageEventTypes.BasicMessageStateChanged,
      payload: {
        message: new BasicMessage({
          content: 'Hello!',
        }),
        basicMessageRecord,
      },
    })

    const webhook = await waitForHook(
      webhooks,
      (webhook) => webhook.body.type === BasicMessageEventTypes.BasicMessageStateChanged,
    )

    expect(webhook?.body).toMatchObject({
      payload: {
        basicMessageRecord: {
          threadId: 'randomt',
          role: BasicMessageRole.Sender,
        },
      },
    })
  })

  test('should return a webhook event when connection state changed', async () => {
    const connectionRecord = new ConnectionRecord({
      id: '8220e065-d884-4df4-88d8-9c33e9b2f788',
      role: DidExchangeRole.Requester,
      state: DidExchangeState.Completed,
      alias: 'test',
    })

    agent.events.emit<ConnectionStateChangedEvent>(agent.context, {
      type: ConnectionEventTypes.ConnectionStateChanged,
      payload: {
        previousState: null,
        connectionRecord,
      },
    })

    const webhook = await waitForHook(
      webhooks,
      (webhook) =>
        webhook.body.type === ConnectionEventTypes.ConnectionStateChanged &&
        webhook.body.payload.connectionRecord.id === connectionRecord.id &&
        webhook.body.payload.connectionRecord.state === connectionRecord.state,
    )

    expect(webhook?.body).toMatchObject({
      payload: { connectionRecord: JSON.parse(JSON.stringify(connectionRecordToApiModel(connectionRecord))) },
    })
  })

  test('should return a webhook event when credential state changed', async () => {
    const credentialRecord = new CredentialExchangeRecord({
      id: 'testest',
      state: CredentialState.OfferSent,
      threadId: 'random',
      protocolVersion: 'v1',
      role: CredentialRole.Holder,
    })

    agent.events.emit<CredentialStateChangedEvent>(agent.context, {
      type: CredentialEventTypes.CredentialStateChanged,
      payload: {
        previousState: null,
        credentialRecord,
      },
    })

    const webhook = await waitForHook(
      webhooks,
      (webhook) =>
        webhook.body.type === CredentialEventTypes.CredentialStateChanged &&
        webhook.body.payload.credentialExchange.id === credentialRecord.id &&
        webhook.body.payload.credentialExchange.state === credentialRecord.state,
    )

    expect(webhook?.body).toMatchObject({
      payload: { credentialExchange: JSON.parse(JSON.stringify(credentialExchangeRecordToApiModel(credentialRecord))) },
    })
  })

  test('should return a webhook event when proof state changed', async () => {
    const proofRecord = new ProofExchangeRecord({
      id: 'testest',
      protocolVersion: 'v2',
      state: ProofState.ProposalSent,
      threadId: 'random',
      role: ProofRole.Prover,
    })

    agent.events.emit<ProofStateChangedEvent>(agent.context, {
      type: ProofEventTypes.ProofStateChanged,
      payload: {
        previousState: null,
        proofRecord,
      },
    })

    const webhook = await waitForHook(
      webhooks,
      (webhook) =>
        webhook.body.type === ProofEventTypes.ProofStateChanged &&
        webhook.body.payload.proofExchange.id === proofRecord.id &&
        webhook.body.payload.proofExchange.state === proofRecord.state,
    )

    expect(webhook?.body).toMatchObject({
      payload: { proofExchange: JSON.parse(JSON.stringify(proofExchangeRecordToApiModel(proofRecord))) },
    })
  })

  afterAll(async () => {
    await agent.shutdown()
    await agent.wallet.delete()
    server.close()
  })
})
