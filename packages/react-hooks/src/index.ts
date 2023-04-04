import AgentProvider, { useAgent } from './AgentProvider'
import { useBasicMessages, useBasicMessagesByConnectionId } from './BasicMessageProvider'
import { useConnections, useConnectionById, useConnectionByState, useConnectionNotInState } from './ConnectionProvider'
import { useCredentials, useCredentialById, useCredentialByState, useCredentialNotInState, useCredentialsByConnectionId } from './CredentialProvider'
import { useProofs, useProofById, useProofByState, useProofNotInState, useProofsByConnectionId } from './ProofProvider'

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
  useCredentialsByConnectionId,
  useProofs,
  useProofById,
  useProofByState,
  useProofNotInState,
  useProofsByConnectionId
}

export default AgentProvider
