import type {
  OpenId4VcVerificationSessionsCreateRequestResponse,
  OpenId4VcVerificationSessionsGetVerifiedAuthorizationResponseResponse,
  OpenId4VcVerificationSessionRecord,
} from './OpenId4VcVerificationSessionsControllerTypes'

import { ClaimFormat } from '@credo-ts/core'
import { OpenId4VcVerificationSessionState } from '@credo-ts/openid4vc'

export const openId4VcIssuanceSessionRecordExample: OpenId4VcVerificationSessionRecord = {
  id: '9cde9070-23c9-4e51-b810-e929a0298cbb',
  createdAt: new Date('2024-03-29T17:54:34.890Z'),
  updatedAt: new Date('2024-03-29T17:54:34.890Z'),
  type: 'OpenId4VcVerificationSessionRecord',
  publicVerifierId: 'a868257d-7149-4d4d-a52c-78f3197ee538',
  authorizationRequestJwt:
    'eyJhbGciOiJFZERTQSIsImtpZCI6ImRpZDprZXk6ejZNa2dWaXdmc3RDTDFMOWk4dGdzZEFZRXU1QTYyVzVtQTlEY21TeWdWVlZMRnVVI3o2TWtnVml3ZnN0Q0wxTDlpOHRnc2RBWUV1NUE2Mlc1bUE5RGNtU3lnVlZWTEZ1VSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MTE3MzgxNjEsImV4cCI6MTcxMTczODI4MSwicmVzcG9uc2VfdHlwZSI6ImlkX3Rva2VuIHZwX3Rva2VuIiwic2NvcGUiOiJvcGVuaWQiLCJjbGllbnRfaWQiOiJkaWQ6a2V5Ono2TWtnVml3ZnN0Q0wxTDlpOHRnc2RBWUV1NUE2Mlc1bUE5RGNtU3lnVlZWTEZ1VSIsInJlZGlyZWN0X3VyaSI6Imh0dHBzOi8vZDBjZS0yMTctMTIzLTE4LTI2Lm5ncm9rLWZyZWUuYXBwL3Npb3AvMWFiMzBjMGUtMWFkYi00ZjAxLTkwZTgtY2ZkNDI1YzBhMzExL2F1dGhvcml6ZSIsInJlc3BvbnNlX21vZGUiOiJwb3N0Iiwibm9uY2UiOiIxMDQwMzQ1NjY0MDI1NTEzODE3MzgyNjk4Iiwic3RhdGUiOiI0MzQ3NTE3MjgzNDM2ODc1NzYzODQ1MTAiLCJjbGllbnRfbWV0YWRhdGEiOnsiaWRfdG9rZW5fc2lnbmluZ19hbGdfdmFsdWVzX3N1cHBvcnRlZCI6WyJFZERTQSIsIkVTMjU2IiwiRVMyNTZLIl0sInJlc3BvbnNlX3R5cGVzX3N1cHBvcnRlZCI6WyJ2cF90b2tlbiIsImlkX3Rva2VuIl0sInN1YmplY3Rfc3ludGF4X3R5cGVzX3N1cHBvcnRlZCI6WyJkaWQ6d2ViIiwiZGlkOmtleSIsImRpZDpqd2siXSwidnBfZm9ybWF0cyI6eyJqd3RfdmMiOnsiYWxnIjpbIkVkRFNBIiwiRVMyNTYiLCJFUzI1NksiXX0sImp3dF92Y19qc29uIjp7ImFsZyI6WyJFZERTQSIsIkVTMjU2IiwiRVMyNTZLIl19LCJqd3RfdnAiOnsiYWxnIjpbIkVkRFNBIiwiRVMyNTYiLCJFUzI1NksiXX0sImxkcF92YyI6eyJwcm9vZl90eXBlIjpbIkVkMjU1MTlTaWduYXR1cmUyMDE4Il19LCJsZHBfdnAiOnsicHJvb2ZfdHlwZSI6WyJFZDI1NTE5U2lnbmF0dXJlMjAxOCJdfSwidmMrc2Qtand0Ijp7ImtiX2p3dF9hbGdfdmFsdWVzIjpbIkVkRFNBIiwiRVMyNTYiLCJFUzI1NksiXSwic2Rfand0X2FsZ192YWx1ZXMiOlsiRWREU0EiLCJFUzI1NiIsIkVTMjU2SyJdfX0sImNsaWVudF9pZCI6ImRpZDprZXk6ejZNa2dWaXdmc3RDTDFMOWk4dGdzZEFZRXU1QTYyVzVtQTlEY21TeWdWVlZMRnVVIn0sInByZXNlbnRhdGlvbl9kZWZpbml0aW9uIjp7ImlkIjoiNzM3OTdiMGMtZGFlNi00NmE3LTk3MDAtNzg1MDg1NWZlZTIyIiwibmFtZSI6IkV4YW1wbGUgUHJlc2VudGF0aW9uIERlZmluaXRpb24iLCJpbnB1dF9kZXNjcmlwdG9ycyI6W3siaWQiOiI2NDEyNTc0Mi04YjZjLTQyMmUtODJjZC0xYmViNTEyM2VlOGYiLCJjb25zdHJhaW50cyI6eyJsaW1pdF9kaXNjbG9zdXJlIjoicmVxdWlyZWQiLCJmaWVsZHMiOlt7InBhdGgiOlsiJC5hZ2Uub3Zlcl8xOCJdLCJmaWx0ZXIiOnsidHlwZSI6ImJvb2xlYW4ifX1dfSwibmFtZSI6IlJlcXVlc3RlZCBTZCBKd3QgRXhhbXBsZSBDcmVkZW50aWFsIiwicHVycG9zZSI6IlRvIHByb3ZpZGUgYW4gZXhhbXBsZSBvZiByZXF1ZXN0aW5nIGEgY3JlZGVudGlhbCJ9XX0sIm5iZiI6MTcxMTczODE2MSwianRpIjoiNThlNTA2MzgtOGU0ZS00NTQ5LWFmNDktMzQzNDI4N2IyODJlIiwiaXNzIjoiZGlkOmtleTp6Nk1rZ1Zpd2ZzdENMMUw5aTh0Z3NkQVlFdTVBNjJXNW1BOURjbVN5Z1ZWVkxGdVUiLCJzdWIiOiJkaWQ6a2V5Ono2TWtnVml3ZnN0Q0wxTDlpOHRnc2RBWUV1NUE2Mlc1bUE5RGNtU3lnVlZWTEZ1VSJ9.zAndpciC3rYi6tmItYi8P9uGqkId_3TNEgJHeFeBA1fWgJ4aY8Y2a5RmeGHl4-fXMV8Ff1-tpR86z-6v7pkvDQ',
  authorizationRequestUri:
    'https://d0ce-217-123-18-26.ngrok-free.app/siop/1ab30c0e-1adb-4f01-90e8-cfd425c0a311/authorization-requests/365d0d2f-e62b-4596-92cd-8c4baa7047d6',
  state: OpenId4VcVerificationSessionState.RequestUriRetrieved,
}

