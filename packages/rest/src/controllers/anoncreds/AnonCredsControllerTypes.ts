import type { AnyJsonObject } from '../types'
import type {
  AnonCredsCredentialDefinition,
  AnonCredsRegisterCredentialDefinitionOptions as CredoAnonCredsCredentialDefinitionOptions,
  AnonCredsResolutionMetadata,
  AnonCredsSchema,
  RegisterCredentialDefinitionReturnStateAction,
  RegisterCredentialDefinitionReturnStateFailed,
  RegisterCredentialDefinitionReturnStateFinished,
  RegisterCredentialDefinitionReturnStateWait,
  RegisterSchemaReturnStateAction,
  RegisterSchemaReturnStateFailed,
  RegisterSchemaReturnStateFinished,
  RegisterSchemaReturnStateWait,
} from '@credo-ts/anoncreds'

/**
 * @example did:indy:bcovrin:test:WgWxqztrNooG92RXvxSTWv/anoncreds/v0/SCHEMA/schema-name/1.0
 */
export type AnonCredsSchemaId = string

/**
 * @example did:indy:bcovrin:test:WgWxqztrNooG92RXvxSTWv/anoncreds/v0/CLAIM_DEF/20/definition
 */
export type AnonCredsCredentialDefinitionId = string

export interface AnonCredsGetSchemaFailedResponse {
  schemaId: AnonCredsSchemaId
  schema?: AnonCredsSchema
  resolutionMetadata: Partial<AnonCredsResolutionMetadata>
  schemaMetadata: AnyJsonObject
}

export interface AnonCredsGetSchemaSuccessResponse {
  schemaId: AnonCredsSchemaId
  schema: AnonCredsSchema
  resolutionMetadata: AnyJsonObject
  schemaMetadata: AnyJsonObject
}

/**
 * @example {
 *  "schema": {
 *    "issuerId": "did:indy:bcovrin:test:WgWxqztrNooG92RXvxSTWv",
 *    "name": "schema-name",
 *    "version": "1.0",
 *    "attrNames": ["age"]
 *  }
 * }
 */
export interface AnonCredsRegisterSchemaBody {
  schema: AnonCredsSchema
  options?: { [x: string]: unknown }
}

export interface AnonCredsRegisterSchemaSuccessResponse {
  jobId?: string
  schemaState: RegisterSchemaReturnStateFinished
  schemaMetadata: AnyJsonObject
  registrationMetadata: AnyJsonObject
}

export interface AnonCredsRegisterSchemaWaitResponse {
  jobId?: string
  schemaState: RegisterSchemaReturnStateWait

  schemaMetadata: AnyJsonObject
  registrationMetadata: AnyJsonObject
}

export interface AnonCredsRegisterSchemaActionResponse {
  jobId?: string
  schemaState: RegisterSchemaReturnStateAction

  schemaMetadata: AnyJsonObject
  registrationMetadata: AnyJsonObject
}

export interface AnonCredsRegisterSchemaFailedResponse {
  jobId?: string
  schemaState: RegisterSchemaReturnStateFailed

  schemaMetadata: AnyJsonObject
  registrationMetadata: AnyJsonObject
}

export interface AnonCredsGetCredentialDefinitionFailedResponse {
  credentialDefinitionId: AnonCredsCredentialDefinitionId
  credentialDefinition?: AnonCredsCredentialDefinition
  resolutionMetadata: Partial<AnonCredsResolutionMetadata>
  credentialDefinitionMetadata: AnyJsonObject
}

export interface AnonCredsGetCredentialDefinitionSuccessResponse {
  credentialDefinitionId: AnonCredsCredentialDefinitionId
  credentialDefinition: AnonCredsCredentialDefinition
  resolutionMetadata: AnyJsonObject
  credentialDefinitionMetadata: AnyJsonObject
}

export interface AnonCredsRegisterCredentialDefinitionApiOptions {
  supportRevocation: boolean;
}

export interface AnonCredsRegisterCredentialDefinitionOptions
  extends AnonCredsRegisterCredentialDefinitionApiOptions,
    AnyJsonObject {}

export interface AnonCredsRegisterCredentialDefinitionInput extends CredoAnonCredsCredentialDefinitionOptions {}

/**
 * @example {
 *  "credentialDefinition": {
 *    "issuerId": "did:indy:bcovrin:test:WgWxqztrNooG92RXvxSTWv",
 *    "schemaId": "did:indy:bcovrin:test:WgWxqztrNooG92RXvxSTWv/anoncreds/v0/SCHEMA/schema-name/1.0",
 *    "tag": "definition"
 *  },
 *  "options": {
 *     "supportRevocation": true
 *   }
 * }
 */
export interface AnonCredsRegisterCredentialDefinitionBody {
  credentialDefinition: AnonCredsRegisterCredentialDefinitionInput
  options: AnonCredsRegisterCredentialDefinitionOptions
}

export interface AnonCredsRegisterCredentialDefinitionSuccessResponse {
  jobId?: string
  credentialDefinitionState: RegisterCredentialDefinitionReturnStateFinished
  credentialDefinitionMetadata: AnyJsonObject
  registrationMetadata: AnyJsonObject
}

export interface AnonCredsRegisterCredentialDefinitionWaitResponse {
  jobId?: string
  credentialDefinitionState: RegisterCredentialDefinitionReturnStateWait

  credentialDefinitionMetadata: AnyJsonObject
  registrationMetadata: AnyJsonObject
}

export interface AnonCredsRegisterCredentialDefinitionActionResponse {
  jobId?: string
  credentialDefinitionState: RegisterCredentialDefinitionReturnStateAction

  credentialDefinitionMetadata: AnyJsonObject
  registrationMetadata: AnyJsonObject
}

export interface AnonCredsRegisterCredentialDefinitionFailedResponse {
  jobId?: string
  credentialDefinitionState: RegisterCredentialDefinitionReturnStateFailed

  credentialDefinitionMetadata: AnyJsonObject
  registrationMetadata: AnyJsonObject
}
