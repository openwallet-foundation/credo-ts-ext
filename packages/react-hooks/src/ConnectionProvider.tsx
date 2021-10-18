import type { Agent, ConnectionState, ConnectionStateChangedEvent, ConnectionRecord } from '@aries-framework/core'

import { ConnectionEventTypes } from '@aries-framework/core'
import * as React from 'react'
import { createContext, useState, useEffect, useContext } from 'react'

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

export const useConnectionByState = (state: ConnectionState): ConnectionRecord[] => {
  const { connections } = useConnections()
  return connections.filter((c: ConnectionRecord) => c.state === state)
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
      const listener = (event: ConnectionStateChangedEvent) => {
        const newConnectionsState = [...connectionState.connections]

        const index = newConnectionsState.findIndex((connection) => connection.id === event.payload.connectionRecord.id)
        if (index > -1) {
          newConnectionsState[index] = event.payload.connectionRecord
        } else {
          newConnectionsState.unshift(event.payload.connectionRecord)
        }

        setConnectionState({
          loading: connectionState.loading,
          connections: newConnectionsState,
        })
      }
      agent?.events.on(ConnectionEventTypes.ConnectionStateChanged, listener)

      return () => {
        agent?.events.off(ConnectionEventTypes.ConnectionStateChanged, listener)
      }
    }
  }, [connectionState, agent])

  return <ConnectionContext.Provider value={connectionState}>{children}</ConnectionContext.Provider>
}

export default ConnectionProvider
