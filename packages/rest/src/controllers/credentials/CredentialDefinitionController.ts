import type { RestAgent } from '../../utils/agent'
import type { Did, SchemaId } from '../examples'
import type { AnonCredsCredentialDefinitionResponse } from '../types'

import { Agent } from '@credo-ts/core'
import { Body, Controller, Example, Get, Path, Post, Res, Route, Tags, TsoaResponse } from 'tsoa'
import { injectable } from 'tsyringe'

import { CredentialDefinitionExample, CredentialDefinitionId } from '../examples'

@Tags('Credential Definitions')
@Route('/credential-definitions')
@injectable()
export class CredentialDefinitionController extends Controller {
  private agent: RestAgent

  public constructor(agent: Agent) {
    super()
    this.agent = agent
  }

  /**
   * Retrieve credential definition by credential definition id
   *
   * @param credentialDefinitionId
   * @returns AnonCredsCredentialDefinitionResponse
   */
  @Example<AnonCredsCredentialDefinitionResponse>(CredentialDefinitionExample)
  @Get('/:credentialDefinitionId')
  public async getCredentialDefinitionById(
    @Path('credentialDefinitionId') credentialDefinitionId: CredentialDefinitionId,
    @Res() badRequestError: TsoaResponse<400, { reason: string }>,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string }>,
  ): Promise<AnonCredsCredentialDefinitionResponse> {
    const {
      credentialDefinition,
      resolutionMetadata: { error },
    } = await this.agent.modules.anoncreds.getCredentialDefinition(credentialDefinitionId)

    if (error === 'notFound') {
      return notFoundError(404, {
        reason: `credential definition with credentialDefinitionId "${credentialDefinitionId}" not found.`,
      })
    }

    if (error === 'invalid' || error === 'unsupportedAnonCredsMethod') {
      return badRequestError(400, {
        reason: `credentialDefinitionId "${credentialDefinitionId}" has invalid structure.`,
      })
    }

    if (error !== undefined || credentialDefinition === undefined) {
      return internalServerError(500, { message: `something went wrong: ${error}` })
    }

    return {
      id: credentialDefinitionId,
      ...credentialDefinition,
    }
  }

  /**
   * Creates a new credential definition.
   *
   * @param credentialDefinitionRequest
   * @returns AnonCredsCredentialDefinitionResponse
   */
  @Example<AnonCredsCredentialDefinitionResponse & { id: string }>(CredentialDefinitionExample)
  @Post('/')
  public async createCredentialDefinition(
    @Body()
    credentialDefinitionRequest: {
      issuerId: Did
      schemaId: SchemaId
      tag: string
    },
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string }>,
  ): Promise<AnonCredsCredentialDefinitionResponse> {
    const {
      resolutionMetadata: { error },
    } = await this.agent.modules.anoncreds.getSchema(credentialDefinitionRequest.schemaId)

    if (error === 'notFound' || error === 'invalid' || error === 'unsupportedAnonCredsMethod') {
      return notFoundError(404, {
        reason: `schema with schemaId "${credentialDefinitionRequest.schemaId}" not found.`,
      })
    }
    if (error) {
      return internalServerError(500, { message: `something went wrong: ${error}` })
    }

    const {
      credentialDefinitionState: { state, credentialDefinitionId, credentialDefinition },
    } = await this.agent.modules.anoncreds.registerCredentialDefinition({
      credentialDefinition: {
        issuerId: credentialDefinitionRequest.issuerId,
        schemaId: credentialDefinitionRequest.schemaId,
        tag: credentialDefinitionRequest.tag,
      },
      // FIXME: revocation support in API
      options: {
        supportRevocation: false,
      },
    })

    if (state !== 'finished' || credentialDefinitionId === undefined || credentialDefinition === undefined) {
      return internalServerError(500, { message: `something went wrong` })
    }

    return {
      id: credentialDefinitionId,
      ...credentialDefinition,
    }
  }
}
