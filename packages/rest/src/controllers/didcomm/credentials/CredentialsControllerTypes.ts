import type { CredoBaseRecord, RecordId, ThreadId } from '../../types'
import type { AnonCredsDidCommCredentialFormat, LegacyIndyCredentialFormat } from '@credo-ts/anoncreds'
import type {
  DidCommAutoAcceptCredential,
  DidCommCredentialFormatPayload,
  DidCommCredentialPreviewAttributeOptions,
  CredentialRecordBinding,
  DidCommCredentialRole,
  DidCommCredentialState,
  DidCommCredentialExchangeRecord as CredoCredentialExchangeRecord,
  GetCredentialFormatDataReturn,
  DidCommPlaintextMessage
} from '@credo-ts/didcomm'

type CredentialFormats = [LegacyIndyCredentialFormat, AnonCredsDidCommCredentialFormat]
type CredentialProtocolVersion = 'v1' | 'v2'

export interface DidCommCredentialExchangeRecord extends CredoBaseRecord {
  connectionId?: RecordId
  threadId: ThreadId
  parentThreadId?: ThreadId
  state: DidCommCredentialState
  role: DidCommCredentialRole
  autoAcceptCredential?: DidCommAutoAcceptCredential
  revocationNotification?: {
    revocationDate: Date
    comment?: string
  }
  errorMessage?: string
  protocolVersion: string
  credentials: CredentialRecordBinding[]
  credentialAttributes?: DidCommCredentialPreviewAttributeOptions[]
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
  autoAcceptCredential?: DidCommAutoAcceptCredential
  comment?: string
  connectionId: RecordId
}

export interface AcceptCredentialProposalOptions {
  credentialFormats?: {
    [key in CredentialFormats[number] as key['formatKey']]?: CredentialFormats[number]['credentialFormats']['acceptProposal']
  }
  autoAcceptCredential?: DidCommAutoAcceptCredential
  comment?: string
}

export interface CreateOfferOptions {
  protocolVersion: CredentialProtocolVersion
  credentialFormats: DidCommCredentialFormatPayload<CredentialFormats, 'createOffer'>
  autoAcceptCredential?: DidCommAutoAcceptCredential
  comment?: string
}

export interface DidCommCredentialsCreateOfferResponse {
  message: DidCommPlaintextMessage
  credentialExchange: DidCommCredentialExchangeRecord
}

export interface OfferCredentialOptions {
  protocolVersion: CredentialProtocolVersion
  credentialFormats: DidCommCredentialFormatPayload<CredentialFormats, 'createOffer'>
  autoAcceptCredential?: DidCommAutoAcceptCredential
  comment?: string
  connectionId: RecordId
}

export interface AcceptCredentialOfferOptions {
  credentialFormats?: DidCommCredentialFormatPayload<CredentialFormats, 'acceptOffer'>
  autoAcceptCredential?: DidCommAutoAcceptCredential
  comment?: string
}

export interface AcceptCredentialRequestOptions {
  credentialFormats?: DidCommCredentialFormatPayload<CredentialFormats, 'acceptRequest'>
  autoAcceptCredential?: DidCommAutoAcceptCredential
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
