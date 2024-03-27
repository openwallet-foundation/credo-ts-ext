import type { AnyJsonObject } from '../types'
import type { DidResolutionMetadata, DidDocumentMetadata, KeyType } from '@credo-ts/core'
import type { DIDDocument } from 'did-resolver'

/**
 * @example did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK
 */
export type Did = string

/**
 * @example
 * {
 *   "@context": [
 *     "https://w3id.org/did/v1",
 *     "https://w3id.org/security/suites/ed25519-2018/v1",
 *     "https://w3id.org/security/suites/x25519-2019/v1"
 *   ],
 *   "id": "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK",
 *   "verificationMethod": [
 *     {
 *       "id": "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK#z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK",
 *       "type": "Ed25519VerificationKey2018",
 *       "controller": "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK",
 *       "publicKeyBase58": "48GdbJyVULjHDaBNS6ct9oAGtckZUS5v8asrPzvZ7R1w"
 *     }
 *   ],
 *   "authentication": [
 *     "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK#z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK"
 *   ],
 *   "assertionMethod": [
 *     "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK#z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK"
 *   ],
 *   "keyAgreement": [
 *     {
 *       "id": "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK#z6LSj72tK8brWgZja8NLRwPigth2T9QRiG1uH9oKZuKjdh9p",
 *       "type": "X25519KeyAgreementKey2019",
 *       "controller": "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK",
 *       "publicKeyBase58": "8RrinpnzRDqzUjzZuHsmNJUYbzsK1eqkQB5e5SgCvKP4"
 *     }
 *   ],
 *   "capabilityInvocation": [
 *     "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK#z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK"
 *   ],
 *   "capabilityDelegation": [
 *     "did:key:z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK#z6MkhaXgBZDvotDkL5257faiztiGiC2QtKLGpbnnEGta2doK"
 *   ]
 * }
 */
export type DidDocumentJson = DIDDocument

export interface DidResolveSuccessResponse {
  didResolutionMetadata: DidResolutionMetadata
  didDocument: DidDocumentJson
  didDocumentMetadata: DidDocumentMetadata
}

export interface DidResolveFailedResponse {
  didResolutionMetadata: DidResolutionMetadata & { message: string; error: string }
  didDocument: DidDocumentJson | null
  didDocumentMetadata: DidDocumentMetadata
}

interface PrivateKey {
  keyType: KeyType

  /**
   * Base58 encoded private key
   */
  privateKeyBase58: string
}

export interface DidImportOptions {
  did: Did
  didDocument?: DidDocumentJson

  /**
   * Private keys to import as part of the did document
   */
  privateKeys?: PrivateKey[]

  /**
   * Whether to overwrite the existing did document and private keys
   */
  overwrite?: boolean
}

export interface DidImportFailedResponse {
  message: string
}

// TODO: add typing for more did methods
export type DidCreateOptions = KeyOrJwkDidCreateOptions | DidCreateBaseOptions

interface DidCreateBaseOptions {
  method?: string
  did?: Did
  options?: AnyJsonObject
  secret?: AnyJsonObject
  didDocument?: DidDocumentJson
}

interface KeyOrJwkDidCreateOptions extends Omit<DidCreateBaseOptions, 'did' | 'didDocument'> {
  method: 'key' | 'jwk'

  options: {
    keyType: KeyType
  }
  // how to encode buffer?
  secret?: {
    seedBase58?: string
    privateKeyBase58?: string
  }
}

export interface DidCreateBaseResponse<T> {
  jobId?: string
  didRegistrationMetadata: AnyJsonObject
  didDocumentMetadata: DidResolutionMetadata

  didState: T
}

export type DidCreateFinishedResponse = DidCreateBaseResponse<{
  state: 'finished'
  did: Did
  didDocument: DidDocumentJson

  secret?: AnyJsonObject
}>

export type DidCreateFailedResponse = DidCreateBaseResponse<{
  state: 'failed'
  did?: Did
  didDocument?: DidDocumentJson

  secret?: AnyJsonObject
  reason: string
}>

export type DidCreateWaitResponse = DidCreateBaseResponse<{
  state: 'wait'
  did?: Did
  didDocument?: DidDocumentJson

  secret?: AnyJsonObject
}>

export type DidCreateActionResponse = DidCreateBaseResponse<{
  state: 'action'
  action: string
  did?: Did
  didDocument?: DidDocumentJson

  secret?: AnyJsonObject

  // Other fields can be added
  [key: string]: unknown
}>
