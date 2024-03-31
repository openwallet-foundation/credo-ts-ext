import { RecordNotFoundError, BasicMessageRole } from '@credo-ts/core'
import { Body, Controller, Example, Get, Post, Query, Request, Route, Security, Tags } from 'tsoa'
import { injectable } from 'tsyringe'

import { RequestWithAgent } from '../../../tenantMiddleware'
import { apiErrorResponse } from '../../../utils/response'
import { RecordId, ThreadId } from '../../types'

import { basicMessageRecordExample } from './BasicMessagesControllerExamples'
import {
  basicMessageRecordToApiModel,
  DidCommBasicMessagesSendOptions,
  type DidCommBasicMessageRecord,
} from './BasicMessagesControllerTypes'

@Tags('DIDComm Basic Messages')
@Route('/didcomm/basic-messages')
@Security('tenants', ['tenant'])
@injectable()
export class DidCommBasicMessagesController extends Controller {
  /**
   * Retrieve basic messages by connection id
   *
   * @param connectionId Connection identifier
   * @returns BasicMessageRecord[]
   */
  @Example<DidCommBasicMessageRecord[]>([basicMessageRecordExample])
  @Get('/')
  public async findBasicMessagesByQuery(
    @Request() request: RequestWithAgent,
    @Query('connectionId') connectionId?: RecordId,
    @Query('role') role?: BasicMessageRole,
    @Query('threadId') threadId?: ThreadId,
    @Query('parentThreadId') parentThreadId?: ThreadId,
  ): Promise<DidCommBasicMessageRecord[]> {
    const basicMessageRecords = await request.user.agent.basicMessages.findAllByQuery({
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
  @Example<DidCommBasicMessageRecord>(basicMessageRecordExample)
  @Post('/send')
  public async sendMessage(@Request() request: RequestWithAgent, @Body() body: DidCommBasicMessagesSendOptions) {
    try {
      const basicMessageRecord = await request.user.agent.basicMessages.sendMessage(
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
