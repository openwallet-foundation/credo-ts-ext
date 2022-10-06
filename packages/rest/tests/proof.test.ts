import type { Agent, ProofStateChangedEvent } from '@aries-framework/core'
import type { Server } from 'net'

import { ProofEventTypes, ProofRecord, ProofState } from '@aries-framework/core'
import request from 'supertest'
import WebSocket from 'ws'

import { startServer } from '../src'

import { getTestAgent, getTestProof, objectToJson } from './utils/helpers'

describe('ProofController', () => {
  let app: Server
  let aliceAgent: Agent
  let bobAgent: Agent
  let testProof: ProofRecord

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
      const getResult = (): Promise<ProofRecord[]> => spy.mock.results[0].value

      const response = await request(app).get('/proofs')
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(result.map(objectToJson))
    })

    test('should optionally filter on threadId', async () => {
      const spy = jest.spyOn(bobAgent.proofs, 'getAll').mockResolvedValueOnce([testProof])
      const getResult = (): Promise<ProofRecord[]> => spy.mock.results[0].value

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
      const getResult = (): Promise<ProofRecord> => spy.mock.results[0].value

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
    const proposalRequest = {
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
      const getResult = (): Promise<ProofRecord> => spy.mock.results[0].value

      const response = await request(app).post('/proofs/propose-proof').send(proposalRequest)

      expect(spy).toHaveBeenCalledWith(
        expect.stringContaining(proposalRequest.connectionId),
        expect.objectContaining({
          attributes: proposalRequest.attributes,
        }),
        expect.objectContaining({
          comment: proposalRequest.comment,
        })
      )
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
        nonce: 'string',
      },
      comment: 'string',
    }

    test('should return proof record', async () => {
      const spy = jest.spyOn(bobAgent.proofs, 'acceptProposal').mockResolvedValueOnce(testProof)
      const getResult = (): Promise<ProofRecord> => spy.mock.results[0].value

      const response = await request(app).post(`/proofs/${testProof.id}/accept-proposal`).send(acceptRequest)

      expect(spy).toHaveBeenCalledWith(testProof.id, acceptRequest)
      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })

    test('should give 404 not found when proof is not found', async () => {
      const response = await request(app).post(`/proofs/${testProof.id}/accept-proposal`).send(acceptRequest)

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Request out of band proof', () => {
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
      const getResult = (): Promise<ProofRecord> => spy.mock.results[0].value

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
      const getResult = (): Promise<ProofRecord> => spy.mock.results[0].value

      const response = await request(app).post(`/proofs/${testProof.id}/accept-presentation`)

      expect(spy).toHaveBeenCalledWith(testProof.id)
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

      const proofRecord = new ProofRecord({
        id: 'testest',
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

      bobAgent.events.emit<ProofStateChangedEvent>({
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
            createdAt: now.toISOString(),
            state: 'proposal-sent',
            threadId: 'random',
          },
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
