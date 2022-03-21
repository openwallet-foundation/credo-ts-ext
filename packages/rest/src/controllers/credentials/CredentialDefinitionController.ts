import { Agent } from '@aries-framework/core'
import { LedgerNotFoundError } from '@aries-framework/core/build/modules/ledger/error/LedgerNotFoundError'
import { Body, Get, InternalServerError, JsonController, NotFoundError, Param, Post } from 'routing-controllers'
import { Inject, Service } from 'typedi'

import { CredentialDefinitionRequest } from '../../schemas/CredentialDefinitionRequest'

@JsonController('/credential-definitions')
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
  public async getCredentialDefinitionById(@Param('credentialDefinitionId') credentialDefinitionId: string) {
    try {
      return await this.agent.ledger.getCredentialDefinition(credentialDefinitionId)
    } catch (error) {
      if (error instanceof LedgerNotFoundError) {
        throw new NotFoundError(
          `credential definition with credentialDefinitionId "${credentialDefinitionId}" not found.`
        )
      }
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }

  /**
   * Creates a new CredentialDefinition.
   * Returns CredentialDefinitionId and CredentialDefinition
   */
  @Post('/')
  public async createCredentialDefinition(@Body() credentialDefinitionRequest: CredentialDefinitionRequest) {
    try {
      const schema = await this.agent.ledger.getSchema(credentialDefinitionRequest.schemaId)

      return await this.agent.ledger.registerCredentialDefinition({
        schema,
        supportRevocation: credentialDefinitionRequest.supportRevocation,
        tag: credentialDefinitionRequest.tag,
      })
    } catch (error) {
      if (error instanceof LedgerNotFoundError) {
        throw new NotFoundError(`schema with schemaId "${credentialDefinitionRequest.schemaId}" not found.`)
      }
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }
}
