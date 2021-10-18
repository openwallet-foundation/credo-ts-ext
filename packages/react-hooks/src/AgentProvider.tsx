import type { Agent } from '@aries-framework/core'

import * as React from 'react'
import { createContext, useState, useEffect, useContext } from 'react'

import BasicMessageProvider from './BasicMessageProvider'
import ConnectionProvider from './ConnectionProvider'
import CredentialProvider from './CredentialProvider'
import ProofProvider from './ProofProvider'

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
      <ConnectionProvider agent={agent}>
        <CredentialProvider agent={agent}>
          <ProofProvider agent={agent}>
            <BasicMessageProvider agent={agent}>{children}</BasicMessageProvider>
          </ProofProvider>
        </CredentialProvider>
      </ConnectionProvider>
    </AgentContext.Provider>
  )
}

export default AgentProvider
