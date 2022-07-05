import type { BaseRecord, RecordSavedEvent, RecordDeletedEvent, RecordUpdatedEvent } from '@aries-framework/core'

import { RepositoryEventTypes } from '@aries-framework/core'
import { useReducer } from 'react'

export enum RecordProviderEventTypes {
  RecordsLoaded = 'RecordsLoaded',
}

export interface RecordsState<R extends BaseRecord<any, any, any>> {
  loading: boolean
  records: R[]
}

export interface RecordsLoadedEvent<R extends BaseRecord<any, any, any>> {
  type: typeof RecordProviderEventTypes.RecordsLoaded
  payload: RecordsState<R>
}

export interface ReducerAction<R extends BaseRecord<any, any, any>> {
  event: RecordSavedEvent<R> | RecordUpdatedEvent<R> | RecordDeletedEvent<R> | RecordsLoadedEvent<R>
}

export const useRecordReducer = <R extends BaseRecord<any, any, any>>(initialState: RecordsState<R>) => {
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
