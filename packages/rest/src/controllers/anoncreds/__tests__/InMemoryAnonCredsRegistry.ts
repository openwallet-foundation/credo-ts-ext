import type {
  AnonCredsRegistry,
  AnonCredsSchema,
  AnonCredsCredentialDefinition,
  GetSchemaReturn,
  RegisterSchemaOptions,
  RegisterSchemaReturn,
  GetCredentialDefinitionReturn,
  RegisterCredentialDefinitionOptions,
  RegisterCredentialDefinitionReturn,
  GetRevocationRegistryDefinitionReturn,
  RegisterRevocationRegistryDefinitionReturn,
  GetRevocationStatusListReturn,
  RegisterRevocationStatusListReturn,
} from '@credo-ts/anoncreds'
import type { AgentContext } from '@credo-ts/core'

import { Hasher, TypedArrayEncoder } from '@credo-ts/core'

export class InMemoryAnonCredsRegistry implements AnonCredsRegistry {
  public readonly methodName = 'inMemory'
  public readonly supportedIdentifier = /.+:.+/

  private schemas: Record<string, AnonCredsSchema> = {}
  private credentialDefinitions: Record<string, AnonCredsCredentialDefinition> = {}

  public constructor({
    schemas,
    credentialDefinitions,
  }: {
    schemas?: Record<string, AnonCredsSchema>
    credentialDefinitions?: Record<string, AnonCredsCredentialDefinition>
  } = {}) {
    if (schemas) this.schemas = schemas
    if (credentialDefinitions) this.credentialDefinitions = credentialDefinitions
  }

  public async getSchema(agentContext: AgentContext, schemaId: string): Promise<GetSchemaReturn> {
    const schema = this.schemas[schemaId]

    if (!schema) {
      return {
        schemaId,
        resolutionMetadata: {
          error: 'notFound',
          message: 'Schema not found',
        },
        schemaMetadata: {},
      }
    }

    return {
      schemaId,
      schema,
      resolutionMetadata: {},
      schemaMetadata: {},
    }
  }

  public async registerSchema(
    agentContext: AgentContext,
    options: RegisterSchemaOptions,
  ): Promise<RegisterSchemaReturn> {
    const schemaHash = TypedArrayEncoder.toBase64URL(
      Hasher.hash(`${options.schema.issuerId}-${options.schema.name}-${options.schema.version}`, 'sha-256'),
    )
    const schemaId = `schema:${schemaHash}`
    this.schemas[schemaId] = options.schema

    return {
      registrationMetadata: {},
      schemaMetadata: {},
      schemaState: {
        state: 'finished',
        schemaId,
        schema: options.schema,
      },
    }
  }

  public async getCredentialDefinition(
    agentContext: AgentContext,
    credentialDefinitionId: string,
  ): Promise<GetCredentialDefinitionReturn> {
    const credentialDefinition = this.credentialDefinitions[credentialDefinitionId]

    if (!credentialDefinition) {
      return {
        credentialDefinitionId,
        resolutionMetadata: {
          error: 'notFound',
          message: 'Credential definition not found',
        },
        credentialDefinitionMetadata: {},
      }
    }

    return {
      credentialDefinitionId,
      credentialDefinition,
      resolutionMetadata: {},
      credentialDefinitionMetadata: {},
    }
  }

  public async registerCredentialDefinition(
    agentContext: AgentContext,
    options: RegisterCredentialDefinitionOptions,
  ): Promise<RegisterCredentialDefinitionReturn> {
    const credentialDefinitionHash = TypedArrayEncoder.toBase64URL(
      Hasher.hash(
        `${options.credentialDefinition.issuerId}-${options.credentialDefinition.schemaId}-${options.credentialDefinition.tag}`,
        'sha-256',
      ),
    )
    const credentialDefinitionId = `credential-definition:${credentialDefinitionHash}`
    this.credentialDefinitions[credentialDefinitionId] = options.credentialDefinition

    return {
      registrationMetadata: {},
      credentialDefinitionMetadata: {},
      credentialDefinitionState: {
        state: 'finished',
        credentialDefinitionId,
        credentialDefinition: options.credentialDefinition,
      },
    }
  }

  public getRevocationRegistryDefinition(): Promise<GetRevocationRegistryDefinitionReturn> {
    throw new Error('Method not implemented.')
  }
  public registerRevocationRegistryDefinition(): Promise<RegisterRevocationRegistryDefinitionReturn> {
    throw new Error('Method not implemented.')
  }
  public getRevocationStatusList(): Promise<GetRevocationStatusListReturn> {
    throw new Error('Method not implemented.')
  }
  public registerRevocationStatusList(): Promise<RegisterRevocationStatusListReturn> {
    throw new Error('Method not implemented.')
  }
}
