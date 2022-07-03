import type { SerializedInstance } from '../../types'
import type { ConnectionInvitationMessage } from '@aries-framework/core'
import type { PayloadAction, SerializedError } from '@reduxjs/toolkit'

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
  reducers: {
    setConnectionRecords: (state, action: PayloadAction<ConnectionRecord[]>) => {
      state.connections.records = action.payload.map((record) => JsonTransformer.toJSON(record))
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addRecord, (state, action) =>
      addRecordInState(ConnectionRecord, state.connections.records, action.payload)
    )

    builder.addCase(removeRecord, (state, action) =>
      removeRecordInState(ConnectionRecord, state.connections.records, action.payload)
    )

    builder.addCase(updateRecord, (state, action) =>
      updateRecordInState(ConnectionRecord, state.connections.records, action.payload)
    )
  },
})

export { connectionsSlice }

export type { ConnectionsState }
