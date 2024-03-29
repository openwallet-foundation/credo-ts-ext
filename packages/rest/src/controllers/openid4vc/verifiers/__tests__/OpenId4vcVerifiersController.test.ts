import type { RestRootAgent } from '../../../../utils/agent'

import express from 'express'
import request from 'supertest'

import { getTestAgent } from '../../../../../tests/utils/helpers'
import { setupApp } from '../../../../setup/setupApp'

describe('OpenId4VcVerifiersController', () => {
  const app = express()
  let agent: RestRootAgent

  beforeAll(async () => {
    agent = await getTestAgent('OpenID4VC Verifiers REST Agent Test')
    await setupApp({ agent, adminPort: 3000, baseApp: app })
  })

  afterAll(async () => {
    await agent.shutdown()
    await agent.wallet.delete()
  })

  test('create verifier', async () => {
    const response = await request(app).post(`/openid4vc/verifiers`).send({})

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      createdAt: expect.any(String),
      id: expect.any(String),
      publicVerifierId: expect.any(String),
      type: 'OpenId4VcVerifierRecord',
      updatedAt: expect.any(String),
    })
  })
})
