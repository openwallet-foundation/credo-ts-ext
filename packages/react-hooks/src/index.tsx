import AgentProvider, { useAgent } from './AgentProvider'
import { useBasicMessages, useBasicMessagesByConnectionId } from './BasicMessageProvider'
import { useConnections, useConnectionById, useConnectionByState } from './ConnectionProvider'
import { useCredentials, useCredentialById, useCredentialByState } from './CredentialProvider'
import { useProofs, useProofById, useProofByState } from './ProofProvider'
import { useQuestionAnswer, useQuestionAnswerByConnectionId, useQuestionAnswerById } from './QuestionAnswerProvider'

export {
  useAgent,
  useBasicMessages,
  useBasicMessagesByConnectionId,
  useConnections,
  useConnectionById,
  useConnectionByState,
  useCredentials,
  useCredentialById,
  useCredentialByState,
  useProofs,
  useProofById,
  useProofByState,
  useQuestionAnswer,
  useQuestionAnswerByConnectionId,
  useQuestionAnswerById,
}

export default AgentProvider
