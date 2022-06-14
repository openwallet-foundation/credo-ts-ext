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

@JsonController('/basic-messages')
@injectable()
export class BasicMessageController {
  private agent: Agent

  public constructor(agent: Agent) {
    this.agent = agent
  }

  /**
   * Retrieve basic messages by connection id
   *
   * @param connectionId
   * @returns BasicMessageRecord[]
   */
  @Get('/:connectionId')
  public async getBasicMessages(@Param('connectionId') connectionId: string) {
    const basicMessages = await this.agent.basicMessages.findAllByQuery({ connectionId })
    return basicMessages.map((m) => m.toJSON())
  }

  /**
   * Send a basic message to a connection
   *
   * @param connectionId
   * @param message
   */
  @Post('/:connectionId')
  @OnUndefined(204)
  public async sendMessage(
    @Param('connectionId') connectionId: string,
    @Body()
    request: Record<'message', string>
  ) {
    try {
      const { message } = request
      await this.agent.basicMessages.sendMessage(connectionId, message)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`connection with connection id "${connectionId}" not found.`)
      }
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }
}
