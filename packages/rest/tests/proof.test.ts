import type {
  AcceptProofProposalOptions,
  CreateProofRequestOptions,
  ProposeProofOptions,
  RequestProofOptions,
} from '../src/controllers/types'
import type { Agent, ProofStateChangedEvent } from '@credo-ts/core'
import type { Server } from 'net'

import { AgentMessage, ProofEventTypes, ProofExchangeRecord, ProofState } from '@credo-ts/core'
import request from 'supertest'
import WebSocket from 'ws'

import { startServer } from '../src'

import { getTestAgent, getTestProof, objectToJson } from './utils/helpers'

describe('ProofController', () => {
  let app: Server
  let aliceAgent: Agent
  let bobAgent: Agent
  let testMessage: AgentMessage
  let testProof: ProofExchangeRecord

  beforeAll(async () => {
    aliceAgent = await getTestAgent('Proof REST Agent Test Alice', 3032)
    bobAgent = await getTestAgent('Proof REST Agent Test Bob', 3912)
    app = await startServer(bobAgent, { port: 3033 })

    testProof = getTestProof()
    testMessage = new AgentMessage()
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
    const proposalRequest: ProposeProofOptions = {
      connectionId: '123456aa-aa78-90a1-aa23-456a7da89010',
      protocolVersion: 'v2',
      proofFormats: {
        indy: {
          attributes: [
            {
              name: 'test',
              credentialDefinitionId: 'WghBqNdoFjaYh6F5N9eBF:3:CL:3210:test',
            },
          ],
          predicates: [],
        },
      },
      comment: 'test',
    }
    test('should return proof record', async () => {
      const spy = jest.spyOn(bobAgent.proofs, 'proposeProof').mockResolvedValueOnce(testProof)
      const getResult = (): Promise<ProofExchangeRecord> => spy.mock.results[0].value

      const response = await request(app).post('/proofs/propose-proof').send(proposalRequest)

      expect(spy).toHaveBeenCalledWith(proposalRequest)
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })

    test('should give 404 not found when connection is not found', async () => {
      const response = await request(app).post('/proofs/propose-proof').send(proposalRequest)

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Accept proof proposal', () => {
    const acceptRequest: AcceptProofProposalOptions = {
      proofFormats: {
        anoncreds: {
          name: 'string',
          version: 'string',
        },
      },
      comment: 'string',
    }

    test('should return proof record', async () => {
      const spy = jest.spyOn(bobAgent.proofs, 'acceptProposal').mockResolvedValueOnce(testProof)
      const getResult = (): Promise<ProofExchangeRecord> => spy.mock.results[0].value

      const response = await request(app).post(`/proofs/${testProof.id}/accept-proposal`).send(acceptRequest)

      expect(spy).toHaveBeenCalledWith({
        proofRecordId: testProof.id,
        ...acceptRequest,
      })
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })

    test('should give 404 not found when proof is not found', async () => {
      const response = await request(app).post(`/proofs/${testProof.id}/accept-proposal`).send(acceptRequest)

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Request out of band proof', () => {
    const proofRequest: CreateProofRequestOptions = {
      protocolVersion: 'v1',
      proofFormats: {
        indy: {
          name: 'string',
          version: '1.0',
          requested_attributes: {
            additionalProp1: {
              name: 'string',
            },
          },
        },
      },
    }

    test('should return proof record', async () => {
      const mockValue = { message: testMessage, proofRecord: testProof }
      const spy = jest.spyOn(bobAgent.proofs, 'createRequest').mockResolvedValueOnce(mockValue)
      const getResult = (): Promise<typeof mockValue> => spy.mock.results[0].value

      const response = await request(app).post(`/proofs/create-request`).send(proofRequest)

      expect(response.statusCode).toBe(200)

      const result = await getResult()
      expect(response.body.message).toEqual(objectToJson(result.message))
      expect(response.body.proofRecord).toEqual(objectToJson(result.proofRecord))
    })
  })

  describe('Request proof', () => {
    const requestProofRequest: RequestProofOptions = {
      connectionId: 'string',
      protocolVersion: 'v1',
      proofFormats: {
        indy: {
          name: 'string',
          version: '1.0',
          requested_attributes: {
            additionalProp1: {
              name: 'string',
            },
          },
        },
      },
    }
    const requestProofRequestWithAttr: RequestProofOptions = {
      connectionId: 'string',
      protocolVersion: 'v1',
      proofFormats: {
        indy: {
          name: 'string',
          version: '1.0',
          requested_attributes: {
            additionalProp1: {
              name: 'string',
              restrictions: [
                {
                  attributeMarkers: { a: true, b: false },
                  attributeValues: { c: 'd', e: 'f' },
                },
              ],
            },
          },
        },
      },
    }

    test('should return proof record', async () => {
      const spy = jest.spyOn(bobAgent.proofs, 'requestProof').mockResolvedValueOnce(testProof)
      const getResult = (): Promise<ProofExchangeRecord> => spy.mock.results[0].value

      const response = await request(app).post(`/proofs/request-proof`).send(requestProofRequest)

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })

    test('should transform proof request attribute restrictions', async () => {
      const spy = jest.spyOn(bobAgent.proofs, 'requestProof').mockResolvedValueOnce(testProof)

      const response = await request(app).post(`/proofs/request-proof`).send(requestProofRequestWithAttr)

      expect(response.statusCode).toBe(200)
      expect(spy).toHaveBeenCalledWith({
        connectionId: 'string',
        protocolVersion: 'v1',
        proofFormats: {
          indy: {
            name: 'string',
            version: '1.0',
            requested_attributes: {
              additionalProp1: {
                name: 'string',
                restrictions: [
                  {
                    'attr::a::marker': '1',
                    'attr::b::marker': '0',
                    'attr::c::value': 'd',
                    'attr::e::value': 'f',
                  },
                ],
              },
            },
          },
        },
      })
    })

    test('should give 404 not found when connection is not found', async () => {
      const response = await request(app).post(`/proofs/request-proof`).send(requestProofRequest)
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
        }),
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
