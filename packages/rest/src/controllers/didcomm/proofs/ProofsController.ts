import type {
  DidCommProofsCreateRequestResponse,
  DidCommProofExchangeRecord,
  DidCommProofsGetFormatDataResponse,
} from './ProofsControllerTypes'

import { ProofRole, ProofState, RecordNotFoundError } from '@credo-ts/core'
import { Body, Controller, Delete, Example, Get, Path, Post, Query, Request, Route, Security, Tags } from 'tsoa'
import { injectable } from 'tsyringe'

import { RequestWithAgent } from '../../../tenantMiddleware'
import { apiErrorResponse } from '../../../utils/response'
import { RecordId, ThreadId } from '../../types'

import {
  didCommProofsCreateRequestResponse,
  didCommProofsGetFormatDataExample,
  proofExchangeRecordExample,
} from './ProofsControllerExamples'
import {
  DidCommProofsCreateRequestOptions,
  DidCommProofsAcceptRequestOptions,
  proofExchangeRecordToApiModel,
  DidCommProofsProposeProofOptions,
  DidCommProofsAcceptProposalOptions,
  transformApiProofFormatToCredo,
  DidCommProofsSendRequestOptions,
} from './ProofsControllerTypes'

@Tags('DIDComm Proofs')
@Route('/didcomm/proofs')
@Security('tenants', ['tenant'])
@injectable()
export class ProofsController extends Controller {
  /**
   * Find proof exchanges by query
   */
  @Example<DidCommProofExchangeRecord[]>([proofExchangeRecordExample])
  @Get('/')
  public async findProofsByQuery(
    @Request() request: RequestWithAgent,
    @Query('threadId') threadId?: ThreadId,
    @Query('connectionId') connectionId?: RecordId,
    @Query('state') state?: ProofState,
    @Query('parentThreadId') parentThreadId?: ThreadId,
    @Query('role') role?: ProofRole,
  ): Promise<DidCommProofExchangeRecord[]> {
    const proofs = await request.user.agent.proofs.findAllByQuery({
      threadId,
      connectionId,
      state,
      parentThreadId,
      role,
    })

    return proofs.map(proofExchangeRecordToApiModel)
  }

