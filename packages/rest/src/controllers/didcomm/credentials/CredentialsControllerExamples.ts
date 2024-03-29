import type {
  DidCommCredentialsCreateOfferResponse,
  DidCommCredentialExchangeRecord,
} from './CredentialsControllerTypes'

import { CredentialExchangeRecord, CredentialRole, CredentialState } from '@credo-ts/core'

export const credentialExchangeRecordExample: DidCommCredentialExchangeRecord = {
  credentials: [],
  type: CredentialExchangeRecord.type,
  role: CredentialRole.Holder,
  id: '821f9b26-ad04-4f56-89b6-e2ef9c72b36e',
  createdAt: new Date('2022-01-01T00:00:00.000Z'),
  state: CredentialState.OfferSent,
  connectionId: 'ac6d0fdd-0db8-4f52-8a3d-de7ff8ddc14b',
  threadId: '82701488-b43c-4d7b-9244-4bb204a7ae26',
  credentialAttributes: [],
  protocolVersion: 'v1',
}

export const didCommCredentialsCreateOfferResponse: DidCommCredentialsCreateOfferResponse = {
  credentialExchange: credentialExchangeRecordExample,
  message: {
    '@id': '134b27f0-9366-4811-a36b-50bacfe57e61',
    '@type': 'https://didcomm.org/issue-credential/1.0/offer-credential',
  },
}
