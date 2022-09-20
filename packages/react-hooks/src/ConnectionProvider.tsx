import type { RecordsState } from './recordUtils'
import type { Agent, DidExchangeState, ConnectionType, ConnectionState } from '@aries-framework/core'
import type { PropsWithChildren } from 'react'

import { ConnectionRecord } from '@aries-framework/core'
import { useState, createContext, useContext, useEffect, useMemo } from 'react'
import * as React from 'react'

import {
  recordsAddedByType,
  recordsRemovedByType,
  recordsUpdatedByType,
  removeRecord,
  updateRecord,
  addRecord,
} from './recordUtils'

export type useConnectionsOptions = {
  excludedTypes?: [ConnectionType | string]
  connectionState?: ConnectionState
}

const ConnectionContext = createContext<RecordsState<ConnectionRecord> | undefined>(undefined)

/**
 * This method retreives the connection context for the current agent.
 * From this you can access all connection records for the agent.
 * @param noMediators Optional boolean to filter out mediators from the returned connection context, defualts to false
 * @returns a connection context containing information about the agents connections
 */
export const useConnections = (options: useConnectionsOptions = {}) => {
  const connectionContext = useContext(ConnectionContext)
  if (!connectionContext) {
    throw new Error('useConnections must be used within a ConnectionContextProvider')
  }
  if (options.excludedTypes) {
    const filteredConnections = connectionContext.records.filter((record: ConnectionRecord) => {
      const recordTypes = record.getTag('connectionType') as [string]
      for (const type in options.excludedTypes) {
        if (recordTypes?.includes(type)) return false
      }
      return true
    })
    return { loading: false, records: filteredConnections }
  }
  return connectionContext
}

export const useConnectionsByType = (type: [ConnectionType | string]) => {
  const connectionContext = useContext(ConnectionContext)
  if (!connectionContext) {
    throw new Error('useConnectionsByType must be used within a ConnectionContextProvider')
  }
  const filteredConnections = connectionContext.records.filter((record: ConnectionRecord) => {
    const recordTypes = record.getTag('connectionType') as [string]
    for (const t in type) {
      if (recordTypes?.includes(t)) return true
    }
  })
  return { loading: false, records: filteredConnections }
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

const ConnectionProvider: React.FC<PropsWithChildren<Props>> = ({ agent, children }) => {
  const [state, setState] = useState<RecordsState<ConnectionRecord>>({
    records: [],
    loading: true,
  })

  const setInitialState = async () => {
    if (agent) {
      const records = await agent.connections.getAll()
      setState({ records, loading: false })
    }
  }

  useEffect(() => {
    setInitialState()
  }, [agent])

  useEffect(() => {
    if (!state.loading) {
      const connectionAdded$ = recordsAddedByType(agent, ConnectionRecord).subscribe((record) =>
        setState(addRecord(record, state))
      )

      const connectionUpdated$ = recordsUpdatedByType(agent, ConnectionRecord).subscribe((record) =>
        setState(updateRecord(record, state))
      )

      const connectionRemoved$ = recordsRemovedByType(agent, ConnectionRecord).subscribe((record) =>
        setState(removeRecord(record, state))
      )

      return () => {
        connectionAdded$.unsubscribe()
        connectionUpdated$.unsubscribe()
        connectionRemoved$.unsubscribe()
      }
    }
  }, [state, agent])

  return <ConnectionContext.Provider value={state}>{children}</ConnectionContext.Provider>
}

export default ConnectionProvider
