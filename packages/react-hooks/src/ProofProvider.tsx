import type { RecordsState } from './RecordProvider'
import type { Agent, ProofState, RecordDeletedEvent, RecordSavedEvent, RecordUpdatedEvent } from '@aries-framework/core'

import { RepositoryEventTypes, ProofRecord } from '@aries-framework/core'
import { createContext, useContext, useEffect, useMemo } from 'react'
import * as React from 'react'

import { RecordProviderEventTypes, useRecordReducer } from './RecordProvider'

const ProofContext = createContext<RecordsState<ProofRecord> | undefined>(undefined)

export const useProofs = () => {
  const proofContext = useContext(ProofContext)
  if (!proofContext) {
    throw new Error('useProofs must be used within a ProofContextProvider')
  }
  return proofContext
}

export const useProofById = (id: string): ProofRecord | undefined => {
  const { records: proofs } = useProofs()
  return proofs.find((p: ProofRecord) => p.id === id)
}

export const useProofByState = (state: ProofState): ProofRecord[] => {
  const { records: proofs } = useProofs()
  const filteredProofs = useMemo(() => proofs.filter((p: ProofRecord) => p.state === state), [proofs, state])
  return filteredProofs
}

interface Props {
  agent: Agent | undefined
}

const ProofProvider: React.FC<Props> = ({ agent, children }) => {
  const [proofState, dispatch] = useRecordReducer<ProofRecord>({
    records: [],
    loading: true,
  })

  const setInitialState = async () => {
    if (agent) {
      const records = await agent.proofs.getAll()
      dispatch({
        event: { type: RecordProviderEventTypes.RecordsLoaded, payload: { records, loading: false } },
      })
    }
  }

  useEffect(() => {
    setInitialState()
  }, [agent])

  useEffect(() => {
    if (!proofState.loading) {
      const proofSaved$ = agent?.events
        .observable<RecordSavedEvent<ProofRecord>>(RepositoryEventTypes.RecordSaved)
        .subscribe((event) => {
          const { record } = event.payload
          if (record.type !== ProofRecord.type) {
            return
          }
          dispatch({
            event: { type: RepositoryEventTypes.RecordSaved, payload: { record } },
          })
        })

      const proofUpdated$ = agent?.events
        .observable<RecordUpdatedEvent<ProofRecord>>(RepositoryEventTypes.RecordUpdated)
        .subscribe((event) => {
          const { record } = event.payload
          if (record.type !== ProofRecord.type) {
            return
          }
          dispatch({
            event: { type: RepositoryEventTypes.RecordUpdated, payload: { record } },
          })
        })

      const proofDeleted$ = agent?.events
        .observable<RecordDeletedEvent<ProofRecord>>(RepositoryEventTypes.RecordDeleted)
        .subscribe((event) => {
          const { record } = event.payload
          if (record.type !== ProofRecord.type) {
            return
          }
          dispatch({
            event: { type: RepositoryEventTypes.RecordDeleted, payload: { record } },
          })
        })

      return () => {
        proofSaved$?.unsubscribe()
        proofUpdated$?.unsubscribe()
        proofDeleted$?.unsubscribe()
      }
    }
  }, [proofState, agent])

  return <ProofContext.Provider value={proofState}>{children}</ProofContext.Provider>
}

export default ProofProvider
