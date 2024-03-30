import type { RestRootAgent } from '../../../utils/agent'

import express from 'express'
import request from 'supertest'

import { getTestAgent } from '../../../../tests/utils/helpers'
import { setupApp } from '../../../setup/setupApp'

import { testAnonCredsCredentialDefinition, testAnonCredsSchema } from './fixtures'

describe('AnonCredsController', () => {
  const app = express()
  let agent: RestRootAgent

  beforeAll(async () => {
    agent = await getTestAgent('AnonCredsController REST Agent Test')
    await setupApp({ agent, adminPort: 3000, baseApp: app })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await agent.shutdown()
    await agent.wallet.delete()
  })

  describe('get schema by id', () => {
    test('should return schema', async () => {
      // FIXME: we need to encode the schema-id to make it work ....
      const response = await request(app).get(`/anoncreds/schemas/${encodeURIComponent(testAnonCredsSchema.schemaId)}`)

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({
        ...testAnonCredsSchema,
        schemaMetadata: {},
        resolutionMetadata: {},
      })
    })

    test('should return 400 BadRequest when id has invalid anoncreds method', async () => {
      const response = await request(app).get(`/anoncreds/schemas/x`)

      expect(response.statusCode).toBe(400)
      expect(response.body).toEqual({
        resolutionMetadata: {
          error: 'unsupportedAnonCredsMethod',
          message: 'Unable to resolve schema x: No registry found for identifier x',
        },
        schemaId: 'x',
        schemaMetadata: {},
      })
    })

    test('should return 404 NotFound when schema not found', async () => {
      const response = await request(app).get(`/anoncreds/schemas/uri:random-id`)

      expect(response.statusCode).toBe(404)
      expect(response.body).toEqual({
        resolutionMetadata: {
          error: 'notFound',
          message: 'Schema not found',
        },
        schemaId: 'uri:random-id',
        schemaMetadata: {},
      })
    })
  })

  describe('create schema', () => {
    test('should return created schema ', async () => {
      const response = await request(app).post(`/anoncreds/schemas`).send({
        schema: testAnonCredsSchema.schema,
      })

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({
        schemaState: {
          state: 'finished',
          ...testAnonCredsSchema,
        },
        registrationMetadata: {},
        schemaMetadata: {},
      })
    })

    test('should return 422 when props missing ', async () => {
      const response = await request(app)
        .post(`/anoncreds/schemas`)
        .send({
          ...testAnonCredsSchema.schema,
          issuerId: undefined,
        })

      expect(response.statusCode).toBe(422)
    })
  })

  describe('get credential definition by id', () => {
    test('should return credential definition ', async () => {
      const response = await request(app).get(
        `/anoncreds/credential-definitions/${encodeURIComponent(testAnonCredsCredentialDefinition.credentialDefinitionId)}`,
      )

      // expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({
        ...testAnonCredsCredentialDefinition,
        credentialDefinitionMetadata: {},
        resolutionMetadata: {},
      })
    })

    test('should return 400 BadRequest when id has invalid structure', async () => {
      jest.spyOn(agent.modules.anoncreds, 'getCredentialDefinition').mockResolvedValueOnce({
        credentialDefinitionId: 'x',
        credentialDefinitionMetadata: {},
        resolutionMetadata: {
          error: 'invalid',
        },
      })

      const response = await request(app).get(`/anoncreds/credential-definitions/x`)
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

      const response = await request(app).get(`/anoncreds/credential-definitions/x`)
      expect(response.statusCode).toBe(400)
    })

    test('should return 404 NotFound when credential definition not found', async () => {
      jest.spyOn(agent.modules.anoncreds, 'getCredentialDefinition').mockResolvedValueOnce({
        credentialDefinitionId: 'x',
        credentialDefinitionMetadata: {},
        resolutionMetadata: {
          error: 'notFound',
        },
      })
      const response = await request(app).get(`/anoncreds/credential-definitions/WgWxqztrNooG92RXvxSTWv:3:CL:20:tag`)
      expect(response.statusCode).toBe(404)
    })
  })

  describe('create credential definition', () => {
    test('should return created credential definition ', async () => {
      jest.spyOn(agent.modules.anoncreds, 'registerCredentialDefinition').mockResolvedValueOnce({
        credentialDefinitionState: {
          state: 'finished',
          credentialDefinition: testAnonCredsCredentialDefinition.credentialDefinition,
          credentialDefinitionId: testAnonCredsCredentialDefinition.credentialDefinitionId,
        },
        credentialDefinitionMetadata: {},
        registrationMetadata: {},
      })

      jest.spyOn(agent.modules.anoncreds, 'getSchema').mockResolvedValueOnce({
        resolutionMetadata: {},
        schemaMetadata: {},
        schemaId: testAnonCredsSchema.schemaId,
        schema: testAnonCredsSchema.schema,
      })

      const response = await request(app)
        .post(`/anoncreds/credential-definitions`)
        .send({
          credentialDefinition: {
            issuerId: testAnonCredsCredentialDefinition.credentialDefinition.issuerId,
            schemaId: testAnonCredsCredentialDefinition.credentialDefinition.schemaId,
            tag: testAnonCredsCredentialDefinition.credentialDefinition.tag,
          },
          options: {
            supportRevocation: false,
          },
        })

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({
        credentialDefinitionState: {
          state: 'finished',
          ...testAnonCredsCredentialDefinition,
        },
        registrationMetadata: {},
        credentialDefinitionMetadata: {},
      })
    })
  })
})
