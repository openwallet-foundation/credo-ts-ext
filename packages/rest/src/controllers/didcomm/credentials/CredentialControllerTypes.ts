import type {
  V1CredentialProtocol,
  AnonCredsCredentialFormat,
  LegacyIndyCredentialFormat,
  AnonCredsCredentialFormatService,
  LegacyIndyCredentialFormatService,
} from '@credo-ts/anoncreds'
import type {
  AutoAcceptCredential,
  CredentialFormatPayload,
  CredentialProtocolVersionType,
  V2CredentialProtocol,
} from '@credo-ts/core'

type CredentialProtocols = [
  V1CredentialProtocol,
  V2CredentialProtocol<[LegacyIndyCredentialFormatService, AnonCredsCredentialFormatService]>,
]
type CredentialFormats = [LegacyIndyCredentialFormat, AnonCredsCredentialFormat]

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
