import type { TenantsRecord } from './TenantsControllerTypes'

import { CreateTenantOptions } from '@credo-ts/tenants'
import { Body, Controller, Post, Request, Route, Security, Tags } from 'tsoa'
import { injectable } from 'tsyringe'

import { RequestWithRootTenantAgent } from '../../authentication'

import { tenantRecordToApiModel } from './TenantsControllerTypes'

@Tags('Tenants')
@Route('/tenants')
@Security('tenants', ['admin'])
@injectable()
export class TenantsController extends Controller {
  /**
   * create new tenant
   */
  @Post('/')
  public async createTenant(
    @Request() request: RequestWithRootTenantAgent,
    @Body() body: CreateTenantOptions,
  ): Promise<TenantsRecord> {
    const tenant = await request.user.agent.modules.tenants.createTenant({
      config: body.config,
    })

    return tenantRecordToApiModel(tenant)
  }
}
