import type { DidCommProofsCreateRequestResponse, DidCommProofsExchangeRecord } from './ProofsControllerTypes'

import { AutoAcceptProof, ProofExchangeRecord, ProofRole, ProofState } from '@credo-ts/core'

export const proofExchangeRecordExample: DidCommProofsExchangeRecord = {
  id: '821f9b26-ad04-4f56-89b6-e2ef9c72b36e',
  protocolVersion: 'v2',
  role: ProofRole.Prover,
  state: ProofState.ProposalSent,
  threadId: '0019d466-5eea-4269-8c40-031b4896c5b7',
  connectionId: '2aecf74c-3073-4f98-9acb-92415d096834',
  createdAt: new Date('2022-01-01T00:00:00.000Z'),
  autoAcceptProof: AutoAcceptProof.Always,
  type: ProofExchangeRecord.type,
}

export const didCommProofsCreateRequestResponse: DidCommProofsCreateRequestResponse = {
  proofExchange: proofExchangeRecordExample,
  message: {
    '@id': '134b27f0-9366-4811-a36b-50bacfe57e61',
    '@type': 'https://didcomm.org/present-proof/1.0/request-presentation',
  },
}
