import { OpenId4VcVerifierRepository } from '@credo-ts/openid4vc/build/openid4vc-verifier/repository'
import { Controller, Route, Tags, Security, Post, Request, Body, Delete, Path, Example, Get, Query } from 'tsoa'
import { injectable } from 'tsyringe'

import { RequestWithAgent } from '../../../tenantMiddleware'
import { apiErrorResponse } from '../../../utils/response'

import { openId4VcIssuerRecordExample } from './OpenId4VcVerifiersControllerExamples'
import {
  openId4vcVerifierRecordToApiModel,
  OpenId4VcVerifiersCreateOptions,
  type OpenId4VcVerifierRecord,
} from './OpenId4VcVerifiersControllerTypes'

@Tags('OpenID4VC Verifiers')
@Route('/openid4vc/verifiers')
@Security('tenants', ['tenant'])
@injectable()
export class OpenId4VcVerifiersController extends Controller {
  /**
   * Create a new OpenID4VC Verifier
   */
  @Post('/')
  @Example<OpenId4VcVerifierRecord>(openId4VcIssuerRecordExample)
  public async createVerifier(
    @Request() request: RequestWithAgent,
    @Body() options: OpenId4VcVerifiersCreateOptions,
  ): Promise<OpenId4VcVerifierRecord> {
    try {
      const verifier = await request.user.agent.modules.openId4VcVerifier.createVerifier({
        verifierId: options.publicVerifierId,
      })
      return openId4vcVerifierRecordToApiModel(verifier)
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Get OpenID4VC verifiers by query
   */
  @Get('/')
  @Example<OpenId4VcVerifierRecord[]>([openId4VcIssuerRecordExample])
  public async getVerifiersByQuery(
    @Request() request: RequestWithAgent,
    @Query('publicVerifierId') publicVerifierId?: string,
  ): Promise<OpenId4VcVerifierRecord[]> {
    try {
      const verifierRepository = request.user.agent.dependencyManager.resolve(OpenId4VcVerifierRepository)
      const verifiers = await verifierRepository.findByQuery(request.user.agent.context, {
        verifierId: publicVerifierId,
      })
      return verifiers.map(openId4vcVerifierRecordToApiModel)
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Get an OpenID4VC verifier by id
   */
  @Get('/{verifierId}')
  @Example<OpenId4VcVerifierRecord>(openId4VcIssuerRecordExample)
  public async getVerifier(
    @Request() request: RequestWithAgent,
    @Path('verifierId') verifierId: string,
  ): Promise<OpenId4VcVerifierRecord> {
    try {
      const verifierRepository = request.user.agent.dependencyManager.resolve(OpenId4VcVerifierRepository)
      const verifier = await verifierRepository.getById(request.user.agent.context, verifierId)
      return openId4vcVerifierRecordToApiModel(verifier)
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Delete an OpenID4VC verifier by id
   */
  @Delete('/{verifierId}')
  public async deleteVerifier(
    @Request() request: RequestWithAgent,
    @Path('verifierId') verifierId: string,
  ): Promise<void> {
    try {
      this.setStatus(204)
      const verifierRepository = request.user.agent.dependencyManager.resolve(OpenId4VcVerifierRepository)
      await verifierRepository.deleteById(request.user.agent.context, verifierId)
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }
}
