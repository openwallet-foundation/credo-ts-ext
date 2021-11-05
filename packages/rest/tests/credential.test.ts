import type { Agent, CredentialRecord, OfferCredentialMessage } from '@aries-framework/core'
import type { Express } from 'express'

import request from 'supertest'

import { setupServer } from '../src/server'

import { objectToJson, getTestCredential, getTestAgent, getTestCredentialOfferMsg } from './utils/helpers'

describe('CredentialController', () => {
  let app: Express
  let aliceAgent: Agent
  let bobAgent: Agent
  let testCredential: CredentialRecord
  let testCredentialOfferMsg: OfferCredentialMessage

  beforeAll(async () => {
    aliceAgent = await getTestAgent('Rest Credential Test Alice', 3005)
    bobAgent = await getTestAgent('Rest Credential Test Bob', 3006)
    app = await setupServer(bobAgent, { port: 3000 })

    testCredential = getTestCredential()
    testCredentialOfferMsg = getTestCredentialOfferMsg()
  })

  describe('Get all credentials', () => {
    test('should return all credentials', async () => {
      const spy = jest.spyOn(bobAgent.credentials, 'getAll').mockResolvedValueOnce([testCredential])

      const getResult = (): Promise<CredentialRecord[]> => spy.mock.results[0].value

      const response = await request(app).get('/credentials')
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(result.map(objectToJson))
    })
  })

  describe('Get credential by id', () => {
    test('should return credential', async () => {
      const spy = jest.spyOn(bobAgent.credentials, 'getById').mockResolvedValueOnce(testCredential)

      const getResult = (): Promise<CredentialRecord> => spy.mock.results[0].value

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
      const getResult = (): Promise<CredentialRecord> => spy.mock.results[0].value

      const proposalReq = {
        connectionId: '000000aa-aa00-00a0-aa00-000a0aa00000',
        credentialDefinitionId: 'WghBqNdoFjaYh6F5N9eBF:3:CL:3210:test',
        issuerDid: 'WghBqNdoFjaYh6F5N9eBF',
        schemaId: 'WgWxqztrNooG92RXvxSTWv:2:test:1.0',
        schemaIssuerDid: 'WghBqNdoFjaYh6F5N9eBF',
        schemaName: 'test',
        schemaVersion: '1.0',
        credentialProposal: {
          '@type': 'https://didcomm.org/issue-credential/1.0/credential-preview',
          attributes: [
            {
              'mime-type': 'text/plain',
              name: 'name',
              value: 'test',
            },
          ],
        },
      }

      const response = await request(app).post(`/credentials/propose-credential`).send(proposalReq)
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      // TODO: Fix -> expect(spy).toHaveBeenCalledWith(conId, proposalReq)
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
      const getResult = (): Promise<CredentialRecord> => spy.mock.results[0].value

      const proposalReq = {
        credentialDefinitionId: 'WghBqNdoFjaYh6F5N9eBF:3:CL:3210:test',
        autoAcceptCredential: 'always',
        comment: 'test',
      }
      const response = await request(app).post(`/credentials/${testCredential.id}/accept-proposal`).send(proposalReq)
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(spy).toHaveBeenCalledWith(testCredential.id, proposalReq)
      expect(response.body).toEqual(objectToJson(result))
    })
    test('should work without optional parameters', async () => {
      const spy = jest.spyOn(bobAgent.credentials, 'acceptProposal').mockResolvedValueOnce(testCredential)
      const getResult = (): Promise<CredentialRecord> => spy.mock.results[0].value

      const response = await request(app).post(`/credentials/${testCredential.id}/accept-proposal`)
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(objectToJson(result))
    })
    test('should give 404 not found when credential is not found', async () => {
      const response = await request(app).post(`/credentials/${testCredential.id}/accept-proposal`)

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Offer a credential', () => {
    const proposalReq = {
      connectionId: '000000aa-aa00-00a0-aa00-000a0aa00000',
      credentialDefinitionId: 'WghBqNdoFjaYh6F5N9eBF:3:CL:3210:test',
      credentialProposal: {
        '@type': 'https://didcomm.org/issue-credential/1.0/credential-preview',
        attributes: [
          {
            'mime-type': 'text/plain',
            name: 'name',
            value: 'test',
          },
        ],
      },
    }
    test('should return credential record', async () => {
      const spy = jest.spyOn(bobAgent.credentials, 'offerCredential').mockResolvedValueOnce(testCredential)
      const getResult = (): Promise<CredentialRecord> => spy.mock.results[0].value

      const response = await request(app).post(`/credentials/offer-credential`).send(proposalReq)
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(objectToJson(result))
    })
    test('should give 404 not found when connection is not found', async () => {
      const response = await request(app)
        .post('/credentials/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/accept-offer')
        .send(proposalReq)

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Offer out of band credential', () => {
    const offerReq = {
      credentialDefinitionId: 'WghBqNdoFjaYh6F5N9eBF:3:CL:3210:test',
      credentialProposal: {
        '@type': 'https://didcomm.org/issue-credential/1.0/credential-preview',
        attributes: [
          {
            'mime-type': 'text/plain',
            name: 'name',
            value: 'test',
          },
        ],
      },
    }

    test('should return credential record', async () => {
      const spy = jest
        .spyOn(bobAgent.credentials, 'createOutOfBandOffer')
        .mockResolvedValueOnce({ offerMessage: testCredentialOfferMsg, credentialRecord: testCredential })
      const getResult = () => spy.mock.results[0].value

      const response = await request(app).post(`/credentials/offer-outofband-credential`).send(offerReq)
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(response.body.message).toBeDefined()
      expect(response.body.credentialRecord).toEqual(objectToJson(result.credentialRecord))
    })
  })

  describe('Accept a credential offer', () => {
    test('should return credential record', async () => {
      const spy = jest.spyOn(bobAgent.credentials, 'acceptOffer').mockResolvedValueOnce(testCredential)
      const getResult = (): Promise<CredentialRecord> => spy.mock.results[0].value

      const response = await request(app).post(`/credentials/${testCredential.id}/accept-offer`)
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(spy).toHaveBeenCalledWith(testCredential.id)
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
      const getResult = (): Promise<CredentialRecord> => spy.mock.results[0].value

      const response = await request(app).post(`/credentials/${testCredential.id}/accept-request`)
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(spy).toHaveBeenCalledWith(testCredential.id)
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
      const getResult = (): Promise<CredentialRecord> => spy.mock.results[0].value

      const response = await request(app).post(`/credentials/${testCredential.id}/accept-credential`)
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(spy).toHaveBeenCalledWith(testCredential.id)
      expect(response.body).toEqual(objectToJson(result))
    })
    test('should give 404 not found when credential is not found', async () => {
      const response = await request(app).post('/credentials/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/accept-credential')

      expect(response.statusCode).toBe(404)
    })
  })

  afterAll(async () => {
    await bobAgent.shutdown({ deleteWallet: true })
    await aliceAgent.shutdown({ deleteWallet: true })
  })
})
