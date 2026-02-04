import type { DidCommConnectionRecord as ConnectionRecordExample } from './ConnectionsControllerTypes'

import { DidCommConnectionRecord, DidCommDidExchangeRole, DidCommDidExchangeState } from '@credo-ts/didcomm'

export const connectionRecordExample: ConnectionRecordExample = {
  id: '821f9b26-ad04-4f56-89b6-e2ef9c72b36e',
  type: DidCommConnectionRecord.type,
  createdAt: new Date('2022-01-01T00:00:00.000Z'),
  did: 'did:peer:1zQmfQh1T3rSqarP2FZ37uKjdQHPKFdVyo2mGiAPHZ8Ep7hv',
    state: DidCommDidExchangeState.InvitationSent,
    role: DidCommDidExchangeRole.Responder,
  invitationDid:
    'did:peer:2.SeyJzIjoiaHR0cHM6Ly9kYTIzLTg5LTIwLTE2Mi0xNDYubmdyb2suaW8iLCJ0IjoiZGlkLWNvbW11bmljYXRpb24iLCJwcmlvcml0eSI6MCwicmVjaXBpZW50S2V5cyI6WyJkaWQ6a2V5Ono2TWtualg3U1lXRmdHMThCYkNEZHJnemhuQnA0UlhyOGVITHZxQ3FvRXllckxiTiN6Nk1rbmpYN1NZV0ZnRzE4QmJDRGRyZ3pobkJwNFJYcjhlSEx2cUNxb0V5ZXJMYk4iXSwiciI6W119',
  outOfBandId: 'edbc89fe-785f-4774-a288-46012486881d',
}
