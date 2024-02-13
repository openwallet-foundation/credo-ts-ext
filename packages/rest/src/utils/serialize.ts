import type { BaseRecord } from '@credo-ts/core'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function toApiModel<ToType = Record<string, unknown>>(record: BaseRecord<any, any, any>): ToType {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _tags, ...recordJson } = record.toJSON()

  return recordJson as unknown as ToType
}
