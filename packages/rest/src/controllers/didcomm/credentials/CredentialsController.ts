import type {
  DidCommCredentialsCreateOfferResponse,
  DidCommCredentialsExchangeRecord,
} from './CredentialsControllerTypes'
import type { RestAgent } from '../../../utils/agent'

import { CredentialState, Agent, RecordNotFoundError, CredentialRole } from '@credo-ts/core'
import { Body, Controller, Delete, Get, Path, Post, Route, Tags, Example, Query } from 'tsoa'
import { injectable } from 'tsyringe'

import { apiErrorResponse } from '../../../utils/response'
import { RecordId, ThreadId } from '../../types'

import { credentialExchangeRecordExample, didCommCredentialsCreateOfferResponse } from './CredentialsControllerExamples'
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
@injectable()
export class CredentialsController extends Controller {
  private agent: RestAgent

  public constructor(agent: Agent) {
    super()
    this.agent = agent
  }

  /**
   * Retrieve all credential exchange records by query
   */
  @Example<DidCommCredentialsExchangeRecord[]>([credentialExchangeRecordExample])
  @Get('/')
  public async findCredentialsByQuery(
    @Query('threadId') threadId?: ThreadId,
    @Query('parentThreadId') parentThreadId?: ThreadId,
    @Query('connectionId') connectionId?: RecordId,
    @Query('state') state?: CredentialState,
    @Query('role') role?: CredentialRole,
  ) {
    const credentials = await this.agent.credentials.findAllByQuery({
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
  @Example<DidCommCredentialsExchangeRecord>(credentialExchangeRecordExample)
  @Get('/:credentialExchangeId')
  public async getCredentialById(@Path('credentialExchangeId') credentialExchangeId: RecordId) {
    try {
      const credential = await this.agent.credentials.getById(credentialExchangeId)
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
   * Deletes a credential exchange record in the credential repository.
   *
   * @param credentialExchangeId
   */
  @Delete('/:credentialExchangeId')
  public async deleteCredential(@Path('credentialExchangeId') credentialExchangeId: RecordId) {
    try {
      this.setStatus(204)
      await this.agent.credentials.deleteById(credentialExchangeId)
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
  @Example<DidCommCredentialsExchangeRecord>(credentialExchangeRecordExample)
  @Post('/propose-credential')
  public async proposeCredential(@Body() options: ProposeCredentialOptions) {
    try {
      const credential = await this.agent.credentials.proposeCredential(options)
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
  @Example<DidCommCredentialsExchangeRecord>(credentialExchangeRecordExample)
  @Post('/:credentialExchangeId/accept-proposal')
  public async acceptProposal(
    @Path('credentialExchangeId') credentialExchangeId: RecordId,
    @Body() options?: AcceptCredentialProposalOptions,
  ) {
    try {
      const credential = await this.agent.credentials.acceptProposal({
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
  public async createOffer(@Body() options: CreateOfferOptions): Promise<DidCommCredentialsCreateOfferResponse> {
    try {
      const offer = await this.agent.credentials.createOffer(options)
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
  @Example<DidCommCredentialsExchangeRecord>(credentialExchangeRecordExample)
  @Post('/offer-credential')
  public async offerCredential(@Body() options: OfferCredentialOptions) {
    try {
      const credential = await this.agent.credentials.offerCredential(options)
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
  @Example<DidCommCredentialsExchangeRecord>(credentialExchangeRecordExample)
  @Post('/:credentialExchangeId/accept-offer')
  public async acceptOffer(
    @Path('credentialExchangeId') credentialExchangeId: RecordId,
    @Body() options?: AcceptCredentialOfferOptions,
  ) {
    try {
      const credential = await this.agent.credentials.acceptOffer({
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
  @Example<DidCommCredentialsExchangeRecord>(credentialExchangeRecordExample)
  @Post('/:credentialExchangeId/accept-request')
  public async acceptRequest(
    @Path('credentialExchangeId') credentialExchangeId: RecordId,
    @Body() options?: AcceptCredentialRequestOptions,
  ) {
    try {
      const credential = await this.agent.credentials.acceptRequest({
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
  @Example<DidCommCredentialsExchangeRecord>(credentialExchangeRecordExample)
  @Post('/:credentialExchangeId/accept-credential')
  public async acceptCredential(@Path('credentialExchangeId') credentialExchangeId: RecordId) {
    try {
      const credential = await this.agent.credentials.acceptCredential({ credentialRecordId: credentialExchangeId })
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
