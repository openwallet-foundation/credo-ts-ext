import type { BasicMessageStorageProps } from '@credo-ts/core'

import { Agent, RecordNotFoundError } from '@credo-ts/core'
import { Body, Controller, Example, Get, Path, Post, Res, Route, Tags, TsoaResponse } from 'tsoa'
import { injectable } from 'tsyringe'

import { toApiModel } from '../../utils/serialize'
import { RecordId } from '../examples'

import { BasicMessageRecordExample } from './examples'

@Tags('DIDComm Basic Messages')
@Route('/didcomm/basic-messages')
@injectable()
export class DidCommBasicMessageController extends Controller {
  public constructor(private agent: Agent) {
    super()
  }

  /**
   * Retrieve basic messages by connection id
   *
   * @param connectionId Connection identifier
   * @returns BasicMessageRecord[]
   */
  @Example<BasicMessageStorageProps[]>([BasicMessageRecordExample])
  @Get('/:connectionId')
  public async getBasicMessagesByConnectionId(@Path('connectionId') connectionId: RecordId) {
    const basicMessageRecords = await this.agent.basicMessages.findAllByQuery({ connectionId })
    return basicMessageRecords.map(toApiModel)
  }

  /**
   * Send a basic message to a connection
   *
   * @param connectionId Connection identifier
   * @param content The content of the message
   * @returns BasicMessageRecord
   */
  @Example<BasicMessageStorageProps>(BasicMessageRecordExample)
  @Post('/:connectionId')
  public async sendMessage(
    @Path('connectionId') connectionId: RecordId,
    @Body() request: Record<'content', string>,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string }>,
  ) {
    this.setStatus(204)

    try {
      const basicMessageRecord = await this.agent.basicMessages.sendMessage(connectionId, request.content)
      return toApiModel(basicMessageRecord)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, { reason: `connection with id '${connectionId}' not found.` })
      }

      return internalServerError(500, { message: `something went wrong: ${error}` })
    }
  }
}
