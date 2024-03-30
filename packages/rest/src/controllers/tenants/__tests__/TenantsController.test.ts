import type { RestRootAgentWithTenants } from '../../../utils/agent'

import express from 'express'
import request from 'supertest'

import { getTestAgent } from '../../../../tests/utils/helpers'
import { setupApp } from '../../../setup/setupApp'

describe('TenantsController', () => {
  const app = express()
  let agent: RestRootAgentWithTenants

  beforeAll(async () => {
    agent = await getTestAgent('Tenants REST Agent Test', undefined, true)
    await setupApp({ agent, adminPort: 3000, baseApp: app })
  })

  afterAll(async () => {
    await agent.shutdown()
    await agent.wallet.delete()
  })

  test('Create tenant', async () => {
    const response = await request(app)
      .post('/tenants')
      .send({
        config: {
          label: agent.config.label,
        },
      })

    expect(response.statusCode).toBe(200)
  })
})
