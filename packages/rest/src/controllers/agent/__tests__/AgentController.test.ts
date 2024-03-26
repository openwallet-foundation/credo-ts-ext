import type { Agent } from '@credo-ts/core'
import type { Express } from 'express'

import request from 'supertest'

import { getTestAgent } from '../../../../tests/utils/helpers'
import { setupServer } from '../../../server'

describe('AgentController', () => {
  let app: Express
  let agent: Agent

  beforeAll(async () => {
    agent = await getTestAgent('Agent REST Agent Test')
    app = await setupServer(agent, { port: 3000 })
  })

  afterAll(async () => {
    await agent.shutdown()
    await agent.wallet.delete()
  })

  describe('Get agent info', () => {
    test('should return agent information', async () => {
      const response = await request(app).get('/agent')

      expect(response.body).toEqual({
        isInitialized: true,
        config: {
          label: agent.config.label,
          endpoints: ['http://localhost:3001'],
          useDidSovPrefixWhereAllowed: true,
          autoUpdateStorageOnStartup: true,
        },
      })
      expect(response.statusCode).toBe(200)
    })
  })
})
