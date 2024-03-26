import type { DidCommOutOfBandRecord } from './OutOfBandControllerTypes'
import type { PlaintextMessage } from '@credo-ts/core/build/types'

import {
  AgentMessage,
  JsonTransformer,
  OutOfBandInvitation,
  Agent,
  RecordNotFoundError,
  ConnectionInvitationMessage,
} from '@credo-ts/core'
import { parseMessageType, supportsIncomingMessageType } from '@credo-ts/core/build/utils/messageType'
import { Body, Controller, Delete, Example, Get, Path, Post, Query, Route, Tags } from 'tsoa'
import { injectable } from 'tsyringe'

import { apiErrorResponse } from '../../../utils/response'
import { RecordId } from '../../types'
import { connectionsRecordExample } from '../connections/ConnectionsControllerExamples'
import { connectionRecordToApiModel, type DidCommConnectionsRecord } from '../connections/ConnectionsControllerTypes'

import {
  legacyInvitationExample,
  outOfBandInvitationExample,
  outOfBandRecordExample,
} from './OutOfBandControllerExamples'
import {
  outOfBandRecordToApiModel,
  DidCommOutOfBandCreateInvitationOptions,
  DidCommOutOfBandCreateLegacyConnectionInvitationOptions,
  DidCommOutOfBandCreateLegacyConnectionlessInvitationOptions,
  DidCommOutOfBandReceiveInvitationOptions,
  DidCommOutOfBandAcceptInvitationOptions,
} from './OutOfBandControllerTypes'

@Tags('DIDComm Out Of Band')
@Route('/didcomm/out-of-band')
@injectable()
export class OutOfBandController extends Controller {
  public constructor(private agent: Agent) {
    super()
  }

  /**
   * Retrieve all out of band records by query
   */
  @Example([outOfBandRecordExample])
  @Get()
  public async findOutOfBandRecordsByQuery(
    @Query('invitationId') invitationId?: string,
  ): Promise<DidCommOutOfBandRecord[]> {
    const outOfBandRecords = await this.agent.oob.findAllByQuery({
      invitationId,
    })

    return outOfBandRecords.map(outOfBandRecordToApiModel)
  }

  /**
   * Retrieve an out of band record by id
   */
  @Example(outOfBandRecordExample)
  @Get('/:outOfBandId')
  public async getOutOfBandRecordById(@Path('outOfBandId') outOfBandId: RecordId): Promise<DidCommOutOfBandRecord> {
    const outOfBandRecord = await this.agent.oob.findById(outOfBandId)

    if (!outOfBandRecord) {
      this.setStatus(404)
      return apiErrorResponse(`Out of band record with id "${outOfBandId}" not found.`)
    }
    return outOfBandRecordToApiModel(outOfBandRecord)
  }

