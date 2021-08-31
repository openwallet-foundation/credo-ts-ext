import type { SerializedInstance } from '../../types'
import type { ProofRecord } from '@aries-framework/core'
import type { PayloadAction, SerializedError } from '@reduxjs/toolkit'

import { JsonTransformer } from '@aries-framework/core'
import { createSlice } from '@reduxjs/toolkit'

import { ProofsThunks } from './proofsThunks'

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
  extraReducers: (builder) => {
    builder
      // getAllProofs
      .addCase(ProofsThunks.getAllProofs.pending, (state) => {
        state.proofs.isLoading = true
      })
      .addCase(ProofsThunks.getAllProofs.rejected, (state, action) => {
        state.proofs.isLoading = false
        state.error = action.error
      })
      .addCase(ProofsThunks.getAllProofs.fulfilled, (state, action) => {
        state.proofs.isLoading = false
        state.proofs.records = action.payload.map((p) => JsonTransformer.toJSON(p))
      })
      // proposeProof
      .addCase(ProofsThunks.proposeProof.rejected, (state, action) => {
        state.error = action.error
      })
      // acceptProposal
      .addCase(ProofsThunks.acceptProposal.rejected, (state, action) => {
        state.error = action.error
      })
      // requestProof
      .addCase(ProofsThunks.requestProof.rejected, (state, action) => {
        state.error = action.error
      })
      // acceptRequest
      .addCase(ProofsThunks.acceptRequest.rejected, (state, action) => {
        state.error = action.error
      })
      // acceptPresentation
      .addCase(ProofsThunks.acceptPresentation.rejected, (state, action) => {
        state.error = action.error
      })
      // getRequestedCredentialsForProofRequest
      .addCase(ProofsThunks.getRequestedCredentialsForProofRequest.rejected, (state, action) => {
        state.error = action.error
      })
      // autoSelectCredentialsForProofRequest
      .addCase(ProofsThunks.autoSelectCredentialsForProofRequest.rejected, (state, action) => {
        state.error = action.error
      })
      // deleteProof
      .addCase(ProofsThunks.deleteProof.fulfilled, (state, action) => {
        const proofId = action.meta.arg
        const index = state.proofs.records.findIndex((record) => record.id == proofId)
        state.proofs.records.splice(index, 1)
      })
  },
})

export { proofsSlice }

export type { ProofsState }
