import type { RecordsState } from './RecordProvider'
import type { Agent, RecordDeletedEvent, RecordSavedEvent, RecordUpdatedEvent } from '@aries-framework/core'
import type { PropsWithChildren } from 'react'

import { RepositoryEventTypes, BasicMessageRecord } from '@aries-framework/core'
import { createContext, useContext, useEffect, useMemo } from 'react'
import * as React from 'react'
import { map, filter } from 'rxjs'

import { RecordProviderEventTypes, useRecordReducer } from './RecordProvider'

const BasicMessageContext = createContext<RecordsState<BasicMessageRecord> | undefined>(undefined)

export const useBasicMessages = () => {
  const basicMessageContext = useContext(BasicMessageContext)
  if (!basicMessageContext) {
    throw new Error('useBasicMessages must be used within a BasicMessageContextProvider')
  }
  return basicMessageContext
}

export const useBasicMessagesByConnectionId = (connectionId: string): BasicMessageRecord[] => {
  const { records: basicMessages } = useBasicMessages()
  const messages = useMemo(
    () => basicMessages.filter((m: BasicMessageRecord) => m.connectionId === connectionId),
    [basicMessages, connectionId]
  )
  return messages
}

interface Props {
  agent: Agent | undefined
}

const BasicMessageProvider: React.FC<PropsWithChildren<Props>> = ({ agent, children }) => {
  const [basicMessageState, dispatch] = useRecordReducer<BasicMessageRecord>({
    records: [],
    loading: true,
  })

  const setInitialState = async () => {
    if (agent) {
      const records = await agent.basicMessages.findAllByQuery({})
      dispatch({
        event: { type: RecordProviderEventTypes.RecordsLoaded, payload: { records, loading: false } },
      })
    }
  }

  useEffect(() => {
    setInitialState()
  }, [agent])

  useEffect(() => {
    if (!basicMessageState.loading) {
      const basicMessageSaved$ = agent?.events
        .observable<RecordSavedEvent<BasicMessageRecord>>(RepositoryEventTypes.RecordSaved)
        .pipe(
          map((event) => event.payload.record),
          filter((record) => record.type !== BasicMessageRecord.type)
        )
        .subscribe((record) =>
          dispatch({
            event: { type: RepositoryEventTypes.RecordSaved, payload: { record } },
          })
        )

      const basicMessageUpdated$ = agent?.events
        .observable<RecordUpdatedEvent<BasicMessageRecord>>(RepositoryEventTypes.RecordUpdated)
        .pipe(
          map((event) => event.payload.record),
          filter((record) => record.type !== BasicMessageRecord.type)
        )
        .subscribe((record) =>
          dispatch({
            event: { type: RepositoryEventTypes.RecordUpdated, payload: { record } },
          })
        )

      const basicMessageDeleted$ = agent?.events
        .observable<RecordDeletedEvent<BasicMessageRecord>>(RepositoryEventTypes.RecordDeleted)
        .pipe(
          map((event) => event.payload.record),
          filter((record) => record.type !== BasicMessageRecord.type)
        )
        .subscribe((record) =>
          dispatch({
            event: { type: RepositoryEventTypes.RecordDeleted, payload: { record } },
          })
        )

      return () => {
        basicMessageSaved$?.unsubscribe()
        basicMessageUpdated$?.unsubscribe()
        basicMessageDeleted$?.unsubscribe()
      }
    }
  }, [basicMessageState, agent])

  return <BasicMessageContext.Provider value={basicMessageState}>{children}</BasicMessageContext.Provider>
}

export default BasicMessageProvider
