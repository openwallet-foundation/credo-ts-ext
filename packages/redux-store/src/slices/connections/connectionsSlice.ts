import type { SerializedInstance } from '../../types'
import type { ConnectionInvitationMessage } from '@aries-framework/core'
import type { SerializedError } from '@reduxjs/toolkit'

import { ConnectionRecord, JsonTransformer } from '@aries-framework/core'
import { createSlice } from '@reduxjs/toolkit'

import {
  addRecord,
  removeRecord,
  updateRecord,
  updateRecordInState,
  addRecordInState,
  removeRecordInState,
} from '../../recordListener'

import { ConnectionThunks } from './connectionsThunks'

interface ConnectionsState {
  connections: {
    records: SerializedInstance<ConnectionRecord>[]
    isLoading: boolean
    error: null | SerializedError
  }
  invitation: {
    message: null | SerializedInstance<ConnectionInvitationMessage>
    connectionRecordId: null | string
    isLoading: boolean
    error: null | SerializedError
  }
}

const initialState: ConnectionsState = {
  connections: {
    records: [],
    isLoading: false,
    error: null,
  },
  invitation: {
    message: null,
    connectionRecordId: null,
    isLoading: false,
    error: null,
  },
}

const connectionsSlice = createSlice({
  name: 'connections',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchAllConnections
      .addCase(ConnectionThunks.getAllConnections.pending, (state) => {
        state.connections.isLoading = true
      })
      .addCase(ConnectionThunks.getAllConnections.rejected, (state, action) => {
        state.connections.isLoading = false
        state.connections.error = action.error
      })
      .addCase(ConnectionThunks.getAllConnections.fulfilled, (state, action) => {
        state.connections.isLoading = false
        state.connections.records = action.payload.map((c) => JsonTransformer.toJSON(c))
      })

      // record event
      .addCase(addRecord, (state, action) =>
        addRecordInState(ConnectionRecord, state.connections.records, action.payload)
      )
      .addCase(removeRecord, (state, action) =>
        removeRecordInState(ConnectionRecord, state.connections.records, action.payload)
      )
      .addCase(updateRecord, (state, action) =>
        updateRecordInState(ConnectionRecord, state.connections.records, action.payload)
      )
  },
})

export { connectionsSlice }

export type { ConnectionsState }
