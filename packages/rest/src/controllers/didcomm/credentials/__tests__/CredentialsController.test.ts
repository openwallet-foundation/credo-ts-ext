import type { RestRootAgent } from '../../../../utils/agent'
import type { CredentialStateChangedEvent } from '@credo-ts/core'
import type { Express } from 'express'

import { CredentialEventTypes, CredentialRole, CredentialState } from '@credo-ts/core'
import { filter, first, firstValueFrom, timeout } from 'rxjs'
import request from 'supertest'

import { getTestAgent } from '../../../../../tests/utils/helpers'
import { setupServer } from '../../../../server'
import { testAnonCredsSchema } from '../../../anoncreds/__tests__/fixtures'

describe('BasicMessagesController', () => {
  let app: Express
  let agent: RestRootAgent
  let inviterConnectionId: string
  let receiverConnectionId: string

  let credentialDefinitionId: string

  beforeAll(async () => {
    agent = await getTestAgent('DIDComm Credentials REST Agent Test')
    app = await setupServer(agent, { port: 3000 })

    const inviterOutOfBandRecord = await agent.oob.createInvitation()
    let { connectionRecord: receiverConnection } = await agent.oob.receiveInvitation(
      inviterOutOfBandRecord.outOfBandInvitation,
    )

    receiverConnection = await agent.connections.returnWhenIsConnected(receiverConnection!.id)
    const [inviterConnection] = await agent.connections.findAllByOutOfBandId(inviterOutOfBandRecord.id)

    inviterConnectionId = inviterConnection.id
    receiverConnectionId = receiverConnection.id

    const registerDefinitionResult = await agent.modules.anoncreds.registerCredentialDefinition({
      credentialDefinition: {
        issuerId: testAnonCredsSchema.schema.issuerId,
        schemaId: testAnonCredsSchema.schemaId,
        tag: 'test',
      },
      options: {
        supportRevocation: false,
      },
    })

    if (registerDefinitionResult.credentialDefinitionState.state !== 'finished') {
      throw new Error('Credential definition registration failed')
    }

    credentialDefinitionId = registerDefinitionResult.credentialDefinitionState.credentialDefinitionId
  })

  afterAll(async () => {
    await agent.shutdown()
    await agent.wallet.delete()
  })

  test('Issue credential', async () => {
    const offerReceived = firstValueFrom(
      agent.events.observable<CredentialStateChangedEvent>(CredentialEventTypes.CredentialStateChanged).pipe(
        filter(
          (event) =>
            event.payload.credentialRecord.role === CredentialRole.Holder &&
            event.payload.credentialRecord.connectionId === receiverConnectionId &&
            event.payload.credentialRecord.state === CredentialState.OfferReceived,
        ),
        first(),
        timeout(10000),
      ),
    )

    const response = await request(app)
      .post(`/didcomm/credentials/offer-credential`)
      .send({
        connectionId: inviterConnectionId,
        protocolVersion: 'v2',
        credentialFormats: {
          anoncreds: {
            credentialDefinitionId: credentialDefinitionId,
            attributes: [
              {
                name: 'prop1',
                value: 'Alice',
              },
              {
                name: 'prop2',
                value: 'Bob',
              },
            ],
          },
        },
        autoAcceptCredential: 'contentApproved',
      })

    expect(response.statusCode).toBe(200)

    // Wait for offer to be received
    await offerReceived

    const receiverExchangeResponse = await request(app).get(`/didcomm/credentials`).query({
      state: CredentialState.OfferReceived,
      threadId: response.body.threadId,
    })
    expect(receiverExchangeResponse.statusCode).toBe(200)
    expect(receiverExchangeResponse.body).toHaveLength(1)

    const credentialIssued = firstValueFrom(
      agent.events.observable<CredentialStateChangedEvent>(CredentialEventTypes.CredentialStateChanged).pipe(
        filter(
          (event) =>
            event.payload.credentialRecord.role === CredentialRole.Issuer &&
            event.payload.credentialRecord.connectionId === inviterConnectionId &&
            event.payload.credentialRecord.state === CredentialState.Done,
        ),
        first(),
        timeout(10000),
      ),
    )

    const acceptResponse = await request(app)
      .post(`/didcomm/credentials/${receiverExchangeResponse.body[0].id}/accept-offer`)
      .send({})
    expect(acceptResponse.statusCode).toBe(200)

    await credentialIssued
  })
})
