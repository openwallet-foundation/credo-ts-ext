import type { RestAgent } from '../src/utils/agent'
import type { AnonCredsSchema } from '@aries-framework/anoncreds'
import type { Express } from 'express'

import request from 'supertest'

import { setupServer } from '../src/server'

import { getTestAgent, getTestSchema } from './utils/helpers'

describe('SchemaController', () => {
  let app: Express
  let agent: RestAgent
  let testSchema: AnonCredsSchema

  beforeAll(async () => {
    agent = await getTestAgent('Schema REST Agent Test', 3021)
    app = await setupServer(agent, { port: 3000 })
    testSchema = getTestSchema()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('get schema by id', () => {
    test('should return schema', async () => {
      jest.spyOn(agent.modules.anoncreds, 'getSchema').mockResolvedValueOnce({
        schemaId: 'WgWxqztrNooG92RXvxSTWv:2:test:1.0',
        schema: testSchema,
        schemaMetadata: {},
        resolutionMetadata: {},
      })

      const getResult = () => ({
        id: 'WgWxqztrNooG92RXvxSTWv:2:test:1.0',
        ...testSchema,
      })

      const response = await request(app).get(`/schemas/WgWxqztrNooG92RXvxSTWv:2:test:1.0`)
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(result)
    })

    test('should return 400 BadRequest when id has invalid anoncreds method', async () => {
      jest.spyOn(agent.modules.anoncreds, 'getSchema').mockResolvedValueOnce({
        resolutionMetadata: {
          error: 'invalid',
        },
        schemaId: 'x',
        schemaMetadata: {},
      })

      const response = await request(app).get(`/schemas/x`)

      expect(response.statusCode).toBe(400)
    })

    test('should return 400 BadRequest when id has invalid structure', async () => {
      jest.spyOn(agent.modules.anoncreds, 'getSchema').mockResolvedValueOnce({
        resolutionMetadata: {
          error: 'unsupportedAnonCredsMethod',
        },
        schemaId: 'x',
        schemaMetadata: {},
      })

      const response = await request(app).get(`/schemas/x`)

      expect(response.statusCode).toBe(400)
    })

    test('should return 404 NotFound when schema not found', async () => {
      jest.spyOn(agent.modules.anoncreds, 'getSchema').mockResolvedValueOnce({
        resolutionMetadata: {
          error: 'notFound',
        },
        schemaId: 'x',
        schemaMetadata: {},
      })

      const response = await request(app).get(`/schemas/WgWxqztrNooG92RXvxSTWv:2:test:1.0`)

      expect(response.statusCode).toBe(404)
    })
  })

  describe('create schema', () => {
    test('should return created schema ', async () => {
      jest.spyOn(agent.modules.anoncreds, 'registerSchema').mockResolvedValueOnce({
        schemaState: {
          state: 'finished',
          schema: testSchema,
          schemaId: 'WgWxqztrNooG92RXvxSTWv:2:test:1.0',
        },
        registrationMetadata: {},
        schemaMetadata: {},
      })
      const getResult = () => ({
        id: 'WgWxqztrNooG92RXvxSTWv:2:test:1.0',
        ...testSchema,
      })

      const response = await request(app).post(`/schemas/`).send(testSchema)

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(await getResult())
    })

    test('should return 422 when props missing ', async () => {
      const omitted = {
        name: testSchema.name,
        version: testSchema.version,
        attrNames: testSchema.attrNames,
      }
      const response = await request(app).post(`/schemas`).send(omitted)

      expect(response.statusCode).toBe(422)
    })
  })

  afterAll(async () => {
    await agent.shutdown()
    await agent.wallet.delete()
  })
})
