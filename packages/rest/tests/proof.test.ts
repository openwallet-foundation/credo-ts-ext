import type { Agent, ProofRecord, ProofRequest } from '@aries-framework/core'
import type { Express } from 'express'

import request from 'supertest'

import { setupServer } from '../src/server'

import { getTestAgent, getTestProof, getTestProofRequest, objectToJson } from './utils/helpers'

describe('ProofController', () => {
  let app: Express
  let aliceAgent: Agent
  let bobAgent: Agent
  let testProof: ProofRecord
  let testRequest: ProofRequest

  beforeAll(async () => {
    aliceAgent = await getTestAgent('Rest Proof Test Alice', 3032)
    bobAgent = await getTestAgent('Rest Proof Test Bob', 3033)
    app = await setupServer(bobAgent, { port: 3000 })

    testProof = getTestProof()
    testRequest = getTestProofRequest()
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
      attributes: {
        additionalProp1: {
          name: 'test',
          restrictions: [
            {
              credentialDefinitionId: 'WghBqNdoFjaYh6F5N9eBF:3:CL:3210:test',
            },
          ],
        },
      },
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
        .send({ connectionId: 'string', proofRequest: testRequest })

      expect(response.statusCode).toBe(200)
      expect(response.body.message).toBeDefined()
      expect(response.body.proofRecord).toBeDefined()
    })
  })

  describe('Request proof', () => {
    test('should return proof record', async () => {
      const spy = jest.spyOn(bobAgent.proofs, 'requestProof').mockResolvedValueOnce(testProof)
      const getResult = (): Promise<ProofRecord> => spy.mock.results[0].value

      const response = await request(app)
        .post(`/proofs/request-proof`)
        .send({ connectionId: 'string', proofRequest: testRequest })

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })

    test('should give 404 not found when connection is not found', async () => {
      const response = await request(app)
        .post(`/proofs/request-proof`)
        .send({ connectionId: 'string', proofRequest: testRequest })

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

  afterAll(async () => {
    await aliceAgent.shutdown()
    await aliceAgent.wallet.delete()
    await bobAgent.shutdown()
    await bobAgent.wallet.delete()
  })
})
