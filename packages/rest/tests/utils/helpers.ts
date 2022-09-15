import type { ConnectionRecordProps } from '@aries-framework/core'

import {
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
      schema_id: 'TL1EaPFCZ8Si5aUrqScBDt:2:test-schema-1599055118161:1.0',
      cred_def_id: 'TL1EaPFCZ8Si5aUrqScBDt:3:CL:49:TAG',
      key_correctness_proof: {
        c: '50047550092211803100898435599448498249230644214602846259465380105187911562981',
        xz_cap:
          '903377919969858361861015636539761203188657065139923565169527138921408162179186528356880386741834936511828233627399006489728775544195659624738894378139967421189010372215352983118513580084886680005590351907106638703178655817619548698392274394080197104513101326422946899502782963819178061725651195158952405559244837834363357514238035344644245428381747318500206935512140018411279271654056625228252895211750431161165113594675112781707690650346028518711572046490157895995321932792559036799731075010805676081761818738662133557673397343395090042309895292970880031625026873886199268438633391631171327618951514526941153292890331525143330509967786605076984412387036942171388655140446222693051734534012842',
        xr_cap: [[], [], []],
      },
      nonce: '947121108704767252195123',
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

  return JsonTransformer.fromJSON(json, CredentialExchangeRecord)
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
