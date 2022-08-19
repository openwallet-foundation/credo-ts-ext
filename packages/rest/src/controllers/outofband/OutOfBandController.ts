import type { OutOfBandInvitationProps, OutOfBandRecordWithInvitationProps } from '../examples'
import type { OutOfBandInvitationSchema } from '../types'
import type {
  AgentMessage,
  ConnectionRecordProps,
  ReceiveOutOfBandInvitationConfig,
  Routing,
  CreateOutOfBandInvitationConfig,
  CreateLegacyInvitationConfig,
  OutOfBandInvitationOptions,
} from '@aries-framework/core'

import { JsonTransformer, OutOfBandInvitation, Agent, RecordNotFoundError } from '@aries-framework/core'
import { Body, Controller, Delete, Example, Get, Path, Post, Query, Res, Route, Tags, TsoaResponse } from 'tsoa'
import { injectable } from 'tsyringe'

import { ConnectionRecordExample, outOfBandInvitationExample, outOfBandRecordExample, RecordId } from '../examples'

type ChangeProp<Input, Old, New> = {
  [Property in keyof Input]: Input[Property] extends Old
    ? New
    : Input[Property] extends Record<string, unknown>
    ? ChangeProp<Input[Property], Old, New>
    : Input[Property]
}

type Ay = ChangeProp<{ a: string; b: boolean }, string, boolean>

interface ReceiveInvitationProps extends ReceiveOutOfBandInvitationConfig {
  invitation: OutOfBandInvitationSchema
}

interface ReceiveInvitationByUrlProps extends ReceiveOutOfBandInvitationConfig {
  invitationUrl: string
}

@Tags('Out Of Band')
@Route('/oob')
@injectable()
export class OutOfBandController extends Controller {
  private agent: Agent

  public constructor(agent: Agent) {
    super()
    this.agent = agent
  }

  /**
   * Retrieve all out of band records
   * @param recordId record identifier
   * @returns OutOfBandRecord[]
   */
  @Example<OutOfBandRecordWithInvitationProps[]>([outOfBandRecordExample])
  @Get()
  public async getAllOutOfBandRecords(@Query('invitationId') invitationId?: string) {
    let outOfBandRecords = await this.agent.oob.getAll()

    if (invitationId) outOfBandRecords = outOfBandRecords.filter((o) => o.outOfBandInvitation.id === invitationId)

    return outOfBandRecords.map((c) => c.toJSON())
  }

  /**
   * Retrieve an out of band record by id
   * @param recordId record identifier
   * @returns OutOfBandRecord
   */
  @Example<OutOfBandRecordWithInvitationProps>(outOfBandRecordExample)
  @Get('/:outOfBandId')
  public async getOutOfBandRecordById(
    @Path('outOfBandId') outOfBandId: RecordId,
    @Res() notFoundError: TsoaResponse<404, { reason: string }>
  ) {
    const outOfBandRecord = await this.agent.oob.findById(outOfBandId)

    if (!outOfBandRecord)
      return notFoundError(404, { reason: `Out of band record with id "${outOfBandId}" not found.` })

    return outOfBandRecord.toJSON()
  }

