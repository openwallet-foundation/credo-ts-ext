import { OpenId4VciCreateIssuerOptions } from '@credo-ts/openid4vc'
import { Controller, Route, Tags, Security, Post, Request, Body } from 'tsoa'
import { injectable } from 'tsyringe'

import { RequestWithAgent } from '../../../authentication'
import { apiErrorResponse } from '../../../utils/response'

@Tags('OpenID4VC Issuer')
@Route('/openid4vc/issuers')
@Security('tenants', ['tenant'])
@injectable()
export class OpenId4VcIssuersController extends Controller {
  /**
   * Initiate a new openid4vc issuance session by creating a credential offer
   */
  @Post('/')
  public async createIssuer(@Request() request: RequestWithAgent, @Body() options: OpenId4VciCreateIssuerOptions) {
    try {
      const issuer = await request.user.agent.modules.openId4VcIssuer.createIssuer(options)

      // TODO: api model
      return issuer.toJSON()
    } catch (error) {
      this.setStatus(500)
      return apiErrorResponse(error)
    }
  }
}
