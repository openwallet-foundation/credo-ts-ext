import type { Agent, CredentialExchangeRecord } from '@aries-framework/core'
import type { Express } from 'express'

import request from 'supertest'

import { setupServer } from '../src/server'

import { objectToJson, getTestCredential, getTestAgent } from './utils/helpers'

describe('CredentialController', () => {
  let app: Express
  let aliceAgent: Agent
  let bobAgent: Agent
  let testCredential: CredentialExchangeRecord

  beforeAll(async () => {
    aliceAgent = await getTestAgent('Credential REST Agent Test Alice', 3022)
    bobAgent = await getTestAgent('Credential REST Agent Test Bob', 3023)
    app = await setupServer(bobAgent, { port: 3000 })

    testCredential = getTestCredential() as CredentialExchangeRecord
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Get all credentials', () => {
    test('should return all credentials', async () => {
      const spy = jest.spyOn(bobAgent.credentials, 'getAll').mockResolvedValueOnce([testCredential])

      const getResult = (): Promise<CredentialExchangeRecord[]> => spy.mock.results[0].value

      const response = await request(app).get('/credentials')
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(result.map(objectToJson))
    })
  })

  describe('Get all credentials by state', () => {
    test('should return all credentials', async () => {
      const spy = jest.spyOn(bobAgent.credentials, 'getAll').mockResolvedValueOnce([testCredential])

      const getResult = (): Promise<CredentialExchangeRecord[]> => spy.mock.results[0].value

      const response = await request(app).get('/credentials').query({ state: testCredential.state })
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(result.map(objectToJson))
    })
  })

  describe('Get all credentials by threadId', () => {
    test('should return all credentials', async () => {
      const spy = jest.spyOn(bobAgent.credentials, 'getAll').mockResolvedValueOnce([testCredential])

      const getResult = (): Promise<CredentialExchangeRecord[]> => spy.mock.results[0].value

      const response = await request(app).get('/credentials').query({ threadId: testCredential.threadId })
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(result.map(objectToJson))
    })
  })

  describe('Get all credentials by connectionId', () => {
    test('should return all credentials', async () => {
      const spy = jest.spyOn(bobAgent.credentials, 'getAll').mockResolvedValueOnce([testCredential])

      const getResult = (): Promise<CredentialExchangeRecord[]> => spy.mock.results[0].value

      const response = await request(app).get('/credentials').query({ connectionId: testCredential.connectionId })
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(result.map(objectToJson))
    })
  })

  describe('Get credential by id', () => {
    test('should return credential', async () => {
      const spy = jest.spyOn(bobAgent.credentials, 'getById').mockResolvedValueOnce(testCredential)

      const getResult = (): Promise<CredentialExchangeRecord> => spy.mock.results[0].value

      const response = await request(app).get(`/credentials/${testCredential.id}`)
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(spy).toHaveBeenCalledWith(testCredential.id)
      expect(response.body).toEqual(objectToJson(result))
    })

    test('should give 404 not found when connection is not found', async () => {
      const response = await request(app).get(`/credentials/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`)

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Delete credential by id', () => {
    test('should give 404 not found when credential is not found', async () => {
      const response = await request(app).delete('/credentials/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa')

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Propose a credential', () => {
    test('should return credential record', async () => {
      const spy = jest.spyOn(bobAgent.credentials, 'proposeCredential').mockResolvedValueOnce(testCredential)
      const getResult = (): Promise<CredentialExchangeRecord> => spy.mock.results[0].value

      const proposalRequest = {
        connectionId: '000000aa-aa00-00a0-aa00-000a0aa00000',
        protocolVersion: 'v1',
        credentialFormats: {
          indy: {
            credentialDefinitionId: 'WghBqNdoFjaYh6F5N9eBF:3:CL:3210:test',
            issuerDid: 'WghBqNdoFjaYh6F5N9eBF',
            schemaId: 'WgWxqztrNooG92RXvxSTWv:2:test:1.0',
            schemaIssuerDid: 'WghBqNdoFjaYh6F5N9eBF',
            schemaName: 'test',
            schemaVersion: '1.0',
            attributes: [
              {
                name: 'name',
                value: 'test',
              },
            ],
          },
        },
      }

      const response = await request(app).post(`/credentials/propose-credential`).send(proposalRequest)
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(objectToJson(result))
    })

    test('should give 404 not found when connection is not found', async () => {
      const response = await request(app).post('/credentials/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/accept-offer')

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Accept a credential proposal', () => {
    test('should return credential record', async () => {
      const spy = jest.spyOn(bobAgent.credentials, 'acceptProposal').mockResolvedValueOnce(testCredential)
      const getResult = (): Promise<CredentialExchangeRecord> => spy.mock.results[0].value

      const proposalRequest = {
        credentialFormats: {
          indy: {
            credentialDefinitionId: 'WghBqNdoFjaYh6F5N9eBF:3:CL:3210:test',
            issuerDid: 'WghBqNdoFjaYh6F5N9eBF',
            schemaId: 'WgWxqztrNooG92RXvxSTWv:2:test:1.0',
            schemaIssuerDid: 'WghBqNdoFjaYh6F5N9eBF',
            schemaName: 'test',
            schemaVersion: '1.0',
            attributes: [
              {
                name: 'name',
                value: 'test',
              },
            ],
          },
        },
        autoAcceptCredential: 'always',
        comment: 'test',
      }

      const response = await request(app)
        .post(`/credentials/${testCredential.id}/accept-proposal`)
        .send(proposalRequest)

      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(spy).toHaveBeenCalledWith({ ...proposalRequest, credentialRecordId: testCredential.id })
      expect(response.body).toEqual(objectToJson(result))
    })

    test('should work without optional parameters', async () => {
      const spy = jest.spyOn(bobAgent.credentials, 'acceptProposal').mockResolvedValueOnce(testCredential)
      const getResult = (): Promise<CredentialExchangeRecord> => spy.mock.results[0].value

      const response = await request(app).post(`/credentials/${testCredential.id}/accept-proposal`)

      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(objectToJson(result))
    })

    test('should give 404 not found when credential is not found', async () => {
      const response = await request(app).post(`/credentials/000000aa-aa00-00a0-aa00-000a0aa00000/accept-proposal`)

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Offer a credential', () => {
    const offerRequest = {
      connectionId: '000000aa-aa00-00a0-aa00-000a0aa00000',
      protocolVersion: 'v1',
      credentialFormats: {
        indy: {
          credentialDefinitionId: 'WghBqNdoFjaYh6F5N9eBF:3:CL:3210:test',
          attributes: [
            {
              name: 'name',
              value: 'test',
            },
          ],
        },
      },
    }

    test('should return credential record', async () => {
      const spy = jest.spyOn(bobAgent.credentials, 'offerCredential').mockResolvedValueOnce(testCredential)
      const getResult = (): Promise<CredentialExchangeRecord> => spy.mock.results[0].value

      const response = await request(app).post(`/credentials/offer-credential`).send(offerRequest)
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(objectToJson(result))
    })

    test('should give 404 not found when connection is not found', async () => {
      const response = await request(app)
        .post('/credentials/accept-offer')
        .send({ credentialRecordId: 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa' })

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Accept a credential offer', () => {
    test('should return credential record', async () => {
      const spy = jest.spyOn(bobAgent.credentials, 'acceptOffer').mockResolvedValueOnce(testCredential)
      const getResult = (): Promise<CredentialExchangeRecord> => spy.mock.results[0].value

      const response = await request(app).post(`/credentials/${testCredential.id}/accept-offer`)
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(spy).toHaveBeenCalledWith({ credentialRecordId: testCredential.id })
      expect(response.body).toEqual(objectToJson(result))
    })

    test('should give 404 not found when credential is not found', async () => {
      const response = await request(app).post('/credentials/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/accept-offer')

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Accept a credential request', () => {
    test('should return credential record', async () => {
      const spy = jest.spyOn(bobAgent.credentials, 'acceptRequest').mockResolvedValueOnce(testCredential)
      const getResult = (): Promise<CredentialExchangeRecord> => spy.mock.results[0].value

      const response = await request(app).post(`/credentials/${testCredential.id}/accept-request`)
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(spy).toHaveBeenCalledWith({ credentialRecordId: testCredential.id })
      expect(response.body).toEqual(objectToJson(result))
    })

    test('should give 404 not found when credential is not found', async () => {
      const response = await request(app).post('/credentials/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/accept-request')

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Accept a credential', () => {
    test('should return credential record', async () => {
      const spy = jest.spyOn(bobAgent.credentials, 'acceptCredential').mockResolvedValueOnce(testCredential)
      const getResult = (): Promise<CredentialExchangeRecord> => spy.mock.results[0].value

      const response = await request(app).post(`/credentials/${testCredential.id}/accept-credential`)
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(spy).toHaveBeenCalledWith({ credentialRecordId: testCredential.id })
      expect(response.body).toEqual(objectToJson(result))
    })

    test('should give 404 not found when credential is not found', async () => {
      const response = await request(app).post('/credentials/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/accept-credential')

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
