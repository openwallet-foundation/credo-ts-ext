import type { CredoBaseRecord, RecordId, ThreadId } from '../../types'
import type { AnonCredsCredentialFormat, LegacyIndyCredentialFormat } from '@credo-ts/anoncreds'
import type {
  AutoAcceptCredential,
  CredentialFormatPayload,
  CredentialPreviewAttributeOptions,
  CredentialRecordBinding,
  CredentialRole,
  CredentialState,
  CredentialExchangeRecord as CredoCredentialExchangeRecord,
  GetCredentialFormatDataReturn,
} from '@credo-ts/core'
import type { PlaintextMessage } from '@credo-ts/core/build/types'

type CredentialFormats = [LegacyIndyCredentialFormat, AnonCredsCredentialFormat]
type CredentialProtocolVersion = 'v1' | 'v2'

export interface DidCommCredentialExchangeRecord extends CredoBaseRecord {
  connectionId?: RecordId
  threadId: ThreadId
  parentThreadId?: ThreadId
  state: CredentialState
  role: CredentialRole
  autoAcceptCredential?: AutoAcceptCredential
  revocationNotification?: {
    revocationDate: Date
    comment?: string
  }
  errorMessage?: string
  protocolVersion: string
  credentials: CredentialRecordBinding[]
  credentialAttributes?: CredentialPreviewAttributeOptions[]
}

export interface DidCommCredentialExchangeWithFormatData {
  credentialExchange: DidCommCredentialExchangeRecord
  formatData?: GetCredentialFormatDataReturn<CredentialFormats>
}

export function credentialExchangeRecordToApiModel(
  record: CredoCredentialExchangeRecord,
): DidCommCredentialExchangeRecord {
  return {
    // Base Record
    id: record.id,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    type: record.type,

    connectionId: record.connectionId,
    threadId: record.threadId,
    parentThreadId: record.parentThreadId,
    state: record.state,
    role: record.role,
    autoAcceptCredential: record.autoAcceptCredential,
    revocationNotification: record.revocationNotification
      ? {
          revocationDate: record.revocationNotification.revocationDate,
          comment: record.revocationNotification.comment,
        }
      : undefined,
    errorMessage: record.errorMessage,
    protocolVersion: record.protocolVersion,
    credentials: record.credentials,
    credentialAttributes: record.credentialAttributes?.map((a) => ({
      name: a.name,
      value: a.value,
      mimeType: a.mimeType,
    })),
  }
}

export interface ProposeCredentialOptions {
  protocolVersion: CredentialProtocolVersion
  credentialFormats: {
    [key in CredentialFormats[number] as key['formatKey']]?: CredentialFormats[number]['credentialFormats']['createProposal']
  }
  autoAcceptCredential?: AutoAcceptCredential
  comment?: string
  connectionId: RecordId
}

export interface AcceptCredentialProposalOptions {
  credentialFormats?: {
    [key in CredentialFormats[number] as key['formatKey']]?: CredentialFormats[number]['credentialFormats']['acceptProposal']
  }
  autoAcceptCredential?: AutoAcceptCredential
  comment?: string
}

export interface CreateOfferOptions {
  protocolVersion: CredentialProtocolVersion
  credentialFormats: CredentialFormatPayload<CredentialFormats, 'createOffer'>
  autoAcceptCredential?: AutoAcceptCredential
  comment?: string
}

export interface DidCommCredentialsCreateOfferResponse {
  message: PlaintextMessage
  credentialExchange: DidCommCredentialExchangeRecord
}

export interface OfferCredentialOptions {
  protocolVersion: CredentialProtocolVersion
  credentialFormats: CredentialFormatPayload<CredentialFormats, 'createOffer'>
  autoAcceptCredential?: AutoAcceptCredential
  comment?: string
  connectionId: RecordId
}

export interface AcceptCredentialOfferOptions {
  credentialFormats?: CredentialFormatPayload<CredentialFormats, 'acceptOffer'>
  autoAcceptCredential?: AutoAcceptCredential
  comment?: string
}

export interface AcceptCredentialRequestOptions {
  credentialFormats?: CredentialFormatPayload<CredentialFormats, 'acceptRequest'>
  autoAcceptCredential?: AutoAcceptCredential
  comment?: string
}

export interface DidCommCredentialsGetFormatDataResponse
  extends Omit<GetCredentialFormatDataReturn<CredentialFormats>, 'offerAttributes'> {
  offerAttributes?: Array<{
    'mime-type'?: string
    name: string
    value: string
  }>
}
