import AgentProvider, { useAgent } from './AgentProvider'
import { useBasicMessages, useBasicMessagesByConnectionId } from './BasicMessageProvider'
import { useConnections, useConnectionById, useConnectionByState, useConnectionNotInState } from './ConnectionProvider'
import { useCredentials, useCredentialById, useCredentialByState, useCredentialNotInState } from './CredentialProvider'
import { useProofs, useProofById, useProofByState, useProofNotInState } from './ProofProvider'

export {
  useAgent,
  useBasicMessages,
  useBasicMessagesByConnectionId,
  useConnections,
  useConnectionById,
  useConnectionByState,
  useConnectionNotInState,
  useCredentials,
  useCredentialById,
  useCredentialByState,
  useCredentialNotInState,
  useProofs,
  useProofById,
  useProofByState,
  useProofNotInState,
}

export default AgentProvider
