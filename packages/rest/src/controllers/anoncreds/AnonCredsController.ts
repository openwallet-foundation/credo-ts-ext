import type {
  AnonCredsGetCredentialDefinitionFailedResponse,
  AnonCredsGetCredentialDefinitionSuccessResponse,
  AnonCredsGetSchemaFailedResponse,
  AnonCredsGetSchemaSuccessResponse,
  AnonCredsRegisterCredentialDefinitionActionResponse,
  AnonCredsRegisterCredentialDefinitionFailedResponse,
  AnonCredsRegisterCredentialDefinitionSuccessResponse,
  AnonCredsRegisterCredentialDefinitionWaitResponse,
  AnonCredsRegisterSchemaActionResponse,
  AnonCredsRegisterSchemaFailedResponse,
  AnonCredsRegisterSchemaSuccessResponse,
  AnonCredsRegisterSchemaWaitResponse,
} from './AnonCredsControllerTypes'

import { Body, Controller, Example, Response, Get, Path, Post, Route, Tags, Security, Request } from 'tsoa'
import { injectable } from 'tsyringe'

import { RequestWithAgent } from '../../tenantMiddleware'
import { alternativeResponse } from '../../utils/response'

import {
  anonCredsGetCredentialDefinitionFailedExample,
  anonCredsGetCredentialDefinitionSuccessExample,
  anonCredsGetSchemaFailedExample,
  anonCredsGetSchemaSuccessExample,
  anonCredsRegisterCredentialDefinitionFailedExample,
  anonCredsRegisterCredentialDefinitionSuccessExample,
  anonCredsRegisterSchemaFailedExample,
  anonCredsRegisterSchemaSuccessExample,
} from './AnonCredsControllerExamples'
import {
  AnonCredsRegisterSchemaBody,
  AnonCredsSchemaId,
  AnonCredsCredentialDefinitionId,
  AnonCredsRegisterCredentialDefinitionBody,
} from './AnonCredsControllerTypes'

@Tags('AnonCreds')
@Route('/anoncreds')
@Security('tenants', ['tenant'])
@injectable()
export class AnonCredsController extends Controller {
  /**
   * Retrieve schema by schema id
   */
  @Example<AnonCredsGetSchemaSuccessResponse>(anonCredsGetSchemaSuccessExample)
  @Response<AnonCredsGetSchemaFailedResponse>(404, 'Schema not found', anonCredsGetSchemaFailedExample)
  @Response<AnonCredsGetSchemaFailedResponse>(
    400,
    'Invalid schemaId or unknown AnonCreds method provided',
    anonCredsGetSchemaFailedExample,
  )
  @Response<AnonCredsGetSchemaFailedResponse>(500, 'Unknown error retrieving schema', anonCredsGetSchemaFailedExample)
  @Get('/schemas/:schemaId')
  public async getSchemaById(
    @Request() request: RequestWithAgent,
    @Path('schemaId') schemaId: AnonCredsSchemaId,
  ): Promise<AnonCredsGetSchemaSuccessResponse> {
    const schemaResult = await request.user.agent.modules.anoncreds.getSchema(schemaId)
    const error = schemaResult.resolutionMetadata?.error

    if (schemaResult.resolutionMetadata.error === 'notFound') {
      this.setStatus(404)
      return alternativeResponse<AnonCredsGetSchemaFailedResponse>(schemaResult as AnonCredsGetSchemaFailedResponse)
    }

    if (error === 'invalid' || error === 'unsupportedAnonCredsMethod') {
      this.setStatus(400)
      return alternativeResponse<AnonCredsGetSchemaFailedResponse>(schemaResult as AnonCredsGetSchemaFailedResponse)
    }

    if (error !== undefined || schemaResult.schema === undefined) {
      this.setStatus(500)
      return alternativeResponse<AnonCredsGetSchemaFailedResponse>(schemaResult as AnonCredsGetSchemaFailedResponse)
    }

    return schemaResult as AnonCredsGetSchemaSuccessResponse
  }

