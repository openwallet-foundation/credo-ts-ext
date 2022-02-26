import type { Agent, BasicMessageRecord, ConnectionRecord } from '@aries-framework/core'
import type { Express } from 'express'

import request from 'supertest'

import { setupServer } from '../src/server'

import { getTestAgent, objectToJson } from './utils/helpers'

describe('BasicMessageController', () => {
  let app: Express
  let agent: Agent
  let connection: ConnectionRecord

  beforeAll(async () => {
    agent = await getTestAgent('rest agent basic message test', 3011)
    app = await setupServer(agent, { port: 3000 })
    const { invitation } = await agent.connections.createConnection()
    connection = await agent.connections.receiveInvitation(invitation)
  })

  describe('Get basic messages', () => {
    test('should return all basic messages by connectionId', async () => {
      const spy = jest.spyOn(agent.basicMessages, 'findAllByQuery')
      const getResult = (): Promise<BasicMessageRecord[]> => spy.mock.results[0].value

      const response = await request(app).get(`/basic-messages/${connection.id}`)
      const result = await getResult()

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual(result.map(objectToJson))
    })
  })

  describe('send basic message to connection', () => {
    test('should give 204 no content when message is send', async () => {
      const response = await request(app).post(`/basic-messages/${connection.id}`).send({ content: 'Hello!' })

      expect(response.statusCode).toBe(204)
    })
    test('should give 404 not found when connection is not found', async () => {
      const response = await request(app)
        .post(`/basic-messages/aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa`)
        .send({ content: 'Hello!' })

      expect(response.statusCode).toBe(404)
    })
  })

  afterAll(async () => {
    await agent.shutdown()
    await agent.wallet.delete()
  })
})
