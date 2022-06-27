import type {
  AutoAcceptProof,
  CredentialState,
  DidExchangeRole,
  DidExchangeState,
  ProofRecordProps,
  ProofState,
} from '@aries-framework/core'

/**
 * @example "821f9b26-ad04-4f56-89b6-e2ef9c72b36e"
 */
export type RecordId = string

/**
 * @example "WgWxqztrNooG92RXvxSTWv:3:CL:20:tag"
 */
export type CredentialDefinitionId = string

/**
 * @example "WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0"
 */
export type SchemaId = string

export const ConnectionRecordExample = {
  _tags: {
    invitationDid:
      'did:peer:2.SeyJzIjoiaHR0cHM6Ly9kYTIzLTg5LTIwLTE2Mi0xNDYubmdyb2suaW8iLCJ0IjoiZGlkLWNvbW11bmljYXRpb24iLCJwcmlvcml0eSI6MCwicmVjaXBpZW50S2V5cyI6WyJkaWQ6a2V5Ono2TWtualg3U1lXRmdHMThCYkNEZHJnemhuQnA0UlhyOGVITHZxQ3FvRXllckxiTiN6Nk1rbmpYN1NZV0ZnRzE4QmJDRGRyZ3pobkJwNFJYcjhlSEx2cUNxb0V5ZXJMYk4iXSwiciI6W119',
    did: 'did:peer:1zQmfQh1T3rSqarP2FZ37uKjdQHPKFdVyo2mGiAPHZ8Ep7hv',
    state: 'invitation-sent' as DidExchangeState,
    invitationKey: '9HG4rJFpLiWf56MWxHj9rgdpErFzim2zEpHuxy1dw7oz',
    outOfBandId: 'edbc89fe-785f-4774-a288-46012486881d',
    verkey: '9HG4rJFpLiWf56MWxHj9rgdpErFzim2zEpHuxy1dw7oz',
    role: 'responder' as DidExchangeRole,
  },
  metadata: {},
  id: '821f9b26-ad04-4f56-89b6-e2ef9c72b36e',
  createdAt: new Date('2022-01-01T00:00:00.000Z'),
  did: 'did:peer:1zQmfQh1T3rSqarP2FZ37uKjdQHPKFdVyo2mGiAPHZ8Ep7hv',
  state: 'invitation-sent' as DidExchangeState,
  role: 'responder' as DidExchangeRole,
  invitationDid:
    'did:peer:2.SeyJzIjoiaHR0cHM6Ly9kYTIzLTg5LTIwLTE2Mi0xNDYubmdyb2suaW8iLCJ0IjoiZGlkLWNvbW11bmljYXRpb24iLCJwcmlvcml0eSI6MCwicmVjaXBpZW50S2V5cyI6WyJkaWQ6a2V5Ono2TWtualg3U1lXRmdHMThCYkNEZHJnemhuQnA0UlhyOGVITHZxQ3FvRXllckxiTiN6Nk1rbmpYN1NZV0ZnRzE4QmJDRGRyZ3pobkJwNFJYcjhlSEx2cUNxb0V5ZXJMYk4iXSwiciI6W119',
  outOfBandId: 'edbc89fe-785f-4774-a288-46012486881d',
}

export const CredentialExchangeRecordExample = {
  _tags: {
    state: 'offer-sent',
    threadId: '82701488-b43c-4d7b-9244-4bb204a7ae26',
    connectionId: 'ac6d0fdd-0db8-4f52-8a3d-de7ff8ddc14b',
  },
  metadata: {
    '_internal/indyCredential': {
      credentialDefinitionId: 'q7ATwTYbQDgiigVijUAej:3:CL:318187:latest',
      schemaId: 'q7ATwTYbQDgiigVijUAej:2:Employee Badge:1.0',
    },
  },
  credentials: [],
  id: '821f9b26-ad04-4f56-89b6-e2ef9c72b36e',
  createdAt: new Date('2022-01-01T00:00:00.000Z'),
  state: 'offer-sent' as CredentialState,
  connectionId: 'ac6d0fdd-0db8-4f52-8a3d-de7ff8ddc14b',
  threadId: '82701488-b43c-4d7b-9244-4bb204a7ae26',
  credentialAttributes: [],
  protocolVersion: 'v1',
}

export const ProofRecordExample = {
  _tags: {
    state: 'proposal-sent' as ProofState,
    threadId: '0019d466-5eea-4269-8c40-031b4896c5b7',
    connectionId: '2aecf74c-3073-4f98-9acb-92415d096834',
  } as ProofRecordProps,
  metadata: {},
  id: '821f9b26-ad04-4f56-89b6-e2ef9c72b36e',
  createdAt: new Date('2022-01-01T00:00:00.000Z'),
  state: 'proposal-sent' as ProofState,
  connectionId: '2aecf74c-3073-4f98-9acb-92415d096834',
  threadId: '0019d466-5eea-4269-8c40-031b4896c5b7',
  autoAcceptProof: 'always' as AutoAcceptProof,
}

export const SchemaExample = {
  ver: '1.0',
  id: 'WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0',
  name: 'schema',
  version: '1.0',
  attrNames: ['string'],
  seqNo: 351936,
}

export const CredentialDefinitionExample = {
  ver: '1.0',
  id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
  schemaId: '351936',
  type: 'CL',
  tag: 'definition',
  value: {
    primary: {
      n: 'string',
      s: 'string',
      r: {
        master_secret: 'string',
        string: 'string',
      },
      rctxt: 'string',
      z: 'string',
    },
    revocation: {
      g: '1 string',
      g_dash: 'string',
      h: 'string',
      h0: 'string',
      h1: 'string',
      h2: 'string',
      htilde: 'string',
      h_cap: 'string',
      u: 'string',
      pk: 'string',
      y: 'string',
    },
  },
}
