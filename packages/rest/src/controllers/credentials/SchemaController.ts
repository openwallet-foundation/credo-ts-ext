import { Agent, AriesFrameworkError, IndySdkError } from '@aries-framework/core'
import { LedgerError } from '@aries-framework/core/build/modules/ledger/error/LedgerError'
import { isIndyError } from '@aries-framework/core/build/utils/indyError'
import { Body, Get, Path, Post, Res, Route, Tags, TsoaResponse } from 'tsoa'
import { injectable } from 'tsyringe'

import { SchemaRequest } from '../../schemas/SchemaRequest'
import { SchemaId } from '../types'

@Tags('Schemas')
@Route('/schemas')
@injectable()
export class SchemaController {
  private agent: Agent

  public constructor(agent: Agent) {
    this.agent = agent
  }

  /**
   * Retrieve schema by schema id
   *
   * @param schemaId
   * @returns Schema
   */
  @Get('/:schemaId')
  public async getSchemaById(
    @Path('schemaId') schemaId: SchemaId,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() forbiddenError: TsoaResponse<403, { reason: string }>,
    @Res() badRequestError: TsoaResponse<400, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string; error: unknown }>
  ) {
    try {
      return await this.agent.ledger.getSchema(schemaId)
    } catch (error) {
      if (error instanceof IndySdkError && error.message === 'IndyError(LedgerNotFound): LedgerNotFound') {
        return notFoundError(404, {
          reason: `schema definition with schemaId "${schemaId}" not found.`,
        })
      } else if (error instanceof LedgerError && error.cause instanceof IndySdkError) {
        if (isIndyError(error.cause.cause, 'LedgerInvalidTransaction')) {
          return forbiddenError(403, {
            reason: `schema definition with schemaId "${schemaId}" can not be returned.`,
          })
        }
        if (isIndyError(error.cause.cause, 'CommonInvalidStructure')) {
          return badRequestError(400, {
            reason: `schemaId "${schemaId}" has invalid structure.`,
          })
        }
      }

      return internalServerError(500, { message: 'something went wrong', error: error })
    }
  }

  /**
   * Creates a new schema and registers schema on ledger
   *
   * @param schema
   * @returns schema
   */
  @Post('/')
  public async createSchema(
    @Body() schema: SchemaRequest,
    @Res() forbiddenError: TsoaResponse<400, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string; error: unknown }>
  ) {
    try {
      return await this.agent.ledger.registerSchema({
        name: schema.name,
        version: schema.version,
        attributes: schema.attributes,
      })
    } catch (error) {
      if (error instanceof AriesFrameworkError) {
        if (error.message.includes('UnauthorizedClientRequest')) {
          return forbiddenError(400, {
            reason: 'this action is not allowed.',
          })
        }
      }
      return internalServerError(500, { message: 'something went wrong', error: error })
    }
  }
}
