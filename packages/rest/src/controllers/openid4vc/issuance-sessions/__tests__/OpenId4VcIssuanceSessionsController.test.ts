import type { RestRootAgent } from '../../../../utils/agent'
import type { KeyDidCreateOptions } from '@credo-ts/core'
import type { OpenId4VcIssuanceSessionStateChangedEvent } from '@credo-ts/openid4vc'

import { DidKey, KeyType } from '@credo-ts/core'
import { OpenId4VcIssuanceSessionState, OpenId4VcIssuerEvents } from '@credo-ts/openid4vc'
import express from 'express'
import { filter, first, firstValueFrom, timeout } from 'rxjs'
import request from 'supertest'

import { getTestAgent } from '../../../../../tests/utils/helpers'
import { setupApp } from '../../../../setup/setupApp'

describe('OpenId4VcIssuanceSessionsController', () => {
  const app = express()
  let agent: RestRootAgent
  let issuerDidKey: DidKey

  beforeAll(async () => {
    agent = await getTestAgent('OpenID4VC Issuance Sessions REST Agent Test', 4838)
    await setupApp({ agent, adminPort: 3000, baseApp: app })

    const didResult = await agent.dids.create<KeyDidCreateOptions>({
      method: 'key',
      options: {
        keyType: KeyType.Ed25519,
      },
    })
    issuerDidKey = DidKey.fromDid(didResult.didState.did as string)
    await agent.modules.openId4VcIssuer.createIssuer({
      credentialsSupported: [
        {
          id: 'SdJwtVcExample',
          format: 'vc+sd-jwt',
          vct: 'https://example.com/vct',
        },
      ],
      issuerId: 'publicIssuerId',
    })
  })

  afterAll(async () => {
    await agent.shutdown()
    await agent.wallet.delete()
  })

  test('create offer', async () => {
    const response = await request(app)
      .post(`/openid4vc/issuers/sessions/create-offer`)
      .send({
        publicIssuerId: 'publicIssuerId',
        preAuthorizedCodeFlowConfig: {
          userPinRequired: false,
        },
        credentials: [
          {
            credentialSupportedId: 'SdJwtVcExample',
            format: 'vc+sd-jwt',
            issuer: {
              method: 'did',
              didUrl: `${issuerDidKey.did}#${issuerDidKey.key.fingerprint}`,
            },
            payload: {
              first_name: 'John',
              age: {
                over_21: true,
                over_18: true,
                over_65: false,
              },
            },
            disclosureFrame: {
              first_name: false,
              age: {
                over_21: true,
                over_18: true,
                over_65: true,
              },
            },
          },
        ],
      })

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      issuanceSession: {
        createdAt: expect.any(String),
        credentialOfferPayload: {
          credential_issuer: 'http://localhost:4838/oid4vci/publicIssuerId',
          credentials: ['SdJwtVcExample'],
          grants: {
            'urn:ietf:params:oauth:grant-type:pre-authorized_code': {
              'pre-authorized_code': expect.any(String),
              user_pin_required: false,
            },
          },
        },
        id: expect.any(String),
        publicIssuerId: expect.any(String),
        preAuthorizedCode: expect.any(String),
        state: 'OfferCreated',
        type: 'OpenId4VcIssuanceSessionRecord',
        updatedAt: expect.any(String),
        credentialOfferUri: expect.stringContaining('http://localhost:4838/oid4vci/publicIssuerId/offers/'),
        issuanceMetadata: {
          credentials: [
            {
              credentialSupportedId: 'SdJwtVcExample',
              format: 'vc+sd-jwt',
              issuer: {
                method: 'did',
                didUrl: `${issuerDidKey.did}#${issuerDidKey.key.fingerprint}`,
              },
              payload: {
                vct: 'https://example.com/vct',
                first_name: 'John',
                age: {
                  over_21: true,
                  over_18: true,
                  over_65: false,
                },
              },
              disclosureFrame: {
                first_name: false,
                age: {
                  over_21: true,
                  over_18: true,
                  over_65: true,
                },
              },
            },
          ],
        },
      },
      credentialOffer: expect.stringContaining(
        `openid-credential-offer://?credential_offer_uri=${encodeURIComponent(`http://localhost:4838/oid4vci/publicIssuerId/offers/`)}`,
      ),
    })

    const credentialIssued = firstValueFrom(
      agent.events
        .observable<OpenId4VcIssuanceSessionStateChangedEvent>(OpenId4VcIssuerEvents.IssuanceSessionStateChanged)
        .pipe(
          filter(
            (event) =>
              event.payload.issuanceSession.state === OpenId4VcIssuanceSessionState.CredentialIssued &&
              event.payload.issuanceSession.id === response.body.issuanceSession.id,
          ),
          first(),
          timeout(10000),
        ),
    )

    const holderKey = await agent.wallet.createKey({
      keyType: KeyType.Ed25519,
    })
    const holderDid = `did:key:${holderKey.fingerprint}`
    const credentials = await agent.modules.openId4VcHolder.acceptCredentialOfferUsingPreAuthorizedCode(
      await agent.modules.openId4VcHolder.resolveCredentialOffer(response.body.credentialOffer),
      {
        credentialBindingResolver: async () => ({
          method: 'did',
          didUrl: `${holderDid}#${holderKey.fingerprint}`,
        }),
      },
    )

    await credentialIssued
    expect(credentials).toHaveLength(1)
    expect(credentials).toEqual([
      {
        compact: expect.any(String),
        header: { alg: 'EdDSA', kid: `#${issuerDidKey.key.fingerprint}`, typ: 'vc+sd-jwt' },
        payload: {
          _sd_alg: 'sha-256',
          age: {
            _sd: [expect.any(String), expect.any(String), expect.any(String)],
          },
          cnf: {
            kid: `${holderDid}#${holderKey.fingerprint}`,
          },
          first_name: 'John',
          iat: expect.any(Number),
          iss: issuerDidKey.did,
          vct: 'https://example.com/vct',
        },
        prettyClaims: {
          age: { over_18: true, over_21: true },
          cnf: {
            kid: `${holderDid}#${holderKey.fingerprint}`,
          },
          first_name: 'John',
          iat: expect.any(Number),
          iss: issuerDidKey.did,
          vct: 'https://example.com/vct',
        },
      },
    ])
  })
})
