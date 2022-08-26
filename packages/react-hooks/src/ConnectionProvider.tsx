import type { RecordsState } from './recordUtils'
import type { Agent, DidExchangeState } from '@aries-framework/core'
import type { PropsWithChildren } from 'react'

import { ConnectionRecord, ConnectionType } from '@aries-framework/core'
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

const ConnectionContext = createContext<RecordsState<ConnectionRecord> | undefined>(undefined)

/**
 * This method retreives the connection context for the current agent.
 * From this you can access all connection records for the agent.
 * @param noMediators Optional boolean to filter out mediators from the returned connection context, defualts to false
 * @returns a connection context containing information about the agents connections
 */
export const useConnections = ( noMediators?: boolean ) => {
  const connectionContext = useContext(ConnectionContext)
  if (!connectionContext) {
    throw new Error('useConnections must be used within a ConnectionContextProvider')
  }
  if (noMediators) {
    let filteredConnections = connectionContext.records.filter((record: ConnectionRecord) => {
      return record.getTag('connectionType') !== ConnectionType.Mediator
    })
    return { loading: false, records: filteredConnections }
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
