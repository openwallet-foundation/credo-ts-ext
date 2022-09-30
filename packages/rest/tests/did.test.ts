import type { Agent } from '@aries-framework/core'
import type { Server } from 'net'

import request from 'supertest'

import { startServer } from '../src'

import { getTestAgent } from './utils/helpers'

describe('DidController', () => {
  let app: Server
  let aliceAgent: Agent

  beforeAll(async () => {
    aliceAgent = await getTestAgent('Connection REST Agent Test Alice', 3999)
    app = await startServer(aliceAgent, { port: 3000 })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Get did resolution result by did', () => {
    test('should give 200 when did resolution record is found', async () => {
      const response = await request(app).get(`/dids/did:key:z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL`)

      expect(response.statusCode).toBe(200)
    })

    test('should give 500 when did resolution record is not found', async () => {
      const response = await request(app).get(`/dids/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`)

      expect(response.statusCode).toBe(500)
    })
  })

  afterAll(async () => {
    await aliceAgent.shutdown()
    await aliceAgent.wallet.delete()
    app.close()
  })
})
