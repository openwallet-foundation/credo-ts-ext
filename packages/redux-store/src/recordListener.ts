import type { SerializedInstance } from './types'
import type { RecordConstructor } from './utils'
import type { Agent, RecordDeletedEvent, RecordSavedEvent, RecordUpdatedEvent, BaseRecord } from '@credo-ts/core'
import type { Store } from '@reduxjs/toolkit'

import { JsonTransformer, RepositoryEventTypes } from '@credo-ts/core'
import { createAction } from '@reduxjs/toolkit'

import { isRecordType } from './utils'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseRecordAny = BaseRecord<any, any, any>

export const addRecord = createAction<BaseRecordAny>('record/add')
export const updateRecord = createAction<BaseRecordAny>('record/update')
export const removeRecord = createAction<BaseRecordAny | { id: string; type: string }>('record/remove')

/**
 * Starts an EventListener that listens for record events
 * and dispatches actions based on the events. Slices can integrate with
 * the actions and update the store accordingly.
 *
 * This function **must** be called. If you don't, the store won't be updated.
 */
export const startRecordListeners = (agent: Agent, store: Store) => {
  const onDeleted = (event: RecordDeletedEvent<BaseRecordAny>) => {
    const record = event.payload.record
    store.dispatch(removeRecord(record))
  }

  const onSaved = (event: RecordSavedEvent<BaseRecordAny>) => {
    store.dispatch(addRecord(event.payload.record))
  }

  const onUpdated = (event: RecordUpdatedEvent<BaseRecordAny>) => {
    store.dispatch(updateRecord(event.payload.record))
  }

  agent.events.on<RecordDeletedEvent<BaseRecordAny>>(RepositoryEventTypes.RecordDeleted, onDeleted)
  agent.events.on<RecordSavedEvent<BaseRecordAny>>(RepositoryEventTypes.RecordSaved, onSaved)
  agent.events.on<RecordUpdatedEvent<BaseRecordAny>>(RepositoryEventTypes.RecordUpdated, onUpdated)

  return () => {
    agent.events.off(RepositoryEventTypes.RecordDeleted, onDeleted)
    agent.events.off(RepositoryEventTypes.RecordSaved, onSaved)
    agent.events.off(RepositoryEventTypes.RecordUpdated, onUpdated)
  }
}

export const removeRecordInState = (
  recordType: RecordConstructor,
  records: SerializedInstance<BaseRecordAny>[],
  record: BaseRecordAny | { id: string; type: string },
) => {
  // We're only interested in events for the recordType
  if (!isRecordType(record, recordType)) return

  const index = records.findIndex((r) => r.id === record.id)

  // Record does not exist, not needed to remove anything
  if (index === -1) return

  records.splice(index, 1)
}

export const addRecordInState = (
  recordType: RecordConstructor,
  records: SerializedInstance<BaseRecordAny>[],
  record: BaseRecordAny,
) => {
  // We're only interested in events for the recordType
  if (!isRecordType(record, recordType)) return

  records.push(JsonTransformer.toJSON(record))
}

export const updateRecordInState = (
  recordType: RecordConstructor,
  records: SerializedInstance<BaseRecordAny>[],
  record: BaseRecordAny,
) => {
  // We're only interested in events for the recordType
  if (!isRecordType(record, recordType)) return

  const index = records.findIndex((r) => r.id === record.id)

  // Record does not exist, add it
  if (index === -1) {
    records.push(JsonTransformer.toJSON(record))
  } else {
    records[index] = JsonTransformer.toJSON(record)
  }
}
