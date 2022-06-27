import type { Agent, RecordDeletedEvent, RecordSavedEvent, RecordUpdatedEvent, BaseRecord } from '@aries-framework/core'

import { RepositoryEventTypes } from '@aries-framework/core'
import * as React from 'react'
import { createContext, useEffect, useState } from 'react'

interface RecordContextInterface {
  loading: boolean
  records: BaseRecord[]
}

interface Props {
  agent: Agent | undefined
}

const RecordContext = createContext<RecordContextInterface | undefined>(undefined)

const RecordProvider: React.FC<Props> = ({ agent, children }) => {
  const [recordState, setRecordState] = useState<RecordContextInterface>({
    loading: true,
    records: [],
  })

  const setInitialState = async () => {
    if (agent) {
      const records = [
        ...((await agent.connections.getAll()) as unknown as BaseRecord[]),
        ...((await agent.credentials.getAll()) as unknown as BaseRecord[]),
        ...((await agent.proofs.getAll()) as unknown as BaseRecord[]),
      ]
      setRecordState({ loading: false, records })
    }
  }

  useEffect(() => {
    setInitialState()
  }, [agent])

  useEffect(() => {
    if (!recordState.loading) {
      const savedListener = async (event: RecordSavedEvent<BaseRecord>) => {
        const { record } = event.payload
        const newRecordsState = [...recordState.records]
        newRecordsState.unshift(record)

        setRecordState({
          loading: recordState.loading,
          records: newRecordsState,
        })
      }

      const updatedListener = async (event: RecordUpdatedEvent<BaseRecord>) => {
        const { record } = event.payload
        const newRecordsState = [...recordState.records]
        const index = newRecordsState.findIndex((record) => record.id === record.id)
        if (index > -1) {
          newRecordsState[index] = record
        }

        setRecordState({
          loading: recordState.loading,
          records: newRecordsState,
        })
      }

      const deletedListener = async (event: RecordDeletedEvent<BaseRecord>) => {
        const { record } = event.payload
        const newRecordsState = recordState.records.filter((r) => r.id !== record.id)

        setRecordState({
          loading: recordState.loading,
          records: newRecordsState,
        })
      }

      agent?.events.on(RepositoryEventTypes.RecordSaved, savedListener)
      agent?.events.on(RepositoryEventTypes.RecordUpdated, updatedListener)
      agent?.events.on(RepositoryEventTypes.RecordDeleted, deletedListener)

      return () => {
        agent?.events.off(RepositoryEventTypes.RecordSaved, savedListener)
        agent?.events.off(RepositoryEventTypes.RecordUpdated, updatedListener)
        agent?.events.off(RepositoryEventTypes.RecordDeleted, deletedListener)
      }
    }
  }, [recordState, agent])

  return <RecordContext.Provider value={recordState}>{children}</RecordContext.Provider>
}

export default RecordProvider
