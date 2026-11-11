import { AgentConfig, AgentContext, DependencyManager, Kms } from '@credo-ts/core'
import { NodeInMemoryKeyManagementStorage, NodeKeyManagementService } from '@credo-ts/node'
import { getAgentConfig, getAgentContext, mockFunction, mockProperty } from './helpers'

describe('shared test helpers', () => {
  it('creates a context with working KMS operations through public exports', async () => {
    const context = getAgentContext()
    const kms = context.dependencyManager.resolve(Kms.KeyManagementApi)
    const { keyId, publicJwk } = await kms.createKey({ type: { kty: 'OKP', crv: 'Ed25519' } })
    const data = new TextEncoder().encode('ledger test')
    const { signature } = await kms.sign({ keyId, data, algorithm: 'EdDSA' })

    await expect(kms.verify({ key: { publicJwk }, data, signature, algorithm: 'EdDSA' })).resolves.toEqual({
      verified: true,
      publicJwk,
    })
    expect(context.dependencyManager.resolve(AgentContext)).toBe(context)
    expect(context.isInitialized).toBe(true)
  })

  it('preserves registered configuration and injected services', () => {
    const dependencyManager = new DependencyManager()
    const config = getAgentConfig()
    const kmsConfig = new Kms.KeyManagementModuleConfig({
      backends: [new NodeKeyManagementService(new NodeInMemoryKeyManagementStorage())],
    })
    const service = { resolve: vi.fn() }
    dependencyManager.registerInstance(AgentConfig, config)
    dependencyManager.registerInstance(Kms.KeyManagementModuleConfig, kmsConfig)

    const context = getAgentContext({
      dependencyManager,
      registerInstances: [['ledger', service]],
      contextCorrelationId: 'tenant',
      isRootAgentContext: false,
      isInitialized: false,
    })

    expect(dependencyManager.resolve(AgentConfig)).toBe(config)
    expect(dependencyManager.resolve(Kms.KeyManagementModuleConfig)).toBe(kmsConfig)
    expect(dependencyManager.resolve('ledger')).toBe(service)
    expect(context.contextCorrelationId).toBe('tenant')
    expect(context.isRootAgentContext).toBe(false)
    expect(context.isInitialized).toBe(false)
  })

  it('does not share default key storage between contexts', async () => {
    const first = getAgentContext().dependencyManager.resolve(Kms.KeyManagementApi)
    const second = getAgentContext().dependencyManager.resolve(Kms.KeyManagementApi)
    const { keyId } = await first.createKey({ type: { kty: 'OKP', crv: 'Ed25519' } })

    await expect(second.getPublicKey({ keyId })).rejects.toThrow(Kms.KeyManagementKeyNotFoundError)
  })

  it('supports typed function mocks and replaceable getter mocks', () => {
    const fn = vi.fn<(value: string) => string>()
    mockFunction(fn).mockReturnValue('resolved')
    expect(fn('did')).toBe('resolved')

    const object = { value: 'original' }
    mockProperty(object, 'value', 'first')
    mockProperty(object, 'value', 'second')
    expect(object.value).toBe('second')
  })
})
