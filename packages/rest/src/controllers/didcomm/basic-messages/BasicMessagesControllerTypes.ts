import type { CredoBaseRecord, RecordId, ThreadId } from '../../types'
import type { BasicMessageRole, BasicMessageRecord as CredoBasicMessageRecord } from '@credo-ts/core'

export interface DidCommBasicMessageRecord extends CredoBaseRecord {
  connectionId: RecordId
  role: BasicMessageRole
  content: string
  sentTime: string
  threadId?: ThreadId
  parentThreadId?: ThreadId
}

export function basicMessageRecordToApiModel(record: CredoBasicMessageRecord): DidCommBasicMessageRecord {
  return {
    // Base Record
    id: record.id,
    createdAt: record.createdAt,
    updatedAt: record.updatedAt,
    type: record.type,

    // Basic Message
    connectionId: record.connectionId,
    role: record.role,
    content: record.content,
    sentTime: record.sentTime,
    threadId: record.threadId,
    parentThreadId: record.parentThreadId,
  }
}

export interface DidCommBasicMessagesSendOptions {
  connectionId: RecordId
  content: string
  parentThreadId?: ThreadId
}
