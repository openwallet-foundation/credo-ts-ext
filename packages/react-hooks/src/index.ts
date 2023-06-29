import AgentProvider, { useAgent } from './AgentProvider'
import { useBasicMessages, useBasicMessagesByConnectionId } from './BasicMessageProvider'
import { useConnections, useConnectionById } from './ConnectionProvider'
import {
  useCredentials,
  useCredentialById,
  useCredentialByState,
  useCredentialNotInState,
  useCredentialsByConnectionId,
} from './CredentialProvider'
import { useExchanges, useExchangesByConnectionId } from './ExchangesProvider'
import { useProofs, useProofById, useProofByState, useProofNotInState, useProofsByConnectionId } from './ProofProvider'
import { useQuestionAnswer, useQuestionAnswerByConnectionId, useQuestionAnswerById } from './QuestionAnswerProvider'

export {
  useAgent,
  useBasicMessages,
  useBasicMessagesByConnectionId,
  useConnections,
  useConnectionById,
  useCredentials,
  useCredentialById,
  useCredentialByState,
  useCredentialNotInState,
  useCredentialsByConnectionId,
  useProofs,
  useProofById,
  useProofByState,
  useProofNotInState,
  useQuestionAnswer,
  useQuestionAnswerByConnectionId,
  useQuestionAnswerById,
  useExchanges,
  useExchangesByConnectionId,
  useProofsByConnectionId,
}

export default AgentProvider
