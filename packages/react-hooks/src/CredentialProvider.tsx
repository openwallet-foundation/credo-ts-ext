import type { CredentialState } from '@aries-framework/core'

import { CredentialExchangeRecord } from '@aries-framework/core'
import { useMemo } from 'react'

import { useRecordsByType } from './RecordProvider'

export const useCredentials = () => {
  return useRecordsByType(CredentialExchangeRecord)
}

export const useCredentialById = (id: string): CredentialExchangeRecord | undefined => {
  const credentials = useCredentials()
  return credentials.find((c: CredentialExchangeRecord) => c.id === id)
}

export const useCredentialByState = (state: CredentialState): CredentialExchangeRecord[] => {
  const credentials = useCredentials()
  const filteredCredentials = useMemo(
    () => credentials.filter((c: CredentialExchangeRecord) => c.state === state),
    [credentials, state]
  )
  return filteredCredentials
}
