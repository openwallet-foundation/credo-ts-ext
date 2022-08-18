import type { Agent, OutOfBandInvitation, OutOfBandRecord } from '@aries-framework/core'
import type { Express } from 'express'

import request from 'supertest'

import { setupServer } from '../src/server'

import { getTestAgent, getTestOutOfBandInvitation, getTestOutOfBandRecord, objectToJson } from './utils/helpers'

describe('ConnectionController', () => {
  let app: Express
  let aliceAgent: Agent
  let bobAgent: Agent
  let outOfBandRecord: OutOfBandRecord
  let outOfBandInvitation: OutOfBandInvitation

  beforeAll(async () => {
    aliceAgent = await getTestAgent('Connection REST Agent Test Alice', 3014)
    bobAgent = await getTestAgent('Connection REST Agent Test Bob', 3015)
    app = await setupServer(bobAgent, { port: 3000 })
    outOfBandRecord = getTestOutOfBandRecord()
    outOfBandInvitation = getTestOutOfBandInvitation()
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
      const spy = jest.spyOn(bobAgent.oob, 'createInvitation').mockResolvedValueOnce(outOfBandRecord)
      const getResult = (): Promise<OutOfBandRecord> => spy.mock.results[0].value

      const response = await request(app).post('/oob/create-invitation')

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })
    test('should use parameters', async () => {
      const spy = jest.spyOn(bobAgent.oob, 'createInvitation').mockResolvedValueOnce(outOfBandRecord)

      const params = {
        label?: 'test',
        alias?: 'test',
        imageUrl?: 'test',
        goalCode?: 'test',
        goal?: 'test',
        handshake?: false,
        handshakeProtocols?: "https://didcomm.org/connections/1.0",
        messages?: {
            threadId: 'test',
            id: 'test',
            type: 'test'
        },
        multiUseInvitation?: false,
        autoAcceptConnection?: false,
        routing?: {
            endpoints: [],
            recipientKey: 'string',
        },
        appendedAttachments?: Attachment[];
      } // TODO: ADD HERE
      const response = await request(app).post('/oob/create-invitation')

      expect(response.statusCode).toBe(200)
      expect(spy).toHaveBeenCalledWith(params)
    })
  })

  describe('Create legacy invitation', () => {
    test('should return out of band invitation', async () => {
      const spy = jest.spyOn(bobAgent.oob, 'createLegacyInvitation').mockResolvedValueOnce({
        outOfBandRecord: outOfBandRecord,
        invitation: outOfBandInvitation,
      })
      const getResult = (): Promise<OutOfBandRecord> => spy.mock.results[0].value

      const response = await request(app).post('/oob/create-legacy-invitation')

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })
    test('should use parameters', async () => {})
  })

  describe('Create legacy connectionless invitation', () => {
    test('should return out of band invitation', async () => {})
    test('should use parameters', async () => {})
  })

  describe('Receive out of band invitation', () => {
    test('should return out of band invitation', async () => {})
    test('should use parameters', async () => {})
  })

  describe('Receive out of band invitation', () => {
    test('should return out of band invitation', async () => {})
    test('should use parameters', async () => {})
  })

  describe('Receive out of band invitation by url', () => {
    test('should return out of band invitation', async () => {})
    test('should use parameters', async () => {})
  })

  describe('Accept out of band invitation', () => {
    test('should return record from accepted invitation', async () => {})
    test('should throw 404 if out of band record is not found', async () => {})
  })

  describe('Delete out of band record', () => {
    test('should return 204 if record is successfully deleted', async () => {})
  })

  afterAll(async () => {
    await aliceAgent.shutdown()
    await aliceAgent.wallet.delete()
    await bobAgent.shutdown()
    await bobAgent.wallet.delete()
  })
})
