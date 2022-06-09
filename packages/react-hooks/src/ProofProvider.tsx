import type { Agent, ProofState, ProofStateChangedEvent, RecordDeletedEvent } from '@aries-framework/core'

import { ProofEventTypes, ProofRecord, RepositoryEventTypes } from '@aries-framework/core'
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
      const stateChangedListener = (event: ProofStateChangedEvent) => {
        const newProofsState = [...proofState.proofs]
        const index = newProofsState.findIndex((proof) => proof.id === event.payload.proofRecord.id)
        if (index > -1) {
          newProofsState[index] = event.payload.proofRecord
        } else {
          newProofsState.unshift(event.payload.proofRecord)
        }

        setProofState({
          loading: proofState.loading,
          proofs: newProofsState,
        })
      }

      const deletedListener = async (event: RecordDeletedEvent<ProofRecord>) => {
        if (event.payload.record.type !== ProofRecord.type) {
          return
        }
        const newProofsState = proofState.proofs.filter((proof) => proof.id != event.payload.record.id)
        setProofState({
          loading: proofState.loading,
          proofs: newProofsState,
        })
      }

      agent?.events.on(ProofEventTypes.ProofStateChanged, stateChangedListener)
      agent?.events.on(RepositoryEventTypes.RecordDeleted, deletedListener)

      return () => {
        agent?.events.off(ProofEventTypes.ProofStateChanged, stateChangedListener)
        agent?.events.off(RepositoryEventTypes.RecordDeleted, deletedListener)
      }
    }
  }, [proofState, agent])

  return <ProofContext.Provider value={proofState}>{children}</ProofContext.Provider>
}

export default ProofProvider
