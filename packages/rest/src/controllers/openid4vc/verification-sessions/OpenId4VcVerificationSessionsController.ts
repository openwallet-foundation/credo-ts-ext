import type {
  OpenId4VcVerificationSessionsCreateRequestResponse,
  OpenId4VcVerificationSessionsGetVerifiedAuthorizationResponseResponse,
  OpenId4VcVerificationSessionRecord,
} from './OpenId4VcVerificationSessionsControllerTypes'
import type { Jwt } from '@credo-ts/core'

import { ClaimFormat, W3cJsonLdVerifiablePresentation, W3cJwtVerifiablePresentation } from '@credo-ts/core'
import { OpenId4VcVerificationSessionState } from '@credo-ts/openid4vc'
import { OpenId4VcVerificationSessionRepository } from '@credo-ts/openid4vc/build/openid4vc-verifier/repository'
import { Body, Controller, Delete, Example, Get, Path, Post, Query, Request, Route, Security, Tags } from 'tsoa'
import { injectable } from 'tsyringe'

import { RequestWithAgent } from '../../../tenantMiddleware'
import { apiErrorResponse } from '../../../utils/response'
import { PublicIssuerId } from '../issuers/OpenId4VcIssuersControllerTypes'

import {
  openId4VcVerificationSessionsCreateRequestResponse,
  openId4VcVerificationSessionsGetVerifiedAuthorizationResponseExample,
  openId4VcIssuanceSessionRecordExample,
} from './OpenId4VcVerificationSessionsControllerExamples'
import {
  openId4VcVerificationSessionRecordToApiModel,
  OpenId4VcVerificationSessionsCreateRequestOptions,
} from './OpenId4VcVerificationSessionsControllerTypes'

@Tags('OpenID4VC Verification Sessions')
@Route('/openid4vc/verifiers/sessions')
@Security('tenants', ['tenant'])
@injectable()
export class OpenId4VcVerificationSessionsController extends Controller {
  /**
   * Create an OpenID4VC verification session by creating a authorization request
   */
  @Post('/create-request')
  @Example<OpenId4VcVerificationSessionsCreateRequestResponse>(openId4VcVerificationSessionsCreateRequestResponse)
  public async createRequest(
    @Request() request: RequestWithAgent,
    @Body() options: OpenId4VcVerificationSessionsCreateRequestOptions,
  ): Promise<OpenId4VcVerificationSessionsCreateRequestResponse> {
    const { publicVerifierId, ...rest } = options
    try {
      const { authorizationRequest, verificationSession } =
        await request.user.agent.modules.openId4VcVerifier.createAuthorizationRequest({
          ...rest,
          verifierId: publicVerifierId,
        })

      return {
        verificationSession: openId4VcVerificationSessionRecordToApiModel(verificationSession),
        authorizationRequest,
      }
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Get the verified authorization response data for a OpenID4VC verification session.
   *
   * This endpoint can only be called for verification sessions where the state is `ResponseVerified`.
   */
  @Get('/{verificationSessionId}/verified-authorization-response')
  @Example<OpenId4VcVerificationSessionsGetVerifiedAuthorizationResponseResponse>(
    openId4VcVerificationSessionsGetVerifiedAuthorizationResponseExample,
  )
  public async getVerifiedAuthorizationResponse(
    @Request() request: RequestWithAgent,
    @Path('verificationSessionId') verificationSessionId: string,
  ): Promise<OpenId4VcVerificationSessionsGetVerifiedAuthorizationResponseResponse> {
    try {
      const verifiedAuthorizationResponse =
        await request.user.agent.modules.openId4VcVerifier.getVerifiedAuthorizationResponse(verificationSessionId)

      verifiedAuthorizationResponse.presentationExchange
      return {
        ...verifiedAuthorizationResponse,
        presentationExchange: verifiedAuthorizationResponse.presentationExchange
          ? {
              ...verifiedAuthorizationResponse.presentationExchange,
              presentations: verifiedAuthorizationResponse.presentationExchange.presentations.map((presentation) => {
                if (presentation instanceof W3cJsonLdVerifiablePresentation) {
                  return {
                    format: presentation.claimFormat,
                    encoded: presentation.toJSON(),
                    vcPayload: presentation.toJSON(),
                  }
                } else if (presentation instanceof W3cJwtVerifiablePresentation) {
                  return {
                    format: presentation.claimFormat,
                    encoded: presentation.serializedJwt,
                    vcPayload: presentation.presentation.toJSON(),

                    signedPayload: presentation.jwt.payload.toJson(),
                    header: presentation.jwt.header,
                  }
                } else {
                  return {
                    format: ClaimFormat.SdJwtVc,
                    encoded: presentation.compact,
                    vcPayload: presentation.prettyClaims,

                    signedPayload: presentation.payload,
                    header: presentation.header as Jwt['header'],
                  }
                }
              }),
            }
          : undefined,
      }
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Find all OpenID4VC verification sessions by query
   */
  @Get('/')
  @Example<OpenId4VcVerificationSessionRecord[]>([openId4VcIssuanceSessionRecordExample])
  public async getVerificationSessionsByQuery(
    @Request() request: RequestWithAgent,
    @Query('nonce') nonce?: string,
    @Query('publicVerifierId') publicVerifierId?: PublicIssuerId,
    @Query('payloadState') payloadState?: string,
    @Query('state') state?: OpenId4VcVerificationSessionState,
    @Query('authorizationRequestUri') authorizationRequestUri?: string,
  ): Promise<OpenId4VcVerificationSessionRecord[]> {
    try {
      const verificationSessionRepository = request.user.agent.dependencyManager.resolve(
        OpenId4VcVerificationSessionRepository,
      )
      const issuanceSessions = await verificationSessionRepository.findByQuery(request.user.agent.context, {
        verifierId: publicVerifierId,
        authorizationRequestUri,
        payloadState,
        nonce,
        state,
      })

      return issuanceSessions.map(openId4VcVerificationSessionRecordToApiModel)
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Get an OpenID4VC verification session by verification session id
   */
  @Get('/{verificationSessionId}')
  @Example<OpenId4VcVerificationSessionRecord>(openId4VcIssuanceSessionRecordExample)
  public async getVerificationSession(
    @Request() request: RequestWithAgent,
    @Path('verificationSessionId') verificationSessionId: string,
  ): Promise<OpenId4VcVerificationSessionRecord> {
    try {
      const verificationSessionRepository = request.user.agent.dependencyManager.resolve(
        OpenId4VcVerificationSessionRepository,
      )
      const issuanceSession = await verificationSessionRepository.getById(
        request.user.agent.context,
        verificationSessionId,
      )

      return openId4VcVerificationSessionRecordToApiModel(issuanceSession)
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Delete an OpenID4VC verification session by id
   */
  @Delete('/{verificationSessionId}')
  public async deleteVerificationSession(
    @Request() request: RequestWithAgent,
    @Path('verificationSessionId') verificationSessionId: string,
  ): Promise<void> {
    try {
      this.setStatus(204)
      const verificationSessionRepository = request.user.agent.dependencyManager.resolve(
        OpenId4VcVerificationSessionRepository,
      )
      await verificationSessionRepository.deleteById(request.user.agent.context, verificationSessionId)
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }
}
