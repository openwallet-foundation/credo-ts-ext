import { AnonCredsRegistryService } from '@credo-ts/anoncreds'
import { getAgentContext } from '../../../tests/helpers'
import { CheqdAnonCredsRegistry } from '../src/anoncreds'
import { CheqdDidResolver } from '../src/dids'
import { validDid } from './testUtils'

const resourceId = (uuid: string) => `${validDid}/resources/${uuid}`
const credentialDefinitionId = resourceId('2c6f9d6e-6c5b-4c38-9b0c-1b1d4f2a7f10')
const revocationRegistryDefinitionId = resourceId('8f1e5d3a-2b4c-4d6e-9f0a-1b2c3d4e5f60')

const credentialDefinition = {
  schemaId: resourceId('5b2a0f8e-3c1d-4e7a-8b9c-0d1e2f3a4b5c'),
  type: 'CL',
  tag: 'default',
  value: { primary: { n: '1', s: '2' } },
}

const revocationRegistryDefinition = {
  revocDefType: 'CL_ACCUM',
  credDefId: credentialDefinitionId,
  tag: 'revreg',
  value: {
    publicKeys: { accumKey: { z: '1 0' } },
    maxCredNum: 100,
    tailsLocation: 'https://tails.example/hash',
    tailsHash: 'hash',
  },
}

const revocationStatusList = {
  revRegDefId: revocationRegistryDefinitionId,
  revocationList: [0, 1, 0],
  currentAccumulator: '21 0',
}

function setup() {
  const resolveResource = vi.fn()
  const getRevocationRegistryDefinition = vi.fn()
  const agentContext = getAgentContext({
    registerInstances: [
      [CheqdDidResolver, { resolveResource }],
      [AnonCredsRegistryService, { getRevocationRegistryDefinition }],
    ],
  })

  return { agentContext, resolveResource, getRevocationRegistryDefinition, registry: new CheqdAnonCredsRegistry() }
}

