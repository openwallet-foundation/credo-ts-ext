import { Agent, AriesFrameworkError } from '@aries-framework/core'
import { LedgerNotFoundError } from '@aries-framework/core/build/modules/ledger/error/LedgerNotFoundError'
import {
  InternalServerError,
  ForbiddenError,
  NotFoundError,
  JsonController,
  Get,
  Post,
  Param,
  Body,
} from 'routing-controllers'
import { Service, Inject } from 'typedi'

import { SchemaTemplate } from '../../schemas/SchemaRequest'

@JsonController('/schemas')
@Service()
export class SchemaController {
  @Inject()
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
