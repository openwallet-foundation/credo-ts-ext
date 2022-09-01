import type { Agent, ConnectionRecord } from '@aries-framework/core'
import type { Express } from 'express'

import request from 'supertest'

import { setupServer } from '../src/server'

import { getTestConnection, getTestAgent, objectToJson } from './utils/helpers'

describe('ConnectionController', () => {
  let app: Express
  let aliceAgent: Agent
  let bobAgent: Agent
  let connection: ConnectionRecord

  beforeAll(async () => {
    aliceAgent = await getTestAgent('Connection REST Agent Test Alice', 3012)
    bobAgent = await getTestAgent('Connection REST Agent Test Bob', 3013)
    app = await setupServer(bobAgent, { port: 3000 })
    connection = getTestConnection()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Get all connections', () => {
    test('should return all connections', async () => {
      const spy = jest.spyOn(bobAgent.connections, 'getAll')
      const getResult = (): Promise<ConnectionRecord[]> => spy.mock.results[0].value

      const response = await request(app).get('/connections')
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(result.map(objectToJson))
    })
  })

  describe('Get connection by id', () => {
    test('should return connection record', async () => {
      const spy = jest.spyOn(bobAgent.connections, 'findById').mockResolvedValueOnce(connection)
      const getResult = (): Promise<ConnectionRecord> => spy.mock.results[0].value

      const response = await request(app).get(`/connections/${connection.id}`)

      expect(response.statusCode).toBe(200)
      expect(spy).toHaveBeenCalledWith(connection.id)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })

    test('should give 404 not found when connection is not found', async () => {
      const response = await request(app).get(`/connections/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`)

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Accept request', () => {
    test('should return accepted connection record', async () => {
      const spy = jest.spyOn(bobAgent.connections, 'acceptRequest').mockResolvedValueOnce(connection)
      const getResult = (): Promise<ConnectionRecord> => spy.mock.results[0].value

      const response = await request(app).post(`/connections/${connection.id}/accept-request`)

      expect(response.statusCode)
      expect(spy).toHaveBeenCalledWith(connection.id)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })

    test('should throw error when connection id is not found', async () => {
      const response = await request(app).post(`/connections/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/accept-request`)

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Accept response', () => {
    test('should return accepted connection record', async () => {
      const spy = jest.spyOn(bobAgent.connections, 'acceptResponse').mockResolvedValueOnce(connection)
      const getResult = (): Promise<ConnectionRecord> => spy.mock.results[0].value

      const response = await request(app).post(`/connections/${connection.id}/accept-response`)

      expect(response.statusCode)
      expect(spy).toHaveBeenCalledWith(connection.id)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })

    test('should throw error when connectionId is not found', async () => {
      const response = await request(app).post(`/connections/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/accept-response`)

      expect(response.statusCode).toBe(404)
    })
  })

  afterAll(async () => {
    await aliceAgent.shutdown()
    await aliceAgent.wallet.delete()
    await bobAgent.shutdown()
    await bobAgent.wallet.delete()
  })
})
