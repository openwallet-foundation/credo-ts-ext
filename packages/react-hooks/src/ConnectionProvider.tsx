import type {
  Agent,
  DidExchangeState,
  RecordDeletedEvent,
  RecordSavedEvent,
  RecordUpdatedEvent,
} from '@aries-framework/core'

import { ConnectionRecord, RepositoryEventTypes } from '@aries-framework/core'
import * as React from 'react'
import { createContext, useState, useEffect, useContext, useMemo } from 'react'

interface ConnectionContextInterface {
  loading: boolean
  connections: ConnectionRecord[]
}

const ConnectionContext = createContext<ConnectionContextInterface | undefined>(undefined)

export const useConnections = () => {
  const connectionContext = useContext(ConnectionContext)
  if (!connectionContext) {
    throw new Error('useConnections must be used within a ConnectionContextProvider')
  }
  return connectionContext
}

export const useConnectionById = (id: string): ConnectionRecord | undefined => {
  const { connections } = useConnections()
  return connections.find((c: ConnectionRecord) => c.id === id)
}

export const useConnectionByState = (state: DidExchangeState): ConnectionRecord[] => {
  const { connections } = useConnections()
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
  const [connectionState, setConnectionState] = useState<ConnectionContextInterface>({
    connections: [],
    loading: true,
  })

  const setInitialState = async () => {
    if (agent) {
      const connections = await agent.connections.getAll()
      setConnectionState({ connections, loading: false })
    }
  }

  useEffect(() => {
    setInitialState()
  }, [agent])

  useEffect(() => {
    if (!connectionState.loading) {
      const savedListener = async (event: RecordSavedEvent<ConnectionRecord>) => {
        const { record } = event.payload
        if (record.type !== ConnectionRecord.type) {
          return
        }
        const newConnectionsState = [...connectionState.connections]
        newConnectionsState.unshift(record)

        setConnectionState({
          loading: connectionState.loading,
          connections: newConnectionsState,
        })
      }

      const updatedListener = async (event: RecordUpdatedEvent<ConnectionRecord>) => {
        const { record } = event.payload
        if (record.type !== ConnectionRecord.type) {
          return
        }
        const newConnectionsState = [...connectionState.connections]
        const index = newConnectionsState.findIndex((connection) => connection.id === record.id)
        if (index > -1) {
          newConnectionsState[index] = record
        }

        setConnectionState({
          loading: connectionState.loading,
          connections: newConnectionsState,
        })
      }

      const deletedListener = async (event: RecordDeletedEvent<ConnectionRecord>) => {
        const { record } = event.payload
        if (record.type !== ConnectionRecord.type) {
          return
        }
        const newConnectionsState = connectionState.connections.filter((connection) => connection.id !== record.id)

        setConnectionState({
          loading: connectionState.loading,
          connections: newConnectionsState,
        })
      }

      agent?.events.on(RepositoryEventTypes.RecordSaved, savedListener)
      agent?.events.on(RepositoryEventTypes.RecordUpdated, updatedListener)
      agent?.events.on(RepositoryEventTypes.RecordDeleted, deletedListener)

      return () => {
        agent?.events.off(RepositoryEventTypes.RecordSaved, savedListener)
        agent?.events.off(RepositoryEventTypes.RecordUpdated, updatedListener)
        agent?.events.off(RepositoryEventTypes.RecordDeleted, deletedListener)
      }
    }
  }, [connectionState, agent])

  return <ConnectionContext.Provider value={connectionState}>{children}</ConnectionContext.Provider>
}

export default ConnectionProvider
