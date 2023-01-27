import type {
  AutoAcceptProof,
  BasicMessageRole,
  CredentialState,
  DidExchangeRole,
  DidExchangeState,
  OutOfBandInvitationOptions,
  OutOfBandRecordProps,
  ProofRecordProps,
  ProofState,
  OutOfBandRole,
  OutOfBandState,
} from '@aries-framework/core'

/**
 * @example "821f9b26-ad04-4f56-89b6-e2ef9c72b36e"
 */
export type RecordId = string

/**
 * @example "did:key:z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL"
 */
export type Did = string

/**
 * @example "1.0.0"
 */
export type Version = string

/**
 * @example "WgWxqztrNooG92RXvxSTWv:3:CL:20:tag"
 */
export type CredentialDefinitionId = string

/**
 * @example "WgWxqztrNooG92RXvxSTWv:2:schema_name:1.0"
 */
export type SchemaId = string

export const BasicMessageRecordExample = {
  _tags: {
    role: 'sender',
    connectionId: '2aecf74c-3073-4f98-9acb-92415d096834',
  },
  metadata: {},
  id: '74bcf865-1fdc-45b4-b517-9def02dfd25f',
  createdAt: new Date('2022-08-18T08:38:40.216Z'),
  content: 'string',
  sentTime: '2022-08-18T08:38:40.216Z',
  connectionId: '2aecf74c-3073-4f98-9acb-92415d096834',
  role: 'sender' as BasicMessageRole,
}

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

export const DidRecordExample = {
  didDocument: {
    '@context': [
      'https://w3id.org/did/v1',
      'https://w3id.org/security/suites/ed25519-2018/v1',
      'https://w3id.org/security/suites/x25519-2019/v1',
    ],
    id: 'did:key:z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL',
    alsoKnownAs: undefined,
    controller: undefined,
    verificationMethod: [
      {
        id: 'did:key:z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL#z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL',
        type: 'Ed25519VerificationKey2018',
        controller: 'did:key:z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL',
        publicKeyBase58: '6fioC1zcDPyPEL19pXRS2E4iJ46zH7xP6uSgAaPdwDrx',
      },
    ],
    authentication: [
      'did:key:z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL#z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL',
    ],
    assertionMethod: [
      'did:key:z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL#z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL',
    ],
    capabilityInvocation: [
      'did:key:z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL#z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL',
    ],
    capabilityDelegation: [
      'did:key:z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL#z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL',
    ],
    keyAgreement: [
      {
        id: 'did:key:z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL#z6LSrdqo4M24WRDJj1h2hXxgtDTyzjjKCiyapYVgrhwZAySn',
        type: 'X25519KeyAgreementKey2019',
        controller: 'did:key:z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL',
        publicKeyBase58: 'FxfdY3DCQxVZddKGAtSjZdFW9bCCW7oRwZn1NFJ2Tbg2',
      },
    ],
    service: undefined,
  },
  didDocumentMetadata: {},
  didResolutionMetadata: {
    contentType: 'application/did+ld+json',
  },
}

type OutOfBandRecordProperties = Omit<OutOfBandRecordProps, 'outOfBandInvitation'>
export type OutOfBandInvitationProps = Omit<
  OutOfBandInvitationOptions,
  'handshakeProtocols' | 'services' | 'appendedAttachments'
>

export interface OutOfBandRecordWithInvitationProps extends OutOfBandRecordProperties {
  outOfBandInvitation: OutOfBandInvitationProps
}

export const outOfBandInvitationExample = {
  '@type': 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/out-of-band/1.1/invitation',
  '@id': 'd6472943-e5d0-4d95-8b48-790ed5a41931',
  label: 'Aries Test Agent',
  accept: ['didcomm/aip1', 'didcomm/aip2;env=rfc19'],
  handshake_protocols: ['https://didcomm.org/didexchange/1.0', 'https://didcomm.org/connections/1.0'],
  services: [
    {
      id: '#inline-0',
      serviceEndpoint: 'https://6b77-89-20-162-146.ngrok.io',
      type: 'did-communication',
      recipientKeys: ['did:key:z6MkmTBHTWrvLPN8pBmUj7Ye5ww9GiacXCYMNVvpScSpf1DM'],
      routingKeys: [],
    },
  ],
}

export const outOfBandRecordExample = {
  _tags: {
    invitationId: '1cbd22e4-1906-41e9-8807-83d84437f978',
    state: 'await-response',
    role: 'sender',
    recipientKeyFingerprints: ['z6MktUCPZjfRJXD4GMcYuXiqX2qZ8vBw6UAYpDFiHEUfwuLj'],
  },
  outOfBandInvitation: outOfBandInvitationExample,
  metadata: {},
  id: '42a95528-0e30-4f86-a462-0efb02178b53',
  createdAt: new Date('2022-01-01T00:00:00.000Z'),
  role: 'sender' as OutOfBandRole,
  state: 'await-response' as OutOfBandState,
  reusable: false,
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
