import type { CredoBaseRecord } from '../../types'
import type { PublicVerifierId } from '../verifiers/OpenId4VcVerifiersControllerTypes'
import type { DifPresentationExchangeDefinition, ClaimFormat, JwtPayloadJson, Jwt, JsonObject } from '@credo-ts/core'
import type { W3cJsonCredential } from '@credo-ts/core/build/modules/vc/models/credential/W3cJsonCredential'
import type {
  OpenId4VcSiopAuthorizationResponsePayload,
  OpenId4VcSiopCreateAuthorizationRequestOptions,
  OpenId4VcSiopIdTokenPayload,
  OpenId4VcVerificationSessionState,
} from '@credo-ts/openid4vc'
import type { OpenId4VcVerificationSessionRecord as CredoOpenId4VcVerificationSessionRecord } from '@credo-ts/openid4vc/build/openid4vc-verifier/repository/OpenId4VcVerificationSessionRecord'
import type { PresentationSubmission } from '@sphereon/ssi-types'

export interface OpenId4VcVerificationSessionRecord extends CredoBaseRecord {
  publicVerifierId: PublicVerifierId

  /**
   * The state of the verification session.
   */
  state: OpenId4VcVerificationSessionState

  /**
   * Optional error message of the error that occurred during the verification session. Will be set when state is {@link OpenId4VcVerificationSessionState.Error}
   */
  errorMessage?: string

  /**
   * The signed JWT containing the authorization request
   */
  authorizationRequestJwt: string

  /**
   * URI of the authorization request. This is the url that can be used to
   * retrieve the authorization request
   */
  authorizationRequestUri: string

  /**
   * The payload of the received authorization response
   */
  authorizationResponsePayload?: OpenId4VcSiopAuthorizationResponsePayload
}

export function openId4VcVerificationSessionRecordToApiModel(
  record: CredoOpenId4VcVerificationSessionRecord,
): OpenId4VcVerificationSessionRecord {
  return {
    // Base Record
    id: record.id,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    type: record.type,

    publicVerifierId: record.verifierId,
    state: record.state,
    errorMessage: record.errorMessage,
    authorizationRequestJwt: record.authorizationRequestJwt,
    authorizationRequestUri: record.authorizationRequestUri,
    authorizationResponsePayload: record.authorizationResponsePayload,
  }
}

/**
 * @example
 * {
 *   "publicVerifierId": "1ab30c0e-1adb-4f01-90e8-cfd425c0a311",
 *   "requestSigner": {
 *     "method": "did",
 *     "didUrl": "did:key:z6MkgViwfstCL1L9i8tgsdAYEu5A62W5mA9DcmSygVVVLFuU#z6MkgViwfstCL1L9i8tgsdAYEu5A62W5mA9DcmSygVVVLFuU"
 *   },
 *   "presentationExchange": {
 *     "definition": {
 *       "id": "73797b0c-dae6-46a7-9700-7850855fee22",
 *       "name": "Example Presentation Definition",
 *       "input_descriptors": [
 *         {
 *           "id": "64125742-8b6c-422e-82cd-1beb5123ee8f",
 *           "constraints": {
 *             "limit_disclosure": "required",
 *             "fields": [
 *               {
 *                 "path": [
 *                   "$.age.over_18"
 *                 ],
 *                 "filter": {
 *                   "type": "boolean"
 *                 }
 *               }
 *             ]
 *           },
 *           "name": "Requested Sd Jwt Example Credential",
 *           "purpose": "To provide an example of requesting a credential"
 *         }
 *       ]
 *     }
 *   }
 * }
 */
export interface OpenId4VcVerificationSessionsCreateRequestOptions
  extends OpenId4VcSiopCreateAuthorizationRequestOptions {
  publicVerifierId: PublicVerifierId
}

export interface OpenId4VcVerificationSessionsCreateRequestResponse {
  verificationSession: OpenId4VcVerificationSessionRecord

  /**
   * @example openid://?request_uri=https%3A%2F%2Fexample.com%2Fsiop%2F6b293c23-d55a-4c6a-8c6a-877d69a70b4d%2Fauthorization-requests%2F6e7dce29-9d6a-4a13-a820-6a19b2ea9945
   */
  authorizationRequest: string
}

export interface W3cJsonPresentation {
  '@context': Array<string | JsonObject>
  id?: string
  type: Array<string>
  holder:
    | string
    | {
        id?: string
      }
  verifiableCredential: Array<W3cJsonCredential | string>
  [key: string]: unknown
}

/**
 * Either `idToken` and/or `presentationExchange` will be present, but not none.
 */
export interface OpenId4VcVerificationSessionsGetVerifiedAuthorizationResponseResponse {
  idToken?: {
    payload: OpenId4VcSiopIdTokenPayload
  }

  presentationExchange?: {
    submission: PresentationSubmission
    definition: DifPresentationExchangeDefinition
    presentations: Array<
      | {
          format: ClaimFormat.SdJwtVc
          encoded: string
          vcPayload: JwtPayloadJson
          signedPayload: JwtPayloadJson
          header: Jwt['header']
        }
      | {
          format: ClaimFormat.JwtVp
          encoded: string
          vcPayload: W3cJsonPresentation
          signedPayload: JwtPayloadJson
          header: Jwt['header']
        }
      | {
          format: ClaimFormat.LdpVp
          encoded: W3cJsonPresentation
          vcPayload: W3cJsonPresentation
        }
    >
  }
}
