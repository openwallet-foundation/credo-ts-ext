import type { Agent, BasicMessageRecord, BasicMessageReceivedEvent } from '@aries-framework/core'

import { BasicMessageEventTypes } from '@aries-framework/core'
import * as React from 'react'
import { createContext, useState, useEffect, useContext, useMemo } from 'react'

interface BasicMessageContextInterface {
  loading: boolean
  basicMessages: BasicMessageRecord[]
}

const BasicMessageContext = createContext<BasicMessageContextInterface | undefined>(undefined)

export const useBasicMessages = (): { basicMessages: BasicMessageRecord[]; loading: boolean } => {
  const basicMessageContext = useContext(BasicMessageContext)
  if (!basicMessageContext) {
    throw new Error('useBasicMessages must be used within a BasicMessageContextProvider')
  }
  return basicMessageContext
}

export const useBasicMessagesByConnectionId = (connectionId: string): BasicMessageRecord[] => {
  const { basicMessages } = useBasicMessages()
  const messages = useMemo(
    () => basicMessages.filter((m: BasicMessageRecord) => m.connectionId === connectionId),
    [basicMessages, connectionId]
  )
  return messages
}

interface Props {
  agent: Agent | undefined
}

const BasicMessageProvider: React.FC<Props> = ({ agent, children }) => {
  const [basicMessageState, setBasicMessageState] = useState<BasicMessageContextInterface>({
    basicMessages: [],
    loading: true,
  })

  const setInitialState = async () => {
    if (agent) {
      const basicMessages = await agent.basicMessages.findAllByQuery({})
      setBasicMessageState({ basicMessages, loading: false })
    }
  }

  useEffect(() => {
    setInitialState()
  }, [agent])

  useEffect(() => {
    if (!basicMessageState.loading) {
      const listener = (event: BasicMessageReceivedEvent) => {
        const newBasicMessageState = [...basicMessageState.basicMessages]
        const index = newBasicMessageState.findIndex(
          (basicMessage) => basicMessage.id === event.payload.basicMessageRecord.id
        )
        if (index > -1) {
          newBasicMessageState[index] = event.payload.basicMessageRecord
        } else {
          newBasicMessageState.unshift(event.payload.basicMessageRecord)
        }

        setBasicMessageState({
          loading: basicMessageState.loading,
          basicMessages: newBasicMessageState,
        })
      }

      agent?.events.on(BasicMessageEventTypes.BasicMessageStateChanged, listener)

      return () => {
        agent?.events.off(BasicMessageEventTypes.BasicMessageStateChanged, listener)
      }
    }
  }, [basicMessageState, agent])

  return <BasicMessageContext.Provider value={basicMessageState}>{children}</BasicMessageContext.Provider>
}

export default BasicMessageProvider
