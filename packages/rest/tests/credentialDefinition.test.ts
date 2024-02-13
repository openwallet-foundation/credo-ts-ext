import type { RestAgent } from '../src/utils/agent'
import type { AnonCredsCredentialDefinition, AnonCredsSchema } from '@credo-ts/anoncreds'
import type { Express } from 'express'

import request from 'supertest'

import { setupServer } from '../src/server'

import { getTestAgent, getTestCredDef, getTestSchema } from './utils/helpers'

describe('CredentialDefinitionController', () => {
  let app: Express
  let agent: RestAgent
  let testCredDef: AnonCredsCredentialDefinition
  let testSchema: AnonCredsSchema

  beforeAll(async () => {
    agent = await getTestAgent('CredentialDefinition REST Agent Test', 3011)
    app = await setupServer(agent, { port: 3000 })
    testCredDef = getTestCredDef()
    testSchema = getTestSchema()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('get credential definition by id', () => {
    test('should return credential definition ', async () => {
      jest.spyOn(agent.modules.anoncreds, 'getCredentialDefinition').mockResolvedValueOnce({
        credentialDefinitionId: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
        credentialDefinitionMetadata: {},
        resolutionMetadata: {},
        credentialDefinition: testCredDef,
      })
      const getResult = () => ({
        id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
        ...testCredDef,
      })

      const response = await request(app).get(`/credential-definitions/WgWxqztrNooG92RXvxSTWv:3:CL:20:tag`)
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(response.body.id).toEqual(result.id)
      expect(response.body.schemaId).toEqual(result.schemaId)
      expect(response.body.tag).toEqual(result.tag)
      expect(response.body.type).toEqual(result.type)
    })

    test('should return 400 BadRequest when id has invalid structure', async () => {
      jest.spyOn(agent.modules.anoncreds, 'getCredentialDefinition').mockResolvedValueOnce({
        credentialDefinitionId: 'x',
        credentialDefinitionMetadata: {},
        resolutionMetadata: {
          error: 'invalid',
        },
      })

      const response = await request(app).get(`/credential-definitions/x`)
      expect(response.statusCode).toBe(400)
    })

    test('should return 400 BadRequest when id has invalid anoncreds method', async () => {
      jest.spyOn(agent.modules.anoncreds, 'getCredentialDefinition').mockResolvedValueOnce({
        credentialDefinitionId: 'x',
        credentialDefinitionMetadata: {},
        resolutionMetadata: {
          error: 'unsupportedAnonCredsMethod',
        },
      })

      const response = await request(app).get(`/credential-definitions/x`)
      expect(response.statusCode).toBe(400)
    })

    test('should return 404 NotFound when credential definition not found', async () => {
      const response = await request(app).get(`/credential-definitions/WgWxqztrNooG92RXvxSTWv:3:CL:20:tag`)
      expect(response.statusCode).toBe(404)
    })
  })

  describe('create credential definition', () => {
    test('should return created credential definition ', async () => {
      jest.spyOn(agent.modules.anoncreds, 'registerCredentialDefinition').mockResolvedValueOnce({
        credentialDefinitionState: {
          state: 'finished',
          credentialDefinition: testCredDef,
          credentialDefinitionId: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
        },
        credentialDefinitionMetadata: {},
        registrationMetadata: {},
      })

      jest.spyOn(agent.modules.anoncreds, 'getSchema').mockResolvedValueOnce({
        resolutionMetadata: {},
        schemaMetadata: {},
        schemaId: 'WgWxqztrNooG92RXvxSTWv:2:test:1.0',
        schema: testSchema,
      })

      const getResult = () => ({
        id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
        ...testCredDef,
      })

      const response = await request(app).post(`/credential-definitions`).send({
        issuerId: testCredDef.issuerId,
        schemaId: testCredDef.schemaId,
        tag: testCredDef.tag,
      })

      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(response.body.id).toEqual(result.id)
      expect(response.body.schemaId).toEqual(result.schemaId)
      expect(response.body.tag).toEqual(result.tag)
      expect(response.body.type).toEqual(result.type)
    })

    // TODO: improve coverage

    test('should throw error when props missing ', async () => {
      const response = await request(app).post(`/credential-definitions`).send({
        schemaId: testCredDef.schemaId,
        tag: 'latest',
      })
      expect(response.statusCode).toBe(422)
    })
  })

  afterAll(async () => {
    await agent.shutdown()
    await agent.wallet.delete()
  })
})
