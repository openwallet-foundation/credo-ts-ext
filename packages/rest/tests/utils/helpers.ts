import {
  AutoAcceptCredential,
  CredentialRecord,
  JsonTransformer,
  LogLevel,
  OfferCredentialMessage,
  ProofRecord,
  ProofRequest,
} from '@aries-framework/core'
import { JsonEncoder } from '@aries-framework/core/build/utils/JsonEncoder'

import { TsLogger } from '../../src/utils/logger'

import { setupAgent } from './agent'

export async function getTestAgent(name: string, port: number) {
  const logger = new TsLogger(LogLevel.fatal)

  return await setupAgent({
    port: port,
    publicDidSeed: 'testtesttesttesttesttesttesttest',
    endpoints: [`http://localhost:${port}`],
    name: name,
    logger: logger,
    autoAcceptConnections: true,
    autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
    useLegacyDidSovPrefix: true,
  })
}

export function objectToJson<T>(result: T) {
  const serialized = JsonTransformer.serialize(result)
  return JsonEncoder.fromString(serialized)
}

export function getTestCredential() {
  const json = {
    _tags: {
      connectionId: '000000aa-aa00-00a0-aa00-000a0aa00000',
      state: 'string',
      threadId: '111111aa-aa11-11a1-aa11-111a1aa11111',
    },
    type: 'CredentialRecord',
    id: '222222aa-aa22-22a2-aa22-222a2aa22222',
    createdAt: '2021-01-01T00:0:00.000Z',
    state: 'string',
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

  return JsonTransformer.fromJSON(json, CredentialRecord)
}

export function getTestCredentialOfferMsg() {
  const offerMsg = {
    '@type': 'https://didcomm.org/issue-credential/1.0/offer-credential',
    id: 'string',
    credentialPreview: {
      '@type': 'https://didcomm.org/issue-credential/1.0/credential-preview',
      attributes: [
        {
          'mime-type': 'text/plain',
          name: 'name',
          value: 'test',
        },
      ],
    },
  }

  return JsonTransformer.fromJSON(offerMsg, OfferCredentialMessage)
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
    createdAt: '2021-01-01T00:0:00.000Z',
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

export function getTestProofRequest() {
  const json = {
    name: 'string',
    version: 'string',
    nonce: 'string',
    requestedAttributes: {
      additionalProp1: {
        name: 'string',
      },
    },
    requestedPredicates: {},
    ver: '1.0',
  }
  return JsonTransformer.fromJSON(json, ProofRequest)
}
