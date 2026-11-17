import { CredoError } from '@credo-ts/core'
import { didIndyRegex } from '../../dids/didIndyUtil'

const didIndyAnonCredsBase = new RegExp(`(${didIndyRegex.source.slice(1, -1)})/anoncreds/v0`)

export const didIndySchemaIdRegex = new RegExp(`^${didIndyAnonCredsBase.source}/SCHEMA/(.+)/([0-9.]+)$`)

export const didIndyCredentialDefinitionIdRegex = new RegExp(
  `^${didIndyAnonCredsBase.source}/CLAIM_DEF/([1-9][0-9]*)/(.+)$`
)

export const didIndyRevocationRegistryIdRegex = new RegExp(
  `^${didIndyAnonCredsBase.source}/REV_REG_DEF/([1-9][0-9]*)/(.+)/(.+)$`
)

export function isDidIndySchemaId(schemaId: string) {
  return didIndySchemaIdRegex.test(schemaId)
}

export function isDidIndyCredentialDefinitionId(credentialDefinitionId: string) {
  return didIndyCredentialDefinitionIdRegex.test(credentialDefinitionId)
}

export function isDidIndyRevocationRegistryId(revocationRegistryId: string) {
  return didIndyRevocationRegistryIdRegex.test(revocationRegistryId)
}

function decodePathSegment(segment: string) {
  try {
    return decodeURIComponent(segment)
  } catch {
    return segment
  }
}

export interface ParsedIndySchemaId {
  did: string
  namespace: string
  namespaceIdentifier: string
  schemaName: string
  schemaVersion: string
}

export function parseIndySchemaId(schemaId: string): ParsedIndySchemaId {
  const match = schemaId.match(didIndySchemaIdRegex)
  if (match) {
    const [, did, namespace, namespaceIdentifier, schemaName, schemaVersion] = match

    return {
      did,
      namespace,
      namespaceIdentifier,
      schemaName: decodePathSegment(schemaName),
      schemaVersion,
    }
  }

  throw new CredoError(`Invalid did:indy schema id: ${schemaId}`)
}

export interface ParsedIndyCredentialDefinitionId {
  did: string
  namespace: string
  namespaceIdentifier: string
  schemaSeqNo: string
  tag: string
}

export function parseIndyCredentialDefinitionId(credentialDefinitionId: string): ParsedIndyCredentialDefinitionId {
  const match = credentialDefinitionId.match(didIndyCredentialDefinitionIdRegex)
  if (match) {
    const [, did, namespace, namespaceIdentifier, schemaSeqNo, tag] = match

    return {
      did,
      namespace,
      namespaceIdentifier,
      schemaSeqNo,
      tag: decodePathSegment(tag),
    }
  }

  throw new CredoError(`Invalid did:indy credential definition id: ${credentialDefinitionId}`)
}

export interface ParsedIndyRevocationRegistryId {
  did: string
  namespace: string
  namespaceIdentifier: string
  schemaSeqNo: string
  credentialDefinitionTag: string
  revocationRegistryTag: string
}

export function parseIndyRevocationRegistryId(revocationRegistryId: string): ParsedIndyRevocationRegistryId {
  const match = revocationRegistryId.match(didIndyRevocationRegistryIdRegex)
  if (match) {
    const [, did, namespace, namespaceIdentifier, schemaSeqNo, credentialDefinitionTag, revocationRegistryTag] = match

    return {
      did,
      namespace,
      namespaceIdentifier,
      schemaSeqNo,
      credentialDefinitionTag: decodePathSegment(credentialDefinitionTag),
      revocationRegistryTag: decodePathSegment(revocationRegistryTag),
    }
  }

  throw new CredoError(`Invalid did:indy revocation registry id: ${revocationRegistryId}`)
}

const indyVdrAnonCredsRegexes = [
  // issuer id
  didIndyRegex,

  // schema
  didIndySchemaIdRegex,

  // credential definition
  didIndyCredentialDefinitionIdRegex,

  // revocation registry
  didIndyRevocationRegistryIdRegex,
]

export const indyVdrAnonCredsRegistryIdentifierRegex = new RegExp(
  indyVdrAnonCredsRegexes.map((r) => r.source).join('|')
)

function encodePathSegment(segment: string, percentEncode: boolean) {
  return percentEncode ? encodeURIComponent(segment) : segment
}

