import { Agent, AriesFrameworkError, IndySdkError } from '@aries-framework/core'
import { LedgerError } from '@aries-framework/core/build/modules/ledger/error/LedgerError'
import { LedgerNotFoundError } from '@aries-framework/core/build/modules/ledger/error/LedgerNotFoundError'
import { isIndyError } from '@aries-framework/core/build/utils/indyError'
import {
  InternalServerError,
  ForbiddenError,
  NotFoundError,
  JsonController,
  BadRequestError,
  Get,
  Post,
  Param,
  Body,
} from 'routing-controllers'
import { injectable } from 'tsyringe'

import { SchemaTemplate } from '../../schemas/SchemaRequest'

@JsonController('/schemas')
@injectable()
export class SchemaController {
  private agent: Agent

  public constructor(agent: Agent) {
    this.agent = agent
  }

  /**
   * Retrieve schema by schemaId
   */
  @Get('/:schemaId')
  public async getSchemaById(@Param('schemaId') schemaId: string) {
    try {
      return await this.agent.ledger.getSchema(schemaId)
    } catch (error) {
      if (error instanceof LedgerNotFoundError) {
        throw new NotFoundError(`schema definition with schemaId "${schemaId}" not found.`)
      } else if (error instanceof LedgerError && error.cause instanceof IndySdkError) {
        if (isIndyError(error.cause.cause, 'LedgerInvalidTransaction')) {
          throw new ForbiddenError(`schema definition with schemaId "${schemaId}" can not be returned.`)
        }
        if (isIndyError(error.cause.cause, 'CommonInvalidStructure')) {
          throw new BadRequestError(`schemaId "${schemaId}" has invalid structure.`)
        }
      }

      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }

  /**
   * Creates a new schema and registers schema on ledger
   * Returns created schema
   */
  @Post('/')
  public async createSchema(@Body() schema: SchemaTemplate) {
    try {
      return await this.agent.ledger.registerSchema({
        name: schema.name,
        version: schema.version,
        attributes: schema.attributes,
      })
    } catch (error) {
      if (error instanceof AriesFrameworkError) {
        if (error.message.includes('UnauthorizedClientRequest')) {
          throw new ForbiddenError(`this action is not allowed.`)
        }
      }
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }
}
