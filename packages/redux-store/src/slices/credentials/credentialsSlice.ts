import type { SerializedInstance } from '../../types'
import type { CredentialExchangeRecord } from '@aries-framework/core'
import type { PayloadAction, SerializedError } from '@reduxjs/toolkit'

import { JsonTransformer } from '@aries-framework/core'
import { createSlice } from '@reduxjs/toolkit'

interface CredentialsState {
  credentials: {
    records: SerializedInstance<CredentialExchangeRecord>[]
    isLoading: boolean
  }
  error: null | SerializedError
}

const initialState: CredentialsState = {
  credentials: {
    records: [],
    isLoading: false,
  },
  error: null,
}

const credentialsSlice = createSlice({
  name: 'credentials',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<CredentialExchangeRecord[]>) => {
      state.credentials.records = action.payload.map((record) => JsonTransformer.toJSON(record))
    },
    updateOrAdd: (state, action: PayloadAction<CredentialExchangeRecord>) => {
      const index = state.credentials.records.findIndex((record) => record.id == action.payload.id)

      if (index == -1) {
        // records doesn't exist, add it
        state.credentials.records.push(JsonTransformer.toJSON(action.payload))
        return state
      }

      // record does exist, update it
      state.credentials.records[index] = JsonTransformer.toJSON(action.payload)
      return state
    },
  },
})

export { credentialsSlice }
export type { CredentialsState }