export function getDidIndySchemaId(
  namespace: string,
  unqualifiedDid: string,
  name: string,
  version: string,
  percentEncode = false
) {
  return `did:indy:${namespace}:${unqualifiedDid}/anoncreds/v0/SCHEMA/${encodePathSegment(name, percentEncode)}/${version}`
}

export function getDidIndyCredentialDefinitionId(
  namespace: string,
  unqualifiedDid: string,
  schemaSeqNo: string | number,
  tag: string,
  percentEncode = false
) {
  return `did:indy:${namespace}:${unqualifiedDid}/anoncreds/v0/CLAIM_DEF/${schemaSeqNo}/${encodePathSegment(tag, percentEncode)}`
}

export function getDidIndyRevocationRegistryDefinitionId(
  namespace: string,
  unqualifiedDid: string,
  schemaSeqNo: string | number,
  credentialDefinitionTag: string,
  revocationRegistryTag: string,
  percentEncode = false
) {
  return `did:indy:${namespace}:${unqualifiedDid}/anoncreds/v0/REV_REG_DEF/${schemaSeqNo}/${encodePathSegment(credentialDefinitionTag, percentEncode)}/${encodePathSegment(revocationRegistryTag, percentEncode)}`
}

export function getDidIndyRevocationRegistryEntryId(
  namespace: string,
  unqualifiedDid: string,
  schemaSeqNo: string | number,
  credentialDefinitionTag: string,
  revocationRegistryTag: string,
  percentEncode = false
) {
  return `did:indy:${namespace}:${unqualifiedDid}/anoncreds/v0/REV_REG_ENTRY/${schemaSeqNo}/${encodePathSegment(credentialDefinitionTag, percentEncode)}/${encodePathSegment(revocationRegistryTag, percentEncode)}`
}

type EncodePathSegment = (segment: string) => string

function parseDidIndyIdentifierFormatter(identifier: string) {
  if (isDidIndySchemaId(identifier)) {
    const { did, schemaName, schemaVersion } = parseIndySchemaId(identifier)
    return (encode: EncodePathSegment) => `${did}/anoncreds/v0/SCHEMA/${encode(schemaName)}/${schemaVersion}`
  }
  if (isDidIndyCredentialDefinitionId(identifier)) {
    const { did, schemaSeqNo, tag } = parseIndyCredentialDefinitionId(identifier)
    return (encode: EncodePathSegment) => `${did}/anoncreds/v0/CLAIM_DEF/${schemaSeqNo}/${encode(tag)}`
  }
  if (isDidIndyRevocationRegistryId(identifier)) {
    const { did, schemaSeqNo, credentialDefinitionTag, revocationRegistryTag } =
      parseIndyRevocationRegistryId(identifier)
    return (encode: EncodePathSegment) =>
      `${did}/anoncreds/v0/REV_REG_DEF/${schemaSeqNo}/${encode(credentialDefinitionTag)}/${encode(revocationRegistryTag)}`
  }

  return undefined
}

export function getDidIndyIdentifierVariants(identifier: string): string[] {
  const format = parseDidIndyIdentifierFormatter(identifier)
  if (!format) return [identifier]

  return [...new Set([format(encodeURIComponent), identifier, format((segment) => segment)])]
}

/**
 * The indy ledger identifies AnonCreds objects with the unqualified identifier format in its transactions.
 * The functions below create these ledger identifiers from the parts of a did:indy identifier.
 */

// <namespaceIdentifier>:2:<schemaName>:<schemaVersion>
export function getIndyLedgerSchemaId(namespaceIdentifier: string, name: string, version: string) {
  return `${namespaceIdentifier}:2:${name}:${version}`
}

// <namespaceIdentifier>:3:CL:<schemaSeqNo>:<tag>
export function getIndyLedgerCredentialDefinitionId(
  namespaceIdentifier: string,
  schemaSeqNo: string | number,
  tag: string
) {
  return `${namespaceIdentifier}:3:CL:${schemaSeqNo}:${tag}`
}

// <namespaceIdentifier>:4:<namespaceIdentifier>:3:CL:<schemaSeqNo>:<credentialDefinitionTag>:CL_ACCUM:<revocationRegistryTag>
export function getIndyLedgerRevocationRegistryDefinitionId(
  namespaceIdentifier: string,
  schemaSeqNo: string | number,
  credentialDefinitionTag: string,
  revocationRegistryTag: string
) {
  return `${namespaceIdentifier}:4:${namespaceIdentifier}:3:CL:${schemaSeqNo}:${credentialDefinitionTag}:CL_ACCUM:${revocationRegistryTag}`
}
