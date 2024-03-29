import type { RestRootAgent } from '../../../utils/agent'

import express from 'express'
import request from 'supertest'

import { getTestAgent } from '../../../../tests/utils/helpers'
import { setupApp } from '../../../setup/setupApp'

describe('DidsController', () => {
  const app = express()
  let agent: RestRootAgent

  beforeAll(async () => {
    agent = await getTestAgent('DidsController REST Agent Test')
    await setupApp({ agent, adminPort: 3000, baseApp: app })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  afterAll(async () => {
    await agent.shutdown()
    await agent.wallet.delete()
  })

  describe('resolve did', () => {
    test('should return did', async () => {
      const response = await request(app).get(
        `/dids/${encodeURIComponent('did:key:z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc')}`,
      )

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({
        didDocument: {
          '@context': [
            'https://w3id.org/did/v1',
            'https://w3id.org/security/suites/ed25519-2018/v1',
            'https://w3id.org/security/suites/x25519-2019/v1',
          ],
          assertionMethod: [
            'did:key:z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc#z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc',
          ],
          authentication: [
            'did:key:z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc#z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc',
          ],
          capabilityDelegation: [
            'did:key:z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc#z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc',
          ],
          capabilityInvocation: [
            'did:key:z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc#z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc',
          ],
          id: 'did:key:z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc',
          keyAgreement: [
            {
              controller: 'did:key:z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc',
              id: 'did:key:z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc#z6LSm5B4fB9NA55xB7PSeMYTMS9sf8uboJvyZBaDLLSZ7Ryd',
              publicKeyBase58: 'APzu8sLW4cND5j1g7i2W2qwPozNV6hkpgCrXqso2Q4Cs',
              type: 'X25519KeyAgreementKey2019',
            },
          ],
          verificationMethod: [
            {
              controller: 'did:key:z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc',
              id: 'did:key:z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc#z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc',
              publicKeyBase58: 'ApexJxnhZHC6Ctq4fCoNHKYgu87HuRTZ7oSyfehG57zE',
              type: 'Ed25519VerificationKey2018',
            },
          ],
        },
        didDocumentMetadata: {},
        didResolutionMetadata: {
          contentType: 'application/did+ld+json',
          resolutionTime: expect.any(Number),
          servedFromCache: false,
        },
      })
    })
  })

  describe('create did', () => {
    test('should create did ', async () => {
      const response = await request(app)
        .post(`/dids/create`)
        .send({
          method: 'key',
          options: {
            keyType: 'ed25519',
          },
          secret: {
            privateKeyBase58: '4Fv58mZUUUcktagjui3fgtG9GnQg3cVjAGLqi5TVB1QW',
          },
        })

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({
        didDocumentMetadata: {},
        didRegistrationMetadata: {},
        didState: {
          did: 'did:key:z6Mkp2z5JZNa48qiupnSL32rt9Yj5nT31GDvL1GtNmYqgc7o',
          didDocument: {
            '@context': [
              'https://w3id.org/did/v1',
              'https://w3id.org/security/suites/ed25519-2018/v1',
              'https://w3id.org/security/suites/x25519-2019/v1',
            ],
            assertionMethod: [
              'did:key:z6Mkp2z5JZNa48qiupnSL32rt9Yj5nT31GDvL1GtNmYqgc7o#z6Mkp2z5JZNa48qiupnSL32rt9Yj5nT31GDvL1GtNmYqgc7o',
            ],
            authentication: [
              'did:key:z6Mkp2z5JZNa48qiupnSL32rt9Yj5nT31GDvL1GtNmYqgc7o#z6Mkp2z5JZNa48qiupnSL32rt9Yj5nT31GDvL1GtNmYqgc7o',
            ],
            capabilityDelegation: [
              'did:key:z6Mkp2z5JZNa48qiupnSL32rt9Yj5nT31GDvL1GtNmYqgc7o#z6Mkp2z5JZNa48qiupnSL32rt9Yj5nT31GDvL1GtNmYqgc7o',
            ],
            capabilityInvocation: [
              'did:key:z6Mkp2z5JZNa48qiupnSL32rt9Yj5nT31GDvL1GtNmYqgc7o#z6Mkp2z5JZNa48qiupnSL32rt9Yj5nT31GDvL1GtNmYqgc7o',
            ],
            id: 'did:key:z6Mkp2z5JZNa48qiupnSL32rt9Yj5nT31GDvL1GtNmYqgc7o',
            keyAgreement: [
              {
                controller: 'did:key:z6Mkp2z5JZNa48qiupnSL32rt9Yj5nT31GDvL1GtNmYqgc7o',
                id: 'did:key:z6Mkp2z5JZNa48qiupnSL32rt9Yj5nT31GDvL1GtNmYqgc7o#z6LSnGC4ui2fKtMYS7Qf7VTdNo3sFHGURfgDCJfD9RoWmZ1X',
                publicKeyBase58: 'Bb1uPQDoERdoLj2taqwg4CqPQ8jMj4W4KKwXey9z4BEm',
                type: 'X25519KeyAgreementKey2019',
              },
            ],
            verificationMethod: [
              {
                controller: 'did:key:z6Mkp2z5JZNa48qiupnSL32rt9Yj5nT31GDvL1GtNmYqgc7o',
                id: 'did:key:z6Mkp2z5JZNa48qiupnSL32rt9Yj5nT31GDvL1GtNmYqgc7o#z6Mkp2z5JZNa48qiupnSL32rt9Yj5nT31GDvL1GtNmYqgc7o',
                publicKeyBase58: 'Aaj2iK88ibMFoKwjeU5233zjGDBBbNyZdzMxYVapmPLR',
                type: 'Ed25519VerificationKey2018',
              },
            ],
          },
          secret: {
            privateKeyBase58: '4Fv58mZUUUcktagjui3fgtG9GnQg3cVjAGLqi5TVB1QW',
          },
          state: 'finished',
        },
      })
    })
  })

  describe('import did', () => {
    test('should import did ', async () => {
      const response = await request(app)
        .post(`/dids/import`)
        .send({
          did: 'did:key:z6Mkp2z5JZNa48qiupnSL32rt9Yj5nT31GDvL1GtNmYqgc7o',
          overwrite: true,
          privateKeys: [
            {
              keyType: 'ed25519',
              privateKeyBase58: '4Fv58mZUUUcktagjui3fgtG9GnQg3cVjAGLqi5TVB1QW',
            },
          ],
        })

      expect(response.statusCode).toBe(201)
      expect(response.body).toEqual({})
    })
  })
})
