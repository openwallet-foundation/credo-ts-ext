import { Agent } from '@aries-framework/core'
import { InternalServerError, JsonController, Post } from 'routing-controllers'
import { Inject, Service } from 'typedi'

import { CreateDidSchemaRequest } from '../../schemas/CreateDidSchemaRequest'
import { RegisterDidSchemaRequest } from '../../schemas/RegisterDidSchemaRequest'

JsonController('/dids')
@Service()
export class DidController {
  @Inject()
  private agent: Agent

  public constructor(agent: Agent) {
    this.agent = agent
  }

  /**
   * Create DID
   */
  @Post('/:createDID')
  public async createDid(didSchema: CreateDidSchemaRequest) {
    try {
      return await this.agent.wallet.createDid(didSchema)
    } catch (error) {
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }

  /**
   * Register DID
   */
  @Post('/registerDID')
  public async registerPublicDid(didSchema: RegisterDidSchemaRequest) {
    try {
      return await this.agent.ledger.registerPublicDid(didSchema.did, didSchema.verkey, didSchema.alias)
    } catch (error) {
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }
}
