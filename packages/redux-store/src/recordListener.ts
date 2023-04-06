import type { SerializedInstance } from './types'
import type { RecordConstructor } from './utils'
import type { Agent, RecordDeletedEvent, RecordSavedEvent, RecordUpdatedEvent } from '@aries-framework/core'
import type { Store } from '@reduxjs/toolkit'

import { JsonTransformer, RepositoryEventTypes, BaseRecord } from '@aries-framework/core'
import { createAction } from '@reduxjs/toolkit'

import { isRecordType } from './utils'

export const addRecord = createAction<BaseRecord>('record/add')
export const updateRecord = createAction<BaseRecord>('record/update')
export const removeRecord = createAction<BaseRecord>('record/remove')

/**
 * Starts an EventListener that listens for record events
 * and dispatches actions based on the events. Slices can integrate with
 * the actions and update the store accordingly.
 *
 * This function **must** be called. If you don't, the store won't be updated.
 */
export const startRecordListeners = (agent: Agent, store: Store) => {
  const onDeleted = (event: RecordDeletedEvent<BaseRecord>) => {
    // Extract the record from event
    const record = event.payload.record
    //  Delete the record by id if it is of the generic type
    const retrieveAndDeleteGenericRecord = async (record: { id: string; type: string }) => {
      //  No need to fetch it first if we have the id?!
      await agent.genericRecords.deleteById(record.id)
    }
    if (record instanceof BaseRecord) {
      // BaseRecord
      store.dispatch(removeRecord(record))
    } else {
      // Gen record type
      void retrieveAndDeleteGenericRecord(record)
    }
  }

  const onSaved = (event: RecordSavedEvent<BaseRecord>) => {
    store.dispatch(addRecord(event.payload.record))
  }

  const onUpdated = (event: RecordUpdatedEvent<BaseRecord>) => {
    store.dispatch(updateRecord(event.payload.record))
  }

  agent.events.on<RecordDeletedEvent<BaseRecord>>(RepositoryEventTypes.RecordDeleted, onDeleted)
  agent.events.on<RecordSavedEvent<BaseRecord>>(RepositoryEventTypes.RecordSaved, onSaved)
  agent.events.on<RecordUpdatedEvent<BaseRecord>>(RepositoryEventTypes.RecordUpdated, onUpdated)

  return () => {
    agent.events.off(RepositoryEventTypes.RecordDeleted, onDeleted)
    agent.events.off(RepositoryEventTypes.RecordSaved, onSaved)
    agent.events.off(RepositoryEventTypes.RecordUpdated, onUpdated)
  }
}

export const removeRecordInState = (
  recordType: RecordConstructor,
  records: SerializedInstance<BaseRecord>[],
  record: BaseRecord
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
  records: SerializedInstance<BaseRecord>[],
  record: BaseRecord
) => {
  // We're only interested in events for the recordType
  if (!isRecordType(record, recordType)) return

  records.push(JsonTransformer.toJSON(record))
}

export const updateRecordInState = (
  recordType: RecordConstructor,
  records: SerializedInstance<BaseRecord>[],
  record: BaseRecord
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
