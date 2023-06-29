import type { RecordsState } from './recordUtils'
import type { Agent, CredentialState } from '@aries-framework/core'
import type { PropsWithChildren } from 'react'

import { CredentialExchangeRecord } from '@aries-framework/core'
import { useState, createContext, useContext, useEffect, useMemo } from 'react'
import * as React from 'react'

import {
  recordsRemovedByType,
  recordsUpdatedByType,
  recordsAddedByType,
  removeRecord,
  updateRecord,
  addRecord,
} from './recordUtils'

const CredentialContext = createContext<RecordsState<CredentialExchangeRecord> | undefined>(undefined)

export const useCredentials = () => {
  const credentialContext = useContext(CredentialContext)
  if (!credentialContext) {
    throw new Error('useCredentials must be used within a CredentialContextProvider')
  }
  return credentialContext
}

export const useCredentialsByConnectionId = (connectionId: string): CredentialExchangeRecord[] => {
  const { records: credentials } = useCredentials()
  return useMemo(
    () => credentials.filter((credential: CredentialExchangeRecord) => credential.connectionId === connectionId),
    [credentials, connectionId]
  )
}

export const useCredentialById = (id: string): CredentialExchangeRecord | undefined => {
  const { records: credentials } = useCredentials()
  return credentials.find((c: CredentialExchangeRecord) => c.id === id)
}

export const useCredentialByState = (state: CredentialState | CredentialState[]): CredentialExchangeRecord[] => {
  const states = useMemo(() => (typeof state === 'string' ? [state] : state), [state])

  const { records: credentials } = useCredentials()

  const filteredCredentials = useMemo(
    () =>
      credentials.filter((r: CredentialExchangeRecord) => {
        if (states.includes(r.state)) return r
      }),
    [credentials]
  )
  return filteredCredentials
}

export const useCredentialNotInState = (state: CredentialState | CredentialState[]) => {
  const states = useMemo(() => (typeof state === 'string' ? [state] : state), [state])

  const { records: credentials } = useCredentials()

  const filteredCredentials = useMemo(
    () =>
      credentials.filter((r: CredentialExchangeRecord) => {
        if (!states.includes(r.state)) return r
      }),
    [credentials]
  )
  return filteredCredentials
}

interface Props {
  agent: Agent
}

const CredentialProvider: React.FC<PropsWithChildren<Props>> = ({ agent, children }) => {
  const [state, setState] = useState<RecordsState<CredentialExchangeRecord>>({
    records: [],
    loading: true,
  })

  const setInitialState = async () => {
    if (agent) {
      const records = await agent.credentials.getAll()
      setState({ records, loading: false })
    }
  }

  useEffect(() => {
    setInitialState()
  }, [agent])

  useEffect(() => {
    if (!state.loading) {
      const credentialAdded$ = recordsAddedByType(agent, CredentialExchangeRecord).subscribe((record) =>
        setState(addRecord(record, state))
      )

      const credentialUpdated$ = recordsUpdatedByType(agent, CredentialExchangeRecord).subscribe((record) =>
        setState(updateRecord(record, state))
      )

      const credentialRemoved$ = recordsRemovedByType(agent, CredentialExchangeRecord).subscribe((record) =>
        setState(removeRecord(record, state))
      )

      return () => {
        credentialAdded$?.unsubscribe()
        credentialUpdated$?.unsubscribe()
        credentialRemoved$?.unsubscribe()
      }
    }
  }, [state, agent])

  return <CredentialContext.Provider value={state}>{children}</CredentialContext.Provider>
}

export default CredentialProvider
