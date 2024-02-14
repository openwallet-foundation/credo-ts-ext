import type { ProofsState } from './proofsSlice'
import type { ProofState } from '@credo-ts/core'

import { JsonTransformer, ProofExchangeRecord } from '@credo-ts/core'
import { createSelector } from '@reduxjs/toolkit'

interface PartialProofsState {
  proofs: ProofsState
}

const proofsStateSelector = (state: PartialProofsState) => state.proofs.proofs

/**
 * Namespace that holds all ProofRecords related selectors.
 */
const ProofsSelectors = {
  /**
   * Selector that retrieves the entire **proofs** store object.
   */
  proofsStateSelector,

  /**
   * Selector that retrieves all ProofRecords from the state.
   */
  proofRecordsSelector: createSelector(proofsStateSelector, (proofsState) =>
    proofsState.records.map((r) => JsonTransformer.fromJSON(r, ProofExchangeRecord)),
  ),

  /**
   * Selector that retrieves all ProofRecords from the store by specified state.
   */
  proofRecordsByStateSelector: (state: ProofState) =>
    createSelector(proofsStateSelector, (proofsState) =>
      proofsState.records.filter((r) => r.state === state).map((r) => JsonTransformer.fromJSON(r, ProofExchangeRecord)),
    ),

  /**
   * Selector that fetches a ProofRecord by id from the state.
   */
  proofRecordByIdSelector: (proofRecordId: string) =>
    createSelector(proofsStateSelector, (proofsState) => {
      const record = proofsState.records.find((r) => r.id === proofRecordId)

      return record ? JsonTransformer.fromJSON(record, ProofExchangeRecord) : null
    }),
}

export { ProofsSelectors }
