import { Agent, RecordNotFoundError } from '@aries-framework/core'
import {
  Body,
  Get,
  InternalServerError,
  JsonController,
  NotFoundError,
  OnUndefined,
  Param,
  Post,
} from 'routing-controllers'
import { injectable } from 'tsyringe'

import { BasicMessageRequest } from '../../schemas/BasicMessageRequest'

@JsonController('/basic-messages')
@injectable()
export class BasicMessageController {
  private agent: Agent

  public constructor(agent: Agent) {
    this.agent = agent
  }

  /**
   * Retrieve basic messages by connectionId
   */
  @Get('/:connectionId')
  public async getBasicMessages(@Param('connectionId') connectionId: string) {
    const basicMessages = await this.agent.basicMessages.findAllByQuery({ connectionId: connectionId })
    return basicMessages.map((m) => m.toJSON())
  }

  /**
   * Send a basic message to a connection
   */
  @Post('/:connectionId')
  @OnUndefined(204)
  public async sendMessage(
    @Param('connectionId') connectionId: string,
    @Body()
    basicMessage: BasicMessageRequest
  ) {
    try {
      await this.agent.basicMessages.sendMessage(connectionId, basicMessage.content)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`connection with connectionId "${connectionId}" not found.`)
      }
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }
}
