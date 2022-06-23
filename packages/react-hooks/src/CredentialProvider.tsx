import type {
  Agent,
  CredentialState,
  RecordDeletedEvent,
  RecordUpdatedEvent,
  RecordSavedEvent,
} from '@aries-framework/core'

import { RepositoryEventTypes, CredentialExchangeRecord } from '@aries-framework/core'
import * as React from 'react'
import { createContext, useState, useEffect, useContext, useMemo } from 'react'

interface CredentialContextInterface {
  loading: boolean
  credentials: CredentialExchangeRecord[]
}

const CredentialContext = createContext<CredentialContextInterface | undefined>(undefined)

export const useCredentials = () => {
  const credentialContext = useContext(CredentialContext)
  if (!credentialContext) {
    throw new Error('useCredentials must be used within a CredentialContextProvider')
  }
  return credentialContext
}

export const useCredentialById = (id: string): CredentialExchangeRecord | undefined => {
  const { credentials } = useCredentials()
  return credentials.find((c: CredentialExchangeRecord) => c.id === id)
}

export const useCredentialByState = (state: CredentialState): CredentialExchangeRecord[] => {
  const { credentials } = useCredentials()
  const filteredCredentials = useMemo(
    () => credentials.filter((c: CredentialExchangeRecord) => c.state === state),
    [credentials, state]
  )
  return filteredCredentials
}

interface Props {
  agent: Agent | undefined
}

const CredentialProvider: React.FC<Props> = ({ agent, children }) => {
  const [credentialState, setCredentialState] = useState<CredentialContextInterface>({
    credentials: [],
    loading: true,
  })

  const setInitialState = async () => {
    if (agent) {
      const credentials = await agent.credentials.getAll()
      setCredentialState({ credentials, loading: false })
    }
  }

  useEffect(() => {
    setInitialState()
  }, [agent])

  useEffect(() => {
    if (!credentialState.loading) {
      const savedListener = async (event: RecordSavedEvent<CredentialExchangeRecord>) => {
        const { record } = event.payload
        if (record.type !== CredentialExchangeRecord.type) {
          return
        }
        const newCredentialsState = [...credentialState.credentials]
        newCredentialsState.unshift(record)

        setCredentialState({
          loading: credentialState.loading,
          credentials: newCredentialsState,
        })
      }

      const updatedListener = async (event: RecordUpdatedEvent<CredentialExchangeRecord>) => {
        const { record } = event.payload
        if (record.type !== CredentialExchangeRecord.type) {
          return
        }
        const newCredentialsState = [...credentialState.credentials]
        const index = newCredentialsState.findIndex((credential) => credential.id === record.id)
        if (index > -1) {
          newCredentialsState[index] = record
        }

        setCredentialState({
          loading: credentialState.loading,
          credentials: newCredentialsState,
        })
      }

      const deletedListener = async (event: RecordDeletedEvent<CredentialExchangeRecord>) => {
        const { record } = event.payload
        if (record.type !== CredentialExchangeRecord.type) {
          return
        }
        const newCredentialsState = credentialState.credentials.filter((credential) => credential.id !== record.id)

        setCredentialState({
          loading: credentialState.loading,
          credentials: newCredentialsState,
        })
      }

      agent?.events.on(RepositoryEventTypes.RecordSaved, savedListener)
      agent?.events.on(RepositoryEventTypes.RecordUpdated, updatedListener)
      agent?.events.on(RepositoryEventTypes.RecordDeleted, deletedListener)

      return () => {
        agent?.events.off(RepositoryEventTypes.RecordSaved, savedListener)
        agent?.events.off(RepositoryEventTypes.RecordUpdated, updatedListener)
        agent?.events.off(RepositoryEventTypes.RecordDeleted, deletedListener)
      }
    }
  }, [credentialState, agent])

  return <CredentialContext.Provider value={credentialState}>{children}</CredentialContext.Provider>
}

export default CredentialProvider
