import type {
  Agent,
  ConnectionState,
  CredentialState,
  ProofState,
  ConnectionStateChangedEvent,
  CredentialStateChangedEvent,
  ProofStateChangedEvent,
  ConnectionRecord,
  ProofRecord,
  CredentialRecord,
  BasicMessageRecord,
  BasicMessageReceivedEvent,
} from '@aries-framework/core'

import {
  ConnectionEventTypes,
  CredentialEventTypes,
  ProofEventTypes,
  BasicMessageEventTypes,
} from '@aries-framework/core'
import * as React from 'react'
import { createContext, useState, useEffect, useContext } from 'react'

interface AgentContextInterface {
  loading: boolean
  agent?: Agent
}

interface ConnectionContextInterface {
  loading: boolean
  connections: ConnectionRecord[]
}

interface CredentialContextInterface {
  loading: boolean
  credentials: CredentialRecord[]
}

interface ProofContextInterface {
  loading: boolean
  proofs: ProofRecord[]
}

interface BasicMessageContextInterface {
  loading: boolean
  basicMessages: BasicMessageRecord[]
}

const AgentContext = createContext<AgentContextInterface | undefined>(undefined)
const ConnectionContext = createContext<ConnectionContextInterface | undefined>(undefined)
const CredentialContext = createContext<CredentialContextInterface | undefined>(undefined)
const ProofContext = createContext<ProofContextInterface | undefined>(undefined)
const BasicMessageContext = createContext<BasicMessageContextInterface | undefined>(undefined)

// Agent
export const useAgent = () => {
  const agentContext = useContext(AgentContext)

  if (!agentContext) {
    throw new Error('useAgent must be used within a AgentContextProvider')
  }

  return agentContext
}

// Connection
export const useConnections = () => {
  const connectionContext = useContext(ConnectionContext)

  if (!connectionContext) {
    throw new Error('useConnections must be used within a ConnectionContextProvider')
  }

  return connectionContext
}

export const useConnectionById = (id: string): ConnectionRecord | undefined => {
  const { connections } = useConnections()

  return connections.find((c) => c.id === id)
}

export const useConnectionByState = (state: ConnectionState): ConnectionRecord[] => {
  const { connections } = useConnections()

  return connections.filter((c) => c.state === state)
}

// Credential
export const useCredentials = () => {
  const credentialContext = useContext(CredentialContext)

  if (!credentialContext) {
    throw new Error('useCredentials must be used within a CredentialContextProvider')
  }

  return credentialContext
}

export const useCredentialById = (id: string): CredentialRecord | undefined => {
  const { credentials } = useCredentials()

  return credentials.find((c: CredentialRecord) => c.id === id)
}

export const useCredentialByState = (state: CredentialState): CredentialRecord[] => {
  const { credentials } = useCredentials()

  return credentials.filter((c: CredentialRecord) => c.state === state)
}

// Proofs
export const useProofs = (): { proofs: ProofRecord[]; loading: boolean } => {
  const proofContext = useContext(ProofContext)

  if (!proofContext) {
    throw new Error('useProofs must be used within a ProofContextProvider')
  }

  return proofContext
}

export const useProofById = (id: string): ProofRecord | undefined => {
  const { proofs } = useProofs()

  return proofs.find((p: ProofRecord) => p.id === id)
}

export const useProofByState = (state: ProofState): ProofRecord[] => {
  const { proofs } = useProofs()

  return proofs.filter((p: ProofRecord) => p.state === state)
}

const useBasicMessages = () => {
  const basicMessageContext = useContext(BasicMessageContext)

  if (!basicMessageContext) {
    throw new Error('useBasicMessages must be used within a BasicMessageContextProvider')
  }

  return basicMessageContext
}

// BasicMessages
export const useBasicMessagesByConnectionId = (connectionId: string): BasicMessageRecord[] => {
  const { basicMessages } = useBasicMessages()

  return basicMessages.filter((m: BasicMessageRecord) => m.connectionId === connectionId)
}

interface Props {
  agent: Agent | undefined
}