  /**
   * Creates an outbound out-of-band record containing out-of-band invitation message defined in
   * Aries RFC 0434: Out-of-Band Protocol 1.1.
   */
  @Example({
    invitationUrl: 'https://example.com/?',
    invitation: outOfBandInvitationExample,
    outOfBandRecord: outOfBandRecordExample,
  })
  @Post('/create-invitation')
  public async createInvitation(@Body() body?: DidCommOutOfBandCreateInvitationOptions) {
    try {
      const outOfBandRecord = await this.agent.oob.createInvitation({
        ...body,
        messages: body?.messages?.map((m) => JsonTransformer.fromJSON(m, AgentMessage)),
      })
      return {
        invitationUrl: outOfBandRecord.outOfBandInvitation.toUrl({
          domain: this.agent.config.endpoints[0],
        }),
        invitation: outOfBandRecord.outOfBandInvitation.toJSON({
          useDidSovPrefixWhereAllowed: this.agent.config.useDidSovPrefixWhereAllowed,
        }),
        outOfBandRecord: outOfBandRecordToApiModel(outOfBandRecord),
      }
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Creates an outbound out-of-band record in the same way how `createInvitation` method does it,
   * but it also converts out-of-band invitation message to an "legacy" invitation message defined
   * in RFC 0160: Connection Protocol and returns it together with out-of-band record.
   *
   * @param config configuration of how a invitation should be created
   * @returns out-of-band record and invitation
   */
  @Example<{ invitation: PlaintextMessage; outOfBandRecord: DidCommOutOfBandRecord }>({
    invitation: legacyInvitationExample,
    outOfBandRecord: outOfBandRecordExample,
  })
  @Post('/create-legacy-invitation')
  public async createLegacyInvitation(@Body() body?: DidCommOutOfBandCreateLegacyConnectionInvitationOptions) {
    try {
      const { outOfBandRecord, invitation } = await this.agent.oob.createLegacyInvitation(body)

      return {
        invitationUrl: invitation.toUrl({
          domain: this.agent.config.endpoints[0],
          useDidSovPrefixWhereAllowed: this.agent.config.useDidSovPrefixWhereAllowed,
        }),
        invitation: invitation.toJSON({
          useDidSovPrefixWhereAllowed: this.agent.config.useDidSovPrefixWhereAllowed,
        }),
        outOfBandRecord: outOfBandRecordToApiModel(outOfBandRecord),
      }
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Creates a new connectionless legacy invitation.
   *
   * Only works with messages created from:
   * - /didcomm/credentials/create-offer
   * - /didcomm/poofs/create-request
   */
  @Example<{ message: PlaintextMessage; invitationUrl: string }>({
    message: {
      '@id': 'eac4ff4e-b4fb-4c1d-aef3-b29c89d1cc00',
      '@type': 'https://didcomm.org/issue-credential/1.0/offer-credential',
    },
    invitationUrl: 'http://example.com/invitation_url',
  })
  @Post('/create-legacy-connectionless-invitation')
  public async createLegacyConnectionlessInvitation(
    @Body() config: DidCommOutOfBandCreateLegacyConnectionlessInvitationOptions,
  ) {
    try {
      const agentMessage = JsonTransformer.fromJSON(config.message, AgentMessage)

      return await this.agent.oob.createLegacyConnectionlessInvitation({
        ...config,
        message: agentMessage,
      })
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Receive an out of band invitation. Supports urls as well as JSON messages. Also supports legacy
   * connection invitations
   */
  @Example<{ outOfBandRecord: DidCommOutOfBandRecord; connectionRecord?: DidCommConnectionsRecord }>({
    outOfBandRecord: outOfBandRecordExample,
    connectionRecord: connectionsRecordExample,
  })
  @Post('/receive-invitation')
  public async receiveInvitation(@Body() body: DidCommOutOfBandReceiveInvitationOptions) {
    const { invitation, ...config } = body

    try {
      let invitationMessage: OutOfBandInvitation | ConnectionInvitationMessage
      if (typeof invitation === 'string') {
        invitationMessage = await this.agent.oob.parseInvitation(invitation)
      } else if (supportsIncomingMessageType(parseMessageType(invitation['@type']), ConnectionInvitationMessage.type)) {
        invitationMessage = JsonTransformer.fromJSON(invitation, ConnectionInvitationMessage)
      } else if (supportsIncomingMessageType(parseMessageType(invitation['@type']), OutOfBandInvitation.type)) {
        invitationMessage = JsonTransformer.fromJSON(invitation, OutOfBandInvitation)
      } else {
        return apiErrorResponse(`Invalid invitation message type ${invitation['@type']}`)
      }

      const { outOfBandRecord, connectionRecord } = await this.agent.oob.receiveInvitation(invitationMessage, config)

      return {
        outOfBandRecord: outOfBandRecordToApiModel(outOfBandRecord),
        connectionRecord: connectionRecord ? connectionRecordToApiModel(connectionRecord) : undefined,
      }
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Accept a connection invitation as invitee (by sending a connection request message) for the connection with the specified connection id.
   * This is not needed when auto accepting of connections is enabled.
   */
  @Example<{ outOfBandRecord: DidCommOutOfBandRecord; connectionRecord?: DidCommConnectionsRecord }>({
    outOfBandRecord: outOfBandRecordExample,
    connectionRecord: connectionsRecordExample,
  })
  @Post('/:outOfBandId/accept-invitation')
  public async acceptInvitation(
    @Path('outOfBandId') outOfBandId: RecordId,
    @Body() acceptInvitationConfig: DidCommOutOfBandAcceptInvitationOptions,
  ) {
    try {
      const { outOfBandRecord, connectionRecord } = await this.agent.oob.acceptInvitation(
        outOfBandId,
        acceptInvitationConfig,
      )

      return {
        outOfBandRecord: outOfBandRecordToApiModel(outOfBandRecord),
        connectionRecord: connectionRecord ? connectionRecordToApiModel(connectionRecord) : undefined,
      }
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Deletes an out of band record from the repository.
   */
  @Delete('/:outOfBandId')
  public async deleteOutOfBandRecord(@Path('outOfBandId') outOfBandId: RecordId) {
    try {
      this.setStatus(204)
      await this.agent.oob.deleteById(outOfBandId)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        this.setStatus(404)
        return apiErrorResponse(`Out of band record with id ${outOfBandId} not found.`)
      }

      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }
}
