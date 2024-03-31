import { OpenId4VcIssuerRepository } from '@credo-ts/openid4vc/build/openid4vc-issuer/repository'
import { Controller, Route, Tags, Security, Post, Request, Body, Delete, Path, Put, Example, Query, Get } from 'tsoa'
import { injectable } from 'tsyringe'

import { RequestWithAgent } from '../../../tenantMiddleware'
import { apiErrorResponse } from '../../../utils/response'

import { openId4VcIssuerRecordExample } from './OpenId4VcIssuersControllerExamples'
import {
  openId4VcIssuerRecordToApiModel,
  OpenId4VcIssuersCreateOptions,
  OpenId4VcIssuersUpdateMetadataOptions,
  type OpenId4VcIssuerRecord,
} from './OpenId4VcIssuersControllerTypes'

@Tags('OpenID4VC Issuers')
@Route('/openid4vc/issuers')
@Security('tenants', ['tenant'])
@injectable()
export class OpenId4VcIssuersController extends Controller {
  /**
   * Create a new OpenID4VCI Issuer
   */
  @Post('/')
  @Example<OpenId4VcIssuerRecord>(openId4VcIssuerRecordExample)
  public async createIssuer(
    @Request() request: RequestWithAgent,
    @Body() options: OpenId4VcIssuersCreateOptions,
  ): Promise<OpenId4VcIssuerRecord> {
    const { publicIssuerId, ...rest } = options
    try {
      const issuer = await request.user.agent.modules.openId4VcIssuer.createIssuer({
        ...rest,
        issuerId: publicIssuerId,
      })
      return openId4VcIssuerRecordToApiModel(issuer)
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  @Get('/')
  @Example<OpenId4VcIssuerRecord[]>([openId4VcIssuerRecordExample])
  public async getIssuersByQuery(
    @Request() request: RequestWithAgent,
    @Query('publicIssuerId') publicIssuerId?: string,
  ): Promise<OpenId4VcIssuerRecord[]> {
    try {
      const issuerRepository = request.user.agent.dependencyManager.resolve(OpenId4VcIssuerRepository)
      const issuers = await issuerRepository.findByQuery(request.user.agent.context, {
        issuerId: publicIssuerId,
      })
      return issuers.map(openId4VcIssuerRecordToApiModel)
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Delete an OpenID4VCI issuer by id
   */
  @Delete('/{issuerId}')
  public async deleteIssuer(@Request() request: RequestWithAgent, @Path('issuerId') issuerId: string): Promise<void> {
    try {
      this.setStatus(204)
      const issuerRepository = request.user.agent.dependencyManager.resolve(OpenId4VcIssuerRepository)
      await issuerRepository.deleteById(request.user.agent.context, issuerId)
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Get an OpenID4VCI issuer by id
   */
  @Get('/{issuerId}')
  @Example<OpenId4VcIssuerRecord>(openId4VcIssuerRecordExample)
  public async getIssuer(
    @Request() request: RequestWithAgent,
    @Path('issuerId') issuerId: string,
  ): Promise<OpenId4VcIssuerRecord> {
    try {
      this.setStatus(204)
      const issuerRepository = request.user.agent.dependencyManager.resolve(OpenId4VcIssuerRepository)
      const issuer = await issuerRepository.getById(request.user.agent.context, issuerId)
      return openId4VcIssuerRecordToApiModel(issuer)
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }

  /**
   * Update issuer metadata (`display` and `credentialsSupported`).
   *
   * NOTE: this method overwrites the existing metadata with the new metadata, so
   * make sure to include all the metadata you want to keep in the new metadata.
   */
  @Put('/{issuerId}')
  @Example<OpenId4VcIssuerRecord>(openId4VcIssuerRecordExample)
  public async updateIssuerMetadata(
    @Request() request: RequestWithAgent,
    @Path('issuerId') issuerId: string,
    @Body() body: OpenId4VcIssuersUpdateMetadataOptions,
  ): Promise<OpenId4VcIssuerRecord> {
    try {
      // FIXME: in Credo we update based on the public issuerId, but that's quit weird and we should
      // do it based on the internal record id. So in the API we do it consistently, but need to fetch
      // the record first in this case
      const issuerRepository = request.user.agent.dependencyManager.resolve(OpenId4VcIssuerRepository)
      const issuer = await issuerRepository.getById(request.user.agent.context, issuerId)

      // FIXME: should return the updated record, now we fetch (AGAIN!!)
      await request.user.agent.modules.openId4VcIssuer.updateIssuerMetadata({
        ...body,
        issuerId: issuer.issuerId,
      })

      const updatedIssuer = await issuerRepository.getById(request.user.agent.context, issuerId)
      return openId4VcIssuerRecordToApiModel(updatedIssuer)
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }
}
