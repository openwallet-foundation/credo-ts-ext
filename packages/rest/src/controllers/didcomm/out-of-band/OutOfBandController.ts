import type { ApiOutOfBandRecord, ConnectionInvitationJson, OutOfBandInvitationJson } from './OutOfBandControllerTypes'
import type { AgentMessageType } from '../types'
import type { ConnectionRecordProps } from '@credo-ts/core'

import { AgentMessage, JsonTransformer, OutOfBandInvitation, Agent, RecordNotFoundError } from '@credo-ts/core'
import { Body, Controller, Delete, Example, Get, Path, Post, Query, Res, Route, Tags, TsoaResponse } from 'tsoa'
import { injectable } from 'tsyringe'

import { toApiModel } from '../../utils/serialize'
import {
  ConnectionRecordExample,
  RecordId,
  outOfBandInvitationExample,
  outOfBandRecordExample,
  type OutOfBandInvitationProps,
  type OutOfBandRecordWithInvitationProps,
} from '../examples'
import { AcceptInvitationConfig, ReceiveInvitationByUrlProps, ReceiveInvitationProps } from '../types'

import { CreateOutOfBandInvitationBody, CreateLegacyConnectionInvitationBody } from './OutOfBandControllerTypes'

@Tags('DIDComm Out Of Band')
@Route('/didcomm/oob')
@injectable()
export class OutOfBandController extends Controller {
  public constructor(private agent: Agent) {
    super()
  }

  /**
   * Retrieve all out of band records
   * @param invitationId invitation identifier
   * @returns OutOfBandRecord[]
   */
  @Example([outOfBandRecordExample])
  @Get()
  public async getAllOutOfBandRecords(@Query('invitationId') invitationId?: RecordId): Promise<ApiOutOfBandRecord[]> {
    let outOfBandRecords = await this.agent.oob.getAll()

    if (invitationId) outOfBandRecords = outOfBandRecords.filter((o) => o.outOfBandInvitation.id === invitationId)

    return outOfBandRecords.map((r) => toApiModel<ApiOutOfBandRecord>(r))
  }

  /**
   * Retrieve an out of band record by id
   * @param recordId record identifier
   * @returns OutOfBandRecord
   */
  @Example(outOfBandRecordExample)
  @Get('/:outOfBandId')
  public async getOutOfBandRecordById(
    @Path('outOfBandId') outOfBandId: RecordId,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
  ): Promise<ApiOutOfBandRecord> {
    const outOfBandRecord = await this.agent.oob.findById(outOfBandId)

    if (!outOfBandRecord) {
      return notFoundError(404, { reason: `Out of band record with id "${outOfBandId}" not found.` })
    }

    return toApiModel<ApiOutOfBandRecord>(outOfBandRecord)
  }

