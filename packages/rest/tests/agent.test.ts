import type { Agent } from '@aries-framework/core'
import type { Express } from 'express'

import request from 'supertest'

import { setupServer } from '../src/server'

import { getTestAgent } from './helpers'

describe('AgentController', () => {
  let app: Express
  let agent: Agent

  beforeAll(async () => {
    agent = await getTestAgent('rest agent test', 3001)
    app = await setupServer(agent)
  })

  describe('Get agent info', () => {
    test('should return agent information', async () => {
      const response = await request(app).get('/agent')

      expect(response.body.label).toBeDefined()
      expect(response.body.endpoints).toBeDefined()
      expect(response.body.isInitialized).toBeTruthy()
      expect(response.body.publicDid).toBeDefined()
    })

    test('should response with a 200 status code', async () => {
      const response = await request(app).get('/agent')

      expect(response.statusCode).toBe(200)
    })
  })

  afterAll(async () => {
    agent.shutdown({ deleteWallet: true })
  })
})
