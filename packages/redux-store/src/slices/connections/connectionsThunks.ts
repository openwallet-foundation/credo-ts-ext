import { createAsyncAgentThunk } from '../../utils'

const ConnectionThunks = {
  /**
   * Retrieve all connections records
   */
  getAllConnections: createAsyncAgentThunk('connections/getAll', async (_, thunkApi) => {
    return thunkApi.extra.agent.connections.getAll()
  }),
}

export { ConnectionThunks }