const AgentProvider: React.FC<Props> = ({ agent, children }) => {
  const [agentState, setAgentState] = useState<AgentContextInterface>({
    loading: true,
    agent,
  })

  const [connectionState, setConnectionState] = useState<ConnectionContextInterface>({
    connections: [],
    loading: true,
  })
  const [credentialState, setCredentialState] = useState<CredentialContextInterface>({
    credentials: [],
    loading: true,
  })
  const [proofState, setProofState] = useState<ProofContextInterface>({
    proofs: [],
    loading: true,
  })
  const [basicMessageState, setBasicMessageState] = useState<BasicMessageContextInterface>({
    basicMessages: [],
    loading: true,
  })

  const setInitialState = async () => {
    if (agent) {
      const connections = await agent.connections.getAll()
      const credentials = await agent.credentials.getAll()
      const proofs = await agent.proofs.getAll()
      const basicMessages = await agent.basicMessages.findAllByQuery({})

      setAgentState({ agent, loading: false })
      setConnectionState({ connections, loading: false })
      setCredentialState({ credentials, loading: false })
      setProofState({ proofs, loading: false })
      setBasicMessageState({ basicMessages, loading: false })
    }
  }

  useEffect(() => {
    setInitialState()
  }, [agent])

  useEffect(() => {
    if (!connectionState.loading) {
      const listener = (event: ConnectionStateChangedEvent) => {
        // We shouldn't modify react state directly
        const newConnectionsState = [...connectionState.connections]

        const index = newConnectionsState.findIndex((connection) => connection.id === event.payload.connectionRecord.id)
        if (index > -1) {
          newConnectionsState[index] = event.payload.connectionRecord
        } else {
          newConnectionsState.unshift(event.payload.connectionRecord)
        }

        setConnectionState({
          loading: connectionState.loading,
          connections: newConnectionsState,
        })
      }
      agent?.events.on(ConnectionEventTypes.ConnectionStateChanged, listener)

      return () => {
        agent?.events.off(ConnectionEventTypes.ConnectionStateChanged, listener)
      }
    }
  }, [connectionState, agent])

  useEffect(() => {
    if (!credentialState.loading) {
      const listener = async (event: CredentialStateChangedEvent) => {
        const newCredentialsState = [...credentialState.credentials]
        const index = newCredentialsState.findIndex((credential) => credential.id === event.payload.credentialRecord.id)
        if (index > -1) {
          newCredentialsState[index] = event.payload.credentialRecord
        } else {
          newCredentialsState.unshift(event.payload.credentialRecord)
        }

        setCredentialState({
          loading: credentialState.loading,
          credentials: newCredentialsState,
        })
      }

      agent?.events.on(CredentialEventTypes.CredentialStateChanged, listener)

      return () => {
        agent?.events.off(CredentialEventTypes.CredentialStateChanged, listener)
      }
    }
  }, [credentialState, agent])

  useEffect(() => {
    if (!proofState.loading) {
      const listener = (event: ProofStateChangedEvent) => {
        const newProofsState = [...proofState.proofs]
        const index = newProofsState.findIndex((proof) => proof.id === event.payload.proofRecord.id)
        if (index > -1) {
          newProofsState[index] = event.payload.proofRecord
        } else {
          newProofsState.unshift(event.payload.proofRecord)
        }

        setProofState({
          loading: proofState.loading,
          proofs: newProofsState,
        })
      }

      agent?.events.on(ProofEventTypes.ProofStateChanged, listener)

      return () => {
        agent?.events.off(ProofEventTypes.ProofStateChanged, listener)
      }
    }
  }, [proofState, agent])

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

      agent?.events.on(BasicMessageEventTypes.BasicMessageReceived, listener)

      return () => {
        agent?.events.off(BasicMessageEventTypes.BasicMessageReceived, listener)
      }
    }
  }, [basicMessageState])

  return (
    <AgentContext.Provider value={agentState}>
      <ConnectionContext.Provider value={connectionState}>
        <CredentialContext.Provider value={credentialState}>
          <ProofContext.Provider value={proofState}>
            <BasicMessageContext.Provider value={basicMessageState}>{children}</BasicMessageContext.Provider>
          </ProofContext.Provider>
        </CredentialContext.Provider>
      </ConnectionContext.Provider>
    </AgentContext.Provider>
  )
}

export default AgentProvider
