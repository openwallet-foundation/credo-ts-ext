import type { ProofState } from '@aries-framework/core'

import { ProofRecord } from '@aries-framework/core'
import { useMemo } from 'react'

import { useRecordsByType } from './RecordProvider'

export const useProofs = (): ProofRecord[] => {
  return useRecordsByType(ProofRecord)
}

export const useProofById = (id: string): ProofRecord | undefined => {
  const proofs = useProofs()
  return proofs.find((p: ProofRecord) => p.id === id)
}

export const useProofByState = (state: ProofState): ProofRecord[] => {
  const proofs = useProofs()
  const filteredProofs = useMemo(() => proofs.filter((p: ProofRecord) => p.state === state), [proofs, state])
  return filteredProofs
}
