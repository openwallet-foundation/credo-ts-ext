import type { DidExchangeState } from '@aries-framework/core'

import { ConnectionRecord } from '@aries-framework/core'
import { useMemo } from 'react'

import { useRecordsByType } from './RecordProvider'

export const useConnections = (): ConnectionRecord[] => {
  return useRecordsByType(ConnectionRecord)
}

export const useConnectionById = (id: string): ConnectionRecord | undefined => {
  const connections = useConnections()
  return connections.find((c: ConnectionRecord) => c.id === id)
}

export const useConnectionByState = (state: DidExchangeState): ConnectionRecord[] => {
  const connections = useConnections()
  const filteredConnections = useMemo(
    () => connections.filter((c: ConnectionRecord) => c.state === state),
    [connections, state]
  )
  return filteredConnections
}
