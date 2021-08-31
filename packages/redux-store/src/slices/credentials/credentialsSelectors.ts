import type { CredentialsState } from './credentialsSlice'
import type { CredentialState } from '@aries-framework/core'

import { CredentialRecord, JsonTransformer } from '@aries-framework/core'
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
    credentialsState.records.map((c) => JsonTransformer.fromJSON(c, CredentialRecord))
  ),

  /**
   * Selector that retrieves all CredentialRecords from the store by specified credential state.
   */
  credentialsRecordsByStateSelector: (state: CredentialState) =>
    createSelector(credentialsStateSelector, (credentialsState) =>
      credentialsState.records
        .filter((record) => record.state === state)
        .map((c) => JsonTransformer.fromJSON(c, CredentialRecord))
    ),

  /**
   * Selector that fetches a CredentialRecord by id from the state.
   */
  credentialRecordByIdSelector: (credentialRecordId: string) =>
    createSelector(credentialsStateSelector, (credentialsState) => {
      const record = credentialsState.records.find((x) => x.id === credentialRecordId)

      record ? JsonTransformer.fromJSON(record, CredentialRecord) : null
    }),
}

export { CredentialsSelectors }
