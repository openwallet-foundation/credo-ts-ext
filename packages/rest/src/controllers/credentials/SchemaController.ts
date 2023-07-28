import type { RestAgent } from '../../utils/agent'
import type { Did, Version } from '../examples'
import type { AnonCredsSchemaResponse } from '../types'

import { Agent } from '@aries-framework/core'
import { Body, Example, Get, Path, Post, Res, Route, Tags, TsoaResponse } from 'tsoa'
import { injectable } from 'tsyringe'

import { SchemaId, SchemaExample } from '../examples'

@Tags('Schemas')
@Route('/schemas')
@injectable()
export class SchemaController {
  private agent: RestAgent

  public constructor(agent: Agent) {
    this.agent = agent
  }

  /**
   * Retrieve schema by schema id
   *
   * @param schemaId
   * @returns AnonCredsSchemaResponse
   */
  @Example<AnonCredsSchemaResponse>(SchemaExample)
  @Get('/:schemaId')
  public async getSchemaById(
    @Path('schemaId') schemaId: SchemaId,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() badRequestError: TsoaResponse<400, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string }>
  ) {
    const { schema, resolutionMetadata } = await this.agent.modules.anoncreds.getSchema(schemaId)

    const error = resolutionMetadata?.error

    if (error === 'notFound') {
      return notFoundError(404, {
        reason: `schema definition with schemaId "${schemaId}" not found.`,
      })
    }

    if (error === 'invalid' || error === 'unsupportedAnonCredsMethod') {
      return badRequestError(400, {
        reason: `schemaId "${schemaId}" has invalid structure.`,
      })
    }

    if (error !== undefined || schema === undefined) {
      return internalServerError(500, { message: `something went wrong: ${error}` })
    }

    return {
      id: schemaId,
      ...schema,
    }
  }

  /**
   * Creates a new schema and registers schema on ledger
   *
   * @param schema
   * @returns AnonCredsSchemaResponse
   */
  @Example<AnonCredsSchemaResponse>(SchemaExample)
  @Post('/')
  public async createSchema(
    @Body()
    schema: {
      issuerId: Did
      name: string
      version: Version
      attrNames: string[]
    },
    @Res() internalServerError: TsoaResponse<500, { message: string }>
  ) {
    const { schemaState } = await this.agent.modules.anoncreds.registerSchema({
      schema: {
        issuerId: schema.issuerId,
        name: schema.name,
        version: schema.version,
        attrNames: schema.attrNames,
      },
      options: {},
    })

    if (schemaState.state === 'failed') {
      return internalServerError(500, { message: `something went wrong: ${schemaState.reason}` })
    }

    if (schemaState.state !== 'finished' || schemaState.schemaId === undefined || schemaState.schema === undefined) {
      return internalServerError(500, { message: `something went wrong: unknown` })
    }

    return {
      id: schemaState.schemaId,
      ...schemaState.schema,
    }
  }
}
