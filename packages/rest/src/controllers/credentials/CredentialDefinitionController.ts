import type { SchemaId } from '../examples'
import type { CredDef } from 'indy-sdk'

import { Agent, IndySdkError } from '@aries-framework/core'
import { LedgerError } from '@aries-framework/core/build/modules/ledger/error/LedgerError'
import { LedgerNotFoundError } from '@aries-framework/core/build/modules/ledger/error/LedgerNotFoundError'
import { isIndyError } from '@aries-framework/core/build/utils/indyError'
import { Body, Controller, Example, Get, Path, Post, Res, Route, Tags, TsoaResponse } from 'tsoa'
import { injectable } from 'tsyringe'

import { CredentialDefinitionExample, CredentialDefinitionId } from '../examples'

@Tags('Credential Definitions')
@Route('/credential-definitions')
@injectable()
export class CredentialDefinitionController extends Controller {
  private agent: Agent

  public constructor(agent: Agent) {
    super()
    this.agent = agent
  }

  /**
   * Retrieve credential definition by credential definition id
   *
   * @param credentialDefinitionId
   * @returns CredDef
   */
  @Example<CredDef>(CredentialDefinitionExample)
  @Get('/:credentialDefinitionId')
  public async getCredentialDefinitionById(
    @Path('credentialDefinitionId') credentialDefinitionId: CredentialDefinitionId,
    @Res() badRequestError: TsoaResponse<400, { reason: string }>,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string }>
  ) {
    try {
      return await this.agent.ledger.getCredentialDefinition(credentialDefinitionId)
    } catch (error) {
      if (error instanceof IndySdkError && error.message === 'IndyError(LedgerNotFound): LedgerNotFound') {
        return notFoundError(404, {
          reason: `credential definition with credentialDefinitionId "${credentialDefinitionId}" not found.`,
        })
      } else if (error instanceof LedgerError && error.cause instanceof IndySdkError) {
        if (isIndyError(error.cause.cause, 'CommonInvalidStructure')) {
          return badRequestError(400, {
            reason: `credentialDefinitionId "${credentialDefinitionId}" has invalid structure.`,
          })
        }
      }
      return internalServerError(500, { message: `something went wrong: ${error}` })
    }
  }

  /**
   * Creates a new credential definition.
   *
   * @param credentialDefinitionRequest
   * @returns CredDef
   */
  @Example<CredDef>(CredentialDefinitionExample)
  @Post('/')
  public async createCredentialDefinition(
    @Body()
    credentialDefinitionRequest: {
      schemaId: SchemaId
      supportRevocation: boolean
      tag: string
    },
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string }>
  ) {
    try {
      const schema = await this.agent.ledger.getSchema(credentialDefinitionRequest.schemaId)

      return await this.agent.ledger.registerCredentialDefinition({
        schema,
        supportRevocation: credentialDefinitionRequest.supportRevocation,
        tag: credentialDefinitionRequest.tag,
      })
    } catch (error) {
      if (error instanceof LedgerNotFoundError) {
        return notFoundError(404, {
          reason: `schema with schemaId "${credentialDefinitionRequest.schemaId}" not found.`,
        })
      }

      return internalServerError(500, { message: `something went wrong: ${error}` })
    }
  }
}
