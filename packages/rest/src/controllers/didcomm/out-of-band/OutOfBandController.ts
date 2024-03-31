import type { DidCommOutOfBandCreateInvitationResponse, DidCommOutOfBandRecord } from './OutOfBandControllerTypes'
import type { PlaintextMessage } from '@credo-ts/core/build/types'

import {
  AgentMessage,
  JsonTransformer,
  OutOfBandInvitation,
  RecordNotFoundError,
  ConnectionInvitationMessage,
  OutOfBandState,
  OutOfBandRole,
} from '@credo-ts/core'
import { parseMessageType, supportsIncomingMessageType } from '@credo-ts/core/build/utils/messageType'
import { Body, Controller, Delete, Example, Get, Path, Post, Query, Request, Route, Security, Tags } from 'tsoa'
import { injectable } from 'tsyringe'

import { RequestWithAgent } from '../../../tenantMiddleware'
import { apiErrorResponse } from '../../../utils/response'
import { RecordId } from '../../types'
import { connectionRecordExample } from '../connections/ConnectionsControllerExamples'
import { connectionRecordToApiModel, type DidCommConnectionRecord } from '../connections/ConnectionsControllerTypes'

import {
  legacyInvitationExample,
  outOfBandCreateInvitationResponseExample,
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
@Security('tenants', ['tenant'])
@injectable()
export class OutOfBandController extends Controller {
  /**
   * Retrieve all out of band records by query
   */
  @Example([outOfBandRecordExample])
  @Get()
  public async findOutOfBandRecordsByQuery(
    @Request() request: RequestWithAgent,
    @Query('invitationId') invitationId?: string,
    @Query('role') role?: OutOfBandRole,
    @Query('state') state?: OutOfBandState,
    @Query('threadId') threadId?: string,
  ): Promise<DidCommOutOfBandRecord[]> {
    const outOfBandRecords = await request.user.agent.oob.findAllByQuery({
      invitationId,
      role,
      state,
      threadId,
    })

    return outOfBandRecords.map(outOfBandRecordToApiModel)
  }

  /**
   * Retrieve an out of band record by id
   */
  @Example(outOfBandRecordExample)
  @Get('/:outOfBandId')
  public async getOutOfBandRecordById(
    @Request() request: RequestWithAgent,
    @Path('outOfBandId') outOfBandId: RecordId,
  ): Promise<DidCommOutOfBandRecord> {
    const outOfBandRecord = await request.user.agent.oob.findById(outOfBandId)

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
  @Example<DidCommOutOfBandCreateInvitationResponse>(outOfBandCreateInvitationResponseExample)
  @Post('/create-invitation')
  public async createInvitation(
    @Request() request: RequestWithAgent,
    @Body() body?: DidCommOutOfBandCreateInvitationOptions,
  ): Promise<DidCommOutOfBandCreateInvitationResponse> {
    try {
      const outOfBandRecord = await request.user.agent.oob.createInvitation({
        ...body,
        messages: body?.messages?.map((m) => JsonTransformer.fromJSON(m, AgentMessage)),
      })
      return {
        invitationUrl: outOfBandRecord.outOfBandInvitation.toUrl({
          domain: request.user.agent.config.endpoints[0],
        }),
        invitation: outOfBandRecord.outOfBandInvitation.toJSON({
          useDidSovPrefixWhereAllowed: request.user.agent.config.useDidSovPrefixWhereAllowed,
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
  public async createLegacyInvitation(
    @Request() request: RequestWithAgent,
    @Body() body?: DidCommOutOfBandCreateLegacyConnectionInvitationOptions,
  ) {
    try {
      const { outOfBandRecord, invitation } = await request.user.agent.oob.createLegacyInvitation(body)

      return {
        invitationUrl: invitation.toUrl({
          domain: request.user.agent.config.endpoints[0],
          useDidSovPrefixWhereAllowed: request.user.agent.config.useDidSovPrefixWhereAllowed,
        }),
        invitation: invitation.toJSON({
          useDidSovPrefixWhereAllowed: request.user.agent.config.useDidSovPrefixWhereAllowed,
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
    @Request() request: RequestWithAgent,
    @Body() config: DidCommOutOfBandCreateLegacyConnectionlessInvitationOptions,
  ) {
    try {
      const agentMessage = JsonTransformer.fromJSON(config.message, AgentMessage)

      return await request.user.agent.oob.createLegacyConnectionlessInvitation({
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
  @Example<{ outOfBandRecord: DidCommOutOfBandRecord; connectionRecord?: DidCommConnectionRecord }>({
    outOfBandRecord: outOfBandRecordExample,
    connectionRecord: connectionRecordExample,
  })
  @Post('/receive-invitation')
  public async receiveInvitation(
    @Request() request: RequestWithAgent,
    @Body() body: DidCommOutOfBandReceiveInvitationOptions,
  ) {
    const { invitation, ...config } = body

    try {
      let invitationMessage: OutOfBandInvitation | ConnectionInvitationMessage
      if (typeof invitation === 'string') {
        invitationMessage = await request.user.agent.oob.parseInvitation(invitation)
      } else if (supportsIncomingMessageType(parseMessageType(invitation['@type']), ConnectionInvitationMessage.type)) {
        invitationMessage = JsonTransformer.fromJSON(invitation, ConnectionInvitationMessage)
      } else if (supportsIncomingMessageType(parseMessageType(invitation['@type']), OutOfBandInvitation.type)) {
        invitationMessage = JsonTransformer.fromJSON(invitation, OutOfBandInvitation)
      } else {
        return apiErrorResponse(`Invalid invitation message type ${invitation['@type']}`)
      }

      const { outOfBandRecord, connectionRecord } = await request.user.agent.oob.receiveInvitation(
        invitationMessage,
        config,
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
   * Accept a connection invitation as invitee (by sending a connection request message) for the connection with the specified connection id.
   * This is not needed when auto accepting of connections is enabled.
   */
  @Example<{ outOfBandRecord: DidCommOutOfBandRecord; connectionRecord?: DidCommConnectionRecord }>({
    outOfBandRecord: outOfBandRecordExample,
    connectionRecord: connectionRecordExample,
  })
  @Post('/:outOfBandId/accept-invitation')
  public async acceptInvitation(
    @Request() request: RequestWithAgent,
    @Path('outOfBandId') outOfBandId: RecordId,
    @Body() acceptInvitationConfig: DidCommOutOfBandAcceptInvitationOptions,
  ) {
    try {
      const { outOfBandRecord, connectionRecord } = await request.user.agent.oob.acceptInvitation(
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
  public async deleteOutOfBandRecord(@Request() request: RequestWithAgent, @Path('outOfBandId') outOfBandId: RecordId) {
    try {
      this.setStatus(204)
      await request.user.agent.oob.deleteById(outOfBandId)
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
