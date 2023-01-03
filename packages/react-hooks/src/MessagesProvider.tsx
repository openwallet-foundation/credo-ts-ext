import type { RecordsState } from './recordUtils'
import type { Agent, CredentialExchangeRecord, ProofRecord } from '@aries-framework/core'
import type { PropsWithChildren } from 'react'

import { BasicMessageRecord } from '@aries-framework/core'
import { useState, createContext, useContext, useEffect } from 'react'
import * as React from 'react'

import { useBasicMessagesByConnectionId } from './BasicMessageProvider'
import { useCredentialById } from './CredentialProvider'
import { useProofById } from './ProofProvider'
import {
  recordsAddedByType,
  recordsRemovedByType,
  recordsUpdatedByType,
  removeRecord,
  updateRecord,
  addRecord,
} from './recordUtils'

const MessageContext = createContext<
  RecordsState<BasicMessageRecord | CredentialExchangeRecord | ProofRecord> | undefined
>(undefined)

export const useMessages = () => {
  const messageContext = useContext(MessageContext)
  if (!MessageContext) {
    throw new Error('useMessages must be used within a MessageContextProvider')
  }
  return messageContext
}

export const useMessagesByConnectionId = (connectionId: string) => {
  const basicMessages = useBasicMessagesByConnectionId(connectionId)
  const proofMessages = useProofById(connectionId)
  const credentialMessags = useCredentialById(connectionId)

  return {
    basicMessages,
    proofMessages,
    credentialMessags,
  }
}

interface Props {
  agent: Agent | undefined
}

const MessageProvider: React.FC<PropsWithChildren<Props>> = ({ agent, children }) => {
  const [state, setState] = useState<RecordsState<BasicMessageRecord>>({
    records: [],
    loading: true,
  })

  const setInitialState = async () => {
    if (agent) {
      const records = await agent.basicMessages.findAllByQuery({})
      setState({ records, loading: false })
    }
  }

  useEffect(() => {
    setInitialState()
  }, [agent])

  useEffect(() => {
    if (!state.loading) {
      const basicMessageAdded$ = recordsAddedByType(agent, BasicMessageRecord).subscribe((record) =>
        setState(addRecord(record, state))
      )

      const basicMessageUpdated$ = recordsUpdatedByType(agent, BasicMessageRecord).subscribe((record) =>
        setState(updateRecord(record, state))
      )

      const basicMessageRemoved$ = recordsRemovedByType(agent, BasicMessageRecord).subscribe((record) =>
        setState(removeRecord(record, state))
      )

      return () => {
        basicMessageAdded$?.unsubscribe()
        basicMessageUpdated$?.unsubscribe()
        basicMessageRemoved$?.unsubscribe()
      }
    }
  }, [state, agent])

  return <MessageContext.Provider value={state}>{children}</MessageContext.Provider>
}

export default MessageProvider
