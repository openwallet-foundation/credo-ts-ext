import type { DidCommConnectionRecord } from './ConnectionsControllerTypes'

import { DidExchangeState, RecordNotFoundError } from '@credo-ts/core'
import { Controller, Delete, Example, Get, Path, Post, Query, Request, Route, Security, Tags } from 'tsoa'
import { injectable } from 'tsyringe'

import { RequestWithAgent } from '../../../tenantMiddleware'
import { apiErrorResponse } from '../../../utils/response'
import { Did } from '../../did/DidsControllerTypes'
import { RecordId } from '../../types'

import { connectionRecordExample } from './ConnectionsControllerExamples'
import { connectionRecordToApiModel } from './ConnectionsControllerTypes'

@Tags('DIDComm Connections')
@Route('/didcomm/connections')
@Security('tenants', ['tenant'])
@injectable()
export class ConnectionsController extends Controller {
  /**
   * Find connection record by query
   */
  @Example<DidCommConnectionRecord[]>([connectionRecordExample])
  @Get('/')
  public async findConnectionsByQuery(
    @Request() request: RequestWithAgent,
    @Query('outOfBandId') outOfBandId?: RecordId,
    @Query('alias') alias?: string,
    @Query('state') state?: DidExchangeState,
    @Query('did') did?: Did,
    @Query('theirDid') theirDid?: Did,
    @Query('theirLabel') theirLabel?: string,
  ) {
    const connections = await request.user.agent.connections.findAllByQuery({
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
  @Example<DidCommConnectionRecord>(connectionRecordExample)
  @Get('/:connectionId')
  public async getConnectionById(@Request() request: RequestWithAgent, @Path('connectionId') connectionId: RecordId) {
    const connection = await request.user.agent.connections.findById(connectionId)

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
  public async deleteConnection(@Request() request: RequestWithAgent, @Path('connectionId') connectionId: RecordId) {
    try {
      this.setStatus(204)
      await request.user.agent.connections.deleteById(connectionId)
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
  @Example<DidCommConnectionRecord>(connectionRecordExample)
  @Post('/:connectionId/accept-request')
  public async acceptRequest(@Request() request: RequestWithAgent, @Path('connectionId') connectionId: RecordId) {
    try {
      const connection = await request.user.agent.connections.acceptRequest(connectionId)
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
  @Example<DidCommConnectionRecord>(connectionRecordExample)
  @Post('/:connectionId/accept-response')
  public async acceptResponse(@Request() request: RequestWithAgent, @Path('connectionId') connectionId: RecordId) {
    try {
      const connection = await request.user.agent.connections.acceptResponse(connectionId)
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
