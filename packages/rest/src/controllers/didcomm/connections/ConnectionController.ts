import type { ConnectionRecordProps } from '@credo-ts/core'

import { DidExchangeState, Agent, CredoError, RecordNotFoundError } from '@credo-ts/core'
import { Controller, Delete, Example, Get, Path, Post, Query, Res, Route, Tags, TsoaResponse } from 'tsoa'
import { injectable } from 'tsyringe'

import { ConnectionRecordExample, RecordId } from '../examples'

@Tags('DIDComm Connections')
@Route('/didcomm/connections')
@injectable()
export class ConnectionController extends Controller {
  public constructor(private agent: Agent) {
    super()
  }

  /**
   * Retrieve all connections records
   *
   * @param alias alias
   * @param state did exchange state
   * @param did our did
   * @param theirDid their did
   * @param theirLabel their label
   * @param outOfBandId out of band id
   * @returns ConnectionRecord[]
   */
  @Example<ConnectionRecordProps[]>([ConnectionRecordExample])
  @Get('/')
  public async getAllConnections(
    @Query('outOfBandId') outOfBandId?: string,
    @Query('alias') alias?: string,
    @Query('state') state?: DidExchangeState,
    @Query('ourDid') ourDid?: string,
    @Query('theirDid') theirDid?: string,
    @Query('theirLabel') theirLabel?: string,
  ) {
    const connections = await this.agent.connections.findAllByQuery({
      alias,
      did: ourDid,
      theirDid,
      theirLabel,
      state,
      outOfBandId,
    })

    return connections.map((c) => c.toJSON())
  }

  /**
   * Retrieve connection record by connection id
   * @param connectionId Connection identifier
   * @returns ConnectionRecord
   */
  @Example<ConnectionRecordProps>(ConnectionRecordExample)
  @Get('/:connectionId')
  public async getConnectionById(
    @Path('connectionId') connectionId: RecordId,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
  ) {
    const connection = await this.agent.connections.findById(connectionId)

    if (!connection) return notFoundError(404, { reason: `connection with connection id "${connectionId}" not found.` })

    return connection.toJSON()
  }

  /**
   * Deletes a connection record from the connection repository.
   *
   * @param connectionId Connection identifier
   */
  @Delete('/:connectionId')
  public async deleteConnection(
    @Path('connectionId') connectionId: RecordId,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string }>,
  ) {
    try {
      this.setStatus(204)
      await this.agent.connections.deleteById(connectionId)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, { reason: `connection with connection id "${connectionId}" not found.` })
      }
      return internalServerError(500, { message: `something went wrong: ${error}` })
    }
  }

  /**
   * Accept a connection request as inviter by sending a connection response message
   * for the connection with the specified connection id.
   *
   * This is not needed when auto accepting of connection is enabled.
   *
   * @param connectionId Connection identifier
   * @returns ConnectionRecord
   */
  @Example<ConnectionRecordProps>(ConnectionRecordExample)
  @Post('/:connectionId/accept-request')
  public async acceptRequest(
    @Path('connectionId') connectionId: RecordId,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string }>,
  ) {
    try {
      const connection = await this.agent.connections.acceptRequest(connectionId)
      return connection.toJSON()
    } catch (error) {
      if (error instanceof CredoError) {
        return notFoundError(404, { reason: `connection with connection id "${connectionId}" not found.` })
      }
      return internalServerError(500, { message: `something went wrong: ${error}` })
    }
  }

  /**
   * Accept a connection response as invitee by sending a trust ping message
   * for the connection with the specified connection id.
   *
   * This is not needed when auto accepting of connection is enabled.
   *
   * @param connectionId Connection identifier
   * @returns ConnectionRecord
   */
  @Example<ConnectionRecordProps>(ConnectionRecordExample)
  @Post('/:connectionId/accept-response')
  public async acceptResponse(
    @Path('connectionId') connectionId: RecordId,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string }>,
  ) {
    try {
      const connection = await this.agent.connections.acceptResponse(connectionId)
      return connection.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, { reason: `connection with connection id "${connectionId}" not found.` })
      }
      return internalServerError(500, { message: `something went wrong: ${error}` })
    }
  }
}
