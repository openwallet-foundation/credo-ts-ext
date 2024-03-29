import type { OpenId4VcIssuersRecord } from './OpenId4VcIssuersControllerTypes'

import { OpenId4VcIssuerRecord } from '@credo-ts/openid4vc'

export const openId4VcIssuersRecordExample: OpenId4VcIssuersRecord = {
  id: '65dff314-b7c8-4617-952e-a82864fecec5',
  createdAt: new Date('2024-03-29T15:26:58.347Z'),
  updatedAt: new Date('2024-03-29T15:26:58.347Z'),
  type: OpenId4VcIssuerRecord.type,
  publicIssuerId: '129ea46f-92bc-4d44-8433-ac153b7da2e6',
  accessTokenPublicKeyFingerprint: 'z6MkrSAZxmNERyktTeT2ich4Ntu3TPc5RdcB4sCsEbZa4vzh',
  credentialsSupported: [
    {
      format: 'vc+sd-jwt',
      id: 'ExampleCredentialSdJwtVc',
      vct: 'https://example.com/vct#ExampleCredential',
      cryptographic_binding_methods_supported: ['did:key', 'did:jwk'],
      cryptographic_suites_supported: ['ES256', 'Ed25519'],
      display: [
        {
          name: 'Example SD JWT Credential',
          description: 'This is an example SD-JWT credential',
          background_color: '#ffffff',
          background_image: {
            url: 'https://example.com/background.png',
            alt_text: 'Example Credential Background',
          },
          text_color: '#000000',
          locale: 'en-US',
          logo: {
            url: 'https://example.com/logo.png',
            alt_text: 'Example Credential Logo',
          },
        },
      ],
    },
    {
      format: 'jwt_vc_json',
      id: 'ExampleCredentialJwtVc',
      types: ['VerifiableCredential', 'ExampleCredential'],
      cryptographic_binding_methods_supported: ['did:key', 'did:jwk'],
      cryptographic_suites_supported: ['ES256', 'Ed25519'],
      display: [
        {
          name: 'Example SD JWT Credential',
          description: 'This is an example SD-JWT credential',
          background_color: '#ffffff',
          background_image: {
            url: 'https://example.com/background.png',
            alt_text: 'Example Credential Background',
          },
          text_color: '#000000',
          locale: 'en-US',
          logo: {
            url: 'https://example.com/logo.png',
            alt_text: 'Example Credential Logo',
          },
        },
      ],
    },
  ],
  display: [
    {
      background_color: '#ffffff',
      description: 'This is an example issuer',
      name: 'Example Issuer',
      locale: 'en-US',
      logo: {
        alt_text: 'Example Issuer Logo',
        url: 'https://example.com/logo.png',
      },
      text_color: '#000000',
    },
  ],
}
