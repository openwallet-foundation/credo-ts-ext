import type { RecordsState } from './recordUtils'
import type { Agent, DidExchangeState, ConnectionType } from '@aries-framework/core'
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
  connectionState?: DidExchangeState
}

const ConnectionContext = createContext<RecordsState<ConnectionRecord> | undefined>(undefined)

/**
 * This method retreives the connection context for the current agent.
 * From this you can access all connection records for the agent.
 * @param options options for useConnections hook, lets us filter out specific types and limit states
 * @returns a connection context containing information about the agents connections
 */
export const useConnections = (options: useConnectionsOptions = {}) => {
  const connectionContext = useContext(ConnectionContext)
  if (!connectionContext) {
    throw new Error('useConnections must be used within a ConnectionContextProvider')
  }

  let connections = connectionContext.records

  // Only run this code if we don't have options.excludedTypes to limit ammount of loops
  if (options.connectionState && !options.excludedTypes) {
    const filteredByState = useMemo(
      () => connections.filter((c: ConnectionRecord) => c.state === options.connectionState),
      [connections, options.connectionState]
    )
    connections = filteredByState
  }

  if (options.excludedTypes) {
    const filteredByType = useMemo(
      () =>
        connections.filter((record: ConnectionRecord) => {
          const recordTypes = (record.getTag('connectionType') as [string] | null) || []
          // Filter out by state if needed
          if (options.connectionState && options.connectionState !== record.state) {
            return false
          }
          for (const type of recordTypes) {
            if (options.excludedTypes?.includes(type)) return false
          }
          return true
        }),
      [connections, options.excludedTypes]
    )
    connections = filteredByType
  }

  return { ...connectionContext, records: connections }
}

export const useConnectionsByType = (type: [ConnectionType | string]) => {
  const { records: connections } = useConnections()
  const filteredConnections = useMemo(
    () =>
      connections.filter((record: ConnectionRecord) => {
        const recordTypes = record.getTag('connectionType') as [string]
        for (const t of type) {
          if (recordTypes?.includes(t)) return true
        }
      }),
    [connections, type]
  )
  return filteredConnections
}

export const useConnectionById = (id: string): ConnectionRecord | undefined => {
  const { records: connections } = useConnections()
  return connections.find((c: ConnectionRecord) => c.id === id)
}

export const useConnectionByState = (state: DidExchangeState | DidExchangeState[]): ConnectionRecord[] => {
  const states = useMemo(() => (typeof state === 'string' ? [state] : state), [state])

  const { records: connections } = useConnections()

  const filteredConnections = useMemo(
    () =>
      connections.filter((r: ConnectionRecord) => {
        if (states.includes(r.state)) return r
      }),
    [connections]
  )
  return filteredConnections
}

export const useConnectionNotInState = (state: DidExchangeState | DidExchangeState[]): ConnectionRecord[] => {
  const states = useMemo(() => (typeof state === 'string' ? [state] : state), [state])

  const { records: connections } = useConnections()

  const filteredConnections = useMemo(
    () =>
      connections.filter((r: ConnectionRecord) => {
        if (!states.includes(r.state)) return r
      }),
    [connections]
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
