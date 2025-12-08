import type { RecordsState } from './recordUtils'
import type { Agent } from '@credo-ts/core'
import type { DidCommDidExchangeState, DidCommConnectionType } from '@credo-ts/didcomm'
import type { PropsWithChildren } from 'react'

import { DidCommConnectionRecord } from '@credo-ts/didcomm'
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

export type UseConnectionsOptions = {
  excludedTypes?: Array<DidCommConnectionType | string>
  connectionState?: DidCommDidExchangeState
}

const ConnectionContext = createContext<RecordsState<DidCommConnectionRecord> | undefined>(undefined)

/**
 * This method retrieves the connection context for the current agent.
 * From this you can access all connection records for the agent.
 * @param options options for useConnections hook, lets us filter out specific types and limit states
 * @returns a connection context containing information about the agents connections
 */
export const useConnections = (options: UseConnectionsOptions = {}) => {
  const connectionContext = useContext(ConnectionContext)

  let connections = connectionContext?.records
  connections = useMemo(() => {
    if (!connections) {
      throw new Error('useConnections must be used within a ConnectionContextProvider')
    }
    // do not filter if not filter options are provided to save on a loop
    if (!options.connectionState && !options.excludedTypes) return connections

    return connections.filter((record: DidCommConnectionRecord) => {
      // By default we include this connection
      // Filter by state (if connectionState is defined)
      if (options.connectionState && options.connectionState !== record.state) return false

      // Exclude records with certain connection types (if defined)
      const recordTypes = record.connectionTypes as Array<DidCommConnectionType | string> | null
      if (options.excludedTypes && recordTypes && recordTypes.length !== 0) {
        return recordTypes.some((connectionType) => !options.excludedTypes?.includes(connectionType))
      }
      return true
    })
  }, [connections, options.connectionState, options.excludedTypes])

  return { ...connectionContext, records: connections }
}

export const useConnectionById = (id: string): DidCommConnectionRecord | undefined => {
  const { records: connections } = useConnections()
  return connections.find((c: DidCommConnectionRecord) => c.id === id)
}

interface Props {
  agent: Agent
}

const ConnectionProvider: React.FC<PropsWithChildren<Props>> = ({ agent, children }) => {
  const [state, setState] = useState<RecordsState<DidCommConnectionRecord>>({
    records: [],
    loading: true,
  })

  const setInitialState = async () => {
    const records = await agent.didcomm.connections.getAll()
    setState({ records, loading: false })
  }

  useEffect(() => {
    setInitialState()
  }, [agent])

  useEffect(() => {
    if (state.loading) return

    const connectionAdded$ = recordsAddedByType(agent, DidCommConnectionRecord).subscribe((record) => {
      if (record) setState(addRecord<DidCommConnectionRecord>(record, state))
    })

    const connectionUpdated$ = recordsUpdatedByType(agent, DidCommConnectionRecord).subscribe((record) => {
      if (record) setState(updateRecord<DidCommConnectionRecord>(record, state))
    })
    const connectionRemoved$ = recordsRemovedByType(agent, DidCommConnectionRecord).subscribe((record) => {
      if (record) setState(removeRecord<DidCommConnectionRecord>(record, state))
    })

    return () => {
      connectionAdded$.unsubscribe()
      connectionUpdated$.unsubscribe()
      connectionRemoved$.unsubscribe()
    }
  }, [state, agent])

  return <ConnectionContext.Provider value={state}>{children}</ConnectionContext.Provider>
}

export default ConnectionProvider
