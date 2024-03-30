import type { RestRootAgent } from '../../../../utils/agent'
import type { CredentialStateChangedEvent, ProofStateChangedEvent } from '@credo-ts/core'

import {
  AutoAcceptCredential,
  CredentialEventTypes,
  CredentialRole,
  CredentialState,
  ProofEventTypes,
  ProofRole,
  ProofState,
} from '@credo-ts/core'
import express from 'express'
import { filter, first, firstValueFrom, timeout } from 'rxjs'
import request from 'supertest'

import { getTestAgent } from '../../../../../tests/utils/helpers'
import { setupApp } from '../../../../setup/setupApp'
import { testAnonCredsSchema } from '../../../anoncreds/__tests__/fixtures'

describe('ProofsController', () => {
  const app = express()
  let agent: RestRootAgent
  let inviterConnectionId: string
  let receiverConnectionId: string

  let credentialDefinitionId: string

  beforeAll(async () => {
    agent = await getTestAgent('DIDComm Proofs REST Agent Test')
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

    const offered = await agent.credentials.offerCredential({
      protocolVersion: 'v2',
      autoAcceptCredential: AutoAcceptCredential.ContentApproved,
      connectionId: inviterConnectionId,
      credentialFormats: {
        anoncreds: {
          credentialDefinitionId,
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
    })

    await offerReceived

    const [received] = await agent.credentials.findAllByQuery({
      state: CredentialState.OfferReceived,
      threadId: offered.threadId,
    })

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

    await agent.credentials.acceptOffer({
      credentialRecordId: received.id,
    })

    await credentialIssued
  })

  afterAll(async () => {
    await agent.shutdown()
    await agent.wallet.delete()
  })

  test('Request proof', async () => {
    const requestReceived = firstValueFrom(
      agent.events.observable<ProofStateChangedEvent>(ProofEventTypes.ProofStateChanged).pipe(
        filter(
          (event) =>
            event.payload.proofRecord.role === ProofRole.Prover &&
            event.payload.proofRecord.connectionId === receiverConnectionId &&
            event.payload.proofRecord.state === ProofState.RequestReceived,
        ),
        first(),
        timeout(10000),
      ),
    )

    const response = await request(app)
      .post(`/didcomm/proofs/request-proof`)
      .send({
        connectionId: inviterConnectionId,
        protocolVersion: 'v2',
        proofFormats: {
          anoncreds: {
            name: 'proof',
            version: '1.0',
            requested_attributes: {
              prop1: {
                name: 'prop1',
                restrictions: [
                  {
                    cred_def_id: credentialDefinitionId,
                  },
                ],
              },
            },
          },
        },
        autoAcceptProof: 'contentApproved',
      })

    expect(response.statusCode).toBe(200)

    // Wait for request to be received
    await requestReceived

    const receiverExchangeResponse = await request(app).get(`/didcomm/proofs`).query({
      state: ProofState.RequestReceived,
      threadId: response.body.threadId,
    })
    expect(receiverExchangeResponse.statusCode).toBe(200)
    expect(receiverExchangeResponse.body).toHaveLength(1)

    const proofAcked = firstValueFrom(
      agent.events.observable<ProofStateChangedEvent>(ProofEventTypes.ProofStateChanged).pipe(
        filter(
          (event) =>
            event.payload.proofRecord.role === ProofRole.Prover &&
            event.payload.proofRecord.connectionId === receiverConnectionId &&
            event.payload.proofRecord.state === ProofState.Done,
        ),
        first(),
        timeout(10000),
      ),
    )

    const acceptResponse = await request(app)
      .post(`/didcomm/proofs/${receiverExchangeResponse.body[0].id}/accept-request`)
      .send({})
    expect(acceptResponse.statusCode).toBe(200)

    await proofAcked

    const formatData = await request(app).get(`/didcomm/proofs/${receiverExchangeResponse.body[0].id}/format-data`)
    expect(formatData.body).toEqual({
      request: {
        anoncreds: {
          name: 'proof',
          version: '1.0',
          nonce: expect.any(String),
          requested_attributes: {
            prop1: {
              restrictions: [
                {
                  cred_def_id: 'credential-definition:_p5hLM-uQa1zWnn3tBlSZjLHN3_jrHOq48HZg9x0WNU',
                },
              ],
              name: 'prop1',
            },
          },
          requested_predicates: {},
        },
      },
      presentation: {
        anoncreds: {
          proof: {
            proofs: [
              {
                primary_proof: {
                  eq_proof: {
                    revealed_attrs: {
                      prop1: expect.any(String),
                    },
                    a_prime: expect.any(String),
                    e: expect.any(String),
                    v: expect.any(String),
                    m: {
                      prop2: expect.any(String),
                      master_secret: expect.any(String),
                    },
                    m2: expect.any(String),
                  },
                  ge_proofs: [],
                },
                non_revoc_proof: null,
              },
            ],
            aggregated_proof: {
              c_hash: expect.any(String),
              c_list: [expect.any(Array)],
            },
          },
          requested_proof: {
            revealed_attrs: {
              prop1: {
                sub_proof_index: 0,
                raw: 'Alice',
                encoded: '27034640024117331033063128044004318218486816931520886405535659934417438781507',
              },
            },
            self_attested_attrs: {},
            unrevealed_attrs: {},
            predicates: {},
          },
          identifiers: [
            {
              schema_id: 'schema:gSl0JkGIcmRif593Q6XYGsJndHGOzm1jWRFa-Lwrz9o',
              cred_def_id: 'credential-definition:_p5hLM-uQa1zWnn3tBlSZjLHN3_jrHOq48HZg9x0WNU',
              rev_reg_id: null,
              timestamp: null,
            },
          ],
        },
      },
    })
  })
})
