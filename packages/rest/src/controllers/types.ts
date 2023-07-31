import type {
  AnonCredsSchema,
  AnonCredsCredentialDefinition,
  AnonCredsPresentationPreviewAttribute,
  AnonCredsPresentationPreviewPredicate,
  AnonCredsNonRevokedInterval,
  AnonCredsPredicateType,
} from '@aries-framework/anoncreds'
import type {
  AutoAcceptCredential,
  CredentialFormatPayload,
  HandshakeProtocol,
  CredentialFormat,
  CredentialProtocolVersionType,
  ReceiveOutOfBandInvitationConfig,
  OutOfBandDidCommService,
  DidResolutionMetadata,
  DidDocumentMetadata,
  ProofExchangeRecord,
  V2CredentialProtocol,
} from '@aries-framework/core'
import type { DIDDocument } from 'did-resolver'

export interface AgentInfo {
  label: string
  endpoints: string[]
  isInitialized: boolean
}

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

type CredentialProtocols = [V2CredentialProtocol]
type CredentialFormats = [CredentialFormat]

export interface ProposeCredentialOptions {
  protocolVersion: CredentialProtocolVersionType<CredentialProtocols>
  credentialFormats: {
    indy: {
      schemaIssuerDid: string
      schemaId: string
      schemaName: string
      schemaVersion: string
      credentialDefinitionId: string
      issuerDid: string
      attributes: {
        name: string
        value: string
      }[]
    }
  }
  autoAcceptCredential?: AutoAcceptCredential
  comment?: string
  connectionId: string
}

export interface AcceptCredentialProposalOptions {
  credentialFormats?: {
    indy: {
      schemaIssuerDid: string
      schemaId: string
      schemaName: string
      schemaVersion: string
      credentialDefinitionId: string
      issuerDid: string
      attributes: {
        name: string
        value: string
      }[]
    }
  }
  autoAcceptCredential?: AutoAcceptCredential
  comment?: string
}

export interface CreateOfferOptions {
  protocolVersion: CredentialProtocolVersionType<CredentialProtocols>
  credentialFormats: {
    indy: {
      credentialDefinitionId: string
      attributes: {
        name: string
        value: string
      }[]
    }
  }
  autoAcceptCredential?: AutoAcceptCredential
  comment?: string
}

export interface OfferCredentialOptions {
  protocolVersion: CredentialProtocolVersionType<CredentialProtocols>
  credentialFormats: {
    indy: {
      credentialDefinitionId: string
      attributes: {
        name: string
        value: string
      }[]
    }
  }
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

export interface RequestProofOptionsProofRequestRestriction {
  schemaId?: string
  schemaIssuerId?: string
  schemaName?: string
  schemaVersion?: string
  issuerId?: string
  credDefId?: string
  revRegId?: string
  schemaIssuerDid?: string
  issuerDid?: string
  requiredAttributes?: string[]
  requiredAttributeValues?: { [key: string]: string }
}

export interface RequestProofOptionsRequestedAttribute {
  name?: string
  names?: string[]
  restrictions?: RequestProofOptionsProofRequestRestriction[]
  nonRevoked?: AnonCredsNonRevokedInterval
}
export interface RequestProofOptionsRequestedPredicate {
  name: string
  pType: AnonCredsPredicateType
  pValue: number
  restrictions?: RequestProofOptionsProofRequestRestriction[]
  nonRevoked?: AnonCredsNonRevokedInterval
}

export interface RequestProofOptions {
  connectionId: string
  proofRequestOptions: {
    name: string
    version: string
    requestedAttributes?: { [key: string]: RequestProofOptionsRequestedAttribute }
    requestedPredicates?: { [key: string]: RequestProofOptionsRequestedPredicate }
  }
}

export interface RequestProofProposalOptions {
  connectionId: string
  attributes: AnonCredsPresentationPreviewAttribute[]
  predicates: AnonCredsPresentationPreviewPredicate[]
  comment?: string
}

export interface AnonCredsSchemaResponse extends AnonCredsSchema {
  id: string
}

export interface AnonCredsCredentialDefinitionResponse extends AnonCredsCredentialDefinition {
  id: string
}
