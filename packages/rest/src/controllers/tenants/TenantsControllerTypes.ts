import type { CredoBaseRecord } from '../types'
import type { TenantRecord as CredoTenantRecord } from '@credo-ts/tenants'
import type { TenantConfig } from '@credo-ts/tenants/build/models/TenantConfig'

type TenantApiConfig = Omit<TenantConfig, 'walletConfig'>

export interface TenantsRecord extends CredoBaseRecord {
  storageVersion: string
  config: TenantApiConfig
}

export function tenantRecordToApiModel(record: CredoTenantRecord): TenantsRecord {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { walletConfig: _, ...config } = record.config

  return {
    // Base Record
    id: record.id,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    type: record.type,

    storageVersion: record.storageVersion,
    config,
  }
}
