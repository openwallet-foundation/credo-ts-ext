import type {
  AnonCredsSchema,
  AnonCredsCredentialDefinition,
  AnonCredsNonRevokedInterval,
  AnonCredsPredicateType,
  V1CredentialProtocol,
  AnonCredsCredentialFormat,
  LegacyIndyCredentialFormat,
  AnonCredsCredentialFormatService,
  LegacyIndyCredentialFormatService,
  V1ProofProtocol,
  LegacyIndyProofFormatService,
  AnonCredsProofFormatService,
  LegacyIndyProofFormat,
  AnonCredsProofFormat,
} from '@credo-ts/anoncreds'
import type {
  AutoAcceptCredential,
  CredentialFormatPayload,
  HandshakeProtocol,
  CredentialProtocolVersionType,
  ReceiveOutOfBandInvitationConfig,
  OutOfBandDidCommService,
  DidResolutionMetadata,
  DidDocumentMetadata,
  ProofExchangeRecord,
  V2CredentialProtocol,
  V2ProofProtocol,
  AutoAcceptProof,
  ProofFormatPayload,
  ProofsProtocolVersionType,
  DidDocument,
  KeyType,
} from '@credo-ts/core'
import type { DIDDocument } from 'did-resolver'

export interface AgentMessageType {
  '@id': string
  '@type': string
  [key: string]: unknown
}

export interface DidResolutionResultProps {
  didResolutionMetadata: DidResolutionMetadata
  didDocument: DIDDocument | null
  didDocumentMetadata: DidDocumentMetadata
}

export interface ProofRequestMessageResponse {
  message: string
  proofRecord: ProofExchangeRecord
}

type CredentialProtocols = [
  V1CredentialProtocol,
  V2CredentialProtocol<[LegacyIndyCredentialFormatService, AnonCredsCredentialFormatService]>,
]
type CredentialFormats = [LegacyIndyCredentialFormat, AnonCredsCredentialFormat]

type ProofProtocols = [V1ProofProtocol, V2ProofProtocol<[LegacyIndyProofFormatService, AnonCredsProofFormatService]>]
type ProofFormats = [LegacyIndyProofFormat, AnonCredsProofFormat]

interface PrivateKey {
  keyType: KeyType
  privateKey: string
}

export interface ImportDidOptions {
  did: string
  didDocument?: DidDocument
  privateKeys?: PrivateKey[]
  overwrite?: boolean
}

export interface DidCreateOptions {
  method?: string
  did?: string
  options?: { [x: string]: unknown }
  secret?: { [x: string]: unknown }
  didDocument?: DidDocument
}

export interface DidOperationStateFinished {
  state: 'finished'
  did: string
  secret?: { [x: string]: unknown }
  didDocument: { [x: string]: unknown }
}
export interface DidOperationStateFailed {
  state: 'failed'
  did?: string
  secret?: { [x: string]: unknown }
  didDocument?: { [x: string]: unknown }
  reason: string
}
export interface DidOperationStateWait {
  state: 'wait'
  did?: string
  secret?: { [x: string]: unknown }
  didDocument?: { [x: string]: unknown }
}
export interface DidOperationStateActionBase {
  state: 'action'
  action: string
  did?: string
  secret?: { [x: string]: unknown }
  didDocument?: { [x: string]: unknown }
}

export interface ProposeCredentialOptions {
  protocolVersion: CredentialProtocolVersionType<CredentialProtocols>
  credentialFormats: {
    [key in CredentialFormats[number] as key['formatKey']]?: CredentialFormats[number]['credentialFormats']['createProposal']
  }
  autoAcceptCredential?: AutoAcceptCredential
  comment?: string
  connectionId: string
}

export interface AcceptCredentialProposalOptions {
  credentialFormats?: {
    [key in CredentialFormats[number] as key['formatKey']]?: CredentialFormats[number]['credentialFormats']['acceptProposal']
  }
  autoAcceptCredential?: AutoAcceptCredential
  comment?: string
}

export interface CreateOfferOptions {
  protocolVersion: CredentialProtocolVersionType<CredentialProtocols>
  credentialFormats: CredentialFormatPayload<CredentialFormats, 'createOffer'>
  autoAcceptCredential?: AutoAcceptCredential
  comment?: string
}

export interface OfferCredentialOptions {
  protocolVersion: CredentialProtocolVersionType<CredentialProtocols>
  credentialFormats: CredentialFormatPayload<CredentialFormats, 'createOffer'>
  autoAcceptCredential?: AutoAcceptCredential
  comment?: string
  connectionId: string
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

type ReceiveOutOfBandInvitationProps = Omit<ReceiveOutOfBandInvitationConfig, 'routing'>

export interface ReceiveInvitationProps extends ReceiveOutOfBandInvitationProps {
  invitation: Omit<OutOfBandInvitationSchema, 'appendedAttachments'>
}

export interface ReceiveInvitationByUrlProps extends ReceiveOutOfBandInvitationProps {
  invitationUrl: string
}

export interface AcceptInvitationConfig {
  autoAcceptConnection?: boolean
  reuseConnection?: boolean
  label?: string
  alias?: string
  imageUrl?: string
  mediatorId?: string
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
}

export interface ConnectionInvitationSchema {
  id?: string
  '@type': string
  label: string
  did?: string
  recipientKeys?: string[]
  serviceEndpoint?: string
  routingKeys?: string[]
  imageUrl?: string
}

export interface ProposeProofOptions {
  connectionId: string
  protocolVersion: ProofsProtocolVersionType<ProofProtocols>
  proofFormats: ProofFormatPayload<ProofFormats, 'createProposal'>
  goalCode?: string
  parentThreadId?: string
  autoAcceptProof?: AutoAcceptProof
  comment?: string
}

export interface AcceptProofProposalOptions {
  proofFormats?: ProofFormatPayload<ProofFormats, 'acceptProposal'>
  goalCode?: string
  willConfirm?: boolean
  autoAcceptProof?: AutoAcceptProof
  comment?: string
}

export interface AcceptProofRequestOptions {
  useReturnRoute?: boolean
  goalCode?: string
  willConfirm?: boolean
  autoAcceptProof?: AutoAcceptProof
  comment?: string
}

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

export interface CreateProofRequestOptions {
  protocolVersion: ProofsProtocolVersionType<ProofProtocols>
  proofFormats: {
    [key in ProofFormats[number] as key['formatKey']]?: AnonCredsRequestProofFormatOptions
  }
  goalCode?: string
  parentThreadId?: string
  willConfirm?: boolean
  autoAcceptProof?: AutoAcceptProof
  comment?: string
}

export interface RequestProofOptions extends CreateProofRequestOptions {
  connectionId: string
}

export interface AnonCredsSchemaResponse extends AnonCredsSchema {
  id: string
}

export interface AnonCredsCredentialDefinitionResponse extends AnonCredsCredentialDefinition {
  id: string
}
