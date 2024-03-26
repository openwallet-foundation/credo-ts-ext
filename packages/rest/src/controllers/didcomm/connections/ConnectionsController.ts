import type { DidCommConnectionsRecord } from './ConnectionsControllerTypes'

import { DidExchangeState, Agent, RecordNotFoundError } from '@credo-ts/core'
import { Controller, Delete, Example, Get, Path, Post, Query, Route, Tags } from 'tsoa'
import { injectable } from 'tsyringe'

import { apiErrorResponse } from '../../../utils/response'
import { Did } from '../../did/DidsControllerTypes'
import { RecordId } from '../../types'

import { connectionsRecordExample } from './ConnectionsControllerExamples'
import { connectionRecordToApiModel } from './ConnectionsControllerTypes'

@Tags('DIDComm Connections')
@Route('/didcomm/connections')
@injectable()
export class ConnectionsController extends Controller {
  public constructor(private agent: Agent) {
    super()
  }

  /**
   * Find connection record by query
   */
  @Example<DidCommConnectionsRecord[]>([connectionsRecordExample])
  @Get('/')
  public async findConnectionsByQuery(
    @Query('outOfBandId') outOfBandId?: RecordId,
    @Query('alias') alias?: string,
    @Query('state') state?: DidExchangeState,
    @Query('did') did?: Did,
    @Query('theirDid') theirDid?: Did,
    @Query('theirLabel') theirLabel?: string,
  ) {
    const connections = await this.agent.connections.findAllByQuery({
      alias,
      did,
      theirDid,
      theirLabel,
      state,
      outOfBandId,
    })

    return connections.map(connectionRecordToApiModel)
  }

  /**
   * Retrieve connection record by connection id
   * @param connectionId Connection identifier
   * @returns ConnectionRecord
   */
  @Example<DidCommConnectionsRecord>(connectionsRecordExample)
  @Get('/:connectionId')
  public async getConnectionById(@Path('connectionId') connectionId: RecordId) {
    const connection = await this.agent.connections.findById(connectionId)

    if (!connection) {
      this.setStatus(404)
      return apiErrorResponse(`connection with connection id "${connectionId}" not found.`)
    }

    return connectionRecordToApiModel(connection)
  }

  /**
   * Deletes a connection record from the connection repository.
   *
   * @param connectionId Connection identifier
   */
  @Delete('/:connectionId')
  public async deleteConnection(@Path('connectionId') connectionId: RecordId) {
    try {
      this.setStatus(204)
      await this.agent.connections.deleteById(connectionId)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        this.setStatus(404)
        return apiErrorResponse(`connection with connection id "${connectionId}" not found.`)
      }

      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Accept a connection request as inviter by sending a connection response message
   * for the connection with the specified connection id.
   *
   * This is not needed when auto accepting of connection is enabled.
   */
  @Example<DidCommConnectionsRecord>(connectionsRecordExample)
  @Post('/:connectionId/accept-request')
  public async acceptRequest(@Path('connectionId') connectionId: RecordId) {
    try {
      const connection = await this.agent.connections.acceptRequest(connectionId)
      return connectionRecordToApiModel(connection)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        this.setStatus(404)
        return apiErrorResponse(`connection with connection id "${connectionId}" not found.`)
      }

      this.setStatus(500)
      return apiErrorResponse(error)
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
  @Example<DidCommConnectionsRecord>(connectionsRecordExample)
  @Post('/:connectionId/accept-response')
  public async acceptResponse(@Path('connectionId') connectionId: RecordId) {
    try {
      const connection = await this.agent.connections.acceptResponse(connectionId)
      return connectionRecordToApiModel(connection)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        this.setStatus(404)
        return apiErrorResponse(`connection with connection id "${connectionId}" not found.`)
      }

      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }
}
