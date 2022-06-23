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
 * @pattern "(/^([a-zA-Z0-9]{21,22}):3:CL:(([1-9][0-9]*)|([a-zA-Z0-9]{21,22}:2:.+:[0-9.]+)):(.+)?$/)"
 */
export type CredentialDefinitionId = string

/**
 * @example "WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0"
 * @pattern /^[a-zA-Z0-9]{21,22}:2:.+:[0-9.]+$/
 */
export type SchemaId = string

export interface ProofRequestMessageResponse {
  message: string
  proofRecord: ProofRecord
}
