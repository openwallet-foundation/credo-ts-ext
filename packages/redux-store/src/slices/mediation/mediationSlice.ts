import type { SerializedInstance } from '../../types'
import type { MediationRecord } from '@aries-framework/core'
import type { PayloadAction, SerializedError } from '@reduxjs/toolkit'

import { JsonTransformer } from '@aries-framework/core'
import { createSlice } from '@reduxjs/toolkit'

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
    setMediation: (state, action: PayloadAction<MediationRecord[]>) => {
      state.mediation.records = action.payload.map((record) => JsonTransformer.toJSON(record))
    },
    updateOrAdd: (state, action: PayloadAction<MediationRecord>) => {
      const index = state.mediation.records.findIndex((record) => record.id == action.payload.id)

      if (index == -1) {
        // records doesn't exist, add it
        state.mediation.records.push(JsonTransformer.toJSON(action.payload))
        return state
      }

      // record does exist, update it
      state.mediation.records[index] = JsonTransformer.toJSON(action.payload)
      return state
    },
  },
})

export { mediationSlice }

export type { MediationState }
