import type { RecordsState } from './recordUtils'
import type { Agent, ProofState } from '@aries-framework/core'
import type { PropsWithChildren } from 'react'

import { ProofRecord } from '@aries-framework/core'
import { useState, createContext, useContext, useEffect, useMemo } from 'react'
import * as React from 'react'

import {
  recordsRemovedByType,
  recordsUpdatedByType,
  recordsAddedByType,
  removeRecord,
  updateRecord,
  addRecord,
} from './recordUtils'

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

export const useProofByState = (state: ProofState | ProofState[]): ProofRecord[] => {
  const states = typeof state === 'string' ? [state] : state

  const { records: proofs } = useProofs()

  const filteredProofs = proofs.filter((r: ProofRecord) =>
    useMemo(() => {
      if (states.includes(r.state)) return r
    }, [proofs])
  )
  return filteredProofs
}

export const useProofNotInState = (state: ProofState | ProofState[]): ProofRecord[] => {
  const states = typeof state === 'string' ? [state] : state

  const { records: proofs } = useProofs()

  const filteredProofs = proofs.filter((r: ProofRecord) =>
    useMemo(() => {
      if (!states.includes(r.state)) return r
    }, [proofs])
  )
  return filteredProofs
}

interface Props {
  agent: Agent | undefined
}

const ProofProvider: React.FC<PropsWithChildren<Props>> = ({ agent, children }) => {
  const [state, setState] = useState<RecordsState<ProofRecord>>({
    records: [],
    loading: true,
  })

  const setInitialState = async () => {
    if (agent) {
      const records = await agent.proofs.getAll()
      setState({ records, loading: false })
    }
  }

  useEffect(() => {
    setInitialState()
  }, [agent])

  useEffect(() => {
    if (!state.loading) {
      const proofAdded$ = recordsAddedByType(agent, ProofRecord).subscribe((record) =>
        setState(addRecord(record, state))
      )

      const proofUpdated$ = recordsUpdatedByType(agent, ProofRecord).subscribe((record) =>
        setState(updateRecord(record, state))
      )

      const proofRemoved$ = recordsRemovedByType(agent, ProofRecord).subscribe((record) =>
        setState(removeRecord(record, state))
      )

      return () => {
        proofAdded$?.unsubscribe()
        proofUpdated$?.unsubscribe()
        proofRemoved$?.unsubscribe()
      }
    }
  }, [state, agent])

  return <ProofContext.Provider value={state}>{children}</ProofContext.Provider>
}

export default ProofProvider
