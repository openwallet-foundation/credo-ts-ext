import { Agent, ConnectionInvitationMessage, JsonTransformer, RecordNotFoundError } from '@aries-framework/core'
import {
  Body,
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

import { InvitationConfigRequest } from '../../schemas/InvitationConfigRequest'
import { ReceiveInvitationByUrlRequest } from '../../schemas/ReceiveInvitationByUrlRequest'
import { ReceiveInvitationRequest } from '../../schemas/ReceiveInvitationRequest'

@JsonController('/connections')
@injectable()
export class ConnectionController {
  private agent: Agent

  public constructor(agent: Agent) {
    this.agent = agent
  }

  /**
   * Retrieve connection record by connectionId
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
   * Retrieve all connections records
   */
  @Get('/')
  public async getAllConnections() {
    const connections = await this.agent.connections.getAll()
    return connections.map((c) => c.toJSON())
  }

  /**
   * Creates a new ConnectionRecord and InvitationMessage.
   * Returns ConnectionRecord with invitation and invitation_url
   */
  @Post('/create-invitation')
  public async createInvitation(
    @Body()
    invitationConfig?: InvitationConfigRequest
  ) {
    try {
      const { invitation, connectionRecord } = await this.agent.connections.createConnection(invitationConfig)

      return {
        invitationUrl: invitation.toUrl({
          domain: this.agent.config.endpoints[0],
          useLegacyDidSovPrefix: this.agent.config.useLegacyDidSovPrefix,
        }),
        invitation: invitation.toJSON({ useLegacyDidSovPrefix: this.agent.config.useLegacyDidSovPrefix }),
        connection: connectionRecord.toJSON(),
      }
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`mediator with mediatorId ${invitationConfig?.mediatorId} not found`)
      }
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }

  /**
   * Receive connection invitation as invitee and create connection. If auto accepting is enabled
   * via either the config passed in the function or the global agent config, a connection
   * request message will be send.
   */
  @Post('/receive-invitation')
  public async receiveInvitation(@Body() invitationRequest: ReceiveInvitationRequest) {
    const { invitation, ...config } = invitationRequest
    try {
      const inv = JsonTransformer.fromJSON(invitation, ConnectionInvitationMessage)
      const connection = await this.agent.connections.receiveInvitation(inv, config)

      return connection.toJSON()
    } catch (error) {
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }

  /**
   * Receive connection invitation as invitee by invitationUrl and create connection. If auto accepting is enabled
   * via either the config passed in the function or the global agent config, a connection
   * request message will be send.
   */
  @Post('/receive-invitation-url')
  public async receiveInvitationByUrl(@Body() invitationByUrlRequest: ReceiveInvitationByUrlRequest) {
    const { invitationUrl, ...config } = invitationByUrlRequest

    try {
      const connection = await this.agent.connections.receiveInvitationFromUrl(invitationUrl, config)

      return connection.toJSON()
    } catch (error) {
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }

  /**
   * Accept a connection invitation as invitee (by sending a connection request message) for the connection with the specified connection id.
   * This is not needed when auto accepting of connections is enabled.
   */
  @Post('/:connectionId/accept-invitation')
  public async acceptInvitation(@Param('connectionId') connectionId: string) {
    try {
      const connection = await this.agent.connections.acceptInvitation(connectionId)

      return connection.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`connection with connectionId "${connectionId}" not found.`)
      }
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }

  /**
   * Accept a connection request as inviter (by sending a connection response message) for the connection with the specified connection id.
   * This is not needed when auto accepting of connection is enabled.
   */
  @Post('/:connectionId/accept-request')
  public async acceptRequest(@Param('connectionId') connectionId: string) {
    try {
      const connection = await this.agent.connections.acceptRequest(connectionId)

      return connection.toJSON()
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        throw new NotFoundError(`connection with connectionId "${connectionId}" not found.`)
      }
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }

  /**
   * Accept a connection response as invitee (by sending a trust ping message) for the connection with the specified connection id.
   * This is not needed when auto accepting of connection is enabled.
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
      throw new InternalServerError(`something went wrong: ${error}`)
    }
  }

  /**
   * Deletes a connectionRecord in the connectionRepository.
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
}
