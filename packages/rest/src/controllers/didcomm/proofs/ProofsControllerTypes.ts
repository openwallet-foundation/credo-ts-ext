import type { CredoBaseRecord, RecordId, ThreadId } from '../../types'
import type {
  AnonCredsProofFormat,
  AnonCredsNonRevokedInterval,
  AnonCredsPredicateType,
  AnonCredsSelectedCredentials,
  AnonCredsProposeProofFormat,
  AnonCredsRequestProofFormat,
  AnonCredsProofRequestRestriction,
  LegacyIndyProofFormat,
} from '@credo-ts/anoncreds'
import type {
  ProofExchangeRecord as CredoProofExchangeRecord,
  AutoAcceptProof,
  ProofState,
  ProofRole,
  CreateProofRequestOptions,
  AcceptProofRequestOptions,
  ProposeProofOptions,
  AcceptProofProposalOptions,
  GetProofFormatDataReturn,
} from '@credo-ts/core'
import type { PlaintextMessage } from '@credo-ts/core/build/types'

import { maybeMapValues } from '../../../utils/maybeMapValues'

type ProofFormats = [LegacyIndyProofFormat, AnonCredsProofFormat]
type ProofProtocolVersion = 'v1' | 'v2'

export interface DidCommProofExchangeRecord extends CredoBaseRecord {
  connectionId?: RecordId
  threadId: ThreadId
  parentThreadId?: ThreadId
  state: ProofState
  role: ProofRole
  autoAcceptProof?: AutoAcceptProof
  errorMessage?: string
  protocolVersion: string
}

export function proofExchangeRecordToApiModel(record: CredoProofExchangeRecord): DidCommProofExchangeRecord {
  return {
    // Base Record
    id: record.id,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    type: record.type,

    // Proof
    connectionId: record.connectionId,
    threadId: record.threadId,
    parentThreadId: record.parentThreadId,
    state: record.state,
    role: record.role,
    autoAcceptProof: record.autoAcceptProof,
    errorMessage: record.errorMessage,
    protocolVersion: record.protocolVersion,
  }
}

interface AcceptAnonCredsProposalOptions extends NonNullable<AnonCredsProofFormat['proofFormats']['acceptProposal']> {}

export interface DidCommProofsProposeProofOptions
  extends Omit<ProposeProofOptions, 'proofFormats' | 'protocolVersion'> {
  protocolVersion: ProofProtocolVersion
  proofFormats: {
    indy?: AnonCredsProposeProofFormat
    anoncreds?: AnonCredsProposeProofFormat
  }
}

export interface DidCommProofsAcceptProposalOptions
  extends Omit<AcceptProofProposalOptions, 'proofFormats' | 'proofRecordId'> {
  protocolVersion: ProofProtocolVersion
  proofFormats?: {
    indy?: AcceptAnonCredsProposalOptions
    anoncreds?: AcceptAnonCredsProposalOptions
  }
}

export interface DidCommProofsCreateRequestResponse {
  message: PlaintextMessage
  proofExchange: DidCommProofExchangeRecord
}

export interface DidCommProofsAcceptRequestOptions
  extends Omit<AcceptProofRequestOptions, 'proofFormats' | 'proofRecordId'> {
  proofFormats?: {
    indy?: AnonCredsSelectedCredentials
    anoncreds?: AnonCredsSelectedCredentials
  }
}

export interface DidCommProofsCreateRequestOptions
  extends Omit<CreateProofRequestOptions, 'proofFormats' | 'protocolVersion'> {
  protocolVersion: ProofProtocolVersion
  proofFormats: {
    indy?: AnonCredsRequestProofFormatOptions
    anoncreds?: AnonCredsRequestProofFormatOptions
  }
}

export interface DidCommProofsSendRequestOptions extends DidCommProofsCreateRequestOptions {
  connectionId: RecordId
}

// Below method help with transforming API request models to Credo/AnonCreds models
function transformApiAttributeMarkersToCredo(attributes?: { [key: string]: boolean }) {
  if (!attributes) {
    return undefined
  }

  return Object.entries(attributes).reduce<{ [key in `attr::${string}::marker`]: '1' | '0' }>(
    (acc, [attr, val]) => ({
      [`attr::${attr}::marker`]: val ? '1' : '0',
      ...acc,
    }),
    {},
  )
}

function transformApiAttributeValuesToCredo(attributeValues?: { [key in string]: string }) {
  if (!attributeValues) {
    return undefined
  }

  return Object.entries(attributeValues).reduce<{ [key in `attr::${string}::value`]: string }>(
    (acc, [attr, val]) => ({
      [`attr::${attr}::value`]: val,
      ...acc,
    }),
    {},
  )
}

function transformApiRestrictionToCredo({
  attributeValues,
  attributeMarkers,
  ...others
}: AnonCredsProofRequestRestrictionOptions): AnonCredsProofRequestRestriction {
  return {
    ...transformApiAttributeMarkersToCredo(attributeMarkers),
    ...transformApiAttributeValuesToCredo(attributeValues),
    ...others,
  }
}

export function transformApiProofFormatToCredo(
  proofFormat?: AnonCredsRequestProofFormatOptions,
): AnonCredsRequestProofFormat | undefined {
  if (!proofFormat) {
    return undefined
  }

  const { requested_attributes, requested_predicates, ...rest } = proofFormat

  return {
    ...rest,
    requested_attributes: maybeMapValues(
      ({ restrictions, ...other }) => ({
        restrictions: restrictions?.map(transformApiRestrictionToCredo),
        ...other,
      }),
      requested_attributes,
    ),
    requested_predicates: maybeMapValues(
      ({ restrictions, ...other }) => ({
        restrictions: restrictions?.map(transformApiRestrictionToCredo),
        ...other,
      }),
      requested_predicates,
    ),
  }
}

// Below types are needed because tsoa doesn't support
// attr::{string}::marker syntax in the request body
export interface AnonCredsProofRequestRestrictionOptions {
  schema_id?: string
  schema_issuer_id?: string
  schema_name?: string
  schema_version?: string
  issuer_id?: string
  cred_def_id?: string
  rev_reg_id?: string
  schema_issuer_did?: string
  issuer_did?: string
  attributeValues?: {
    [key: string]: string
  }
  attributeMarkers?: {
    [key: string]: boolean
  }
}

export interface AnonCredsRequestedAttributeOptions {
  name?: string
  names?: string[]
  restrictions?: AnonCredsProofRequestRestrictionOptions[]
  non_revoked?: AnonCredsNonRevokedInterval
}

export interface AnonCredsRequestedPredicateOptions {
  name: string
  p_type: AnonCredsPredicateType
  p_value: number
  restrictions?: AnonCredsProofRequestRestrictionOptions[]
  non_revoked?: AnonCredsNonRevokedInterval
}

export interface AnonCredsRequestProofFormatOptions {
  name: string
  version: string
  non_revoked?: AnonCredsNonRevokedInterval
  requested_attributes?: {
    [key: string]: AnonCredsRequestedAttributeOptions
  }
  requested_predicates?: {
    [key: string]: AnonCredsRequestedPredicateOptions
  }
}

export interface DidCommProofsGetFormatDataResponse extends GetProofFormatDataReturn<ProofFormats> {}