  /**
   * Creates an outbound out-of-band record containing out-of-band invitation message defined in
   * Aries RFC 0434: Out-of-Band Protocol 1.1.
   * @param config configuration of how out-of-band invitation should be created
   * @returns Out of band record
   */
  @Example({
    invitationUrl: 'https://example.com/?',
    invitation: outOfBandInvitationExample,
    outOfBandRecord: outOfBandRecordExample,
  })
  @Post('/create-invitation')
  public async createInvitation(
    @Res() internalServerError: TsoaResponse<500, { message: string }>,
    @Body() body?: CreateOutOfBandInvitationBody,
  ) {
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
        }) as OutOfBandInvitationJson,
        outOfBandRecord: toApiModel<ApiOutOfBandRecord>(outOfBandRecord),
      }
    } catch (error) {
      return internalServerError(500, { message: `something went wrong: ${error}` })
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
  @Example<{ invitation: OutOfBandInvitationProps; outOfBandRecord: OutOfBandRecordWithInvitationProps }>({
    invitation: outOfBandInvitationExample,
    outOfBandRecord: outOfBandRecordExample,
  })
  @Post('/create-legacy-invitation')
  public async createLegacyInvitation(
    @Res() internalServerError: TsoaResponse<500, { message: string }>,
    @Body() body?: CreateLegacyConnectionInvitationBody,
  ) {
    try {
      const { outOfBandRecord, invitation } = await this.agent.oob.createLegacyInvitation(body)

      return {
        invitationUrl: invitation.toUrl({
          domain: this.agent.config.endpoints[0],
          useDidSovPrefixWhereAllowed: this.agent.config.useDidSovPrefixWhereAllowed,
        }),
        invitation: invitation.toJSON({
          useDidSovPrefixWhereAllowed: this.agent.config.useDidSovPrefixWhereAllowed,
        }) as ConnectionInvitationJson,
        outOfBandRecord: toApiModel<ApiOutOfBandRecord>(outOfBandRecord),
      }
    } catch (error) {
      return internalServerError(500, { message: `something went wrong: ${error}` })
    }
  }

  /**
   * Creates a new connectionless legacy invitation.
   *
   * @param config configuration of how a connection invitation should be created
   * @returns a message and a invitationUrl
   */
  @Example<{ message: AgentMessageType; invitationUrl: string }>({
    message: {
      '@id': 'eac4ff4e-b4fb-4c1d-aef3-b29c89d1cc00',
      '@type': 'https://didcomm.org/connections/1.0/invitation',
    },
    invitationUrl: 'http://example.com/invitation_url',
  })
  @Post('/create-legacy-connectionless-invitation')
  public async createLegacyConnectionlessInvitation(
    @Body()
    config: {
      recordId: string
      message: AgentMessageType
      domain: string
    },
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string }>,
  ) {
    try {
      const agentMessage = JsonTransformer.fromJSON(config.message, AgentMessage)

      return await this.agent.oob.createLegacyConnectionlessInvitation({
        ...config,
        message: agentMessage,
      })
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, { reason: `connection with connection id "${config.recordId}" not found.` })
      }
      return internalServerError(500, { message: `something went wrong: ${error}` })
    }
  }

  /**
   * Creates inbound out-of-band record and assigns out-of-band invitation message to it if the
   * message is valid.
   *
   * @param invitation either OutOfBandInvitation or ConnectionInvitationMessage
   * @param config config for handling of invitation
   * @returns out-of-band record and connection record if one has been created.
   */
  @Example<{ outOfBandRecord: OutOfBandRecordWithInvitationProps; connectionRecord: ConnectionRecordProps }>({
    outOfBandRecord: outOfBandRecordExample,
    connectionRecord: ConnectionRecordExample,
  })
  @Post('/receive-invitation')
  public async receiveInvitation(
    @Body() invitationRequest: ReceiveInvitationProps,
    @Res() internalServerError: TsoaResponse<500, { message: string }>,
  ) {
    const { invitation, ...config } = invitationRequest

    try {
      const invite = new OutOfBandInvitation({ ...invitation, handshakeProtocols: invitation.handshake_protocols })
      const { outOfBandRecord, connectionRecord } = await this.agent.oob.receiveInvitation(invite, config)

      return {
        outOfBandRecord: outOfBandRecord.toJSON(),
        connectionRecord: connectionRecord?.toJSON(),
      }
    } catch (error) {
      return internalServerError(500, { message: `something went wrong: ${error}` })
    }
  }

  /**
   * Creates inbound out-of-band record and assigns out-of-band invitation message to it if the
   * message is valid.
   *
   * @param invitationUrl invitation url
   * @param config config for handling of invitation
   * @returns out-of-band record and connection record if one has been created.
   */
  @Example<{ outOfBandRecord: OutOfBandRecordWithInvitationProps; connectionRecord: ConnectionRecordProps }>({
    outOfBandRecord: outOfBandRecordExample,
    connectionRecord: ConnectionRecordExample,
  })
  @Post('/receive-invitation-url')
  public async receiveInvitationFromUrl(
    @Body() invitationRequest: ReceiveInvitationByUrlProps,
    @Res() internalServerError: TsoaResponse<500, { message: string }>,
  ) {
    const { invitationUrl, ...config } = invitationRequest

    try {
      const { outOfBandRecord, connectionRecord } = await this.agent.oob.receiveInvitationFromUrl(invitationUrl, config)
      return {
        outOfBandRecord: outOfBandRecord.toJSON(),
        connectionRecord: connectionRecord?.toJSON(),
      }
    } catch (error) {
      return internalServerError(500, { message: `something went wrong: ${error}` })
    }
  }

  /**
   * Accept a connection invitation as invitee (by sending a connection request message) for the connection with the specified connection id.
   * This is not needed when auto accepting of connections is enabled.
   */
  @Example<{ outOfBandRecord: OutOfBandRecordWithInvitationProps; connectionRecord: ConnectionRecordProps }>({
    outOfBandRecord: outOfBandRecordExample,
    connectionRecord: ConnectionRecordExample,
  })
  @Post('/:outOfBandId/accept-invitation')
  public async acceptInvitation(
    @Path('outOfBandId') outOfBandId: RecordId,
    @Body() acceptInvitationConfig: AcceptInvitationConfig,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string }>,
  ) {
    try {
      const { outOfBandRecord, connectionRecord } = await this.agent.oob.acceptInvitation(
        outOfBandId,
        acceptInvitationConfig,
      )

      return {
        outOfBandRecord: outOfBandRecord.toJSON(),
        connectionRecord: connectionRecord?.toJSON(),
      }
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, {
          reason: `mediator with mediatorId ${acceptInvitationConfig?.mediatorId} not found`,
        })
      }
      return internalServerError(500, { message: `something went wrong: ${error}` })
    }
  }

  /**
   * Deletes an out of band record from the repository.
   *
   * @param outOfBandId Record identifier
   */
  @Delete('/:outOfBandId')
  public async deleteOutOfBandRecord(
    @Path('outOfBandId') outOfBandId: RecordId,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string }>,
  ) {
    try {
      this.setStatus(204)
      await this.agent.oob.deleteById(outOfBandId)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, { reason: `Out of band record with id "${outOfBandId}" not found.` })
      }
      return internalServerError(500, { message: `something went wrong: ${error}` })
    }
  }
}
