import type { Agent, ConnectionRecord } from '@aries-framework/core'
import type { Server } from 'net'

import { ConnectionEventTypes, ConnectionRepository } from '@aries-framework/core'
import request from 'supertest'
import WebSocket from 'ws'

import { startServer } from '../src'

import { getTestConnection, getTestAgent, objectToJson } from './utils/helpers'

describe('ConnectionController', () => {
  let app: Server
  let aliceAgent: Agent
  let bobAgent: Agent
  let connection: ConnectionRecord

  beforeAll(async () => {
    aliceAgent = await getTestAgent('Connection REST Agent Test Alice', 3012)
    bobAgent = await getTestAgent('Connection REST Agent Test Bob', 3013)
    app = await startServer(bobAgent, { port: 3009 })
    connection = getTestConnection()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Get all connections', () => {
    test('should return all connections', async () => {
      const connectionRepository = bobAgent.dependencyManager.resolve(ConnectionRepository)
      jest.spyOn(connectionRepository, 'findByQuery').mockResolvedValueOnce([connection])

      const response = await request(app).get('/connections')

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual([connection].map(objectToJson))
    })
  })

  describe('Get all connections by state', () => {
    test('should return all credentials by specified state', async () => {
      const connectionRepository = bobAgent.dependencyManager.resolve(ConnectionRepository)
      const findByQuerySpy = jest.spyOn(connectionRepository, 'findByQuery').mockResolvedValueOnce([connection])

      const response = await request(app).get('/connections').query({ state: connection.state })

      expect(findByQuerySpy).toBeCalledWith({
        state: connection.state,
      })

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual([connection].map(objectToJson))
    })
  })

  describe('Get all connections by outOfBandId', () => {
    test('should return all credentials by specified outOfBandId', async () => {
      const connectionRepository = bobAgent.dependencyManager.resolve(ConnectionRepository)
      const findByQuerySpy = jest.spyOn(connectionRepository, 'findByQuery').mockResolvedValueOnce([connection])

      const response = await request(app).get('/connections').query({ outOfBandId: connection.outOfBandId })

      expect(findByQuerySpy).toBeCalledWith({
        outOfBandId: connection.outOfBandId,
      })

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual([connection].map(objectToJson))
    })
  })

  describe('Get all connections by alias', () => {
    test('should return all credentials by specified alias', async () => {
      const connectionRepository = bobAgent.dependencyManager.resolve(ConnectionRepository)
      const findByQuerySpy = jest.spyOn(connectionRepository, 'findByQuery').mockResolvedValueOnce([connection])

      const response = await request(app).get('/connections').query({ alias: connection.alias })

      expect(findByQuerySpy).toBeCalledWith({
        alias: connection.alias,
      })

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual([connection].map(objectToJson))
    })
  })

  describe('Get all connections by myDid', () => {
    test('should return all credentials by specified peer did', async () => {
      const connectionRepository = bobAgent.dependencyManager.resolve(ConnectionRepository)
      const findByQuerySpy = jest.spyOn(connectionRepository, 'findByQuery').mockResolvedValueOnce([connection])

      const response = await request(app).get('/connections').query({ myDid: connection.did })

      expect(findByQuerySpy).toBeCalledWith({
        myDid: connection.did,
      })

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual([connection].map(objectToJson))
    })
  })

  describe('Get all connections by theirDid', () => {
    test('should return all credentials by specified peer did', async () => {
      const connectionRepository = bobAgent.dependencyManager.resolve(ConnectionRepository)
      const findByQuerySpy = jest.spyOn(connectionRepository, 'findByQuery').mockResolvedValueOnce([connection])

      const response = await request(app).get('/connections').query({ theirDid: connection.theirDid })

      expect(findByQuerySpy).toBeCalledWith({
        theirDid: connection.theirDid,
      })

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual([connection].map(objectToJson))
    })
  })

  describe('Get all connections by theirLabel', () => {
    test('should return all credentials by specified peer label', async () => {
      const connectionRepository = bobAgent.dependencyManager.resolve(ConnectionRepository)
      const findByQuerySpy = jest.spyOn(connectionRepository, 'findByQuery').mockResolvedValueOnce([connection])

      const response = await request(app).get('/connections').query({ theirLabel: connection.theirLabel })

      expect(findByQuerySpy).toBeCalledWith({
        theirLabel: connection.theirLabel,
      })

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual([connection].map(objectToJson))
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

  describe('Connection WebSocket Event', () => {
    test('should return connection event sent from test agent to websocket client', async () => {
      expect.assertions(1)

      const client = new WebSocket('ws://localhost:3009')

      const aliceOutOfBandRecord = await aliceAgent.oob.createInvitation()

      const waitForMessagePromise = new Promise((resolve) => {
        client.on('message', (data) => {
          const event = JSON.parse(data as string)

          expect(event.type).toBe(ConnectionEventTypes.ConnectionStateChanged)
          client.terminate()
          resolve(undefined)
        })
      })

      await bobAgent.oob.receiveInvitation(aliceOutOfBandRecord.outOfBandInvitation)
      await waitForMessagePromise
    })
  })

  afterAll(async () => {
    await aliceAgent.shutdown()
    await aliceAgent.wallet.delete()
    await bobAgent.shutdown()
    await bobAgent.wallet.delete()
    app.close()
  })
})