  /**
   * Creates a new AnonCreds schema and registers the schema in the AnonCreds registry
   */
  @Example<AnonCredsRegisterSchemaSuccessResponse>(anonCredsRegisterSchemaSuccessExample)
  @Response<AnonCredsRegisterSchemaFailedResponse>(
    500,
    'Unknown error registering schema',
    anonCredsRegisterSchemaFailedExample,
  )
  @Response<AnonCredsRegisterSchemaActionResponse>(200, 'Action required')
  @Response<AnonCredsRegisterSchemaWaitResponse>(202, 'Wait for action to complete')
  @Post('/schemas')
  public async registerSchema(
    @Request() request: RequestWithAgent,
    @Body() body: AnonCredsRegisterSchemaBody,
  ): Promise<AnonCredsRegisterSchemaSuccessResponse> {
    const registerSchemaResult = await request.user.agent.modules.anoncreds.registerSchema({
      schema: body.schema,
      options: body.options ?? {},
    })

    if (registerSchemaResult.schemaState.state === 'failed') {
      this.setStatus(500)
      return alternativeResponse<AnonCredsRegisterSchemaFailedResponse>({
        // NOTE: destructuring the result so ts will correctly infer that 'failed' state
        ...registerSchemaResult,
        schemaState: registerSchemaResult.schemaState,
      })
    }

    if (registerSchemaResult.schemaState.state === 'wait') {
      // The request has been accepted for processing, but the processing has not been completed.
      this.setStatus(202)
      return alternativeResponse<AnonCredsRegisterSchemaWaitResponse>({
        ...registerSchemaResult,
        schemaState: registerSchemaResult.schemaState,
      })
    }

    if (registerSchemaResult.schemaState.state === 'action') {
      return alternativeResponse<AnonCredsRegisterSchemaActionResponse>({
        ...registerSchemaResult,
        schemaState: registerSchemaResult.schemaState,
      })
    }

    return {
      ...registerSchemaResult,
      schemaState: registerSchemaResult.schemaState,
    }
  }
  /**
   * Retrieve credentialDefinition by credentialDefinition id
   */
  @Example<AnonCredsGetCredentialDefinitionSuccessResponse>(anonCredsGetCredentialDefinitionSuccessExample)
  @Response<AnonCredsGetCredentialDefinitionFailedResponse>(
    404,
    'CredentialDefinition not found',
    anonCredsGetCredentialDefinitionFailedExample,
  )
  @Response<AnonCredsGetCredentialDefinitionFailedResponse>(
    400,
    'Invalid credentialDefinitionId or unknown AnonCreds method provided',
    anonCredsGetCredentialDefinitionFailedExample,
  )
  @Response<AnonCredsGetCredentialDefinitionFailedResponse>(
    500,
    'Unknown error retrieving credentialDefinition',
    anonCredsGetCredentialDefinitionFailedExample,
  )
  @Get('/credential-definitions/:credentialDefinitionId')
  public async getCredentialDefinitionById(
    @Request() request: RequestWithAgent,
    @Path('credentialDefinitionId') credentialDefinitionId: AnonCredsCredentialDefinitionId,
  ): Promise<AnonCredsGetCredentialDefinitionSuccessResponse> {
    const credentialDefinitionResult =
      await request.user.agent.modules.anoncreds.getCredentialDefinition(credentialDefinitionId)
    const error = credentialDefinitionResult.resolutionMetadata?.error

    if (credentialDefinitionResult.resolutionMetadata?.error === 'notFound') {
      this.setStatus(404)
      return alternativeResponse(credentialDefinitionResult)
    }

    if (error === 'invalid' || error === 'unsupportedAnonCredsMethod') {
      this.setStatus(400)
      return alternativeResponse(credentialDefinitionResult)
    }

    if (error !== undefined || credentialDefinitionResult.credentialDefinition === undefined) {
      this.setStatus(500)
      return alternativeResponse(credentialDefinitionResult)
    }

    return credentialDefinitionResult as AnonCredsGetCredentialDefinitionSuccessResponse
  }

  /**
   * Creates a new AnonCreds credentialDefinition and registers the credentialDefinition in the AnonCreds registry
   */
  @Example<AnonCredsRegisterCredentialDefinitionSuccessResponse>(anonCredsRegisterCredentialDefinitionSuccessExample)
  @Response<AnonCredsRegisterCredentialDefinitionFailedResponse>(
    500,
    'Unknown error registering credentialDefinition',
    anonCredsRegisterCredentialDefinitionFailedExample,
  )
  @Response<AnonCredsRegisterCredentialDefinitionActionResponse>(200, 'Action required')
  @Response<AnonCredsRegisterCredentialDefinitionWaitResponse>(202, 'Wait for action to complete')
  @Post('/credential-definitions')
  public async registerCredentialDefinition(
    @Request() request: RequestWithAgent,
    @Body() body: AnonCredsRegisterCredentialDefinitionBody,
  ): Promise<AnonCredsRegisterCredentialDefinitionSuccessResponse> {
    const registerCredentialDefinitionResult = await request.user.agent.modules.anoncreds.registerCredentialDefinition({
      credentialDefinition: body.credentialDefinition,
      options: body.options ?? {},
    })

    if (registerCredentialDefinitionResult.credentialDefinitionState.state === 'failed') {
      this.setStatus(500)
      return alternativeResponse<AnonCredsRegisterCredentialDefinitionFailedResponse>({
        // NOTE: destructuring the result so ts will correctly infer that 'failed' state
        ...registerCredentialDefinitionResult,
        credentialDefinitionState: registerCredentialDefinitionResult.credentialDefinitionState,
      })
    }

    if (registerCredentialDefinitionResult.credentialDefinitionState.state === 'wait') {
      // The request has been accepted for processing, but the processing has not been completed.
      this.setStatus(202)
      return alternativeResponse<AnonCredsRegisterCredentialDefinitionWaitResponse>({
        ...registerCredentialDefinitionResult,
        credentialDefinitionState: registerCredentialDefinitionResult.credentialDefinitionState,
      })
    }

    if (registerCredentialDefinitionResult.credentialDefinitionState.state === 'action') {
      return alternativeResponse<AnonCredsRegisterCredentialDefinitionActionResponse>({
        ...registerCredentialDefinitionResult,
        credentialDefinitionState: registerCredentialDefinitionResult.credentialDefinitionState,
      })
    }

    return {
      ...registerCredentialDefinitionResult,
      credentialDefinitionState: registerCredentialDefinitionResult.credentialDefinitionState,
    }
  }
}
