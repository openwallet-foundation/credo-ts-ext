import type { SerializedInstance } from '../../types'
import type { PayloadAction, SerializedError } from '@reduxjs/toolkit'

import { ProofRecord, JsonTransformer } from '@aries-framework/core'
import { createSlice } from '@reduxjs/toolkit'

import {
  addRecord,
  addRecordInState,
  updateRecord,
  updateRecordInState,
  removeRecord,
  removeRecordInState,
} from '../../recordListener'

interface ProofsState {
  proofs: {
    records: SerializedInstance<ProofRecord>[]
    isLoading: boolean
  }
  error: null | SerializedError
}

const initialState: ProofsState = {
  proofs: {
    records: [],
    isLoading: false,
  },
  error: null,
}

const proofsSlice = createSlice({
  name: 'proofs',
  initialState,
  reducers: {
    setProofRecords: (state, action: PayloadAction<ProofRecord[]>) => {
      state.proofs.records = action.payload.map((record) => JsonTransformer.toJSON(record))
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addRecord, (state, action) => addRecordInState(ProofRecord, state.proofs.records, action.payload))

    builder.addCase(removeRecord, (state, action) =>
      removeRecordInState(ProofRecord, state.proofs.records, action.payload)
    )

    builder.addCase(updateRecord, (state, action) =>
      updateRecordInState(ProofRecord, state.proofs.records, action.payload)
    )
  },
})

export { proofsSlice }

export type { ProofsState }
