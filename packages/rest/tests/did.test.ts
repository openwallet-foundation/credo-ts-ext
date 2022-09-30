import type { Agent, DidResolutionResult } from '@aries-framework/core'
import type { Server } from 'net'

import request from 'supertest'

import { startServer } from '../src'

import { getTestAgent, getTestDidRecord, objectToJson } from './utils/helpers'

describe('DidController', () => {
  let app: Server
  let aliceAgent: Agent
  let didRecord: DidResolutionResult

  beforeAll(async () => {
    aliceAgent = await getTestAgent('Connection REST Agent Test Alice', 3999)
    app = await startServer(aliceAgent, { port: 3000 })
    didRecord = await objectToJson(getTestDidRecord())
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Get did resolution result by did', () => {
    test('should return did resolution record', async () => {
      const spy = jest.spyOn(aliceAgent.dids, 'resolve').mockResolvedValueOnce(didRecord)
      const getResult = (): Promise<DidResolutionResult> => spy.mock.results[0].value

      const response = await request(app).get(`/dids/${didRecord.didDocument?.id}`)
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(spy).toHaveBeenCalledWith(didRecord.didDocument?.id)
      expect(response.body).toEqual(objectToJson(result))
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
