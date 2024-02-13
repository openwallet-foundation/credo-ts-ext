import type { RestAgent } from '../../utils/agent'
import type {
  AnonCredsRegisterCredentialDefinitionOptions,
  AnonCredsSchema,
  // GetCredentialDefinitionReturn,
  // GetSchemaReturn,
  // RegisterCredentialDefinitionReturn,
  // RegisterSchemaReturn,
} from '@credo-ts/anoncreds'
import type { AnonCredsRegisterCredentialDefinitionApiOptions } from '@credo-ts/anoncreds/build/AnonCredsApi'

import { Agent } from '@credo-ts/core'
import { Body, Controller, Example, Get, Path, Post, Res, Route, Tags, TsoaResponse } from 'tsoa'
import { injectable } from 'tsyringe'

import {
  anonCredsGetCredentialDefinitionExample,
  anonCredsGetSchemaExample,
  anonCredsRegisterCredentialDefinitionExample,
  anonCredsRegisterSchemaExample,
} from './examples'

// FIXME: export in credo
interface AnonCredsRegisterCredentialDefinition {
  credentialDefinition: AnonCredsRegisterCredentialDefinitionOptions
  options: AnonCredsRegisterCredentialDefinitionApiOptions & Record<string, unknown>
}

// FIXME: export in credo
interface AnonCredsRegisterSchema {
  schema: AnonCredsSchema
  options: Record<string, unknown>
}

@Tags('AnonCreds')
@Route('/anoncreds')
@injectable()
export class AnonCredsController extends Controller {
  private agent: RestAgent

  public constructor(agent: Agent) {
    super()
    this.agent = agent
  }

  /**
   * Retrieve schema by schema id
   *
   * @param schemaId
   * @returns FIXME
   */
  @Example<Record<string, unknown>>(anonCredsGetSchemaExample as unknown as Record<string, unknown>)
  @Get('/schemas/:schemaId')
  public async getSchemaById(
    @Path('schemaId') schemaId: string,
    @Res() notFoundError: TsoaResponse<404, Record<string, unknown>>,
    @Res() badRequestError: TsoaResponse<400, Record<string, unknown>>,
    @Res() internalServerError: TsoaResponse<500, Record<string, unknown>>,
  ) {
    const schemaResult = await this.agent.modules.anoncreds.getSchema(schemaId)

    const error = schemaResult.resolutionMetadata?.error

    if (error === 'notFound') {
      return notFoundError(404, schemaResult as unknown as Record<string, unknown>)
    }

    if (error === 'invalid' || error === 'unsupportedAnonCredsMethod') {
      return badRequestError(400, schemaResult as unknown as Record<string, unknown>)
    }

    if (error !== undefined || schemaResult.schema === undefined) {
      return internalServerError(500, schemaResult as unknown as Record<string, unknown>)
    }

    return schemaResult
  }

  /**
   * Creates a new AnonCreds schema and registers the schema in the AnonCreds registry
   *
   * @param body
   * @returns RegisterSchemaReturn
   */
  @Example<Record<string, unknown>>(anonCredsRegisterSchemaExample as unknown as Record<string, unknown>)
  @Post('/schemas')
  public async createSchema(
    @Body() body: AnonCredsRegisterSchema,
    @Res() internalServerError: TsoaResponse<500, Record<string, unknown>>,
  ) {
    const registerSchemaResult = await this.agent.modules.anoncreds.registerSchema(body)

    if (registerSchemaResult.schemaState.state === 'failed') {
      return internalServerError(500, registerSchemaResult as unknown as Record<string, unknown>)
    }

    return registerSchemaResult
  }

  /**
   * Retrieve credential definition by credential definition id
   *
   * @param credentialDefinitionId
   * @returns GetCredentialDefinitionReturn
   */
  @Example<Record<string, unknown>>(anonCredsGetCredentialDefinitionExample as unknown as Record<string, unknown>)
  @Get('/credential-definitions/:credentialDefinitionId')
  public async getCredentialDefinitionById(
    @Path('credentialDefinitionId') credentialDefinitionId: string,
    @Res() notFoundError: TsoaResponse<404, Record<string, unknown>>,
    @Res() badRequestError: TsoaResponse<400, Record<string, unknown>>,
    @Res() internalServerError: TsoaResponse<500, Record<string, unknown>>,
  ) {
    const credentialDefinitionResult =
      await this.agent.modules.anoncreds.getCredentialDefinition(credentialDefinitionId)

    const error = credentialDefinitionResult.resolutionMetadata?.error

    if (error === 'notFound') {
      return notFoundError(404, credentialDefinitionResult as unknown as Record<string, unknown>)
    }

    if (error === 'invalid' || error === 'unsupportedAnonCredsMethod') {
      return badRequestError(400, credentialDefinitionResult as unknown as Record<string, unknown>)
    }

    if (error !== undefined || credentialDefinitionResult.credentialDefinition === undefined) {
      return internalServerError(500, credentialDefinitionResult as unknown as Record<string, unknown>)
    }

    return credentialDefinitionResult
  }

  /**
   * Creates a new AnonCreds credential definition and registers the credential definition in the AnonCreds registry
   *
   * @param body
   * @returns RegisterCredentialDefinitionReturn
   */
  @Example<Record<string, unknown>>(anonCredsRegisterCredentialDefinitionExample as unknown as Record<string, unknown>)
  @Post('/credential-definitions')
  public async createCredentialDefinition(
    @Body() body: AnonCredsRegisterCredentialDefinition,
    @Res() internalServerError: TsoaResponse<500, Record<string, unknown>>,
  ): Promise<Record<string, unknown>> {
    const registerCredentialDefinitionResult = await this.agent.modules.anoncreds.registerCredentialDefinition(body)

    if (registerCredentialDefinitionResult.credentialDefinitionState.state === 'failed') {
      return internalServerError(500, registerCredentialDefinitionResult as unknown as Record<string, unknown>)
    }

    return registerCredentialDefinitionResult as unknown as Record<string, unknown>
  }
}
