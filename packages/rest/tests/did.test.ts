import type { DidCreateOptions, ImportDidOptions } from '../src/controllers/types'
import type { Agent, DidCreateResult } from '@aries-framework/core'
import type { Server } from 'net'

import { KeyType } from '@aries-framework/core'
import request from 'supertest'

import { startServer } from '../src'

import { getTestAgent, getTestDidDocument, getTestDidCreate, objectToJson } from './utils/helpers'

describe('DidController', () => {
  let app: Server
  let aliceAgent: Agent
  let testDidDocument: Record<string, unknown>
  let testDidCreate: DidCreateResult

  beforeAll(async () => {
    aliceAgent = await getTestAgent('Did REST Agent Test Alice', 3999)
    app = await startServer(aliceAgent, { port: 3000 })

    testDidDocument = getTestDidDocument()
    testDidCreate = getTestDidCreate()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Get did resolution result by did', () => {
    test('should give 200 when did resolution record is found', async () => {
      const did = 'did:key:z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL'
      const response = await request(app).get(`/dids/${did}`)

      expect(response.statusCode).toBe(200)
      expect(response.body.didDocument).toEqual(testDidDocument)
    })

    test('should give 500 when did document record is not found', async () => {
      const response = await request(app).get(`/dids/did:key:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`)
      expect(response.statusCode).toBe(500)
    })
  })

  describe('Import Did', () => {
    test('should return did document after importing Did', async () => {
      const importRequest: ImportDidOptions = { did: 'did:key:z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL' }
      const response = await request(app).post(`/dids/import`).send(importRequest)

      expect(response.statusCode).toBe(200)
      expect(response.body.didDocument).toEqual(testDidDocument)
    })

    test('should give 400 for an invalid Did', async () => {
      const importRequest: ImportDidOptions = { did: 'did:key:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' }
      const response = await request(app).post(`/dids/import`).send(importRequest)

      expect(response.statusCode).toBe(400)
    })
  })

  describe('Create Did', () => {
    const createRequest: DidCreateOptions = {
      method: 'key',
      options: {
        keyType: KeyType.Ed25519,
      },
    }

    test('should return did document after creating Did', async () => {
      const spy = jest.spyOn(aliceAgent.dids, 'create').mockResolvedValueOnce(testDidCreate)
      const getResult = (): Promise<DidCreateResult> => spy.mock.results[0].value

      const response = await request(app).post(`/dids/create`).send(createRequest)

      expect(spy).toHaveBeenCalledWith(createRequest)

      expect(response.statusCode).toBe(200)

      const result = await getResult()
      expect(response.body).toEqual(objectToJson(result.didState))
    })

    test('should give 400 for an invalid Did method', async () => {
      const createRequest: DidCreateOptions = {
        method: 'foo',
        options: {
          keyType: KeyType.Ed25519,
        },
      }
      const response = await request(app).post(`/dids/create`).send(createRequest)
      expect(response.statusCode).toBe(500)
    })
  })

  afterAll(async () => {
    await aliceAgent.shutdown()
    await aliceAgent.wallet.delete()
    app.close()
  })
})
