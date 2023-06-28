import type { Agent } from '@aries-framework/core'
import type {
  QuestionAnswerRecord,
  QuestionAnswerStateChangedEvent,
  QuestionAnswerEventTypes,
} from '@aries-framework/question-answer'
import type { PropsWithChildren } from 'react'

import { createContext, useState, useEffect, useContext, useMemo } from 'react'
import * as React from 'react'

interface QuestionAnswerContextInterface {
  loading: true | 'no-qa' | 'yes-qa'
  questionAnswerMessages: QuestionAnswerRecord[]
}

const QuestionAnswerContext = createContext<QuestionAnswerContextInterface | undefined>(undefined)

const checkLoading = () => {
  const questionAnswerContext = useContext(QuestionAnswerContext)

  if (questionAnswerContext?.loading === 'no-qa') {
    throw new Error('Question Answer hooks can only be used if Question Answer module is configured.')
  }
}

export const useQuestionAnswer = (): { questionAnswerMessages: QuestionAnswerRecord[] } => {
  const questionAnswerContext = useContext(QuestionAnswerContext)
  if (!questionAnswerContext) {
    throw new Error('useQuestionAnswer must be used within a QuestionAnswerContextProvider')
  }
  checkLoading()
  return questionAnswerContext
}

export const useQuestionAnswerByConnectionId = (connectionId: string): QuestionAnswerRecord[] => {
  const { questionAnswerMessages } = useQuestionAnswer()
  const messages = useMemo(
    () => questionAnswerMessages.filter((m: QuestionAnswerRecord) => m.connectionId === connectionId),
    [questionAnswerMessages, connectionId]
  )
  return messages
}

export const useQuestionAnswerById = (id: string): QuestionAnswerRecord | undefined => {
  const { questionAnswerMessages } = useQuestionAnswer()
  return questionAnswerMessages.find((c: QuestionAnswerRecord) => c.id === id)
}

interface Props {
  agent: Agent | undefined
}

const QuestionAnswerProvider: React.FC<PropsWithChildren<Props>> = ({ agent, children }) => {
  const [questionAnswerState, setQuestionAnswerState] = useState<QuestionAnswerContextInterface>({
    questionAnswerMessages: [],
    loading: true,
  })

  const setInitialState = async () => {
    if (agent) {
      if (agent.modules.questionAnswer) {
        const questionAnswerMessages = await agent.modules.questionAnswer.getAll()
        setQuestionAnswerState({ questionAnswerMessages, loading: 'yes-qa' })
      } else {
        setQuestionAnswerState({ questionAnswerMessages: [], loading: 'no-qa' })
      }
    }
  }

  useEffect(() => {
    setInitialState()
  }, [agent])

  useEffect(() => {
    if (!questionAnswerState.loading) {
      const listener = (event: QuestionAnswerStateChangedEvent) => {
        const newQuestionAnswerState = [...questionAnswerState.questionAnswerMessages]
        const index = newQuestionAnswerState.findIndex(
          (questionAnswerMessage) => questionAnswerMessage.id === event.payload.questionAnswerRecord.id
        )
        if (index > -1) {
          newQuestionAnswerState[index] = event.payload.questionAnswerRecord
        } else {
          newQuestionAnswerState.unshift(event.payload.questionAnswerRecord)
        }

        setQuestionAnswerState({
          loading: questionAnswerState.loading,
          questionAnswerMessages: newQuestionAnswerState,
        })
      }

      agent?.events.on('QuestionAnswerStateChanged' as QuestionAnswerEventTypes, listener)

      return () => {
        agent?.events.off('QuestionAnswerStateChanged' as QuestionAnswerEventTypes, listener)
      }
    }
  }, [questionAnswerState, agent])

  return <QuestionAnswerContext.Provider value={questionAnswerState}>{children}</QuestionAnswerContext.Provider>
}

export default QuestionAnswerProvider
