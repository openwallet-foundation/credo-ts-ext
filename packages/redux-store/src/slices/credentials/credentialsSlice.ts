import type { SerializedInstance } from '../../types'
import type { PayloadAction, SerializedError } from '@reduxjs/toolkit'

import { CredentialExchangeRecord, JsonTransformer } from '@aries-framework/core'
import { createSlice } from '@reduxjs/toolkit'

import {
  addRecord,
  addRecordInState,
  updateRecord,
  updateRecordInState,
  removeRecord,
  removeRecordInState,
} from '../../recordListener'

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
    setCredentialExchangeRecords: (state, action: PayloadAction<CredentialExchangeRecord[]>) => {
      state.credentials.records = action.payload.map((record) => JsonTransformer.toJSON(record))
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addRecord, (state, action) =>
      addRecordInState(CredentialExchangeRecord, state.credentials.records, action.payload)
    )

    builder.addCase(removeRecord, (state, action) =>
      removeRecordInState(CredentialExchangeRecord, state.credentials.records, action.payload)
    )

    builder.addCase(updateRecord, (state, action) =>
      updateRecordInState(CredentialExchangeRecord, state.credentials.records, action.payload)
    )
  },
})

export { credentialsSlice }
export type { CredentialsState }
