import type {
  OpenId4VcIssuanceSessionsCreateOfferResponse,
  OpenId4VcIssuanceSessionRecord,
} from './OpenId4VcIssuanceSessionsControllerTypes'

import { OpenId4VcIssuanceSessionState } from '@credo-ts/openid4vc'

export const openId4VcIssuanceSessionRecordExample: OpenId4VcIssuanceSessionRecord = {
  id: '9cde9070-23c9-4e51-b810-e929a0298cbb',
  createdAt: new Date('2024-03-29T17:54:34.890Z'),
  updatedAt: new Date('2024-03-29T17:54:34.890Z'),
  type: 'OpenId4VcIssuanceSessionRecord',
  publicIssuerId: 'a868257d-7149-4d4d-a52c-78f3197ee538',
  state: OpenId4VcIssuanceSessionState.OfferCreated,
  preAuthorizedCode: '963352229993506863726932',
  issuanceMetadata: {
    credentials: [
      {
        credentialSupportedId: 'ExampleCredentialSdJwtVc',
        format: 'vc+sd-jwt',
        issuer: {
          method: 'did',
          didUrl:
            'did:key:z6MkgViwfstCL1L9i8tgsdAYEu5A62W5mA9DcmSygVVVLFuU#z6MkgViwfstCL1L9i8tgsdAYEu5A62W5mA9DcmSygVVVLFuU',
        },
        payload: {
          first_name: 'John',
          last_name: 'Doe',
          age: {
            over_18: true,
            over_21: true,
            over_65: false,
          },
          vct: 'https://example.com/vct#ExampleCredential',
        },
        disclosureFrame: {
          first_name: false,
          last_name: false,
          age: {
            over_18: true,
            over_21: true,
            over_65: true,
          },
        },
      },
    ],
  },
  credentialOfferPayload: {
    grants: {
      'urn:ietf:params:oauth:grant-type:pre-authorized_code': {
        'pre-authorized_code': '963352229993506863726932',
        user_pin_required: false,
      },
    },
    credentials: ['ExampleCredentialSdJwtVc'],
    credential_issuer: 'http://localhost:3008/oid4vci/a868257d-7149-4d4d-a52c-78f3197ee538',
  },
  credentialOfferUri:
    'http://localhost:3008/oid4vci/a868257d-7149-4d4d-a52c-78f3197ee538/offers/4a85ea23-998c-4bbe-af0a-9b03a2b030db',
}

export const openId4VcIssuanceSessionsCreateOfferResponse: OpenId4VcIssuanceSessionsCreateOfferResponse = {
  issuanceSession: openId4VcIssuanceSessionRecordExample,
  credentialOffer:
    'openid-credential-offer://?credential_offer_uri=http%3A%2F%2Flocalhost%3A3008%2Foid4vci%2Fa868257d-7149-4d4d-a52c-78f3197ee538%2Foffers%2F4a85ea23-998c-4bbe-af0a-9b03a2b030db',
}
