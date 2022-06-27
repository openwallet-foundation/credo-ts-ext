import type { Agent } from '@aries-framework/core'
import type { Express } from 'express'
import type { Schema } from 'indy-sdk'

import request from 'supertest'

import { setupServer } from '../src/server'

import { getTestAgent } from './utils/helpers'
describe('AgentController', () => {
  let app: Express
  let agent: Agent

  beforeAll(async () => {
    agent = await getTestAgent('Schema REST Agent Test', 3021)
    app = await setupServer(agent, { port: 3000 })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('get schema by id', () => {
    test('should return schema ', async () => {
      const spy = jest.spyOn(agent.ledger, 'getSchema').mockResolvedValueOnce({
        id: 'WgWxqztrNooG92RXvxSTWv:2:test:1.0',
        name: 'test',
        version: '1.0',
        ver: '1.0',
        seqNo: 9999,
        attrNames: ['prop1', 'prop2'],
      })
      const getResult = (): Promise<Schema> => spy.mock.results[0].value

      const response = await request(app).get(`/schemas/WgWxqztrNooG92RXvxSTWv:2:test:1.0`)
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(result)
    })

    test('should return 400 BadRequest when id has invalid structure', async () => {
      const response = await request(app).get(`/schemas/x`)

      expect(response.statusCode).toBe(400)
    })

    test('should return 404 NotFound when schema not found', async () => {
      const response = await request(app).get(`/schemas/WgWxqztrNooG92RXvxSTWv:2:test:1.0`)

      expect(response.statusCode).toBe(404)
    })
  })

  describe('create schema', () => {
    test('should return created schema ', async () => {
      const spy = jest.spyOn(agent.ledger, 'registerSchema').mockResolvedValueOnce({
        id: 'WgWxqztrNooG92RXvxSTWv:2:test:1.0',
        name: 'test',
        version: '1.0',
        ver: '1.0',
        seqNo: 9999,
        attrNames: ['prop1', 'prop2'],
      })
      const getResult = (): Promise<Schema> => spy.mock.results[0].value

      const response = await request(app)
        .post(`/schemas/`)
        .send({
          name: 'test',
          version: '1.0',
          attributes: ['prop1', 'prop2'],
        })

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(await getResult())
    })

    test('should throw error when props missing ', async () => {
      const response = await request(app).post(`/schemas`).send({
        name: 'string',
        version: '1.0',
      })

      expect(response.statusCode).toBe(422)
    })
  })

  afterAll(async () => {
    await agent.shutdown()
    await agent.wallet.delete()
  })
})
