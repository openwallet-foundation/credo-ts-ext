import type { RecordsState } from './RecordProvider'
import type {
  Agent,
  DidExchangeState,
  RecordSavedEvent,
  RecordUpdatedEvent,
  RecordDeletedEvent,
} from '@aries-framework/core'

import { RepositoryEventTypes, ConnectionRecord } from '@aries-framework/core'
import { createContext, useContext, useEffect, useMemo } from 'react'
import * as React from 'react'

import { RecordProviderEventTypes, useRecordReducer } from './RecordProvider'

const ConnectionContext = createContext<RecordsState<ConnectionRecord> | undefined>(undefined)

export const useConnections = () => {
  const connectionContext = useContext(ConnectionContext)
  if (!connectionContext) {
    throw new Error('useConnections must be used within a ConnectionContextProvider')
  }
  return connectionContext
}

export const useConnectionById = (id: string): ConnectionRecord | undefined => {
  const { records: connections } = useConnections()
  return connections.find((c: ConnectionRecord) => c.id === id)
}

export const useConnectionByState = (state: DidExchangeState): ConnectionRecord[] => {
  const { records: connections } = useConnections()
  const filteredConnections = useMemo(
    () => connections.filter((c: ConnectionRecord) => c.state === state),
    [connections, state]
  )
  return filteredConnections
}

interface Props {
  agent: Agent | undefined
}

const ConnectionProvider: React.FC<Props> = ({ agent, children }) => {
  const [connectionState, dispatch] = useRecordReducer<ConnectionRecord>({
    loading: true,
    records: [],
  })

  const setInitialState = async () => {
    if (agent) {
      const records = await agent.connections.getAll()
      dispatch({
        event: { type: RecordProviderEventTypes.RecordsLoaded, payload: { records, loading: false } },
      })
    }
  }

  useEffect(() => {
    setInitialState()
  }, [agent])

  useEffect(() => {
    if (!connectionState.loading) {
      const connectionSaved$ = agent?.events
        .observable<RecordSavedEvent<ConnectionRecord>>(RepositoryEventTypes.RecordSaved)
        .subscribe((event) => {
          const { record } = event.payload
          if (record.type !== ConnectionRecord.type) {
            return
          }
          dispatch({
            event: { type: RepositoryEventTypes.RecordSaved, payload: { record } },
          })
        })

      const connectionUpdated$ = agent?.events
        .observable<RecordUpdatedEvent<ConnectionRecord>>(RepositoryEventTypes.RecordUpdated)
        .subscribe((event) => {
          const { record } = event.payload
          if (record.type !== ConnectionRecord.type) {
            return
          }
          dispatch({
            event: { type: RepositoryEventTypes.RecordUpdated, payload: { record } },
          })
        })

      const connectionDeleted$ = agent?.events
        .observable<RecordDeletedEvent<ConnectionRecord>>(RepositoryEventTypes.RecordDeleted)
        .subscribe((event) => {
          const { record } = event.payload
          if (record.type !== ConnectionRecord.type) {
            return
          }
          dispatch({
            event: { type: RepositoryEventTypes.RecordDeleted, payload: { record } },
          })
        })

      return () => {
        connectionSaved$?.unsubscribe()
        connectionUpdated$?.unsubscribe()
        connectionDeleted$?.unsubscribe()
      }
    }
  }, [connectionState, agent])

  return <ConnectionContext.Provider value={connectionState}>{children}</ConnectionContext.Provider>
}

export default ConnectionProvider
