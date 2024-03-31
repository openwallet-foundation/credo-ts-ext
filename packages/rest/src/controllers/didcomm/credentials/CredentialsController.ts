import type {
  DidCommCredentialsCreateOfferResponse,
  DidCommCredentialExchangeRecord,
  DidCommCredentialsGetFormatDataResponse,
} from './CredentialsControllerTypes'

import { CredentialState, RecordNotFoundError, CredentialRole } from '@credo-ts/core'
import { Body, Controller, Delete, Get, Path, Post, Route, Tags, Example, Query, Security, Request } from 'tsoa'
import { injectable } from 'tsyringe'

import { RequestWithAgent } from '../../../tenantMiddleware'
import { apiErrorResponse } from '../../../utils/response'
import { RecordId, ThreadId } from '../../types'

import {
  credentialExchangeRecordExample,
  didCommCredentialsCreateOfferResponse,
  didCommCredentialsGetFormatDataExample,
} from './CredentialsControllerExamples'
import {
  AcceptCredentialRequestOptions,
  OfferCredentialOptions,
  ProposeCredentialOptions,
  AcceptCredentialProposalOptions,
  AcceptCredentialOfferOptions,
  CreateOfferOptions,
  credentialExchangeRecordToApiModel,
} from './CredentialsControllerTypes'

@Tags('DIDComm Credentials')
@Route('/didcomm/credentials')
@Security('tenants', ['tenant'])
@injectable()
export class CredentialsController extends Controller {
  /**
   * Retrieve all credential exchange records by query
   */
  @Example<DidCommCredentialExchangeRecord[]>([credentialExchangeRecordExample])
  @Get('/')
  public async findCredentialsByQuery(
    @Request() request: RequestWithAgent,
    @Query('threadId') threadId?: ThreadId,
    @Query('parentThreadId') parentThreadId?: ThreadId,
    @Query('connectionId') connectionId?: RecordId,
    @Query('state') state?: CredentialState,
    @Query('role') role?: CredentialRole,
  ) {
    const credentials = await request.user.agent.credentials.findAllByQuery({
      connectionId,
      threadId,
      state,
      parentThreadId,
      role,
    })

    return credentials.map(credentialExchangeRecordToApiModel)
  }

  /**
   * Retrieve credential exchange record by credential record id
   *
   * @param credentialExchangeId
   * @returns CredentialExchangeRecord
   */
  @Example<DidCommCredentialExchangeRecord>(credentialExchangeRecordExample)
  @Get('/:credentialExchangeId')
  public async getCredentialById(
    @Request() request: RequestWithAgent,
    @Path('credentialExchangeId') credentialExchangeId: RecordId,
  ) {
    try {
      const credential = await request.user.agent.credentials.getById(credentialExchangeId)
      return credentialExchangeRecordToApiModel(credential)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        this.setStatus(404)
        return apiErrorResponse(`credential exchange with id "${credentialExchangeId}" not found.`)
      }

      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Retrieve the format data associated with a credential exchange
   */
  @Get('/:credentialExchangeId/format-data')
  @Example<DidCommCredentialsGetFormatDataResponse>(didCommCredentialsGetFormatDataExample)
  public async getFormatDateForCredentialExchange(
    @Request() request: RequestWithAgent,
    @Path('credentialExchangeId') credentialExchangeId: RecordId,
  ): Promise<DidCommCredentialsGetFormatDataResponse> {
    try {
      const formatData = await request.user.agent.credentials.getFormatData(credentialExchangeId)
      return formatData
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        this.setStatus(404)
        return apiErrorResponse(`credential exchange with id "${credentialExchangeId}" not found.`)
      }

      return apiErrorResponse(error)
    }
  }

