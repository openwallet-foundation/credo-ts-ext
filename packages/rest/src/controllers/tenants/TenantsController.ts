import type { TenantsRecord } from './TenantsControllerTypes'
import type { VersionString } from '@credo-ts/core'

import { Body, Controller, Delete, Get, Path, Post, Put, Query, Request, Route, Security, Tags } from 'tsoa'
import { injectable } from 'tsyringe'

import { RequestWithRootTenantAgent } from '../../authentication'

import { tenantRecordToApiModel, TenantsCreateOptions, TenantsUpdateOptions } from './TenantsControllerTypes'

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
    @Body() body: TenantsCreateOptions,
  ): Promise<TenantsRecord> {
    const tenant = await request.user.agent.modules.tenants.createTenant({
      config: body.config,
    })

    return tenantRecordToApiModel(tenant)
  }

  /**
   * get tenant by id
   */
  @Get('/{tenantId}')
  public async getTenant(
    @Request() request: RequestWithRootTenantAgent,
    @Path('tenantId') tenantId: string,
  ): Promise<TenantsRecord> {
    const tenant = await request.user.agent.modules.tenants.getTenantById(tenantId)

    return tenantRecordToApiModel(tenant)
  }

  /**
   * update tenant by id.
   *
   * NOTE: this does not overwrite the entire tenant record, only the properties that are passed in the body.
   * If you want to unset an non-required value, you can pass `null`.
   */
  @Put('/{tenantId}')
  public async updateTenant(
    @Request() request: RequestWithRootTenantAgent,
    @Path('tenantId') tenantId: string,
    @Body() body: TenantsUpdateOptions,
  ): Promise<TenantsRecord> {
    const tenantRecord = await request.user.agent.modules.tenants.getTenantById(tenantId)

    tenantRecord.config = {
      ...tenantRecord.config,
    }

    // Set to value, or if null was provided, to undefined
    if (body.config?.connectionImageUrl !== undefined) {
      tenantRecord.config.connectionImageUrl = body.config.connectionImageUrl ?? undefined
    }

    // Overwrite if value was provided
    tenantRecord.config.label = body.config?.label ?? tenantRecord.config.label

    await request.user.agent.modules.tenants.updateTenant(tenantRecord)

    return tenantRecordToApiModel(tenantRecord)
  }

  /**
   * delete tenant by id
   */
  @Delete('/{tenantId}')
  public async deleteTenant(
    @Request() request: RequestWithRootTenantAgent,
    @Path('tenantId') tenantId: string,
  ): Promise<void> {
    this.setStatus(204)
    await request.user.agent.modules.tenants.deleteTenantById(tenantId)
  }

  /**
   * get tenants by query
   */
  @Get('/')
  public async getTenantsByQuery(
    @Request() request: RequestWithRootTenantAgent,
    @Query('label') label?: string,
    @Query('storageVersion') storageVersion?: string,
  ): Promise<TenantsRecord[]> {
    const tenants = await request.user.agent.modules.tenants.findTenantsByQuery({
      label,
      storageVersion: storageVersion as VersionString,
    })

    return tenants.map(tenantRecordToApiModel)
  }
}
