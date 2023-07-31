import type { RequestProofProposalOptions } from '../src/controllers/types'
import type { Agent, ProofStateChangedEvent } from '@aries-framework/core'
import type { Server } from 'net'

import { ProofEventTypes, ProofExchangeRecord, ProofState } from '@aries-framework/core'
import request from 'supertest'
import WebSocket from 'ws'

import { startServer } from '../src'

import { getTestAgent, getTestProof, objectToJson } from './utils/helpers'

describe('ProofController', () => {
  let app: Server
  let aliceAgent: Agent
  let bobAgent: Agent
  let testProof: ProofExchangeRecord

  beforeAll(async () => {
    aliceAgent = await getTestAgent('Proof REST Agent Test Alice', 3032)
    bobAgent = await getTestAgent('Proof REST Agent Test Bob', 3912)
    app = await startServer(bobAgent, { port: 3033 })

    testProof = getTestProof()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Get all proofs', () => {
    test('should return all proofs', async () => {
      const spy = jest.spyOn(bobAgent.proofs, 'getAll').mockResolvedValueOnce([testProof])
      const getResult = (): Promise<ProofExchangeRecord[]> => spy.mock.results[0].value

      const response = await request(app).get('/proofs')
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(result.map(objectToJson))
    })

    test('should optionally filter on threadId', async () => {
      const spy = jest.spyOn(bobAgent.proofs, 'getAll').mockResolvedValueOnce([testProof])
      const getResult = (): Promise<ProofExchangeRecord[]> => spy.mock.results[0].value

      const response = await request(app).get('/proofs').query({ threadId: testProof.threadId })
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(result.map(objectToJson))
    })

    test('should return empty array if nothing found', async () => {
      jest.spyOn(bobAgent.proofs, 'getAll').mockResolvedValueOnce([testProof])

      const response = await request(app).get('/proofs').query({ threadId: 'string' })

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual([])
    })
  })

  describe('Get by proof by id', () => {
    test('should return proof record', async () => {
      const spy = jest.spyOn(bobAgent.proofs, 'getById').mockResolvedValueOnce(testProof)
      const getResult = (): Promise<ProofExchangeRecord> => spy.mock.results[0].value

      const response = await request(app).get(`/proofs/${testProof.id}`)

      expect(response.statusCode).toBe(200)
      expect(spy).toHaveBeenCalledWith(testProof.id)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })

    test('should return 404 not found when proof record not found', async () => {
      const response = await request(app).get(`/proofs/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`)

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Delete proof by id', () => {
    test('should give 404 not found when proof is not found', async () => {
      const response = await request(app).delete('/proofs/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa')

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Propose proof', () => {
    const proposalRequest: RequestProofProposalOptions = {
      connectionId: '123456aa-aa78-90a1-aa23-456a7da89010',
      attributes: [
        {
          name: 'test',
          credentialDefinitionId: 'WghBqNdoFjaYh6F5N9eBF:3:CL:3210:test',
        },
      ],
      predicates: [],
      comment: 'test',
    }
    test('should return proof record', async () => {
      const spy = jest.spyOn(bobAgent.proofs, 'proposeProof').mockResolvedValueOnce(testProof)
      const getResult = (): Promise<ProofExchangeRecord> => spy.mock.results[0].value

      const response = await request(app).post('/proofs/propose-proof').send(proposalRequest)

      expect(spy).toHaveBeenCalledWith({
        connectionId: proposalRequest.connectionId,
        protocolVersion: 'v2',
        proofFormats: {
          anoncreds: {
            attributes: proposalRequest.attributes,
            predicates: proposalRequest.predicates,
          },
        },
        comment: proposalRequest.comment,
      })
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })

    test('should give 404 not found when connection is not found', async () => {
      const response = await request(app).post('/proofs/propose-proof').send(proposalRequest)

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Accept proof proposal', () => {
    const acceptRequest = {
      request: {
        name: 'string',
        version: 'string',
      },
      comment: 'string',
    }

    test('should return proof record', async () => {
      const spy = jest.spyOn(bobAgent.proofs, 'acceptProposal').mockResolvedValueOnce(testProof)
      const getResult = (): Promise<ProofExchangeRecord> => spy.mock.results[0].value

      const response = await request(app).post(`/proofs/${testProof.id}/accept-proposal`).send(acceptRequest)

      expect(spy).toHaveBeenCalledWith({
        proofRecordId: testProof.id,
        proofFormats: {
          anoncreds: {
            name: acceptRequest.request.name,
            version: acceptRequest.request.version,
          },
        },
        comment: acceptRequest.comment,
      })
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })

    test('should give 404 not found when proof is not found', async () => {
      const response = await request(app).post(`/proofs/${testProof.id}/accept-proposal`).send(acceptRequest)

      expect(response.statusCode).toBe(404)
    })
  })

  // TODO: how to do out-of-band proof
  describe.skip('Request out of band proof', () => {
    test('should return proof record', async () => {
      const response = await request(app)
        .post(`/proofs/request-outofband-proof`)
        .send({
          proofRequestOptions: {
            name: 'string',
            version: '1.0',
            requestedAttributes: {
              additionalProp1: {
                name: 'string',
              },
            },
          },
        })

      expect(response.statusCode).toBe(200)
      expect(response.body.proofUrl).toBeDefined()
      expect(response.body.proofRecord).toBeDefined()
    })
  })

  describe('Request proof', () => {
    test('should return proof record', async () => {
      const spy = jest.spyOn(bobAgent.proofs, 'requestProof').mockResolvedValueOnce(testProof)
      const getResult = (): Promise<ProofExchangeRecord> => spy.mock.results[0].value

      const response = await request(app)
        .post(`/proofs/request-proof`)
        .send({
          connectionId: 'string',
          proofRequestOptions: {
            name: 'string',
            version: '1.0',
            requestedAttributes: {
              additionalProp1: {
                name: 'string',
              },
            },
            requestedPredicates: {},
          },
        })

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })

    test('should transform proof request attribute restrictions', async () => {
      const spy = jest.spyOn(bobAgent.proofs, 'requestProof').mockResolvedValueOnce(testProof)

      const response = await request(app)
        .post(`/proofs/request-proof`)
        .send({
          connectionId: 'string',
          proofRequestOptions: {
            name: 'string',
            version: '1.0',
            requestedAttributes: {
              additionalProp1: {
                name: 'string',
                restrictions: [
                  {
                    schemaId: 'schemaId',
                    schemaIssuerId: 'schemaIssuerId',
                    schemaName: 'schemaName',
                    schemaVersion: 'schemaVersion',
                    issuerId: 'issuerId',
                    credDefId: 'credDefId',
                    revRegId: 'revRegId',
                    schemaIssuerDid: 'schemaIssuerDid',
                    issuerDid: 'issuerDid',
                    requiredAttributes: ['a', 'b'],
                    requiredAttributeValues: { c: 'd', e: 'f' },
                  },
                ],
              },
            },
            requestedPredicates: {},
          },
        })

      expect(response.statusCode).toBe(200)
      expect(spy).toHaveBeenCalledWith({
        connectionId: 'string',
        protocolVersion: 'v2',
        proofFormats: {
          anoncreds: {
            name: 'string',
            version: '1.0',
            requested_attributes: {
              additionalProp1: {
                name: 'string',
                restrictions: [
                  {
                    schema_id: 'schemaId',
                    schema_issuer_id: 'schemaIssuerId',
                    schema_name: 'schemaName',
                    schema_version: 'schemaVersion',
                    issuer_id: 'issuerId',
                    cred_def_id: 'credDefId',
                    rev_reg_id: 'revRegId',
                    schema_issuer_did: 'schemaIssuerDid',
                    issuer_did: 'issuerDid',
                    'attr::a::marker': '1',
                    'attr::b::marker': '1',
                    'attr::c::value': 'd',
                    'attr::e::value': 'f',
                  },
                ],
              },
            },
            requested_predicates: {},
          },
        },
      })
    })

    test('should give 404 not found when connection is not found', async () => {
      const response = await request(app)
        .post(`/proofs/request-proof`)
        .send({
          connectionId: 'string',
          proofRequestOptions: {
            name: 'string',
            version: '1.0',
            requestedAttributes: {
              additionalProp1: {
                name: 'string',
              },
            },
            requestedPredicates: {},
          },
        })

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Accept proof presentation', () => {
    test('should return proof record', async () => {
      const spy = jest.spyOn(bobAgent.proofs, 'acceptPresentation').mockResolvedValueOnce(testProof)
      const getResult = (): Promise<ProofExchangeRecord> => spy.mock.results[0].value

      const response = await request(app).post(`/proofs/${testProof.id}/accept-presentation`)

      expect(spy).toHaveBeenCalledWith({
        proofRecordId: testProof.id,
      })
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })

    test('should give 404 not found when proof is not found', async () => {
      const response = await request(app).post('/proofs/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/accept-presentation')

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Proof WebSocket event', () => {
    test('should return proof event sent from test agent to websocket client', async () => {
      expect.assertions(1)

      const now = new Date()

      const proofRecord = new ProofExchangeRecord({
        id: 'testest',
        protocolVersion: 'v2',
        state: ProofState.ProposalSent,
        threadId: 'random',
        createdAt: now,
      })

      // Start client and wait for it to be opened
      const client = new WebSocket('ws://localhost:3033')
      await new Promise((resolve) => client.once('open', resolve))

      // Start promise to listen for message
      const waitForEvent = new Promise((resolve) =>
        client.on('message', (data) => {
          client.terminate()
          resolve(JSON.parse(data as string))
        })
      )

      bobAgent.events.emit<ProofStateChangedEvent>(bobAgent.context, {
        type: ProofEventTypes.ProofStateChanged,
        payload: {
          previousState: null,
          proofRecord,
        },
      })

      // Wait for event on WebSocket
      const event = await waitForEvent
      expect(event).toEqual({
        type: 'ProofStateChanged',
        payload: {
          previousState: null,
          proofRecord: {
            _tags: {},
            metadata: {},
            id: 'testest',
            protocolVersion: 'v2',
            createdAt: now.toISOString(),
            state: 'proposal-sent',
            threadId: 'random',
          },
        },
        metadata: {
          contextCorrelationId: 'default',
        },
      })
    })
  })

  afterAll(async () => {
    await aliceAgent.shutdown()
    await aliceAgent.wallet.delete()
    await bobAgent.shutdown()
    await bobAgent.wallet.delete()
    app.close()
  })
})
