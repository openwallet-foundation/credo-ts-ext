/* eslint-disable @typescript-eslint/no-non-null-assertion */
import type { WebhookData } from './utils/webhook'
import type { Agent, CredentialStateChangedEvent, ProofStateChangedEvent } from '@credo-ts/core'
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
} from '@credo-ts/core'

import { connectionRecordToApiModel } from '../src/controllers/didcomm/connections/ConnectionsControllerTypes'
import { credentialExchangeRecordToApiModel } from '../src/controllers/didcomm/credentials/CredentialsControllerTypes'
import { proofExchangeRecordToApiModel } from '../src/controllers/didcomm/proofs/ProofsControllerTypes'
import { setupServer } from '../src/server'

import { getTestAgent } from './utils/helpers'
import { waitForHook, webhookListener } from './utils/webhook'

describe('WebhookTests', () => {
  let aliceAgent: Agent
  let bobAgent: Agent
  let server: Server
  const webhooks: WebhookData[] = []

  beforeAll(async () => {
    aliceAgent = await getTestAgent('Webhook REST Agent Test Alice', 3042)
    bobAgent = await getTestAgent('Webhook REST Agent Test Bob', 3043)
    server = await webhookListener(3044, webhooks)
    await setupServer(bobAgent, { webhookUrl: 'http://localhost:3044', port: 6045 })
  })

  test('should return a webhook event when basic message state changed', async () => {
    const { outOfBandInvitation } = await aliceAgent.oob.createInvitation()
    const { connectionRecord } = await bobAgent.oob.receiveInvitation(outOfBandInvitation)
    const connection = await bobAgent.connections.returnWhenIsConnected(connectionRecord!.id)

    const senderBasicMessage = await bobAgent.basicMessages.sendMessage(connection.id, 'Hello')

    const webhook = await waitForHook(
      webhooks,
      (webhook) => webhook.body.type === BasicMessageEventTypes.BasicMessageStateChanged,
    )

    expect(webhook?.body).toMatchObject({
      payload: {
        basicMessageRecord: {
          threadId: senderBasicMessage.threadId,
          role: BasicMessageRole.Sender,
        },
      },
    })
  })

  test('should return a webhook event when connection state changed', async () => {
    const { outOfBandInvitation } = await aliceAgent.oob.createInvitation()
    const { connectionRecord } = await bobAgent.oob.receiveInvitation(outOfBandInvitation)
    const connection = await bobAgent.connections.returnWhenIsConnected(connectionRecord!.id)

    const webhook = await waitForHook(
      webhooks,
      (webhook) =>
        webhook.body.type === ConnectionEventTypes.ConnectionStateChanged &&
        webhook.body.payload.connectionRecord.id === connection.id &&
        webhook.body.payload.connectionRecord.state === connection.state,
    )

    expect(webhook?.body).toMatchObject({
      payload: { connectionRecord: JSON.parse(JSON.stringify(connectionRecordToApiModel(connection))) },
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

    bobAgent.events.emit<CredentialStateChangedEvent>(bobAgent.context, {
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

    bobAgent.events.emit<ProofStateChangedEvent>(bobAgent.context, {
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
    await aliceAgent.shutdown()
    await aliceAgent.wallet.delete()
    await bobAgent.shutdown()
    await bobAgent.wallet.delete()
    server.close()
  })
})
