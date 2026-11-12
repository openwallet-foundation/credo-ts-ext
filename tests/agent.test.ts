import { Agent, DidsModule, type KeyDidCreateOptions } from '@credo-ts/core'
import { getAgentOptions, getAskarStoreConfig } from './agent'

describe('shared agent setup', () => {
  it('creates unique in-memory stores for repeated test names', () => {
    const first = getAskarStoreConfig('ledger')
    const second = getAskarStoreConfig('ledger')

    expect(first.id).not.toBe(second.id)
    expect(first.database).toEqual({ type: 'sqlite', config: { inMemory: true } })
    expect(second.database).toEqual(first.database)
  })

  it('initializes an agent and persists a DID using published dependencies', async () => {
    const agent = new Agent(getAgentOptions('ledger', { dids: new DidsModule() }))

    try {
      await agent.initialize()
      const { keyId } = await agent.kms.createKey({ type: { kty: 'OKP', crv: 'Ed25519' } })
      const result = await agent.dids.create<KeyDidCreateOptions>({
        method: 'key',
        options: { keyId },
      })

      expect(result.didState.state).toBe('finished')
      expect(await agent.dids.getCreatedDids()).toHaveLength(1)
    } finally {
      await agent.shutdown()
    }
  })
})
