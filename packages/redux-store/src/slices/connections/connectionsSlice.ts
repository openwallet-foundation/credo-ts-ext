import type { SerializedInstance } from '../../types'
import type { ConnectionRecord, ConnectionInvitationMessage } from '@aries-framework/core'
import type { PayloadAction, SerializedError } from '@reduxjs/toolkit'

import { JsonTransformer } from '@aries-framework/core'
import { createSlice } from '@reduxjs/toolkit'

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
    updateOrAdd: (state, action: PayloadAction<ConnectionRecord>) => {
      const index = state.connections.records.findIndex((record) => record.id == action.payload.id)

      if (index == -1) {
        // records doesn't exist, add it
        state.connections.records.push(JsonTransformer.toJSON(action.payload))
        return state
      }

      // record does exist, update it
      state.connections.records[index] = JsonTransformer.toJSON(action.payload)
      return state
    },
  },
})

export { connectionsSlice }

export type { ConnectionsState }
