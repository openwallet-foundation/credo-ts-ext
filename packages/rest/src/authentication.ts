// authentication.ts

import type { RestAgent, RestRootAgent, RestRootAgentWithTenants, RestTenantAgent } from './utils/agent'
import type { Request } from 'express'

import { Agent } from '@credo-ts/core'
import { container } from 'tsyringe'

import { StatusException } from './error'

export type RequestWithAgent = RequestWithRootAgent | RequestWithTenantAgent | RequestWithRootTenantAgent

export type RequestWithTenantAgent = Request & {
  user: {
    agent: RestTenantAgent
  }
}

export type RequestWithRootAgent = Request & {
  user: {
    agent: RestRootAgent
  }
}

export type RequestWithRootTenantAgent = Request & {
  user: {
    agent: RestRootAgentWithTenants
  }
}

export async function expressAuthentication(request: Request, securityName: string, scopes?: string[]) {
  if (securityName === 'tenants') {
    const rootAgent = container.resolve<RestRootAgent | RestRootAgentWithTenants>(Agent)
    let tenantId = request.headers['x-tenant-id']

    // If tenants module is not enabled, we always return the root tenant agent
    if (!('tenants' in rootAgent.modules)) {
      if (tenantId) {
        return Promise.reject(
          new StatusException(
            'x-tenant-id header was provided, but tenant module is not enabled. Use --multi-tenant to enable multitenant capabilities',
            401,
          ),
        )
      }

      if (scopes?.includes('admin')) {
        return Promise.reject(
          new StatusException(
            'Unable to use tenant admin features without tenant module enabled. Use --multi-tenant to enable multitenant capabilities',
            401,
          ),
        )
      }

      return Promise.resolve({ agent: rootAgent })
    }

    // If tenant-id is not provided, we assume we're the default tenant
    tenantId = tenantId || 'default'
    if (typeof tenantId !== 'string') {
      return Promise.reject(new StatusException('Invalid tenant id provided', 401))
    }

    let requestAgent: RestAgent

    if (tenantId === 'default') {
      if (!scopes || (!scopes.includes('admin') && !scopes.includes('default'))) {
        return Promise.reject(
          new StatusException(
            'Default tenant is not authorized to access this resource. Set the x-tenant-id to a specific tenant id to access this resource.',
            401,
          ),
        )
      }

      requestAgent = rootAgent
    } else {
      if (!scopes || !scopes.includes('tenant')) {
        return Promise.reject(
          new StatusException(
            `Tenant ${tenantId} is not authorized to access this resource. Only the default tenant can access this resource. Omit the x-tenant-id header, or set the value to 'default'`,
            401,
          ),
        )
      }

      requestAgent = await rootAgent.modules.tenants.getTenantAgent({ tenantId })
    }

    return Promise.resolve({ agent: requestAgent })
  }

  return Promise.reject(new StatusException('Not implemented', 401))
}
