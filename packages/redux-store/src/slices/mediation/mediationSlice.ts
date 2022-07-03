import type { SerializedInstance } from '../../types'
import type { PayloadAction, SerializedError } from '@reduxjs/toolkit'

import { MediationRecord, JsonTransformer } from '@aries-framework/core'
import { createSlice } from '@reduxjs/toolkit'

import {
  addRecord,
  addRecordInState,
  updateRecord,
  updateRecordInState,
  removeRecord,
  removeRecordInState,
} from '../../recordListener'

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
  reducers: {
    setMediationRecords: (state, action: PayloadAction<MediationRecord[]>) => {
      state.mediation.records = action.payload.map((record) => JsonTransformer.toJSON(record))
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addRecord, (state, action) =>
      addRecordInState(MediationRecord, state.mediation.records, action.payload)
    )

    builder.addCase(removeRecord, (state, action) =>
      removeRecordInState(MediationRecord, state.mediation.records, action.payload)
    )

    builder.addCase(updateRecord, (state, action) =>
      updateRecordInState(MediationRecord, state.mediation.records, action.payload)
    )
  },
})

export { mediationSlice }

export type { MediationState }
