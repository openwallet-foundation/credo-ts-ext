import type { CredentialDefinitionModel } from '../../models/CredentialDefinitionModel'
import type { CredDef } from 'indy-sdk'

import { Agent, IndySdkError } from '@aries-framework/core'
import { isIndyError } from '@aries-framework/core/build/utils/indyError'
import {
  NotFoundError,
  InternalServerError,
  JsonController,
  Get,
  Post,
  Param,
  Body,
  BadRequestError,
} from 'routing-controllers'
import { Service, Inject } from 'typedi'

import { CredentialDefinitionRequest } from '../../schemas/CredentialDefinitionRequest'

@JsonController('/credential-defintions')
@Service()
export class CredentialDefinitionController {
  @Inject()
  private agent: Agent

  public constructor(agent: Agent) {
    this.agent = agent
  }

  /**
   * Retrieve credentialDefinition by credentialDefinitionId
   */
  @Get('/:credentialDefinitionId')
  public async getCredentialDefinitionById(
    @Param('credentialDefinitionId') credentialDefinitionId: string
  ): Promise<CredentialDefinitionModel> {
    try {
      const credentialDefinition = await this.agent.ledger.getCredentialDefinition(credentialDefinitionId)

      return this.mapCredentialDefinition(credentialDefinition)
    } catch (error) {
      if (error instanceof IndySdkError) {
        if (isIndyError(error.cause, 'LedgerNotFound')) {
          throw new NotFoundError(
            `credential definition with credentialDefinitionId "${credentialDefinitionId}" not found.`
          )
        }
        if (isIndyError(error.cause, 'CommonInvalidStructure')) {
          throw new BadRequestError(`credentialDefinitionId "${credentialDefinitionId}" has invalid structure.`)
        }
      }
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }

  /**
   * Creates a new CredentialDefinition.
   * Returns CredentialDefinitionId and CredentialDefinition
   */
  @Post('/')
  public async createCredentialDefinition(
    @Body() credentialDefinitionRequest: CredentialDefinitionRequest
  ): Promise<CredentialDefinitionModel> {
    try {
      const schema = await this.agent.ledger.getSchema(credentialDefinitionRequest.schemaId)

      const credentialDefinition = await this.agent.ledger.registerCredentialDefinition({
        schema,
        supportRevocation: credentialDefinitionRequest.supportRevocation,
        tag: credentialDefinitionRequest.tag,
      })

      return this.mapCredentialDefinition(credentialDefinition)
    } catch (error) {
      if (error instanceof IndySdkError) {
        if (isIndyError(error.cause, 'LedgerNotFound')) {
          throw new NotFoundError(`schema with schemaId "${credentialDefinitionRequest.schemaId}" not found.`)
        }
      }
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }

  private mapCredentialDefinition(credentialDefinition: CredDef): CredentialDefinitionModel {
    return {
      id: credentialDefinition.id,
      ver: credentialDefinition.ver,
      type: credentialDefinition.type,
      schemaId: credentialDefinition.schemaId,
      tag: credentialDefinition.tag,
    }
  }
}
