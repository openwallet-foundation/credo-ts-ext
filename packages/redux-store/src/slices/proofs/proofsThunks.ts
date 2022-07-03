import { createAsyncAgentThunk } from '../../utils'

/**
 * Namespace containing all **proof** related actions.
 */
const ProofsThunks = {
  /**
   * Retrieve all ProofRecords
   */
  getAllProofs: createAsyncAgentThunk('proofs/getAll', async (_, thunkApi) => {
    return thunkApi.extra.agent.proofs.getAll()
  }),
}

export { ProofsThunks }