describe('CheqdAnonCredsRegistry', () => {
  describe('getCredentialDefinition', () => {
    it('returns the resolved credential definition with the issuer DID', async () => {
      const { agentContext, resolveResource, registry } = setup()
      resolveResource.mockResolvedValue({ resource: credentialDefinition, resourceMetadata: { name: 'default' } })

      const result = await registry.getCredentialDefinition(agentContext, credentialDefinitionId)

      expect(resolveResource).toHaveBeenCalledWith(agentContext, credentialDefinitionId)
      expect(result).toEqual({
        credentialDefinition: { ...credentialDefinition, issuerId: validDid },
        credentialDefinitionId,
        resolutionMetadata: {},
        credentialDefinitionMetadata: { name: 'default' },
      })
    })

    it('returns notFound when the resource is not a CL credential definition', async () => {
      const { agentContext, resolveResource, registry } = setup()
      resolveResource.mockResolvedValue({ resource: { ...credentialDefinition, type: 'BBS' } })

      const result = await registry.getCredentialDefinition(agentContext, credentialDefinitionId)

      expect(result.credentialDefinition).toBeUndefined()
      expect(result.resolutionMetadata.error).toBe('notFound')
    })

    it('returns notFound with the resolver error', async () => {
      const { agentContext, resolveResource, registry } = setup()
      resolveResource.mockResolvedValue({ error: 'notFound', message: 'no such resource' })

      const result = await registry.getCredentialDefinition(agentContext, credentialDefinitionId)

      expect(result.resolutionMetadata).toEqual({
        error: 'notFound',
        message: 'unable to resolve credential definition: notFound: no such resource',
      })
    })

    it('returns notFound for an identifier that is not a cheqd DID URL', async () => {
      const { agentContext, resolveResource, registry } = setup()

      const result = await registry.getCredentialDefinition(agentContext, 'did:web:example.com')

      expect(resolveResource).not.toHaveBeenCalled()
      expect(result.resolutionMetadata.error).toBe('notFound')
    })
  })

  describe('getRevocationRegistryDefinition', () => {
    it('resolves a resource URL as given', async () => {
      const { agentContext, resolveResource, registry } = setup()
      resolveResource.mockResolvedValue({ resource: revocationRegistryDefinition, resourceMetadata: { name: 'r' } })

      const result = await registry.getRevocationRegistryDefinition(agentContext, revocationRegistryDefinitionId)

      expect(resolveResource).toHaveBeenCalledWith(agentContext, revocationRegistryDefinitionId)
      expect(result).toEqual({
        revocationRegistryDefinition: { ...revocationRegistryDefinition, issuerId: validDid },
        revocationRegistryDefinitionId,
        resolutionMetadata: {},
        revocationRegistryDefinitionMetadata: { name: 'r' },
      })
    })

    it('adds the revocation registry definition resource type to a query-based DID URL', async () => {
      const { agentContext, resolveResource, registry } = setup()
      resolveResource.mockResolvedValue({ resource: revocationRegistryDefinition })
      const queryId = `${validDid}?resourceName=revreg`

      const result = await registry.getRevocationRegistryDefinition(agentContext, queryId)

      expect(resolveResource).toHaveBeenCalledWith(agentContext, `${queryId}&resourceType=anonCredsRevocRegDef`)
      expect(result.revocationRegistryDefinitionMetadata).toEqual({})
    })

    it('returns notFound when the resource is not a CL_ACCUM revocation registry definition', async () => {
      const { agentContext, resolveResource, registry } = setup()
      resolveResource.mockResolvedValue({ resource: { ...revocationRegistryDefinition, revocDefType: 'OTHER' } })

      const result = await registry.getRevocationRegistryDefinition(agentContext, revocationRegistryDefinitionId)

      expect(result.revocationRegistryDefinition).toBeUndefined()
      expect(result.resolutionMetadata.error).toBe('notFound')
    })
  })

  describe('getRevocationStatusList', () => {
    it('resolves the status list by registry name and time, with the timestamp in seconds', async () => {
      const { agentContext, resolveResource, getRevocationRegistryDefinition, registry } = setup()
      getRevocationRegistryDefinition.mockResolvedValue({
        revocationRegistryDefinition,
        revocationRegistryDefinitionMetadata: { name: 'revreg-name' },
        resolutionMetadata: {},
      })
      resolveResource.mockResolvedValue({
        resource: revocationStatusList,
        resourceMetadata: { created: new Date(1700000123456) },
      })

      const result = await registry.getRevocationStatusList(agentContext, revocationRegistryDefinitionId, 1700000200)

      expect(resolveResource).toHaveBeenCalledWith(
        agentContext,
        `${validDid}?resourceType=anonCredsStatusList&resourceVersionTime=1700000200&resourceName=revreg-name`
      )
      expect(result.revocationStatusList).toEqual({
        ...revocationStatusList,
        issuerId: validDid,
        timestamp: 1700000123,
      })
    })

    it('returns notFound when the revocation registry definition has no name', async () => {
      const { agentContext, resolveResource, getRevocationRegistryDefinition, registry } = setup()
      getRevocationRegistryDefinition.mockResolvedValue({
        revocationRegistryDefinition,
        revocationRegistryDefinitionMetadata: {},
        resolutionMetadata: {},
      })

      const result = await registry.getRevocationStatusList(agentContext, revocationRegistryDefinitionId, 1700000200)

      expect(resolveResource).not.toHaveBeenCalled()
      expect(result.resolutionMetadata.error).toBe('notFound')
    })

    it('returns notFound when the status list resource has no created time', async () => {
      const { agentContext, resolveResource, getRevocationRegistryDefinition, registry } = setup()
      getRevocationRegistryDefinition.mockResolvedValue({
        revocationRegistryDefinition,
        revocationRegistryDefinitionMetadata: { name: 'revreg-name' },
        resolutionMetadata: {},
      })
      resolveResource.mockResolvedValue({ resource: revocationStatusList, resourceMetadata: {} })

      const result = await registry.getRevocationStatusList(agentContext, revocationRegistryDefinitionId, 1700000200)

      expect(result.revocationStatusList).toBeUndefined()
      expect(result.resolutionMetadata.error).toBe('notFound')
    })
  })
})
