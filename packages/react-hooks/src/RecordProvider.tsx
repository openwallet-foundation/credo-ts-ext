import type { BaseRecord, RecordSavedEvent, RecordDeletedEvent, RecordUpdatedEvent } from '@aries-framework/core'

import { RepositoryEventTypes } from '@aries-framework/core'
import { useReducer } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type BaseRecordAny = BaseRecord<any, any, any>

export enum RecordProviderEventTypes {
  RecordsLoaded = 'RecordsLoaded',
}

export interface RecordsState<R extends BaseRecordAny> {
  loading: boolean
  records: R[]
}

export interface RecordsLoadedEvent<R extends BaseRecordAny> {
  type: typeof RecordProviderEventTypes.RecordsLoaded
  payload: RecordsState<R>
}

export interface ReducerAction<R extends BaseRecordAny> {
  event: RecordSavedEvent<R> | RecordUpdatedEvent<R> | RecordDeletedEvent<R> | RecordsLoadedEvent<R>
}

export const useRecordReducer = <R extends BaseRecordAny>(initialState: RecordsState<R>) => {
  const reducer = (state: RecordsState<R>, action: ReducerAction<R>) => {
    switch (action.event.type) {
      case RecordProviderEventTypes.RecordsLoaded: {
        const { records, loading } = action.event.payload
        return {
          records: [...records],
          loading,
        }
      }
      case RepositoryEventTypes.RecordSaved: {
        const { record } = action.event.payload
        const newRecordsState = [...state.records]
        newRecordsState.unshift(record)
        return {
          loading: state.loading,
          records: newRecordsState,
        }
      }
      case RepositoryEventTypes.RecordUpdated: {
        const { record } = action.event.payload
        const newRecordsState = [...state.records]
        const index = newRecordsState.findIndex((r) => r.id === record.id)
        if (index > -1) {
          newRecordsState[index] = record
        }
        return {
          loading: state.loading,
          records: newRecordsState,
        }
      }
      case RepositoryEventTypes.RecordDeleted: {
        const { record } = action.event.payload
        const newRecordsState = state.records.filter((r) => r.id !== record.id)
        return {
          loading: state.loading,
          records: newRecordsState,
        }
      }
      default: {
        return state
      }
    }
  }
  return useReducer(reducer, initialState)
}
