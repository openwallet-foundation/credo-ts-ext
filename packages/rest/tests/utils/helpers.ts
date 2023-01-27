import type { ConnectionRecordProps } from '@aries-framework/core'

import {
  AgentMessage,
  OutOfBandInvitation,
  OutOfBandRecord,
  ConnectionRecord,
  CredentialExchangeRecord,
  DidExchangeRole,
  DidExchangeState,
  JsonTransformer,
  ProofRecord,
} from '@aries-framework/core'
import { JsonEncoder } from '@aries-framework/core/build/utils/JsonEncoder'

import { setupAgent } from '../../src/utils/agent'

export async function getTestAgent(name: string, port: number) {
  return await setupAgent({
    port: port,
    publicDidSeed: '00000000000000000000000000000000',
    endpoints: [`http://localhost:${port}`],
    name: name,
  })
}

export function objectToJson<T>(result: T) {
  const serialized = JsonTransformer.serialize(result)
  return JsonEncoder.fromString(serialized)
}

export function getTestDidRecord() {
  const json = {
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

  return json
}

export function getTestOutOfBandInvitation() {
  const json = {
    '@type': 'did:sov:BzCbsNYhMrjHiqZDTUASHg;spec/out-of-band/1.1/invitation',
    '@id': 'd6472943-e5d0-4d95-8b48-790ed5a41931',
    label: 'Aries Test Agent',
    goal: 'string',
    imageUrl: 'https://example.com/image-url',
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
  return JsonTransformer.fromJSON(json, OutOfBandInvitation)
}

export function getTestOutOfBandRecord() {
  const json = {
    _tags: {
      invitationId: '1cbd22e4-1906-41e9-8807-83d84437f978',
      state: 'await-response',
      role: 'sender',
      recipientKeyFingerprints: ['z6MktUCPZjfRJXD4GMcYuXiqX2qZ8vBw6UAYpDFiHEUfwuLj'],
    },
    metadata: {},
    id: '42a95528-0e30-4f86-a462-0efb02178b53',
    createdAt: new Date('2022-01-01T00:00:00.000Z'),
    outOfBandInvitation: {
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
    },
    role: 'sender',
    state: 'await-response',
    reusable: false,
  }
  return JsonTransformer.fromJSON(json, OutOfBandRecord)
}

export function getTestCredential() {
  const json = {
    _tags: {
      connectionId: '000000aa-aa00-00a0-aa00-000a0aa00000',
      state: 'proposal-sent',
      threadId: '111111aa-aa11-11a1-aa11-111a1aa11111',
    },
    type: 'CredentialRecord',
    id: '222222aa-aa22-22a2-aa22-222a2aa22222',
    createdAt: '2021-01-01T00:00:00.000Z',
    state: 'proposal-sent',
    connectionId: '000000aa-aa00-00a0-aa00-000a0aa00000',
    metadata: {
      credentialDefinitionId: 'AAAAAAAAAAAAAAAAAAAAA:3:CL:3210:test',
      schemaId: 'AAAAAAAAAAAAAAAAAAAAA:2:string:1.0',
    },
    threadId: '111111aa-aa11-11a1-aa11-111a1aa11111',
    offerMessage: {
      type: 'https://didcomm.org/issue-credential/1.0/offer-credential',
      id: '333333aa-aa33-33a3-aa33-333a3aa33333',
      comment: 'string',
      credentialPreview: {
        type: 'https://didcomm.org/issue-credential/1.0/credential-preview',
        attributes: [
          {
            mimeType: 'text/plain',
            name: 'name',
            value: 'test',
          },
        ],
      },
      offerAttachments: [
        {
          id: 'libindy-cred-offer-0',
          mimeType: 'application/json',
          data: {
            base64: 'string',
          },
        },
      ],
    },
    credentialAttributes: [
      {
        mimeType: 'text/plain',
        name: 'name',
        value: 'test',
      },
    ],
  }

  return JsonTransformer.fromJSON(json, CredentialExchangeRecord)
}

export function getTestOffer() {
  const json = {
    message: {
      type: 'https://didcomm.org/issue-credential/1.0/offer-credential',
      id: '333333aa-aa33-33a3-aa33-333a3aa33333',
      comment: 'string',
      credentialPreview: {
        type: 'https://didcomm.org/issue-credential/1.0/credential-preview',
        attributes: [
          {
            mimeType: 'text/plain',
            name: 'name',
            value: 'test',
          },
        ],
      },
      offerAttachments: [
        {
          id: 'libindy-cred-offer-0',
          mimeType: 'application/json',
          data: {
            base64: 'string',
          },
        },
      ],
    },
    credentialRecord: {
      _tags: {
        connectionId: '000000aa-aa00-00a0-aa00-000a0aa00000',
        state: 'proposal-sent',
        threadId: '111111aa-aa11-11a1-aa11-111a1aa11111',
      },
      type: 'CredentialRecord',
      id: '222222aa-aa22-22a2-aa22-222a2aa22222',
      createdAt: '2021-01-01T00:00:00.000Z',
      state: 'proposal-sent',
      connectionId: '000000aa-aa00-00a0-aa00-000a0aa00000',
      metadata: {
        credentialDefinitionId: 'AAAAAAAAAAAAAAAAAAAAA:3:CL:3210:test',
        schemaId: 'AAAAAAAAAAAAAAAAAAAAA:2:string:1.0',
      },
      threadId: '111111aa-aa11-11a1-aa11-111a1aa11111',
      offerMessage: {
        type: 'https://didcomm.org/issue-credential/1.0/offer-credential',
        id: '333333aa-aa33-33a3-aa33-333a3aa33333',
        comment: 'string',
        credentialPreview: {
          type: 'https://didcomm.org/issue-credential/1.0/credential-preview',
          attributes: [
            {
              mimeType: 'text/plain',
              name: 'name',
              value: 'test',
            },
          ],
        },
        offerAttachments: [
          {
            id: 'libindy-cred-offer-0',
            mimeType: 'application/json',
            data: {
              base64: 'string',
            },
          },
        ],
      },
      credentialAttributes: [
        {
          mimeType: 'text/plain',
          name: 'name',
          value: 'test',
        },
      ],
    },
  }

  return {
    message: JsonTransformer.fromJSON(json.message, AgentMessage),
    credentialRecord: JsonTransformer.fromJSON(json.credentialRecord, CredentialExchangeRecord),
  }
}

export function getTestCredDef() {
  return {
    ver: '1.0',
    id: 'WgWxqztrNooG92RXvxSTWv:3:CL:20:tag',
    schemaId: '9999',
    type: 'CL',
    tag: 'latest',
    value: {
      primary: {
        n: 'x',
        s: 'x',
        r: {
          master_secret: 'x',
          name: 'x',
          title: 'x',
        },
        rctxt: 'x',
        z: 'x',
      },
    },
  }
}

export function getTestProof() {
  const json = {
    _tags: {
      connectionId: '000000aa-aa00-00a0-aa00-000a0aa00000',
      threadId: '111111aa-aa11-11a1-aa11-111a1aa11111',
      state: 'string',
    },
    type: 'ProofRecord',
    id: '222222aa-aa22-22a2-aa22-222a2aa22222',
    createdAt: '2021-01-01T00:00:00.000Z',
    requestMessage: {
      type: 'https://didcomm.org/present-proof/1.0/request-presentation',
      id: '333333aa-aa33-33a3-aa33-333a3aa33333',
      comment: 'string',
      requestPresentationAttachments: [
        {
          id: 'libindy-request-presentation-0',
          mimeType: 'application/json',
          data: {
            base64: 'string',
          },
        },
      ],
    },
    state: 'string',
    connectionId: '000000aa-aa00-00a0-aa00-000a0aa00000',
    threadId: '111111aa-aa11-11a1-aa11-111a1aa11111',
    isVerified: true,
    presentationMessage: {
      type: 'https://didcomm.org/present-proof/1.0/presentation',
      presentationAttachments: [
        {
          id: 'libindy-presentation-0',
          mimeType: 'application/json',
          data: {
            base64: 'string',
          },
        },
      ],
      id: '444444aa-aa44-44a4-aa44-444a4aa44444',
      thread: {
        threadId: '111111aa-aa11-11a1-aa11-111a1aa11111',
        senderOrder: 0,
        receivedOrders: {},
      },
    },
  }
  return JsonTransformer.fromJSON(json, ProofRecord)
}

export function getTestConnection({
  state = DidExchangeState.InvitationReceived,
  role = DidExchangeRole.Requester,
  id = 'test',
  did = 'test-did',
  threadId = 'threadId',
  tags = {},
  theirLabel,
  theirDid = 'their-did',
}: Partial<ConnectionRecordProps> = {}) {
  return new ConnectionRecord({
    did,
    threadId,
    theirDid,
    id,
    role,
    state,
    tags,
    theirLabel,
  })
}
