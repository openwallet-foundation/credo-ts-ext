import type { ProofRecord } from '@aries-framework/core'
import type { DidInfo } from '@aries-framework/core/build/wallet/Wallet'

export interface AgentInfo {
  label: string
  endpoints: string[]
  isInitialized: boolean
  publicDid?: DidInfo
}

/**
 * @example "821f9b26-ad04-4f56-89b6-e2ef9c72b36e"
 */
export type RecordId = string

/**
 * @example "WgWxqztrNooG92RXvxSTWv:3:CL:20:tag"
 */
export type CredentialDefinitionId = string

/**
 * @example "WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0"
 */
export type SchemaId = string

export interface ProofRequestMessageResponse {
  message: string
  proofRecord: ProofRecord
}
