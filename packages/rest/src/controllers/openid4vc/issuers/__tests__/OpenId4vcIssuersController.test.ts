import type { RestRootAgent } from '../../../../utils/agent'

import express from 'express'
import request from 'supertest'

import { getTestAgent } from '../../../../../tests/utils/helpers'
import { setupApp } from '../../../../setup/setupApp'

describe('OpenId4VcIssuersController', () => {
  const app = express()
  let agent: RestRootAgent

  beforeAll(async () => {
    agent = await getTestAgent('OpenID4VC Issuers REST Agent Test')
    await setupApp({ agent, adminPort: 3000, baseApp: app })
  })

  afterAll(async () => {
    await agent.shutdown()
    await agent.wallet.delete()
  })

  test('create issuer', async () => {
    const response = await request(app)
      .post(`/openid4vc/issuers`)
      .send({
        credentialsSupported: [
          {
            id: 'SdJwtVcExample',
            format: 'vc+sd-jwt',
            vct: 'https://example.com/vct',
          },
        ],
      })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      accessTokenPublicKeyFingerprint: expect.any(String),
      createdAt: expect.any(String),
      credentialsSupported: [
        {
          format: 'vc+sd-jwt',
          id: 'SdJwtVcExample',
          vct: 'https://example.com/vct',
        },
      ],
      id: expect.any(String),
      publicIssuerId: expect.any(String),
      type: 'OpenId4VcIssuerRecord',
      updatedAt: expect.any(String),
    })
  })
})
