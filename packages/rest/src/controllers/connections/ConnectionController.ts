import { Agent, AriesFrameworkError, RecordNotFoundError } from '@aries-framework/core'
import {
  BadRequestError,
  Delete,
  Get,
  InternalServerError,
  JsonController,
  NotFoundError,
  OnUndefined,
  Param,
  Post,
} from 'routing-controllers'
import { injectable } from 'tsyringe'

@JsonController('/connections')
@injectable()
export class ConnectionController {
  private agent: Agent

  public constructor(agent: Agent) {
    this.agent = agent
  }

  /**
   * Retrieve all connections records
   *
   * @returns ConnectionRecord[]
   */
  @Get('/')
  public async getAllConnections() {
    const connections = await this.agent.connections.getAll()
    return connections.map((c) => c.toJSON())
  }

  /**
   * Retrieve connection record by connection id
   *
   * @param connectionId
   * @returns ConnectionRecord
   */
  @Get('/:connectionId')
  public async getConnectionById(@Param('connectionId') connectionId: string) {
    const connection = await this.agent.connections.findById(connectionId)

    if (!connection) {
      throw new NotFoundError(`connection with connectionId "${connectionId}" not found.`)
    }

    return connection.toJSON()
  }

  /**
   * Deletes a connection record from the connection repository.
   *
   * @param connectionId
   */
  @Delete('/:connectionId')
  @OnUndefined(204)
  public async deleteConnection(@Param('connectionId') connectionId: string) {
    try {
      await this.agent.connections.deleteById(connectionId)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`connection with connectionId "${connectionId}" not found.`)
      }
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }

  /**
   * Accept a connection request as inviter by sending a connection response message
   * for the connection with the specified connection id.
   *
   * This is not needed when auto accepting of connection is enabled.
   *
   * @param connectionId
   * @returns ConnectionRecord
   */
  @Post('/:connectionId/accept-request')
  public async acceptRequest(@Param('connectionId') connectionId: string) {
    try {
      const connection = await this.agent.connections.acceptRequest(connectionId)
      return connection.toJSON()
    } catch (error) {
      if (error instanceof AriesFrameworkError && error.message === `Connection record ${connectionId} not found.`) {
        throw new NotFoundError(`connection with connectionId "${connectionId}" not found.`)
      }
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }

  /**
   * Accept a connection response as invitee by sending a trust ping message
   * for the connection with the specified connection id.
   *
   * This is not needed when auto accepting of connection is enabled.
   *
   * @param connectionId
   * @returns ConnectionRecord
   */
  @Post('/:connectionId/accept-response')
  public async acceptResponse(@Param('connectionId') connectionId: string) {
    try {
      const connection = await this.agent.connections.acceptResponse(connectionId)
      return connection.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`connection with connectionId "${connectionId}" not found.`)
      }
      throw new BadRequestError(`something went wrong: ${error}`)
    }
  }
}
