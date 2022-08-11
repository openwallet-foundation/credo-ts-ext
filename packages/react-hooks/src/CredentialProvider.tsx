import type { CombinedRecordsState, RecordsState } from './recordUtils'
import type { Agent, CredentialState, GetFormatDataReturn, IndyCredentialFormat } from '@aries-framework/core'
import type { PropsWithChildren } from 'react'

import { CredentialExchangeRecord } from '@aries-framework/core'
import { useState, createContext, useContext, useEffect, useMemo } from 'react'
import * as React from 'react'

import {
  addCombinedRecord,
  removeCombinedRecord,
  updateCombinedRecord,
  recordsRemovedByType,
  recordsUpdatedByType,
  recordsAddedByType,
} from './recordUtils'

const CredentialContext = createContext<CombinedRecordsState<CredentialExchangeRecord> | undefined>(undefined)

export const useCombinedCredentials = () => {
  const credentialContext = useContext(CredentialContext)
  if (!credentialContext) {
    throw new Error('useCredentials must be used within a CredentialContextProvider')
  }
  return credentialContext
}

export const useCredentials = (): RecordsState<CredentialExchangeRecord> => {
  const { records: combinedRecords, loading } = useCombinedCredentials()
  return { records: combinedRecords.map(({ record }) => record), loading }
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

export const useFormatDataForCredentialById = (id: string): GetFormatDataReturn<[IndyCredentialFormat]> | undefined => {
  const { records: combinedRecords } = useCombinedCredentials()
  return combinedRecords.find(({ record: c }) => c.id === id)?.formatData
}

interface Props {
  agent: Agent | undefined
}

const CredentialProvider: React.FC<PropsWithChildren<Props>> = ({ agent, children }) => {
  const [state, setState] = useState<CombinedRecordsState<CredentialExchangeRecord>>({
    records: [],
    loading: true,
  })

  const combineRecord = async (record: CredentialExchangeRecord) => {
    let formatData: GetFormatDataReturn<[IndyCredentialFormat]> = {}
    if (agent) {
      formatData = await agent.credentials.getFormatData(record.id)
    }
    return { record, formatData }
  }

  const setInitialState = async () => {
    if (agent) {
      const records = await agent.credentials.getAll()
      const combinedRecords = await Promise.all(records.map(combineRecord))
      setState({ records: combinedRecords, loading: false })
    }
  }

  useEffect(() => {
    setInitialState()
  }, [agent])

  useEffect(() => {
    if (!state.loading) {
      const credentialAdded$ = recordsAddedByType(agent, CredentialExchangeRecord).subscribe(async (record) => {
        const combinedRecord = await combineRecord(record)
        return setState(addCombinedRecord(combinedRecord, state))
      })

      const credentialUpdated$ = recordsUpdatedByType(agent, CredentialExchangeRecord).subscribe(async (record) => {
        const combinedRecord = await combineRecord(record)
        setState(updateCombinedRecord(combinedRecord, state))
      })

      const credentialRemoved$ = recordsRemovedByType(agent, CredentialExchangeRecord).subscribe(async (record) => {
        const combinedRecord = await combineRecord(record)
        setState(removeCombinedRecord(combinedRecord, state))
      })

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
