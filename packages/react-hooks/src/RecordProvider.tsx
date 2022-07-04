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
      case RecordProviderEventTypes.RecordsLoaded:
        // TODO
        return state
      case RepositoryEventTypes.RecordSaved:
        // TODO
        return state
      case RepositoryEventTypes.RecordUpdated:
        // TODO
        return state
      case RepositoryEventTypes.RecordDeleted:
        // TODO
        return state
      default:
        return state
    }
  }
  return useReducer(reducer, initialState)
}
