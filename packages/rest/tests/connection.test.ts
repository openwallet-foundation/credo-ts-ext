import type { Agent, ConnectionRecord } from '@aries-framework/core'
import type { Express } from 'express'

import { JsonTransformer, ConnectionInvitationMessage } from '@aries-framework/core'
import request from 'supertest'

import { setupServer } from '../src/server'

import { getTestAgent, objectToJson } from './helpers'

describe('ConnectionController', () => {
  let app: Express
  let aliceAgent: Agent
  let bobAgent: Agent

  beforeAll(async () => {
    aliceAgent = await getTestAgent('Rest Connection Test Alice', 3002)
    bobAgent = await getTestAgent('Rest Connection Test Bob', 3003)
    app = await setupServer(bobAgent)

    await bobAgent.connections.createConnection()
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

      const { connectionRecord } = await bobAgent.connections.createConnection()

      const response = await request(app).get(`/connections/${connectionRecord.id}`)

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })

    test('should give 404 not found when connection is not found', async () => {
      const response = await request(app).get(`/connections/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`)

      expect(response.statusCode).toBe(404)
    })
  })

  describe('create invitation', () => {
    test('should return invitation', async () => {
      const spy = jest.spyOn(bobAgent.connections, 'createConnection')
      const getResult = (): Promise<ConnectionRecord> => spy.mock.results[0].value

      const response = await request(app).post('/connections/create-invitation')

      const result = await getResult()
      const instance = JsonTransformer.fromJSON(result.invitation, ConnectionInvitationMessage) // i do this because i need to add useLegacyDidSov

      expect(response.statusCode).toBe(200)
      expect(response.body.invitationUrl).toBeDefined()
      expect(response.body.invitation).toEqual(instance.toJSON({ useLegacyDidSovPrefix: true }))
    })

    test('should accept optional parameters', async () => {
      const spy = jest.spyOn(bobAgent.connections, 'createConnection')

      const params = {
        autoAcceptConnection: false,
        alias: 'test',
      }

      const response = await request(app).post('/connections/create-invitation').send(params)

      expect(response.statusCode).toBe(200)
      expect(spy).toBeCalledWith(params)
      expect(response.body.connection.alias).toEqual('test')
      expect(response.body.connection.autoAcceptConnection).toEqual(false)
    })
  })

  describe('receive invitation', () => {
    test('should return connection record from received invitation', async () => {
      const { invitation } = await bobAgent.connections.createConnection()

      const spy = jest.spyOn(bobAgent.connections, 'receiveInvitation')
      const getResult = (): Promise<ConnectionRecord> => spy.mock.results[0].value

      const req = {
        invitation: invitation.toJSON({ useLegacyDidSovPrefix: true }),
      }
      const response = await request(app).post('/connections/receive-invitation').send(req)

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })

    test('should overwrite agent options with request options', async () => {
      const { invitation } = await bobAgent.connections.createConnection()

      const req = {
        invitation: invitation.toJSON({ useLegacyDidSovPrefix: true }),
        autoAcceptConnection: false,
      }
      const response = await request(app).post('/connections/receive-invitation').send(req)

      expect(response.statusCode).toBe(200)
      expect(response.body.autoAcceptConnection).toBeFalsy()
    })
  })

  describe('Accept invitation', () => {
    test('should return connection record from accepted invitation', async () => {
      const { invitation } = await aliceAgent.connections.createConnection({
        autoAcceptConnection: false,
      })
      const connection = await bobAgent.connections.receiveInvitation(invitation, { autoAcceptConnection: false })

      const spy = jest.spyOn(bobAgent.connections, 'acceptInvitation')
      const getResult = (): Promise<ConnectionRecord> => spy.mock.results[0].value

      const response = await request(app).post(`/connections/${connection.id}/accept-invitation`)

      expect(response.statusCode)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })

    test('should throw error when connectionId is not found', async () => {
      const response = await request(app).post(`/connections/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/accept-invitation`)

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Accept request', () => {
    test('should return accepted connection record', async () => {
      const { connectionRecord, invitation } = await bobAgent.connections.createConnection({
        autoAcceptConnection: false,
      })
      const connection = await aliceAgent.connections.receiveInvitation(invitation, { autoAcceptConnection: false })
      await aliceAgent.connections.acceptInvitation(connection.id)

      const spy = jest.spyOn(bobAgent.connections, 'acceptRequest')
      const getResult = (): Promise<ConnectionRecord> => spy.mock.results[0].value

      const response = await request(app).post(`/connections/${connectionRecord.id}/accept-request`)

      expect(response.statusCode)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })

    test('should throw error when connectionId is not found', async () => {
      const response = await request(app).post(`/connections/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/accept-request`)

      expect(response.statusCode).toBe(404)
    })
  })

  describe('Accept response', () => {
    test('should return accepted connection record', async () => {
      const { connectionRecord, invitation } = await aliceAgent.connections.createConnection({
        autoAcceptConnection: false,
      })
      const connection = await bobAgent.connections.receiveInvitation(invitation, { autoAcceptConnection: false })
      await bobAgent.connections.acceptInvitation(connection.id)
      await aliceAgent.connections.acceptRequest(connectionRecord.id)

      const spy = jest.spyOn(bobAgent.connections, 'acceptResponse')
      const getResult = (): Promise<ConnectionRecord> => spy.mock.results[0].value

      const response = await request(app).post(`/connections/${connection.id}/accept-response`)

      expect(response.statusCode)
      expect(response.body).toEqual(objectToJson(await getResult()))
    })

    test('should throw error when connectionId is not found', async () => {
      const response = await request(app).post(`/connections/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa/accept-response`)

      expect(response.statusCode).toBe(404)
    })
  })

  afterAll(async () => {
    bobAgent.shutdown({ deleteWallet: true })
    aliceAgent.shutdown({ deleteWallet: true })
  })
})
