import { Agent, AriesFrameworkError, RecordNotFoundError } from '@aries-framework/core'
import { Controller, Delete, Get, Path, Post, Query, Res, Route, Tags, TsoaResponse } from 'tsoa'
import { injectable } from 'tsyringe'

import { RecordId } from '../types'

@Tags('Connections')
@Route('/connections')
@injectable()
export class ConnectionController extends Controller {
  private agent: Agent

  public constructor(agent: Agent) {
    super()
    this.agent = agent
  }

  /**
   * Retrieve all connections records
   * @example alias "Bob"
   * @example state "abandoned, response, start, error, init, active, request, invitation, completed"
   * @example myDid "WgWxqztrNooG92RXvxSTWv"
   * @example theirDid "WgWxqztrNooG92RXvxSTWv"
   * @example theirLabel "Alice"
   * @returns ConnectionRecord[]
   */
  @Get('/')
  public async getAllConnections(
    @Query('alias') alias?: string,
    @Query('state') state?: string,
    @Query('myDid') myDid?: string,
    @Query('theirDid') theirDid?: string,
    @Query('theirLabel') theirLabel?: string
  ) {
    let connections = await this.agent.connections.getAll()

    if (alias) connections = connections.filter((c) => c.alias === alias)
    if (state) connections = connections.filter((c) => c.state === state)
    if (myDid) connections = connections.filter((c) => c.did === myDid)
    if (theirDid) connections = connections.filter((c) => c.theirDid === theirDid)
    if (theirLabel) connections = connections.filter((c) => c.theirLabel === theirLabel)

    return connections.map((c) => c.toJSON())
  }

  /**
   * Retrieve connection record by connection id
   * @param connectionId Connection identifier
   * @returns ConnectionRecord
   */
  @Get('/:connectionId')
  public async getConnectionById(
    @Path('connectionId') connectionId: RecordId,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>
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
    @Res() internalServerError: TsoaResponse<500, { message: string; error: unknown }>
  ) {
    try {
      this.setStatus(204)
      await this.agent.connections.deleteById(connectionId)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, { reason: `connection with connection id "${connectionId}" not found.` })
      }
      return internalServerError(500, { message: `something went wrong`, error: error })
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
  @Post('/:connectionId/accept-request')
  public async acceptRequest(
    @Path('connectionId') connectionId: RecordId,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string; error: unknown }>
  ) {
    try {
      const connection = await this.agent.connections.acceptRequest(connectionId)
      return connection.toJSON()
    } catch (error) {
      if (error instanceof AriesFrameworkError) {
        return notFoundError(404, { reason: `connection with connection id "${connectionId}" not found.` })
      }
      return internalServerError(500, { message: `something went wrong`, error: error })
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
  @Post('/:connectionId/accept-response')
  public async acceptResponse(
    @Path('connectionId') connectionId: RecordId,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string; error: unknown }>
  ) {
    try {
      const connection = await this.agent.connections.acceptResponse(connectionId)
      return connection.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, { reason: `connection with connection id "${connectionId}" not found.` })
      }
      return internalServerError(500, { message: `something went wrong`, error: error })
    }
  }
}
