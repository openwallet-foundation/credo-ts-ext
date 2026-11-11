import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { setTimeout as sleep } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import { transformPrivateKeyToPrivateJwk } from '@credo-ts/askar'
import type { Agent } from '@credo-ts/core'
import {
  DidCommV1Service,
  DidDocument,
  DidDocumentService,
  Kms,
  NewDidCommV2Service,
  NewDidCommV2ServiceEndpoint,
  TypedArrayEncoder,
} from '@credo-ts/core'
import type { IndyVdrPool, IndyVdrRequest } from '@hyperledger/indy-vdr-nodejs'
import { GetAttribRequest, indyVdr, PoolCreate } from '@hyperledger/indy-vdr-nodejs'
import { IndyVdrModuleConfig, parseIndyDid } from '../src'
import type { IndyVdrDidCreateOptions } from '../src/dids/IndyVdrIndyDidRegistrar'

const genesisPath = process.env.GENESIS_TXN_PATH
  ? resolve(process.env.GENESIS_TXN_PATH)
  : fileURLToPath(new URL('../../../network/genesis/local-genesis.txn', import.meta.url))
export const genesisTransactions = readFileSync(genesisPath, 'utf8')

export async function importExistingIndyDidFromPrivateKey(agent: Agent, privateKey: Uint8Array) {
  const { privateJwk } = transformPrivateKeyToPrivateJwk({
    privateKey,
    type: { kty: 'OKP', crv: 'Ed25519' },
  })
  const key = await agent.kms.importKey({ privateJwk })
  const publicJwk = Kms.PublicJwk.fromPublicJwk(key.publicJwk)
  const publicKey = publicJwk.publicKey.publicKey
  const unqualifiedIndyDid = TypedArrayEncoder.toBase58(publicKey.slice(0, 16))
  const did = `did:indy:pool:localtest:${unqualifiedIndyDid}`
  const didDocument = new DidDocument({
    id: did,
    verificationMethod: [
      {
        id: `${did}#verkey`,
        type: 'Ed25519VerificationKey2018',
        controller: did,
        publicKeyBase58: TypedArrayEncoder.toBase58(publicKey),
      },
    ],
    authentication: [`${did}#verkey`],
  })
  await agent.dids.import({
    did,
    didDocument,
    keys: [{ didDocumentRelativeKeyId: '#verkey', kmsKeyId: key.keyId }],
  })
  return unqualifiedIndyDid
}

export async function retryUntilResult<T>(
  method: () => Promise<T | null>,
  { intervalMs = 500, delay = 1000, maxAttempts = 5 } = {}
): Promise<T> {
  await sleep(delay)
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const result = await method()
    if (result !== null) return result
    if (attempt + 1 < maxAttempts) await sleep(intervalMs)
  }
  throw new Error(`Unable to get result from method in ${maxAttempts} attempts`)
}

export const indyVdrModuleConfig = new IndyVdrModuleConfig({
  indyVdr,
  networks: [
    {
      genesisTransactions,
      indyNamespace: 'pool:localtest',
      isProduction: false,
      transactionAuthorAgreement: { version: '1', acceptanceMechanism: 'accept' },
    },
  ],
})

export async function createDidOnLedger(agent: Agent, endorserDid: string) {
  const key = await agent.kms.createKey({
    type: {
      kty: 'OKP',
      crv: 'Ed25519',
    },
  })

  const createResult = await agent.dids.create<IndyVdrDidCreateOptions>({
    method: 'indy',
    options: {
      endorserMode: 'internal',
      endorserDid: endorserDid,
      alias: 'Alias',
      role: 'TRUSTEE',
      keyId: key.keyId,
      useEndpointAttrib: true,
      services: [
        new DidDocumentService({
          id: '#endpoint',
          serviceEndpoint: 'http://localhost:3000',
          type: 'endpoint',
        }),
        new DidCommV1Service({
          id: '#did-communication',
          priority: 0,
          recipientKeys: ['#key-agreement-1'],
          routingKeys: ['a-routing-key'],
          serviceEndpoint: 'http://localhost:3000',
          accept: ['didcomm/aip2;env=rfc19'],
        }),
        new NewDidCommV2Service({
          id: '#didcomm--messaging-1',
          serviceEndpoint: new NewDidCommV2ServiceEndpoint({
            accept: ['didcomm/v2'],
            routingKeys: ['a-routing-key'],
            uri: 'http://localhost:3000',
          }),
        }),
      ],
    },
  })

  if (!createResult.didState.did) {
    throw new Error(
      `Did was not created. ${createResult.didState.state === 'failed' ? createResult.didState.reason : 'Not finished'}`
    )
  }

  const { namespaceIdentifier } = parseIndyDid(createResult.didState.did)
  await waitForAllLedgerNodes(() => new GetAttribRequest({ targetDid: namespaceIdentifier, raw: 'endpoint' }))

  return { did: createResult.didState.did, key }
}

let allNodesPool: IndyVdrPool | undefined

afterAll(() => {
  allNodesPool?.close()
  allNodesPool = undefined
})

// seqNo is only set when the node has the object (a missing schema still returns data).
// Replies of nodes that failed or timed out are not always JSON.
function nodeHasObject(reply: string | undefined) {
  try {
    return reply !== undefined && Boolean(JSON.parse(reply).result?.seqNo)
  } catch {
    return false
  }
}

/**
 * A write is confirmed once a quorum of nodes applied it, but a read is served by a single node that can still
 * be behind. Waits until every node returns the object, so any read that follows finds it.
 */
export async function waitForAllLedgerNodes(createRequest: () => IndyVdrRequest, timeoutMs = 20000) {
  allNodesPool ??= new PoolCreate({ parameters: { transactions: genesisTransactions } })
  const { nodes } = await allNodesPool.status
  const deadline = Date.now() + timeoutMs

  while (true) {
    const replies = (await allNodesPool.submitAction(createRequest(), { nodes })) as Record<string, string>
    if (nodes.every((node) => nodeHasObject(replies[node]))) return

    if (Date.now() > deadline) throw new Error(`Not all ledger nodes have the object after ${timeoutMs}ms`)
    await sleep(200)
  }
}