  /**
   * Creates an outbound out-of-band record containing out-of-band invitation message defined in
   * Aries RFC 0434: Out-of-Band Protocol 1.1.
   * @param config configuration of how out-of-band invitation should be created
   * @returns out-of-band record
   */
  @Example<{ invitationUrl: string; invitation: OutOfBandInvitationProps }>({
    invitationUrl: 'string',
    invitation: outOfBandInvitationExample,
  })
  @Post('/create-invitation')
  public async createInvitation(
    @Res() internalServerError: TsoaResponse<500, { message: string; error: unknown }>,
    @Body() config?: Omit<CreateOutOfBandInvitationConfig, 'routing'>
  ) {
    // routing prop removed because of issues with public key serialization

    try {
      const oobRecord = await this.agent.oob.createInvitation(config)
      return {
        invitationUrl: oobRecord.outOfBandInvitation.toUrl({
          domain: this.agent.config.endpoints[0],
        }),
        invitation: oobRecord.outOfBandInvitation.toJSON({
          useLegacyDidSovPrefix: this.agent.config.useLegacyDidSovPrefix,
        }),
      }
    } catch (error) {
      return internalServerError(500, { message: 'something went wrong', error: error })
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
  @Example<{ outOfBandRecord: OutOfBandRecordWithInvitationProps; invitation: OutOfBandInvitationProps }>({
    outOfBandRecord: outOfBandRecordExample,
    invitation: outOfBandInvitationExample,
  })
  @Post('/create-legacy-invitation')
  public async createLegacyInvitation(
    @Res() internalServerError: TsoaResponse<500, { message: string; error: unknown }>,
    @Body() config?: Omit<CreateLegacyInvitationConfig, 'routing'>
  ) {
    // routing prop removed because of issues with public key serialization

    try {
      const { outOfBandRecord, invitation } = await this.agent.oob.createLegacyInvitation(config)
      return {
        outOfBandRecord: outOfBandRecord.toJSON(),
        invitation: invitation.toJSON({
          useLegacyDidSovPrefix: this.agent.config.useLegacyDidSovPrefix,
        }),
      }
    } catch (error) {
      return internalServerError(500, { message: 'something went wrong', error: error })
    }
  }

  /**
   * Creates a new connectionless legacy invitation.
   *
   * @param config configuration of how a connection invitation should be created
   * @returns a message and a invitationUrl
   */
  @Example<{ message: Pick<AgentMessage, 'id' | 'type'>; invitationUrl: string }>({
    message: { id: 'lol', type: 'lol' },
    invitationUrl: 'hi',
  })
  @Post('/create-legacy-connectionless-invitation')
  public async createLegacyConnectionlessInvitation(
    @Body()
    config: {
      recordId: string
      message: AgentMessage
      domain: string
    },
    @Res() notFoundError: TsoaResponse<404, { reason: string }>,
    @Res() internalServerError: TsoaResponse<500, { message: string; error: unknown }>
  ) {
    try {
      return await this.agent.oob.createLegacyConnectionlessInvitation(config)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, { reason: `connection with connection id "${config.recordId}" not found.` })
      }
      return internalServerError(500, { message: 'something went wrong', error: error })
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
    @Res() internalServerError: TsoaResponse<500, { message: string; error: unknown }>
  ) {
    const { invitation, ...config } = invitationRequest

    const inv = JsonTransformer.fromJSON(invitation, OutOfBandInvitation)

    try {
      const { outOfBandRecord, connectionRecord } = await this.agent.oob.receiveInvitation(inv, config)
      return {
        outOfBandRecord: outOfBandRecord.toJSON(),
        connectionRecord: connectionRecord?.toJSON(),
      }
    } catch (error) {
      return internalServerError(500, { message: 'something went wrong', error: error })
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
    @Res() internalServerError: TsoaResponse<500, { message: string; error: unknown }>
  ) {
    const { invitationUrl, ...config } = invitationRequest

    try {
      const { outOfBandRecord, connectionRecord } = await this.agent.oob.receiveInvitationFromUrl(invitationUrl, config)
      return {
        outOfBandRecord: outOfBandRecord.toJSON(),
        connectionRecord: connectionRecord?.toJSON(),
      }
    } catch (error) {
      return internalServerError(500, { message: 'something went wrong', error: error })
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
    @Res() internalServerError: TsoaResponse<500, { message: string; error: unknown }>
  ) {
    try {
      const { outOfBandRecord, connectionRecord } = await this.agent.oob.acceptInvitation(
        outOfBandId,
        acceptInvitationConfig
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
      return internalServerError(500, { message: 'something went wrong', error: error })
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
    @Res() internalServerError: TsoaResponse<500, { message: string; error: unknown }>
  ) {
    try {
      this.setStatus(204)
      await this.agent.oob.deleteById(outOfBandId)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        return notFoundError(404, { reason: `Out of band record with id "${outOfBandId}" not found.` })
      }
      return internalServerError(500, { message: 'something went wrong', error: error })
    }
  }

  // this.agent.oob.deleteById
}

interface AcceptInvitationConfig {
  autoAcceptConnection?: boolean
  reuseConnection?: boolean
  label?: string
  alias?: string
  imageUrl?: string
  mediatorId?: string
  routing?: Routing
}
