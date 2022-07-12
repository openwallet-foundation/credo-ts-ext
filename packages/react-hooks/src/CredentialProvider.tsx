import type { RecordsState } from './RecordProvider'
import type {
  Agent,
  CredentialState,
  RecordDeletedEvent,
  RecordSavedEvent,
  RecordUpdatedEvent,
} from '@aries-framework/core'
import type { PropsWithChildren } from 'react'

import { RepositoryEventTypes, CredentialExchangeRecord } from '@aries-framework/core'
import { createContext, useContext, useEffect, useMemo } from 'react'
import * as React from 'react'
import { map, filter } from 'rxjs'

import { RecordProviderEventTypes, useRecordReducer } from './RecordProvider'

const CredentialContext = createContext<RecordsState<CredentialExchangeRecord> | undefined>(undefined)

export const useCredentials = () => {
  const credentialContext = useContext(CredentialContext)
  if (!credentialContext) {
    throw new Error('useCredentials must be used within a CredentialContextProvider')
  }
  return credentialContext
}

export const useCredentialById = (id: string): CredentialExchangeRecord | undefined => {
  const { records: credentials } = useCredentials()
  return credentials.find((c: CredentialExchangeRecord) => c.id === id)
}

export const useCredentialByState = (state: CredentialState): CredentialExchangeRecord[] => {
  const { records: credentials } = useCredentials()
  const filteredCredentials = useMemo(
    () => credentials.filter((c: CredentialExchangeRecord) => c.state === state),
    [credentials, state]
  )
  return filteredCredentials
}

interface Props {
  agent: Agent | undefined
}

const CredentialProvider: React.FC<PropsWithChildren<Props>> = ({ agent, children }) => {
  const [credentialState, dispatch] = useRecordReducer<CredentialExchangeRecord>({
    records: [],
    loading: true,
  })

  const setInitialState = async () => {
    if (agent) {
      const records = await agent.credentials.getAll()
      dispatch({
        event: { type: RecordProviderEventTypes.RecordsLoaded, payload: { records, loading: false } },
      })
    }
  }

  useEffect(() => {
    setInitialState()
  }, [agent])

  useEffect(() => {
    if (!credentialState.loading) {
      const credentialSaved$ = agent?.events
        .observable<RecordSavedEvent<CredentialExchangeRecord>>(RepositoryEventTypes.RecordSaved)
        .pipe(
          map((event) => event.payload.record),
          filter((record) => record.type !== CredentialExchangeRecord.type)
        )
        .subscribe((record) =>
          dispatch({
            event: { type: RepositoryEventTypes.RecordSaved, payload: { record } },
          })
        )

      const credentialUpdated$ = agent?.events
        .observable<RecordUpdatedEvent<CredentialExchangeRecord>>(RepositoryEventTypes.RecordUpdated)
        .pipe(
          map((event) => event.payload.record),
          filter((record) => record.type !== CredentialExchangeRecord.type)
        )
        .subscribe((record) =>
          dispatch({
            event: { type: RepositoryEventTypes.RecordUpdated, payload: { record } },
          })
        )

      const credentialDeleted$ = agent?.events
        .observable<RecordDeletedEvent<CredentialExchangeRecord>>(RepositoryEventTypes.RecordDeleted)
        .pipe(
          map((event) => event.payload.record),
          filter((record) => record.type !== CredentialExchangeRecord.type)
        )
        .subscribe((record) =>
          dispatch({
            event: { type: RepositoryEventTypes.RecordDeleted, payload: { record } },
          })
        )

      return () => {
        credentialSaved$?.unsubscribe()
        credentialUpdated$?.unsubscribe()
        credentialDeleted$?.unsubscribe()
      }
    }
  }, [credentialState, agent])

  return <CredentialContext.Provider value={credentialState}>{children}</CredentialContext.Provider>
}

export default CredentialProvider
