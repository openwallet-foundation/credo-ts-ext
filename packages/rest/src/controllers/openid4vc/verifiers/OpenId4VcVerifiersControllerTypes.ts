import type { CredoBaseRecord } from '../../types'
import type { OpenId4VcVerifierRecord as CredoOpenId4VcVerifierRecord } from '@credo-ts/openid4vc'

/**
 * The public verifier id, used for hosting SIOP / OAuth2 endpoints and metadata
 *
 * @example 8273c049-204b-43d5-9802-b5ed353e8362
 */
export type PublicVerifierId = string

export interface OpenId4VcVerifierRecord extends CredoBaseRecord {
  publicVerifierId: PublicVerifierId
}

export function openId4vcVerifierRecordToApiModel(record: CredoOpenId4VcVerifierRecord): OpenId4VcVerifierRecord {
  return {
    // Base Record
    id: record.id,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    type: record.type,

    publicVerifierId: record.verifierId,
  }
}

/**
 * @example
 * {
 * }
 */
export interface OpenId4VcVerifiersCreateOptions {
  publicVerifierId?: PublicVerifierId
}
