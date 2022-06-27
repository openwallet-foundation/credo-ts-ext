import type { Agent, ProofState, RecordDeletedEvent, RecordSavedEvent, RecordUpdatedEvent } from '@aries-framework/core'

import { RepositoryEventTypes, ProofRecord } from '@aries-framework/core'
import * as React from 'react'
import { createContext, useState, useEffect, useContext, useMemo } from 'react'

interface ProofContextInterface {
  loading: boolean
  proofs: ProofRecord[]
}

const ProofContext = createContext<ProofContextInterface | undefined>(undefined)

export const useProofs = (): { proofs: ProofRecord[]; loading: boolean } => {
  const proofContext = useContext(ProofContext)
  if (!proofContext) {
    throw new Error('useProofs must be used within a ProofContextProvider')
  }
  return proofContext
}

export const useProofById = (id: string): ProofRecord | undefined => {
  const { proofs } = useProofs()
  return proofs.find((p: ProofRecord) => p.id === id)
}

export const useProofByState = (state: ProofState): ProofRecord[] => {
  const { proofs } = useProofs()
  const filteredProofs = useMemo(() => proofs.filter((p: ProofRecord) => p.state === state), [proofs, state])
  return filteredProofs
}

interface Props {
  agent: Agent | undefined
}

const ProofProvider: React.FC<Props> = ({ agent, children }) => {
  const [proofState, setProofState] = useState<ProofContextInterface>({
    proofs: [],
    loading: true,
  })

  const setInitialState = async () => {
    if (agent) {
      const proofs = await agent.proofs.getAll()
      setProofState({ proofs, loading: false })
    }
  }

  useEffect(() => {
    setInitialState()
  }, [agent])

  useEffect(() => {
    if (!proofState.loading) {
      const savedListener = async (event: RecordSavedEvent<ProofRecord>) => {
        const { record } = event.payload
        if (record.type !== ProofRecord.type) {
          return
        }
        const newProofsState = [...proofState.proofs]
        newProofsState.unshift(record)

        setProofState({
          loading: proofState.loading,
          proofs: newProofsState,
        })
      }

      const updatedListener = async (event: RecordUpdatedEvent<ProofRecord>) => {
        const { record } = event.payload
        if (record.type !== ProofRecord.type) {
          return
        }
        const newProofsState = [...proofState.proofs]
        const index = newProofsState.findIndex((proof) => proof.id === record.id)
        if (index > -1) {
          newProofsState[index] = record
        }

        setProofState({
          loading: proofState.loading,
          proofs: newProofsState,
        })
      }

      const deletedListener = async (event: RecordDeletedEvent<ProofRecord>) => {
        const { record } = event.payload
        if (record.type !== ProofRecord.type) {
          return
        }
        const newProofsState = proofState.proofs.filter((proof) => proof.id !== record.id)

        setProofState({
          loading: proofState.loading,
          proofs: newProofsState,
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
  }, [proofState, agent])

  return <ProofContext.Provider value={proofState}>{children}</ProofContext.Provider>
}

export default ProofProvider
