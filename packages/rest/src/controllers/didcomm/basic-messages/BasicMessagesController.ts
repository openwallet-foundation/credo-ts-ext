import { Agent, RecordNotFoundError, BasicMessageRole } from '@credo-ts/core'
import { Body, Controller, Example, Get, Post, Query, Route, Tags } from 'tsoa'
import { injectable } from 'tsyringe'

import { apiErrorResponse } from '../../../utils/response'
import { RecordId, ThreadId } from '../../types'

import { basicMessageRecordExample } from './BasicMessagesControllerExamples'
import {
  basicMessageRecordToApiModel,
  DidCommBasicMessagesSendOptions,
  type DidCommBasicMessagesRecord,
} from './BasicMessagesControllerTypes'

@Tags('DIDComm Basic Messages')
@Route('/didcomm/basic-messages')
@injectable()
export class DidCommBasicMessagesController extends Controller {
  public constructor(private agent: Agent) {
    super()
  }

  /**
   * Retrieve basic messages by connection id
   *
   * @param connectionId Connection identifier
   * @returns BasicMessageRecord[]
   */
  @Example<DidCommBasicMessagesRecord[]>([basicMessageRecordExample])
  @Get('/')
  public async findBasicMessagesByQuery(
    @Query('connectionId') connectionId?: RecordId,
    @Query('role') role?: BasicMessageRole,
    @Query('threadId') threadId?: ThreadId,
    @Query('parentThreadId') parentThreadId?: ThreadId,
  ): Promise<DidCommBasicMessagesRecord[]> {
    const basicMessageRecords = await this.agent.basicMessages.findAllByQuery({
      connectionId,
      role,
      threadId,
      parentThreadId,
    })
    return basicMessageRecords.map(basicMessageRecordToApiModel)
  }

  /**
   * Send a basic message to a connection
   *
   * @param connectionId Connection identifier
   * @param content The content of the message
   * @returns BasicMessageRecord
   */
  @Example<DidCommBasicMessagesRecord>(basicMessageRecordExample)
  @Post('/')
  public async sendMessage(@Body() body: DidCommBasicMessagesSendOptions) {
    try {
      const basicMessageRecord = await this.agent.basicMessages.sendMessage(
        body.connectionId,
        body.content,
        body.parentThreadId,
      )
      return basicMessageRecordToApiModel(basicMessageRecord)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        this.setStatus(404)
        return apiErrorResponse(`connection with id '${body.connectionId}' not found.`)
      }

      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }
}
