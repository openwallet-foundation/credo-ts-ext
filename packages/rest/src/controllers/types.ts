import type {
  Attachment,
  AutoAcceptCredential,
  CredentialFormatPayload,
  HandshakeProtocol,
  IndyCredentialFormat,
  ProofRecord,
  ProtocolVersionType,
  V1CredentialService,
  V2CredentialService,
} from '@aries-framework/core'
import type { OutOfBandDidCommService } from '@aries-framework/core/build/modules/oob/domain/OutOfBandDidCommService'

export interface AgentInfo {
  label: string
  endpoints: string[]
  isInitialized: boolean
  publicDid?: {
    did: string
    verkey: string
  }
}

export interface ProofRequestMessageResponse {
  message: string
  proofRecord: ProofRecord
}

type CredentialFormats = [IndyCredentialFormat]
type CredentialServices = [V1CredentialService, V2CredentialService]

export interface ProposeCredentialOptions {
  protocolVersion: ProtocolVersionType<CredentialServices>
  credentialFormats: CredentialFormatPayload<CredentialFormats, 'createProposal'>
  autoAcceptCredential?: AutoAcceptCredential
  comment?: string
  connectionId: string
}

export interface AcceptCredentialProposalOptions {
  credentialRecordId: string
  credentialFormats?: CredentialFormatPayload<CredentialFormats, 'acceptProposal'>
  autoAcceptCredential?: AutoAcceptCredential
  comment?: string
}

export interface OfferCredentialOptions {
  protocolVersion: ProtocolVersionType<CredentialServices>
  credentialFormats: CredentialFormatPayload<CredentialFormats, 'createOffer'>
  autoAcceptCredential?: AutoAcceptCredential
  comment?: string
  connectionId: string
}

export interface AcceptCredentialOfferOptions {
  credentialRecordId: string
  credentialFormats?: CredentialFormatPayload<CredentialFormats, 'acceptOffer'>
  autoAcceptCredential?: AutoAcceptCredential
  comment?: string
}

export interface AcceptCredentialRequestOptions {
  credentialRecordId: string
  credentialFormats?: CredentialFormatPayload<CredentialFormats, 'acceptRequest'>
  autoAcceptCredential?: AutoAcceptCredential
  comment?: string
}

export interface OutOfBandInvitationSchema {
  '@id'?: string
  '@type': string
  label: string
  goalCode?: string
  goal?: string
  accept?: string[]
  handshake_protocols?: HandshakeProtocol[]
  services: Array<OutOfBandDidCommService | string>
  imageUrl?: string
  appendedAttachments?: Attachment[]
}
