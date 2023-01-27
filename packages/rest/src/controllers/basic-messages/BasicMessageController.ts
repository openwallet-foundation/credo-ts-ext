import type { BasicMessageRecord, BasicMessageStorageProps } from '@aries-framework/core'

import { Agent, RecordNotFoundError } from '@aries-framework/core'
import { Body, Controller, Example, Get, Path, Post, Res, Route, Tags, TsoaResponse } from 'tsoa'
import { injectable } from 'tsyringe'

import { BasicMessageRecordExample, RecordId } from '../examples'

@Tags('Basic Messages')
@Route('/basic-messages')
@injectable()
export class BasicMessageController extends Controller {
  private agent: Agent

  public constructor(agent: Agent) {
    super()
    this.agent = agent
  }

  /**
   * Retrieve basic messages by connection id
   *
   * @param connectionId Connection identifier
   * @returns BasicMessageRecord[]
   */
  @Example<BasicMessageStorageProps[]>([BasicMessageRecordExample])
  @Get('/:connectionId')
  public async getBasicMessages(@Path('connectionId') connectionId: RecordId): Promise<BasicMessageRecord[]> {
    return await this.agent.basicMessages.findAllByQuery({ connectionId })
  }

  /**
   * Send a basic message to a connection
   *
   * @param connectionId Connection identifier
   * @param content The content of the message
   */
  @Post('/:connectionId')
  public async sendMessage(
    @Path('connectionId') connectionId: RecordId,
    @Body() request: Record<'content', string>,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string }>
  ) {
    try {
      this.setStatus(204)
      await this.agent.basicMessages.sendMessage(connectionId, request.content)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, { reason: `connection with connection id "${connectionId}" not found.` })
      }
      return internalServerError(500, { message: `something went wrong: ${error}` })
    }
  }
}
