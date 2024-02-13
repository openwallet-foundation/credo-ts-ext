import type { SerializedInstance } from '../../types'
import type { SerializedError } from '@reduxjs/toolkit'

import { CredentialExchangeRecord, JsonTransformer } from '@credo-ts/core'
import { createSlice } from '@reduxjs/toolkit'

import {
  addRecord,
  addRecordInState,
  updateRecord,
  updateRecordInState,
  removeRecord,
  removeRecordInState,
} from '../../recordListener'

import { CredentialsThunks } from './credentialsThunks'

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
  reducers: {},
  extraReducers: (builder) => {
    builder
      // getAllCredentials
      .addCase(CredentialsThunks.getAllCredentials.pending, (state) => {
        state.credentials.isLoading = true
      })
      .addCase(CredentialsThunks.getAllCredentials.rejected, (state, action) => {
        state.credentials.isLoading = false
        state.error = action.error
      })
      .addCase(CredentialsThunks.getAllCredentials.fulfilled, (state, action) => {
        state.credentials.isLoading = false
        state.credentials.records = action.payload.map(JsonTransformer.toJSON)
      })
      // record events
      .addCase(addRecord, (state, action) =>
        addRecordInState(CredentialExchangeRecord, state.credentials.records, action.payload),
      )
      .addCase(removeRecord, (state, action) =>
        removeRecordInState(CredentialExchangeRecord, state.credentials.records, action.payload),
      )
      .addCase(updateRecord, (state, action) =>
        updateRecordInState(CredentialExchangeRecord, state.credentials.records, action.payload),
      )
  },
})

export { credentialsSlice }
export type { CredentialsState }
