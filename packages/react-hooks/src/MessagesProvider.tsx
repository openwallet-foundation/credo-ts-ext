import type { RecordsState } from './recordUtils'
import type { Agent, BaseRecord } from '@aries-framework/core'
import type { PropsWithChildren } from 'react'

import { useState, createContext, useContext, useEffect } from 'react'
import * as React from 'react'

import { useBasicMessages, useBasicMessagesByConnectionId } from './BasicMessageProvider'
import { useCredentialByConnectionId, useCredentials } from './CredentialProvider'
import { useProofByConnectionId, useProofs } from './ProofProvider'

const MessageContext = createContext<RecordsState<BaseRecord> | undefined>(undefined)

export const useMessages = () => {
  const messageContext = useContext(MessageContext)
  if (!MessageContext) {
    throw new Error('useMessages must be used within a MessageContextProvider')
  }
  return messageContext
}

export const useMessagesByConnectionId = (connectionId: string): BaseRecord[] | undefined => {
  const basicMessages = useBasicMessagesByConnectionId(connectionId)
  const proofMessages = useProofByConnectionId(connectionId)
  const credentialMessages = useCredentialByConnectionId(connectionId)

  return [...basicMessages, ...proofMessages, ...credentialMessages] as BaseRecord[]
}

interface Props {
  agent: Agent | undefined
}

const MessageProvider: React.FC<PropsWithChildren<Props>> = ({ agent, children }) => {
  const [state, setState] = useState<RecordsState<BaseRecord>>({
    records: [],
    loading: true,
  })

  const setInitialState = () => {
    if (agent) {
      const { records: basicMessages } = useBasicMessages()
      const { records: proofs } = useProofs()
      const { records: credentials } = useCredentials()
      const records = [...basicMessages, ...proofs, ...credentials] as BaseRecord[]
      setState({ records, loading: false })
    }
  }

  useEffect(() => {
    setInitialState()
  }, [agent])

  return <MessageContext.Provider value={state}>{children}</MessageContext.Provider>
}

export default MessageProvider
