import type { Agent, ConnectionRecord } from '@aries-framework/core'
import type { Express } from 'express'

import request from 'supertest'

import { setupServer } from '../src/server'

import { getTestAgent, objectToJson } from './utils/helpers'

describe('ConnectionController', () => {
  let app: Express
  let aliceAgent: Agent
  let bobAgent: Agent

  beforeAll(async () => {
    aliceAgent = await getTestAgent('REST Agent Test Alice', 3012)
    bobAgent = await getTestAgent('REST Agent Test Bob', 3013)
    app = await setupServer(bobAgent, { port: 3000 })
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
      const spy = jest.spyOn(bobAgent.connections, 'findById')
      const getResult = (): Promise<ConnectionRecord> => spy.mock.results[0].value

      // Alice creates an oob invitation for Bob
      const { outOfBandInvitation } = await aliceAgent.oob.createInvitation()

      // Bob receives the oob invitation and auto accepts the invitation,
      // creating a connection request with Alice
      const { connectionRecord } = await bobAgent.oob.receiveInvitation(outOfBandInvitation)

      const response = await request(app).get(`/connections/${connectionRecord?.id}`)

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })

    test('should give 404 not found when connection is not found', async () => {
      const response = await request(app).get(`/connections/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`)

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Accept request', () => {
    test('should return accepted connection record', async () => {
      // Bob creates an oob invitation for Alice
      const { outOfBandInvitation, ...bobOOBRecord } = await bobAgent.oob.createInvitation({
        autoAcceptConnection: false,
      })

      // Alice receives the oob invitation and manually accepts the invitation,
      // creating a connection request with Bob
      const { outOfBandRecord: aliceOOBRecord } = await aliceAgent.oob.receiveInvitation(outOfBandInvitation, {
        autoAcceptConnection: false,
      })
      await aliceAgent.oob.acceptInvitation(aliceOOBRecord.id, {
        autoAcceptConnection: false,
      })

      // Bob finds the connection associated with the oob record and if it exists accepts the connection,
      // sends a connection response to Alice
      const bobConnectionRecords = await bobAgent.connections.findAllByOutOfBandId(bobOOBRecord.id)
      const bobConnectionRecord = (bobConnectionRecords || []).find((record) => record?.outOfBandId === bobOOBRecord.id)

      const spy = jest.spyOn(bobAgent.connections, 'acceptRequest')
      const getResult = (): Promise<ConnectionRecord> => spy.mock.results[0].value

      const response = await request(app).post(`/connections/${bobConnectionRecord?.id}/accept-request`)

      expect(response.statusCode)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })

    test('should throw error when connection id is not found', async () => {
      const response = await request(app).post(`/connections/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/accept-request`)

      expect(response.statusCode).toBe(404)
    })
  })

  describe.skip('Accept response', () => {
    test('should return accepted connection record', async () => {
      // Alice creates an oob invitation for Bob
      const { outOfBandInvitation, ...aliceOOBRecord } = await aliceAgent.oob.createInvitation({
        autoAcceptConnection: false,
      })

      // Bob receives the oob invitation and manually accepts the invitation,
      // creating a connection request with Alice
      const { outOfBandRecord: bobOOBRecord, connectionRecord: bobConnectionRecord } =
        await bobAgent.oob.receiveInvitation(outOfBandInvitation, {
          autoAcceptConnection: false,
        })
      await bobAgent.oob.acceptInvitation(bobOOBRecord.id, { autoAcceptConnection: false })

      // Alice finds the connection associated with the oob record and if it exists accepts the connection,
      // sends a connection response to Bob
      const aliceConnectionRecords = await aliceAgent.connections.findAllByOutOfBandId(aliceOOBRecord.id)
      const aliceConnectionRecord = (aliceConnectionRecords || []).find(
        (record) => record?.outOfBandId === aliceOOBRecord.id
      )
      await aliceAgent.connections.acceptRequest(aliceConnectionRecord?.id || '')

      // Bob sends a connection response to Alice
      const spy = jest.spyOn(bobAgent.connections, 'acceptResponse')
      const getResult = (): Promise<ConnectionRecord> => spy.mock.results[0].value

      const response = await request(app).post(`/connections/${bobConnectionRecord?.id}/accept-response`)

      expect(response.statusCode)
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
