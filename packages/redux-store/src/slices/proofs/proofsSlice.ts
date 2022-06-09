import type { SerializedInstance } from '../../types'
import type { ProofRecord } from '@aries-framework/core'
import type { PayloadAction, SerializedError } from '@reduxjs/toolkit'

import { JsonTransformer } from '@aries-framework/core'
import { createSlice } from '@reduxjs/toolkit'

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
    setProofs: (state, action: PayloadAction<ProofRecord[]>) => {
      state.proofs.records = action.payload.map((record) => JsonTransformer.toJSON(record))
    },
    updateOrAdd: (state, action: PayloadAction<ProofRecord>) => {
      const index = state.proofs.records.findIndex((record) => record.id == action.payload.id)

      if (index == -1) {
        // records doesn't exist, add it
        state.proofs.records.push(JsonTransformer.toJSON(action.payload))
        return state
      }

      // record does exist, update it
      state.proofs.records[index] = JsonTransformer.toJSON(action.payload)
      return state
    },
  },
})

export { proofsSlice }

export type { ProofsState }
