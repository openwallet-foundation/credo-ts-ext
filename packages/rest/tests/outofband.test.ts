import type { Agent, OutOfBandRecord, ConnectionRecord, OutOfBandInvitation } from '@aries-framework/core'
import type { Express } from 'express'

import { JsonTransformer, AgentMessage } from '@aries-framework/core'
import request from 'supertest'

import { setupServer } from '../src/server'

import {
  getTestAgent,
  getTestConnection,
  getTestOutOfBandInvitation,
  getTestOutOfBandRecord,
  objectToJson,
} from './utils/helpers'

describe('OutOfBandController', () => {
  let app: Express
  let aliceAgent: Agent
  let bobAgent: Agent
  let outOfBandRecord: OutOfBandRecord
  let outOfBandInvitation: OutOfBandInvitation
  let connectionRecord: ConnectionRecord

  beforeAll(async () => {
    aliceAgent = await getTestAgent('OutOfBand REST Agent Test Alice', 3014)
    bobAgent = await getTestAgent('OutOfBand REST Agent Test Bob', 3015)
    app = await setupServer(bobAgent, { port: 3000 })
    outOfBandRecord = getTestOutOfBandRecord()
    outOfBandInvitation = getTestOutOfBandInvitation()
    connectionRecord = getTestConnection()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Get all out of band records', () => {
    test('should return all out of band records', async () => {
      const spy = jest.spyOn(bobAgent.oob, 'getAll')
      const getResult = (): Promise<OutOfBandRecord[]> => spy.mock.results[0].value

      const response = await request(app).get('/oob')
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(result.map(objectToJson))
    })
    test('should return filtered out of band records if query is passed', async () => {
      jest.spyOn(bobAgent.oob, 'getAll').mockResolvedValueOnce([outOfBandRecord])
      const response = await request(app).get('/oob?invitationId=test')

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual([])
    })
  })

  describe('Get out of band record by id', () => {
    test('should return out of band record with correct id', async () => {
      const spy = jest.spyOn(bobAgent.oob, 'findById').mockResolvedValueOnce(outOfBandRecord)
      const getResult = (): Promise<OutOfBandRecord> => spy.mock.results[0].value

      const response = await request(app).get(`/oob/${outOfBandRecord.id}`)

      expect(response.statusCode).toBe(200)
      expect(spy).toHaveBeenCalledWith(outOfBandRecord.id)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })
    test('should return 404 if out of band record is not found', async () => {
      const response = await request(app).get(`/oob/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`)

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Create out of band invitation', () => {
    test('should return out of band invitation', async () => {
      jest.spyOn(bobAgent.oob, 'createInvitation').mockResolvedValueOnce(outOfBandRecord)

      const response = await request(app).post('/oob/create-invitation')

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({
        invitationUrl: outOfBandRecord.outOfBandInvitation.toUrl({
          domain: bobAgent.config.endpoints[0],
        }),
        invitation: outOfBandRecord.outOfBandInvitation.toJSON({
          useLegacyDidSovPrefix: bobAgent.config.useLegacyDidSovPrefix,
        }),
        outOfBandRecord: outOfBandRecord.toJSON(),
      })
    })
    test('should use parameters', async () => {
      const spy = jest.spyOn(bobAgent.oob, 'createInvitation').mockResolvedValueOnce(outOfBandRecord)

      // todo: add tests for routing param
      const params = {
        label: 'string',
        alias: 'string',
        imageUrl: 'string',
        goalCode: 'string',
        goal: 'string',
        handshake: true,
        handshakeProtocols: ['https://didcomm.org/connections/1.0'],
        multiUseInvitation: true,
        autoAcceptConnection: true,
      }
      const response = await request(app).post('/oob/create-invitation').send(params)

      expect(response.statusCode).toBe(200)
      expect(spy).toHaveBeenCalledWith(params)
    })
  })

  describe('Create legacy invitation', () => {
    test('should return out of band invitation', async () => {
      jest.spyOn(bobAgent.oob, 'createLegacyInvitation').mockResolvedValueOnce({
        outOfBandRecord: outOfBandRecord,
        invitation: outOfBandInvitation,
      })

      const response = await request(app).post('/oob/create-legacy-invitation')

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({
        invitationUrl: outOfBandInvitation.toUrl({
          domain: bobAgent.config.endpoints[0],
        }),
        invitation: outOfBandInvitation.toJSON({
          useLegacyDidSovPrefix: bobAgent.config.useLegacyDidSovPrefix,
        }),
        outOfBandRecord: outOfBandRecord.toJSON(),
      })
    })
    test('should use parameters', async () => {
      const spy = jest.spyOn(bobAgent.oob, 'createLegacyInvitation').mockResolvedValueOnce({
        outOfBandRecord: outOfBandRecord,
        invitation: outOfBandInvitation,
      })

      const params = {
        label: 'string',
        alias: 'string',
        imageUrl: 'string',
        multiUseInvitation: true,
        autoAcceptConnection: true,
      }
      const response = await request(app).post('/oob/create-legacy-invitation').send(params)

      expect(response.statusCode).toBe(200)
      expect(spy).toHaveBeenCalledWith(params)
    })
  })

  describe('Create legacy connectionless invitation', () => {
    const msg = JsonTransformer.fromJSON(
      {
        '@id': 'eac4ff4e-b4fb-4c1d-aef3-b29c89d1cc00',
        '@type': 'https://didcomm.org/connections/1.0/invitation',
      },
      AgentMessage
    )

    const inputParams = {
      domain: 'string',
      message: {
        '@id': 'eac4ff4e-b4fb-4c1d-aef3-b29c89d1cc00',
        '@type': 'https://didcomm.org/connections/1.0/invitation',
      },
      recordId: 'string',
    }

    test('should return out of band invitation', async () => {
      const spy = jest.spyOn(bobAgent.oob, 'createLegacyConnectionlessInvitation').mockResolvedValueOnce({
        message: msg,
        invitationUrl: 'https://example.com/invitation',
      })

      const getResult = (): Promise<OutOfBandRecord> => spy.mock.results[0].value

      const response = await request(app).post('/oob/create-legacy-connectionless-invitation').send(inputParams)

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })
    test('should use parameters', async () => {
      const spy = jest.spyOn(bobAgent.oob, 'createLegacyConnectionlessInvitation').mockResolvedValueOnce({
        message: msg,
        invitationUrl: 'https://example.com/invitation',
      })

      const response = await request(app).post('/oob/create-legacy-connectionless-invitation').send(inputParams)

      expect(response.statusCode).toBe(200)
      expect(spy).toHaveBeenCalledWith({
        ...inputParams,
        message: msg,
      })
    })
  })

  describe('Receive out of band invitation', () => {
    test('should return out of band invitation', async () => {
      const spy = jest.spyOn(bobAgent.oob, 'receiveInvitation').mockResolvedValueOnce({
        outOfBandRecord: outOfBandRecord,
        connectionRecord: connectionRecord,
      })
      const getResult = (): Promise<OutOfBandRecord> => spy.mock.results[0].value

      const response = await request(app)
        .post('/oob/receive-invitation')
        .send({ invitation: outOfBandRecord.outOfBandInvitation })

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })
    test('should use parameters', async () => {
      const spy = jest.spyOn(bobAgent.oob, 'receiveInvitation').mockResolvedValueOnce({
        outOfBandRecord: outOfBandRecord,
        connectionRecord: connectionRecord,
      })

      // todo: add tests for routing param
      const params = {
        label: 'test',
        alias: 'test',
        imageUrl: 'test',
        autoAcceptInvitation: false,
        autoAcceptConnection: false,
        reuseConnection: false,
      }

      const response = await request(app)
        .post('/oob/receive-invitation')
        .send({
          invitation: outOfBandInvitation,
          ...params,
        })

      expect(response.statusCode).toBe(200)
      expect(spy).toHaveBeenCalledWith(
        expect.anything(),
        expect.objectContaining({
          label: params.label,
          alias: params.alias,
          imageUrl: params.imageUrl,
          autoAcceptInvitation: params.autoAcceptInvitation,
          autoAcceptConnection: params.autoAcceptConnection,
          reuseConnection: params.reuseConnection,
        })
      )
    })
  })

  describe('Receive out of band invitation by url', () => {
    test('should return out of band invitation', async () => {
      const spy = jest.spyOn(bobAgent.oob, 'receiveInvitationFromUrl').mockResolvedValueOnce({
        outOfBandRecord: outOfBandRecord,
        connectionRecord: connectionRecord,
      })
      const getResult = (): Promise<OutOfBandRecord> => spy.mock.results[0].value

      const response = await request(app)
        .post('/oob/receive-invitation-url')
        .send({ invitationUrl: 'https://example.com/test' })

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })
    test('should use parameters', async () => {
      const spy = jest.spyOn(bobAgent.oob, 'receiveInvitationFromUrl').mockResolvedValueOnce({
        outOfBandRecord: outOfBandRecord,
        connectionRecord: connectionRecord,
      })

      // todo: add tests for routing param
      const params = {
        label: 'test',
        alias: 'test',
        imageUrl: 'test',
        autoAcceptInvitation: false,
        autoAcceptConnection: false,
        reuseConnection: false,
      }

      const response = await request(app)
        .post('/oob/receive-invitation-url')
        .send({ invitationUrl: 'https://example.com/test', ...params })

      expect(response.statusCode).toBe(200)
      expect(spy).toHaveBeenCalledWith(
        expect.stringMatching('https://example.com/test'),
        expect.objectContaining({
          label: params.label,
          alias: params.alias,
          imageUrl: params.imageUrl,
          autoAcceptInvitation: params.autoAcceptInvitation,
          autoAcceptConnection: params.autoAcceptConnection,
          reuseConnection: params.reuseConnection,
        })
      )
    })
  })

  describe('Accept out of band invitation', () => {
    test('should return record from accepted invitation', async () => {
      const spy = jest.spyOn(bobAgent.oob, 'acceptInvitation').mockResolvedValueOnce({
        outOfBandRecord: outOfBandRecord,
        connectionRecord: connectionRecord,
      })
      const getResult = (): Promise<OutOfBandRecord> => spy.mock.results[0].value

      // todo: add tests for routing param
      const params = {
        autoAcceptConnection: false,
        reuseConnection: false,
        label: 'test',
        alias: 'test',
        imageUrl: 'test',
        mediatorId: 'test',
      }

      const response = await request(app)
        .post('/oob/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/accept-invitation')
        .send(params)

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })
    test('should use parameters', async () => {
      const spy = jest.spyOn(bobAgent.oob, 'acceptInvitation').mockResolvedValueOnce({
        outOfBandRecord: outOfBandRecord,
        connectionRecord: connectionRecord,
      })

      // todo: add tests for routing param
      const params = {
        autoAcceptConnection: false,
        reuseConnection: false,
        label: 'test',
        alias: 'test',
        imageUrl: 'test',
        mediatorId: 'test',
      }

      const response = await request(app)
        .post('/oob/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/accept-invitation')
        .send(params)

      expect(response.statusCode).toBe(200)
      expect(spy).toHaveBeenCalledWith('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', params)
    })
    test('should throw 404 if out of band record is not found', async () => {
      const response = await request(app).post('/oob/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/accept-invitation')

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Delete out of band record', () => {
    test('should return 204 if record is successfully deleted', async () => {
      jest.spyOn(bobAgent.oob, 'deleteById').mockResolvedValueOnce()

      const response = await request(app).delete('/oob/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa')

      expect(response.statusCode).toBe(204)
    })
  })

  afterAll(async () => {
    await aliceAgent.shutdown()
    await aliceAgent.wallet.delete()
    await bobAgent.shutdown()
    await bobAgent.wallet.delete()
  })
})
