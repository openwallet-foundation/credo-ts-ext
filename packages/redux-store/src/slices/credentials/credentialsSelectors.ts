import type { CredentialsState } from './credentialsSlice'
import type { CredentialState } from '@credo-ts/core'

import { CredentialExchangeRecord, JsonTransformer } from '@credo-ts/core'
import { createSelector } from '@reduxjs/toolkit'

interface PartialCredentialState {
  credentials: CredentialsState
}

const credentialsStateSelector = (state: PartialCredentialState) => state.credentials.credentials

/**
 * Namespace that holds all CredentialRecord related selectors.
 */
const CredentialsSelectors = {
  /**
   * Selector that retrieves the entire **credentials** store object.
   */
  credentialsStateSelector,

  /**
   * Selector that retrieves all CredentialRecords from the store.
   */
  credentialRecordsSelector: createSelector(credentialsStateSelector, (credentialsState) =>
    credentialsState.records.map((r) => JsonTransformer.fromJSON(r, CredentialExchangeRecord)),
  ),

  /**
   * Selector that retrieves all CredentialRecords from the store by specified credential state.
   */
  credentialsRecordsByStateSelector: (state: CredentialState) =>
    createSelector(credentialsStateSelector, (credentialsState) =>
      credentialsState.records
        .filter((r) => r.state === state)
        .map((c) => JsonTransformer.fromJSON(c, CredentialExchangeRecord)),
    ),

  /**
   * Selector that fetches a CredentialRecord by id from the state.
   */
  credentialRecordByIdSelector: (credentialRecordId: string) =>
    createSelector(credentialsStateSelector, (credentialsState) => {
      const record = credentialsState.records.find((r) => r.id === credentialRecordId)

      return record ? JsonTransformer.fromJSON(record, CredentialExchangeRecord) : null
    }),
}

export { CredentialsSelectors }
