import type { MediationState } from './mediationSlice'
import type { MediationState as MediationRecordState } from '@credo-ts/core'

import { JsonTransformer, MediationRecord } from '@credo-ts/core'
import { createSelector } from '@reduxjs/toolkit'

interface PartialMediationState {
  mediation: MediationState
}

const mediationStateSelector = (state: PartialMediationState) => state.mediation.mediation

/**
 * Namespace that holds all MediationRecord related selectors.
 */
const MediationSelectors = {
  /**
   * Selector that retrieves the entire **mediation** store object.
   */
  mediationStateSelector,

  /**
   * Selector that retrieves all MediationRecord from the state.
   */
  mediationRecordsSelector: createSelector(mediationStateSelector, (mediationState) =>
    mediationState.records.map((r) => JsonTransformer.fromJSON(r, MediationRecord)),
  ),

  /**
   * Selector that retrieves all MediationRecord from the store by specified state.
   */
  mediationRecordsByStateSelector: (state: MediationRecordState) =>
    createSelector(mediationStateSelector, (mediationState) => mediationState.records.filter((r) => r.state === state)),

  /**
   * Selector that fetches a MediationRecord by id from the state.
   */
  mediationRecordByIdSelector: (mediationRecordId: string) =>
    createSelector(mediationStateSelector, (mediationState) => {
      const record = mediationState.records.find((r) => r.id === mediationRecordId)

      return record ? JsonTransformer.fromJSON(record, MediationRecord) : null
    }),
}

export { MediationSelectors }
