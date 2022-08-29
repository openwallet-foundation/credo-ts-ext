import AgentProvider, { useAgent } from './AgentProvider'
import { useBasicMessages, useBasicMessagesByConnectionId } from './BasicMessageProvider'
import {
  useConnections,
  useConnectionById,
  useConnectionsByState,
  useConnectionsNotInState,
} from './ConnectionProvider'
import {
  useCredentials,
  useCredentialById,
  useCredentialsByState,
  useCredentialsNotInState,
} from './CredentialProvider'
import { useProofs, useProofById, useProofsByState, useProofsNotInState } from './ProofProvider'

export {
  useAgent,
  useBasicMessages,
  useBasicMessagesByConnectionId,
  useConnections,
  useConnectionById,
  useConnectionsByState,
  useConnectionsNotInState,
  useCredentials,
  useCredentialById,
  useCredentialsByState,
  useCredentialsNotInState,
  useProofs,
  useProofById,
  useProofsByState,
  useProofsNotInState,
}

export default AgentProvider