export const openId4VcVerificationSessionsCreateRequestResponse: OpenId4VcVerificationSessionsCreateRequestResponse = {
  verificationSession: openId4VcIssuanceSessionRecordExample,
  authorizationRequest:
    'openid://?request_uri=https%3A%2F%2Fexample.com%2Fsiop%2F6b293c23-d55a-4c6a-8c6a-877d69a70b4d%2Fauthorization-requests%2F6e7dce29-9d6a-4a13-a820-6a19b2ea9945',
}

export const openId4VcVerificationSessionsGetVerifiedAuthorizationResponseExample: OpenId4VcVerificationSessionsGetVerifiedAuthorizationResponseResponse =
  {
    idToken: {
      payload: {
        iat: 1711678207,
        exp: 1711744207,
        iss: 'did:jwk:eyJrdHkiOiJFQyIsImNydiI6IlAtMjU2IiwieCI6InRZSkY5a0NCeXpJT1RWc1FOclhrRTlQZW92eEJrcUNuejBQN3Q5Y2poblUiLCJ5IjoiZnlIckh3U21PSGlfa2dDdGM2RWF4ckpZQ2R1WWRQbm5VTGJ5RVBPTGpabyJ9',
        aud: 'did:key:z6MkgViwfstCL1L9i8tgsdAYEu5A62W5mA9DcmSygVVVLFuU',
        sub: 'did:jwk:eyJrdHkiOiJFQyIsImNydiI6IlAtMjU2IiwieCI6InRZSkY5a0NCeXpJT1RWc1FOclhrRTlQZW92eEJrcUNuejBQN3Q5Y2poblUiLCJ5IjoiZnlIckh3U21PSGlfa2dDdGM2RWF4ckpZQ2R1WWRQbm5VTGJ5RVBPTGpabyJ9',
        nonce: '1040345664025513817382698',
        state: '434751728343687576384510',
      },
    },
    presentationExchange: {
      definition: {
        id: '73797b0c-dae6-46a7-9700-7850855fee22',
        name: 'Example Presentation Definition',
        input_descriptors: [
          {
            id: '64125742-8b6c-422e-82cd-1beb5123ee8f',
            constraints: {
              limit_disclosure: 'required',
              fields: [
                {
                  path: ['$.age.over_18'],
                  filter: {
                    type: 'boolean',
                  },
                },
              ],
            },
            name: 'Requested Sd Jwt Example Credential',
            purpose: 'To provide an example of requesting a credential',
          },
        ],
      },
      presentations: [
        {
          format: ClaimFormat.SdJwtVc,
          encoded: 'eyJhbGciOiJFZERTQSIsInR5cCI6InZjK3NkLWp3dCIsImtpZCI6...',
          vcPayload: {
            first_name: 'John',
            last_name: 'Doe',
            age: {
              over_18: true,
            },
            vct: 'https://example.com/vct#ExampleCredential',
            cnf: {
              kid: 'did:jwk:eyJrdHkiOiJFQyIsImNydiI6IlAtMjU2IiwieCI6InRZSkY5a0NCeXpJT1RWc1FOclhrRTlQZW92eEJrcUNuejBQN3Q5Y2poblUiLCJ5IjoiZnlIckh3U21PSGlfa2dDdGM2RWF4ckpZQ2R1WWRQbm5VTGJ5RVBPTGpabyJ9#0',
            },
            iss: 'did:key:z6MkgViwfstCL1L9i8tgsdAYEu5A62W5mA9DcmSygVVVLFuU',
            iat: 1711737824,
          },
          signedPayload: {
            first_name: 'John',
            last_name: 'Doe',
            age: {
              _sd: [
                '7-KKV_C6uNhINhW1_6zdv9pHGeoSErL0kXQLRLGRkOs',
                'J-HR5dUgq0__vzlSknqLhZIgyfdqoFGz1IiWiUUjHy8',
                'Y5fMNOwiZgzQFD3XtjowpRYEr0Rw6YU7ZwDimGV3b60',
              ],
            },
            vct: 'https://example.com/vct#ExampleCredential',
            cnf: {
              kid: 'did:jwk:eyJrdHkiOiJFQyIsImNydiI6IlAtMjU2IiwieCI6InRZSkY5a0NCeXpJT1RWc1FOclhrRTlQZW92eEJrcUNuejBQN3Q5Y2poblUiLCJ5IjoiZnlIckh3U21PSGlfa2dDdGM2RWF4ckpZQ2R1WWRQbm5VTGJ5RVBPTGpabyJ9#0',
            },
            iss: 'did:key:z6MkgViwfstCL1L9i8tgsdAYEu5A62W5mA9DcmSygVVVLFuU',
            iat: 1711737824,
            _sd_alg: 'sha-256',
          },
          header: {
            alg: 'EdDSA',
            typ: 'vc+sd-jwt',
            kid: '#z6MkgViwfstCL1L9i8tgsdAYEu5A62W5mA9DcmSygVVVLFuU',
          },
        },
      ],
      submission: {
        id: 'tmCha4zQKAZF-aBTCT8W3',
        definition_id: '73797b0c-dae6-46a7-9700-7850855fee22',
        descriptor_map: [
          {
            id: '64125742-8b6c-422e-82cd-1beb5123ee8f',
            format: 'vc+sd-jwt',
            path: '$',
          },
        ],
      },
    },
  }
