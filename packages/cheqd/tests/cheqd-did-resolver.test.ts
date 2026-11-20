import { DidsModuleConfig, JsonEncoder, parseDid } from '@credo-ts/core'
import { getAgentContext } from '../../../tests/helpers'
import { CheqdDidResolver } from '../src/dids/CheqdDidResolver'
import { CheqdLedgerService } from '../src/ledger'
import { validDid } from './testUtils'

const collectionId = validDid.split(':')[3]
const resourceId = '0b5d8a1e-7c3f-4e2a-9d6b-1f4e8c2a7b90'

function setup() {
  const ledger = {
    resolveMetadata: vi.fn(),
    resolveCollectionResources: vi.fn(),
    resolveResourceMetadata: vi.fn(),
    resolveResource: vi.fn(),
  }
  const agentContext = getAgentContext({ registerInstances: [[CheqdLedgerService, ledger]] })
  const resolver = new CheqdDidResolver()
  const resolve = (didUrl: string) => resolver.resolve(agentContext, didUrl, parseDid(didUrl))

  return { agentContext, ledger, resolver, resolve }
}

describe('CheqdDidResolver', () => {
  it('uses global caching by default and supports context scope configuration', () => {
    const resolver = new CheqdDidResolver()
    const config = new DidsModuleConfig({ resolvers: [resolver] })

    expect(resolver.allowsCaching).toBe(true)
    expect(config.getCacheScope('cheqd')).toBe('global')
    expect(new DidsModuleConfig({ cacheScope: { cheqd: 'context' } }).getCacheScope('cheqd')).toBe('context')
  })

  describe('resolve', () => {
    it('returns the DID document versions for a /versions URL', async () => {
      const { ledger, resolve } = setup()
      ledger.resolveMetadata.mockResolvedValue({ didDocumentVersionsMetadata: [{ versionId: '1' }] })

      const result = await resolve(`${validDid}/versions`)

      expect(ledger.resolveMetadata).toHaveBeenCalledWith(validDid)
      expect(result.didDocument?.id).toBe(validDid)
      expect(result.didDocumentMetadata).toEqual([{ versionId: '1' }])
    })

    it('returns the collection resources for a /metadata URL', async () => {
      const { ledger, resolve } = setup()
      ledger.resolveCollectionResources.mockResolvedValue({ resources: [{ id: resourceId }] })

      const result = await resolve(`${validDid}/metadata`)

      expect(ledger.resolveCollectionResources).toHaveBeenCalledWith(validDid, collectionId)
      expect(result.didDocumentMetadata).toEqual({ linkedResourceMetadata: { resources: [{ id: resourceId }] } })
    })

    it('returns the resource metadata for a resource /metadata URL', async () => {
      const { ledger, resolve } = setup()
      ledger.resolveResourceMetadata.mockResolvedValue({ id: resourceId, name: 'schema' })

      const result = await resolve(`${validDid}/resources/${resourceId}/metadata`)

      expect(ledger.resolveResourceMetadata).toHaveBeenCalledWith(validDid, collectionId, resourceId)
      expect(result.didDocumentMetadata).toEqual({ linkedResourceMetadata: { id: resourceId, name: 'schema' } })
    })

    it('returns an error for an unsupported DID URL', async () => {
      const { resolve } = setup()

      const result = await resolve(`${validDid}/unsupported`)

      expect(result.didDocument).toBeNull()
      expect(result.didResolutionMetadata.error).toBe('Invalid request')
    })
  })

  describe('resolveResource', () => {
    it('selects the latest resource with the queried name and type at or before resourceVersionTime', async () => {
      const { agentContext, ledger, resolver } = setup()
      const laterResourceId = 'a1b2c3d4-0000-4000-8000-000000000002'
      ledger.resolveCollectionResources.mockResolvedValue({
        resources: [
          { id: resourceId, name: 'n', resourceType: 't', created: new Date('2026-01-01T00:00:00Z') },
          { id: laterResourceId, name: 'n', resourceType: 't', created: new Date('2026-02-01T00:00:00Z') },
          {
            id: 'a1b2c3d4-0000-4000-8000-000000000003',
            name: 'other',
            resourceType: 't',
            created: new Date('2026-01-15T00:00:00Z'),
          },
        ],
      })
      ledger.resolveResource.mockResolvedValue({
        resource: { data: JsonEncoder.toUint8Array({ hello: 'world' }) },
        metadata: { id: resourceId, mediaType: 'application/json' },
      })
      const resourceVersionTime = Date.parse('2026-01-20T00:00:00Z') / 1000

      const result = await resolver.resolveResource(
        agentContext,
        `${validDid}?resourceName=n&resourceType=t&resourceVersionTime=${resourceVersionTime}`
      )

      expect(ledger.resolveResource).toHaveBeenCalledWith(validDid, collectionId, resourceId)
      expect(result).toEqual({
        resource: { hello: 'world' },
        resourceMetadata: { id: resourceId, mediaType: 'application/json' },
        resourceResolutionMetadata: {},
      })
    })

    it('selects the resource with the queried resourceVersion', async () => {
      const { agentContext, ledger, resolver } = setup()
      ledger.resolveCollectionResources.mockResolvedValue({
        resources: [
          { id: resourceId, name: 'n', resourceType: 't', version: '1', created: new Date('2026-01-01T00:00:00Z') },
          {
            id: 'a1b2c3d4-0000-4000-8000-000000000002',
            name: 'n',
            resourceType: 't',
            version: '2',
            created: new Date('2026-02-01T00:00:00Z'),
          },
        ],
      })
      ledger.resolveResource.mockResolvedValue({
        resource: { data: JsonEncoder.toUint8Array({ hello: 'world' }) },
        metadata: { id: resourceId, mediaType: 'application/json' },
      })

      await resolver.resolveResource(agentContext, `${validDid}?resourceName=n&resourceType=t&resourceVersion=1`)

      expect(ledger.resolveResource).toHaveBeenCalledWith(validDid, collectionId, resourceId)
    })

    it('returns notFound for a DID URL without a resource id or name and type', async () => {
      const { agentContext, ledger, resolver } = setup()

      const result = await resolver.resolveResource(agentContext, validDid)

      expect(ledger.resolveResource).not.toHaveBeenCalled()
      expect(result.error).toBe('notFound')
    })
  })
})
