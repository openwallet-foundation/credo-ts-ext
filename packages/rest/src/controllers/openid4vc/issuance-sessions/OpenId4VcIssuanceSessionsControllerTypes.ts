import type { Did } from '../../did/DidsControllerTypes'
import type { CredoBaseRecord } from '../../types'
import type { PublicIssuerId } from '../issuers/OpenId4VcIssuersControllerTypes'
import type {
  OpenId4VcIssuanceSessionState,
  OpenId4VciCreateCredentialOfferOptions,
  OpenId4VciCredentialFormatProfile,
  OpenId4VciCredentialOfferPayload,
} from '@credo-ts/openid4vc'
import type { OpenId4VcIssuanceSessionRecord as CredoOpenId4VcIssuanceSessionRecord } from '@credo-ts/openid4vc/build/openid4vc-issuer/repository/OpenId4VcIssuanceSessionRecord'

export interface OpenId4VcIssuanceSessionRecord extends CredoBaseRecord {
  publicIssuerId: PublicIssuerId

  /**
   * The state of the issuance session.
   */
  state: OpenId4VcIssuanceSessionState

  /**
   * cNonce that should be used in the credential request by the holder.
   */
  cNonce?: string

  /**
   * The time at which the cNonce expires.
   */
  cNonceExpiresAt?: Date

  /**
   * Pre authorized code used for the issuance session. Only used when a pre-authorized credential
   * offer is created.
   */
  preAuthorizedCode?: string

  /**
   * Optional user pin that needs to be provided by the user in the access token request.
   */
  userPin?: string

  /**
   * User-defined metadata that will be provided to the credential request to credential mapper
   * to allow to retrieve the needed credential input data. Can be the credential data itself,
   * or some other data that is needed to retrieve the credential data.
   */
  issuanceMetadata?: Record<string, unknown>

  /**
   * The credential offer that was used to create the issuance session.
   */
  credentialOfferPayload: OpenId4VciCredentialOfferPayload

  /**
   * URI of the credential offer. This is the url that cn can be used to retrieve
   * the credential offer
   */
  credentialOfferUri: string

  /**
   * Optional error message of the error that occurred during the issuance session. Will be set when state is {@link OpenId4VcIssuanceSessionState.Error}
   */
  errorMessage?: string
}

export function openId4VcIssuanceSessionRecordToApiModel(
  record: CredoOpenId4VcIssuanceSessionRecord,
): OpenId4VcIssuanceSessionRecord {
  return {
    // Base Record
    id: record.id,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    type: record.type,

    publicIssuerId: record.issuerId,
    state: record.state,
    cNonce: record.cNonce,
    cNonceExpiresAt: record.cNonceExpiresAt,
    preAuthorizedCode: record.preAuthorizedCode,
    userPin: record.userPin,
    issuanceMetadata: record.issuanceMetadata,
    credentialOfferPayload: record.credentialOfferPayload,
    credentialOfferUri: record.credentialOfferUri,
    errorMessage: record.errorMessage,
  }
}

type DisclosureFrame = {
  [key: string]: boolean | DisclosureFrame
}

export interface OpenId4VcIssuanceSessionCreateOfferSdJwtCredentialOptions {
  /**
   * The id of the `credential_supported` entry that is present in the issuer
   * metadata. This id is used to identify the credential that is being offered.
   *
   * @example "ExampleCredentialSdJwtVc"
   */
  credentialSupportedId: string

  /**
   * The format of the credential that is being offered.
   * MUST match the format of the `credential_supported` entry.
   *
   * @example {@link OpenId4VciCredentialFormatProfile.SdJwtVc}
   */
  format: OpenId4VciCredentialFormatProfile.SdJwtVc

  /**
   * The issuer of the credential.
   *
   * Only DID based issuance is supported at the moment.
   */
  issuer: {
    method: 'did'
    didUrl: Did
  }

  /**
   * The payload of the credential that will be issued.
   *
   * If `vct` claim is included, it MUST match the `vct` claim from the issuer metadata.
   * If `vct` claim is not included, it will be added automatically.
   *
   * @example
   * {
   *   "first_name": "John",
   *   "last_name": "Doe",
   *   "age": {
   *      "over_18": true,
   *      "over_21": true,
   *      "over_65": false
   *   }
   * }
   */
  payload: {
    vct?: string
    [key: string]: unknown
  }

  /**
   * Disclosure frame indicating which fields of the credential can be selectively disclosed.
   *
   * @example
   * {
   *   "first_name": false,
   *   "last_name": false,
   *   "age": {
   *      "over_18": true,
   *      "over_21": true,
   *      "over_65": true
   *   }
   * }
   */
  disclosureFrame: DisclosureFrame
}

/**
 * @example
 * {
 *   "publicIssuerId": "a868257d-7149-4d4d-a52c-78f3197ee538",
 *   "preAuthorizedCodeFlowConfig": {
 *     "userPinRequired": false
 *   },
 *   "credentials": [
 *     {
 *       "credentialSupportedId": "ExampleCredentialSdJwtVc",
 *       "format": "vc+sd-jwt",
 *       "issuer": {
 *         "method": "did",
 *         "didUrl": "did:key:z6MkgViwfstCL1L9i8tgsdAYEu5A62W5mA9DcmSygVVVLFuU#z6MkgViwfstCL1L9i8tgsdAYEu5A62W5mA9DcmSygVVVLFuU"
 *       },
 *       "payload": {
 *         "first_name": "John",
 *         "last_name": "Doe",
 *         "age": {
 *           "over_18": true,
 *           "over_21": true,
 *           "over_65": false
 *         }
 *       },
 *       "disclosureFrame": {
 *         "first_name": false,
 *         "last_name": false,
 *         "age": {
 *           "over_18": true,
 *           "over_21": true,
 *           "over_65": true
 *         }
 *       }
 *     }
 *   ]
 * }
 */
export interface OpenId4VcIssuanceSessionsCreateOfferOptions
  extends Omit<OpenId4VciCreateCredentialOfferOptions, 'offeredCredentials'> {
  publicIssuerId: PublicIssuerId
  credentials: Array<OpenId4VcIssuanceSessionCreateOfferSdJwtCredentialOptions>
}

export interface OpenId4VcIssuanceSessionsCreateOfferResponse {
  issuanceSession: OpenId4VcIssuanceSessionRecord

  /**
   * @example openid-credential-offer://?credential_offer_uri=https%3A%2F%2Fexample.com%2Foid4vci%2F6b293c23-d55a-4c6a-8c6a-877d69a70b4d%2Foffers%2F6e7dce29-9d6a-4a13-a820-6a19b2ea9945
   */
  credentialOffer: string
}
