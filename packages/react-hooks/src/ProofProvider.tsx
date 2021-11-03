import type { Agent, ProofState, ProofStateChangedEvent, ProofRecord } from '@aries-framework/core'

import { ProofEventTypes } from '@aries-framework/core'
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
      const listener = (event: ProofStateChangedEvent) => {
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

      agent?.events.on(ProofEventTypes.ProofStateChanged, listener)

      return () => {
        agent?.events.off(ProofEventTypes.ProofStateChanged, listener)
      }
    }
  }, [proofState, agent])

  return <ProofContext.Provider value={proofState}>{children}</ProofContext.Provider>
}

export default ProofProvider
