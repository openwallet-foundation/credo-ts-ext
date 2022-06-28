import { BasicMessageRecord } from '@aries-framework/core'
import { useMemo } from 'react'

import { useRecordsByType } from './RecordProvider'

export const useBasicMessages = (): BasicMessageRecord[] => {
  return useRecordsByType(BasicMessageRecord)
}

export const useBasicMessagesByConnectionId = (connectionId: string): BasicMessageRecord[] => {
  const basicMessages = useBasicMessages()
  const messages = useMemo(
    () => basicMessages.filter((m: BasicMessageRecord) => m.connectionId === connectionId),
    [basicMessages, connectionId]
  )
  return messages
}
