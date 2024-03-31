import type {
  OpenId4VcIssuanceSessionCreateOfferSdJwtCredentialOptions,
  OpenId4VcIssuanceSessionsCreateOfferResponse,
  OpenId4VcIssuanceSessionRecord,
} from './OpenId4VcIssuanceSessionsControllerTypes'

import { OpenId4VcIssuanceSessionState } from '@credo-ts/openid4vc'
import { OpenId4VcIssuanceSessionRepository } from '@credo-ts/openid4vc/build/openid4vc-issuer/repository'
import { Body, Controller, Delete, Example, Get, Path, Post, Query, Request, Route, Security, Tags } from 'tsoa'
import { injectable } from 'tsyringe'

import { RequestWithAgent } from '../../../tenantMiddleware'
import { apiErrorResponse } from '../../../utils/response'
import { PublicIssuerId } from '../issuers/OpenId4VcIssuersControllerTypes'

import { openId4VcIssuanceSessionsCreateOfferResponse } from './OpenId4VcIssuanceSessionsControllerExamples'
import {
  OpenId4VcIssuanceSessionsCreateOfferOptions,
  openId4VcIssuanceSessionRecordToApiModel,
} from './OpenId4VcIssuanceSessionsControllerTypes'

@Tags('OpenID4VC Issuance Sessions')
@Route('/openid4vc/issuers/sessions')
@Security('tenants', ['tenant'])
@injectable()
export class OpenId4VcIssuanceSessionsController extends Controller {
  /**
   * Create an OpenID4VC issuance session by creating a credential offer
   */
  @Post('/create-offer')
  @Example<OpenId4VcIssuanceSessionsCreateOfferResponse>(openId4VcIssuanceSessionsCreateOfferResponse)
  public async createOffer(
    @Request() request: RequestWithAgent,
    @Body() options: OpenId4VcIssuanceSessionsCreateOfferOptions,
  ): Promise<OpenId4VcIssuanceSessionsCreateOfferResponse> {
    const { credentials, publicIssuerId, ...rest } = options
    try {
      const issuer = await request.user.agent.modules.openId4VcIssuer.getIssuerByIssuerId(publicIssuerId)

      // Maps credentials, adds properties, and throws errors if needed
      const mappedCredentials = credentials.map((c) => {
        const credentialSupported = issuer.credentialsSupported.find(
          (supported) => supported.id === c.credentialSupportedId,
        )

        if (!credentialSupported) {
          throw new Error(
            `Offered credentialSupportedId ${c.credentialSupportedId} not in the issuer credential supported list`,
          )
        }

        if (credentialSupported.format !== c.format) {
          throw new Error(
            `Offered credentialSupportedId ${c.credentialSupportedId} has format ${c.format} but expected ${credentialSupported.format}`,
          )
        }

        // Add vct to payload if not already there
        return {
          ...c,
          payload: {
            ...c.payload,
            vct: c.payload.vct ?? credentialSupported.vct,
          },
        } satisfies OpenId4VcIssuanceSessionCreateOfferSdJwtCredentialOptions
      })

      const { credentialOffer, issuanceSession } =
        await request.user.agent.modules.openId4VcIssuer.createCredentialOffer({
          ...rest,
          offeredCredentials: credentials.map((c) => c.credentialSupportedId),
          issuerId: publicIssuerId,
          issuanceMetadata: {
            credentials: mappedCredentials,
          },
        })

      return {
        issuanceSession: openId4VcIssuanceSessionRecordToApiModel(issuanceSession),
        credentialOffer,
      }
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Find all OpenID4VC issuance sessions by query
   */
  @Get('/')
  public async getIssuanceSessionsByQuery(
    @Request() request: RequestWithAgent,
    @Query('cNonce') cNonce?: string,
    @Query('publicIssuerId') publicIssuerId?: PublicIssuerId,
    @Query('preAuthorizedCode') preAuthorizedCode?: string,
    @Query('state') state?: OpenId4VcIssuanceSessionState,
    @Query('credentialOfferUri') credentialOfferUri?: string,
  ): Promise<OpenId4VcIssuanceSessionRecord[]> {
    try {
      const issuanceSessionRepository = request.user.agent.dependencyManager.resolve(OpenId4VcIssuanceSessionRepository)
      const issuanceSessions = await issuanceSessionRepository.findByQuery(request.user.agent.context, {
        cNonce,
        issuerId: publicIssuerId,
        preAuthorizedCode,
        state,
        credentialOfferUri,
      })

      return issuanceSessions.map(openId4VcIssuanceSessionRecordToApiModel)
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Get an OpenID4VC issuance session by issuance session id
   */
  @Get('/{issuanceSessionId}')
  public async getIssuanceSession(
    @Request() request: RequestWithAgent,
    @Path('issuanceSessionId') issuanceSessionId: string,
  ): Promise<OpenId4VcIssuanceSessionRecord> {
    try {
      const issuanceSessionRepository = request.user.agent.dependencyManager.resolve(OpenId4VcIssuanceSessionRepository)
      const issuanceSession = await issuanceSessionRepository.getById(request.user.agent.context, issuanceSessionId)

      return openId4VcIssuanceSessionRecordToApiModel(issuanceSession)
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Delete an OpenID4VC issuance session by id
   */
  @Delete('/{issuanceSessionId}')
  public async deleteIssuanceSession(
    @Request() request: RequestWithAgent,
    @Path('issuanceSessionId') issuanceSessionId: string,
  ): Promise<void> {
    try {
      this.setStatus(204)
      const issuanceSessionRepository = request.user.agent.dependencyManager.resolve(OpenId4VcIssuanceSessionRepository)
      await issuanceSessionRepository.deleteById(request.user.agent.context, issuanceSessionId)
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }
}
