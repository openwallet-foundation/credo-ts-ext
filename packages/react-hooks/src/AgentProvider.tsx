import type { Agent } from '@aries-framework/core'

import * as React from 'react'
import { createContext, useState, useEffect, useContext } from 'react'

import RecordProvider from './RecordProvider'

interface AgentContextInterface {
  loading: boolean
  agent?: Agent
}

const AgentContext = createContext<AgentContextInterface | undefined>(undefined)

export const useAgent = () => {
  const agentContext = useContext(AgentContext)
  if (!agentContext) {
    throw new Error('useAgent must be used within a AgentContextProvider')
  }
  return agentContext
}

interface Props {
  agent: Agent | undefined
}

const AgentProvider: React.FC<Props> = ({ agent, children }) => {
  const [agentState, setAgentState] = useState<AgentContextInterface>({
    loading: true,
    agent,
  })

  const setInitialState = async () => {
    if (agent) {
      setAgentState({ agent, loading: false })
    }
  }

  useEffect(() => {
    setInitialState()
  }, [agent])

  return (
    <AgentContext.Provider value={agentState}>
      <RecordProvider agent={agent}>{children}</RecordProvider>
    </AgentContext.Provider>
  )
}

export default AgentProvider