  /**
   * Retrieve the format data associated with a proof exchange
   */
  @Get('/:proofExchangeId/format-data')
  @Example<DidCommProofsGetFormatDataResponse>(didCommProofsGetFormatDataExample)
  public async getFormatDateForProofExchange(
    @Request() request: RequestWithAgent,
    @Path('proofExchangeId') proofExchangeId: RecordId,
  ): Promise<DidCommProofsGetFormatDataResponse> {
    try {
      const formatData = await request.user.agent.proofs.getFormatData(proofExchangeId)
      return formatData
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        this.setStatus(404)
        return apiErrorResponse(`proof exchange with id "${proofExchangeId}" not found.`)
      }

      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Retrieve proof exchange by proof exchange id
   */
  @Get('/:proofExchangeId')
  @Example<DidCommProofExchangeRecord>(proofExchangeRecordExample)
  public async getProofExchangeById(
    @Request() request: RequestWithAgent,
    @Path('proofExchangeId') proofExchangeId: RecordId,
  ): Promise<DidCommProofExchangeRecord> {
    const proofExchange = await request.user.agent.proofs.findById(proofExchangeId)

    if (!proofExchange) {
      this.setStatus(404)
      return apiErrorResponse(`proof exchange with id "${proofExchangeId}" not found.`)
    }

    return proofExchangeRecordToApiModel(proofExchange)
  }

  /**
   * Deletes a proof exchange record.
   */
  @Delete('/:proofExchangeId')
  public async deleteProof(
    @Request() request: RequestWithAgent,
    @Path('proofExchangeId') proofExchangeId: RecordId,
  ): Promise<void> {
    try {
      this.setStatus(204)
      await request.user.agent.proofs.deleteById(proofExchangeId)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        this.setStatus(404)
        return apiErrorResponse(`proof exchange with id "${proofExchangeId}" not found.`)
      }

      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Initiate a new presentation exchange as prover by sending a presentation proposal request
   * to the connection with the specified connection id.
   */
  @Post('/propose-proof')
  @Example<DidCommProofExchangeRecord>(proofExchangeRecordExample)
  public async proposeProof(
    @Request() request: RequestWithAgent,
    @Body() body: DidCommProofsProposeProofOptions,
  ): Promise<DidCommProofExchangeRecord> {
    try {
      const proofExchange = await request.user.agent.proofs.proposeProof(body)
      return proofExchangeRecordToApiModel(proofExchange)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        this.setStatus(404)
        return apiErrorResponse(`connection with id "${body.connectionId}" not found.`)
      }

      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Accept a presentation proposal as verifier by sending an accept proposal message
   * to the connection associated with the proof record.
   */
  @Post('/:proofExchangeId/accept-proposal')
  @Example<DidCommProofExchangeRecord>(proofExchangeRecordExample)
  public async acceptProposal(
    @Request() request: RequestWithAgent,
    @Path('proofExchangeId') proofExchangeId: RecordId,
    @Body() body: DidCommProofsAcceptProposalOptions,
  ): Promise<DidCommProofExchangeRecord> {
    try {
      const proof = await request.user.agent.proofs.acceptProposal({
        proofRecordId: proofExchangeId,
        ...body,
      })

      return proofExchangeRecordToApiModel(proof)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        this.setStatus(404)
        return apiErrorResponse(`proof exchange with id "${proofExchangeId}" not found.`)
      }

      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Creates a presentation request not bound to any proposal or existing connection
   */
  @Post('/create-request')
  @Example<DidCommProofsCreateRequestResponse>(didCommProofsCreateRequestResponse)
  public async createRequest(
    @Request() request: RequestWithAgent,
    @Body() body: DidCommProofsCreateRequestOptions,
  ): Promise<DidCommProofsCreateRequestResponse> {
    try {
      // NOTE: Credo does not work well if 'undefined' is passed. We should fix this in credo
      const proofFormats: Parameters<typeof request.user.agent.proofs.createRequest>[0]['proofFormats'] = {}
      if (body.proofFormats.anoncreds) {
        proofFormats.anoncreds = transformApiProofFormatToCredo(body.proofFormats.anoncreds)
      }
      if (body.proofFormats.indy) {
        proofFormats.indy = transformApiProofFormatToCredo(body.proofFormats.indy)
      }

      const { message, proofRecord: proofExchange } = await request.user.agent.proofs.createRequest({
        ...body,
        proofFormats,
      })

      return {
        message: message.toJSON(),
        proofExchange: proofExchangeRecordToApiModel(proofExchange),
      }
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Creates a presentation request bound to existing connection
   */
  @Post('/request-proof')
  @Example<DidCommProofExchangeRecord>(proofExchangeRecordExample)
  public async requestProof(@Request() request: RequestWithAgent, @Body() body: DidCommProofsSendRequestOptions) {
    try {
      // NOTE: Credo does not work well if 'undefined' is passed as a proofFormat key. We should fix this in credo
      const proofFormats: Parameters<typeof request.user.agent.proofs.requestProof>[0]['proofFormats'] = {}
      if (body.proofFormats.anoncreds) {
        proofFormats.anoncreds = transformApiProofFormatToCredo(body.proofFormats.anoncreds)
      }
      if (body.proofFormats.indy) {
        proofFormats.indy = transformApiProofFormatToCredo(body.proofFormats.indy)
      }

      const proof = await request.user.agent.proofs.requestProof({
        ...body,
        proofFormats,
      })

      return proofExchangeRecordToApiModel(proof)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        this.setStatus(404)
        return apiErrorResponse(`connection with id "${body.connectionId}" not found.`)
      }

      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Accept a presentation request as prover by sending an accept request message
   * to the connection associated with the proof record.
   */
  @Post('/:proofExchangeId/accept-request')
  @Example<DidCommProofExchangeRecord>(proofExchangeRecordExample)
  public async acceptRequest(
    @Request() request: RequestWithAgent,
    @Path('proofExchangeId') proofExchangeId: RecordId,
    @Body() body: DidCommProofsAcceptRequestOptions,
  ) {
    try {
      const proof = await request.user.agent.proofs.acceptRequest({
        ...body,
        proofRecordId: proofExchangeId,
        proofFormats: body.proofFormats,
      })

      return proofExchangeRecordToApiModel(proof)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        this.setStatus(404)
        return apiErrorResponse(`proof exchange with id "${proofExchangeId}" not found.`)
      }

      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Accept a presentation as prover by sending an accept presentation message
   * to the connection associated with the proof record.
   */
  @Post('/:proofExchangeId/accept-presentation')
  @Example<DidCommProofExchangeRecord>(proofExchangeRecordExample)
  public async acceptPresentation(
    @Request() request: RequestWithAgent,
    @Path('proofExchangeId') proofExchangeId: RecordId,
  ) {
    try {
      const proof = await request.user.agent.proofs.acceptPresentation({ proofRecordId: proofExchangeId })

      return proofExchangeRecordToApiModel(proof)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        this.setStatus(404)
        return apiErrorResponse(`proof exchange with id "${proofExchangeId}" not found.`)
      }

      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }
}
