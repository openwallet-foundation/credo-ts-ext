import type { RestRootAgent } from '../../../../utils/agent'
import type { CredentialStateChangedEvent } from '@credo-ts/core'

import { CredentialEventTypes, CredentialRole, CredentialState } from '@credo-ts/core'
import express from 'express'
import { filter, first, firstValueFrom, timeout } from 'rxjs'
import request from 'supertest'

import { getTestAgent } from '../../../../../tests/utils/helpers'
import { setupApp } from '../../../../setup/setupApp'
import { testAnonCredsSchema } from '../../../anoncreds/__tests__/fixtures'

describe('BasicMessagesController', () => {
  const app = express()
  let agent: RestRootAgent
  let inviterConnectionId: string
  let receiverConnectionId: string

  let credentialDefinitionId: string

  beforeAll(async () => {
    agent = await getTestAgent('DIDComm Credentials REST Agent Test')
    await setupApp({ agent, adminPort: 3000, baseApp: app })

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

    const formatData = await request(app).get(`/didcomm/credentials/${receiverExchangeResponse.body[0].id}/format-data`)
    expect(formatData.body).toEqual({
      credential: {
        anoncreds: {
          cred_def_id: 'credential-definition:_p5hLM-uQa1zWnn3tBlSZjLHN3_jrHOq48HZg9x0WNU',
          rev_reg: null,
          rev_reg_id: null,
          schema_id: 'schema:gSl0JkGIcmRif593Q6XYGsJndHGOzm1jWRFa-Lwrz9o',
          signature: {
            p_credential: expect.any(Object),
            r_credential: null,
          },
          signature_correctness_proof: {
            c: expect.any(String),
            se: expect.any(String),
          },
          values: {
            prop1: {
              encoded: '27034640024117331033063128044004318218486816931520886405535659934417438781507',
              raw: 'Alice',
            },
            prop2: {
              encoded: '93006290325627508022776103386395994712401809437930957652111221015872244345185',
              raw: 'Bob',
            },
          },
          witness: null,
        },
      },
      offer: {
        anoncreds: {
          cred_def_id: 'credential-definition:_p5hLM-uQa1zWnn3tBlSZjLHN3_jrHOq48HZg9x0WNU',
          key_correctness_proof: {
            c: expect.any(String),
            xr_cap: expect.arrayContaining([
              ['master_secret', expect.any(String)],
              ['prop1', expect.any(String)],
              ['prop2', expect.any(String)],
            ]),
            xz_cap: expect.any(String),
          },
          nonce: expect.any(String),
          schema_id: 'schema:gSl0JkGIcmRif593Q6XYGsJndHGOzm1jWRFa-Lwrz9o',
        },
      },
      offerAttributes: [
        {
          'mime-type': 'text/plain',
          name: 'prop1',
          value: 'Alice',
        },
        {
          'mime-type': 'text/plain',
          name: 'prop2',
          value: 'Bob',
        },
      ],
      request: {
        anoncreds: {
          blinded_ms: {
            committed_attributes: {},
            hidden_attributes: ['master_secret'],
            u: expect.any(String),
            ur: null,
          },
          blinded_ms_correctness_proof: {
            c: expect.any(String),
            m_caps: {
              master_secret: expect.any(String),
            },
            r_caps: {},
            v_dash_cap: expect.any(String),
          },
          cred_def_id: 'credential-definition:_p5hLM-uQa1zWnn3tBlSZjLHN3_jrHOq48HZg9x0WNU',
          entropy: expect.any(String),
          nonce: expect.any(String),
        },
      },
    })
  })
})
