import type { CredoBaseRecord } from '../../types'
import type {
  OpenId4VcIssuerRecord as CredoOpenId4VcIssuerRecord,
  OpenId4VciCredentialSupportedWithId,
  OpenId4VciIssuerMetadataDisplay,
} from '@credo-ts/openid4vc'

/**
 * The public issuer id, used for hosting OpenID4VCI metadata and endpoints
 *
 * @example 0ad85626-67a9-4677-8621-2906bfbf6b6d
 */
export type PublicIssuerId = string

export interface OpenId4VcIssuerRecord extends CredoBaseRecord {
  publicIssuerId: PublicIssuerId
  accessTokenPublicKeyFingerprint: string

  credentialsSupported: OpenId4VciCredentialSupportedWithId[]
  display?: OpenId4VciIssuerMetadataDisplay[]
}

export function openId4VcIssuerRecordToApiModel(record: CredoOpenId4VcIssuerRecord): OpenId4VcIssuerRecord {
  return {
    // Base Record
    id: record.id,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    type: record.type,

    publicIssuerId: record.issuerId,
    accessTokenPublicKeyFingerprint: record.accessTokenPublicKeyFingerprint,
    credentialsSupported: record.credentialsSupported,
    display: record.display,
  }
}

/**
 * @example
 * {
 *   "credentialsSupported": [
 *     {
 *       "format": "vc+sd-jwt",
 *       "id": "ExampleCredentialSdJwtVc",
 *       "vct": "https://example.com/vct#ExampleCredential",
 *       "cryptographic_binding_methods_supported": [
 *         "did:key",
 *         "did:jwk"
 *       ],
 *       "cryptographic_suites_supported": [
 *         "ES256",
 *         "Ed25519"
 *       ],
 *       "display": [
 *         {
 *           "name": "Example SD JWT Credential",
 *           "description": "This is an example SD-JWT credential",
 *           "background_color": "#ffffff",
 *           "background_image": {
 *             "url": "https://example.com/background.png",
 *             "alt_text": "Example Credential Background"
 *           },
 *           "text_color": "#000000",
 *           "locale": "en-US",
 *           "logo": {
 *             "url": "https://example.com/logo.png",
 *             "alt_text": "Example Credential Logo"
 *           }
 *         }
 *       ]
 *     },
 *     {
 *       "format": "jwt_vc_json",
 *       "id": "ExampleCredentialJwtVc",
 *       "types": [
 *         "VerifiableCredential",
 *         "ExampleCredential"
 *       ],
 *       "cryptographic_binding_methods_supported": [
 *         "did:key",
 *         "did:jwk"
 *       ],
 *       "cryptographic_suites_supported": [
 *         "ES256",
 *         "Ed25519"
 *       ],
 *       "display": [
 *         {
 *           "name": "Example SD JWT Credential",
 *           "description": "This is an example SD-JWT credential",
 *           "background_color": "#ffffff",
 *           "background_image": {
 *             "url": "https://example.com/background.png",
 *             "alt_text": "Example Credential Background"
 *           },
 *           "text_color": "#000000",
 *           "locale": "en-US",
 *           "logo": {
 *             "url": "https://example.com/logo.png",
 *             "alt_text": "Example Credential Logo"
 *           }
 *         }
 *       ]
 *     }
 *   ],
 *   "display": [
 *     {
 *       "background_color": "#ffffff",
 *       "description": "This is an example issuer",
 *       "name": "Example Issuer",
 *       "locale": "en-US",
 *       "logo": {
 *         "alt_text": "Example Issuer Logo",
 *         "url": "https://example.com/logo.png"
 *       },
 *       "text_color": "#000000"
 *     }
 *   ]
 * }
 */
export interface OpenId4VcIssuersCreateOptions {
  publicIssuerId?: PublicIssuerId
  credentialsSupported: OpenId4VciCredentialSupportedWithId[]
  display?: OpenId4VciIssuerMetadataDisplay[]
}

/**
 * @example
 * {
 *   "credentialsSupported": [
 *     {
 *       "format": "vc+sd-jwt",
 *       "id": "ExampleCredentialSdJwtVc",
 *       "vct": "https://example.com/vct#ExampleCredential",
 *       "cryptographic_binding_methods_supported": [
 *         "did:key",
 *         "did:jwk"
 *       ],
 *       "cryptographic_suites_supported": [
 *         "ES256",
 *         "Ed25519"
 *       ],
 *       "display": [
 *         {
 *           "name": "Example SD JWT Credential",
 *           "description": "This is an example SD-JWT credential",
 *           "background_color": "#ffffff",
 *           "background_image": {
 *             "url": "https://example.com/background.png",
 *             "alt_text": "Example Credential Background"
 *           },
 *           "text_color": "#000000",
 *           "locale": "en-US",
 *           "logo": {
 *             "url": "https://example.com/logo.png",
 *             "alt_text": "Example Credential Logo"
 *           }
 *         }
 *       ]
 *     },
 *     {
 *       "format": "jwt_vc_json",
 *       "id": "ExampleCredentialJwtVc",
 *       "types": [
 *         "VerifiableCredential",
 *         "ExampleCredential"
 *       ],
 *       "cryptographic_binding_methods_supported": [
 *         "did:key",
 *         "did:jwk"
 *       ],
 *       "cryptographic_suites_supported": [
 *         "ES256",
 *         "Ed25519"
 *       ],
 *       "display": [
 *         {
 *           "name": "Example SD JWT Credential",
 *           "description": "This is an example SD-JWT credential",
 *           "background_color": "#ffffff",
 *           "background_image": {
 *             "url": "https://example.com/background.png",
 *             "alt_text": "Example Credential Background"
 *           },
 *           "text_color": "#000000",
 *           "locale": "en-US",
 *           "logo": {
 *             "url": "https://example.com/logo.png",
 *             "alt_text": "Example Credential Logo"
 *           }
 *         }
 *       ]
 *     }
 *   ],
 *   "display": [
 *     {
 *       "background_color": "#ffffff",
 *       "description": "This is an example issuer",
 *       "name": "Example Issuer",
 *       "locale": "en-US",
 *       "logo": {
 *         "alt_text": "Example Issuer Logo",
 *         "url": "https://example.com/logo.png"
 *       },
 *       "text_color": "#000000"
 *     }
 *   ]
 * }
 */
export interface OpenId4VcIssuersUpdateMetadataOptions {
  credentialsSupported: OpenId4VciCredentialSupportedWithId[]
  display?: OpenId4VciIssuerMetadataDisplay[]
}