  /**
   * Deletes a credential exchange record in the credential repository.
   *
   * @param credentialExchangeId
   */
  @Delete('/:credentialExchangeId')
  public async deleteCredential(
    @Request() request: RequestWithAgent,
    @Path('credentialExchangeId') credentialExchangeId: RecordId,
  ) {
    try {
      this.setStatus(204)
      await request.user.agent.credentials.deleteById(credentialExchangeId)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        this.setStatus(404)
        return apiErrorResponse(`credential exchange with id "${credentialExchangeId}" not found.`)
      }

      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Initiate a new credential exchange as holder by sending a propose credential message
   * to the connection with a specified connection id.
   *
   * @param options
   * @returns CredentialExchangeRecord
   */
  @Example<DidCommCredentialExchangeRecord>(credentialExchangeRecordExample)
  @Post('/propose-credential')
  public async proposeCredential(@Request() request: RequestWithAgent, @Body() options: ProposeCredentialOptions) {
    try {
      const credential = await request.user.agent.credentials.proposeCredential(options)
      return credentialExchangeRecordToApiModel(credential)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        this.setStatus(404)
        return apiErrorResponse(`connection with id "${options.connectionId}" not found.`)
      }

      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Accept a credential proposal as issuer by sending an accept proposal message
   * to the connection associated with the credential exchange record.
   */
  @Example<DidCommCredentialExchangeRecord>(credentialExchangeRecordExample)
  @Post('/:credentialExchangeId/accept-proposal')
  public async acceptProposal(
    @Request() request: RequestWithAgent,
    @Path('credentialExchangeId') credentialExchangeId: RecordId,
    @Body() options?: AcceptCredentialProposalOptions,
  ) {
    try {
      const credential = await request.user.agent.credentials.acceptProposal({
        ...options,
        credentialRecordId: credentialExchangeId,
      })

      return credentialExchangeRecordToApiModel(credential)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        this.setStatus(404)
        return apiErrorResponse(`credential exchange with id "${credentialExchangeId}" not found.`)
      }

      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Initiate a new credential exchange as issuer by creating a credential offer
   * without specifying a connection id
   */
  @Example<DidCommCredentialsCreateOfferResponse>(didCommCredentialsCreateOfferResponse)
  @Post('/create-offer')
  public async createOffer(
    @Request() request: RequestWithAgent,
    @Body() options: CreateOfferOptions,
  ): Promise<DidCommCredentialsCreateOfferResponse> {
    try {
      const offer = await request.user.agent.credentials.createOffer(options)
      return {
        message: offer.message.toJSON(),
        credentialExchange: credentialExchangeRecordToApiModel(offer.credentialRecord),
      }
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Initiate a new credential exchange as issuer by sending a offer credential message
   * to the connection with the specified connection id.
   */
  @Example<DidCommCredentialExchangeRecord>(credentialExchangeRecordExample)
  @Post('/offer-credential')
  public async offerCredential(@Request() request: RequestWithAgent, @Body() options: OfferCredentialOptions) {
    try {
      const credential = await request.user.agent.credentials.offerCredential(options)
      return credentialExchangeRecordToApiModel(credential)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        this.setStatus(404)
        return apiErrorResponse(`connection with id "${options.connectionId}" not found.`)
      }

      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Accept a credential offer as holder by sending an accept offer message
   * to the connection associated with the credential exchange record.
   */
  @Example<DidCommCredentialExchangeRecord>(credentialExchangeRecordExample)
  @Post('/:credentialExchangeId/accept-offer')
  public async acceptOffer(
    @Request() request: RequestWithAgent,
    @Path('credentialExchangeId') credentialExchangeId: RecordId,
    @Body() options?: AcceptCredentialOfferOptions,
  ) {
    try {
      const credential = await request.user.agent.credentials.acceptOffer({
        ...options,
        credentialRecordId: credentialExchangeId,
      })
      return credentialExchangeRecordToApiModel(credential)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        this.setStatus(404)
        return apiErrorResponse(`credential exchange with id "${credentialExchangeId}" not found.`)
      }

      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Accept a credential request as issuer by sending an accept request message
   * to the connection associated with the credential exchange record.
   */
  @Example<DidCommCredentialExchangeRecord>(credentialExchangeRecordExample)
  @Post('/:credentialExchangeId/accept-request')
  public async acceptRequest(
    @Request() request: RequestWithAgent,
    @Path('credentialExchangeId') credentialExchangeId: RecordId,
    @Body() options?: AcceptCredentialRequestOptions,
  ) {
    try {
      const credential = await request.user.agent.credentials.acceptRequest({
        ...options,
        credentialRecordId: credentialExchangeId,
      })
      return credentialExchangeRecordToApiModel(credential)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        this.setStatus(404)
        return apiErrorResponse(`credential exchange with id "${credentialExchangeId}" not found.`)
      }

      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Accept a credential as holder by sending an accept credential message
   * to the connection associated with the credential exchange record.
   */
  @Example<DidCommCredentialExchangeRecord>(credentialExchangeRecordExample)
  @Post('/:credentialExchangeId/accept-credential')
  public async acceptCredential(
    @Request() request: RequestWithAgent,
    @Path('credentialExchangeId') credentialExchangeId: RecordId,
  ) {
    try {
      const credential = await request.user.agent.credentials.acceptCredential({
        credentialRecordId: credentialExchangeId,
      })
      return credentialExchangeRecordToApiModel(credential)
    } catch (error) {
      if (error instanceof RecordNotFoundError) {
        this.setStatus(404)
        return apiErrorResponse(`credential exchange with id "${credentialExchangeId}" not found.`)
      }

      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }
}
