import { createAsyncAgentThunk } from '../../utils'

/**
 * Namespace containing all **credential** related actions.
 */
const CredentialsThunks = {
  /**
   * Retrieve all credential records
   */
  getAllCredentials: createAsyncAgentThunk('credentials/getAll', async (_, thunkApi) =>
    thunkApi.extra.agent.credentials.getAll(),
  ),
}

export { CredentialsThunks }
