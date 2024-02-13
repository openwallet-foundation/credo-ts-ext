import type { SerializedInstance } from '../../types'
import type { SerializedError } from '@reduxjs/toolkit'

import { MediationRecord, JsonTransformer } from '@credo-ts/core'
import { createSlice } from '@reduxjs/toolkit'

import {
  addRecord,
  addRecordInState,
  updateRecord,
  updateRecordInState,
  removeRecord,
  removeRecordInState,
} from '../../recordListener'

import { MediationThunks } from './mediationThunks'

interface MediationState {
  mediation: {
    records: SerializedInstance<MediationRecord>[]
    isLoading: boolean
  }
  error: null | SerializedError
}

const initialState: MediationState = {
  mediation: {
    records: [],
    isLoading: false,
  },
  error: null,
}

const mediationSlice = createSlice({
  name: 'mediation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllMediators
      .addCase(MediationThunks.getAllMediationRecords.pending, (state) => {
        state.mediation.isLoading = true
      })
      .addCase(MediationThunks.getAllMediationRecords.rejected, (state, action) => {
        state.mediation.isLoading = false
        state.error = action.error
      })
      .addCase(MediationThunks.getAllMediationRecords.fulfilled, (state, action) => {
        state.mediation.isLoading = false
        state.mediation.records = action.payload.map(JsonTransformer.toJSON)
      })
      // record events
      .addCase(addRecord, (state, action) => addRecordInState(MediationRecord, state.mediation.records, action.payload))
      .addCase(removeRecord, (state, action) =>
        removeRecordInState(MediationRecord, state.mediation.records, action.payload),
      )
      .addCase(updateRecord, (state, action) =>
        updateRecordInState(MediationRecord, state.mediation.records, action.payload),
      )
  },
})

export { mediationSlice }

export type { MediationState }
