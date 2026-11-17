import '@hyperledger/indy-vdr-nodejs'
import { Kms } from '@credo-ts/core'
import { NymRequest } from '@hyperledger/indy-vdr-shared'
import { getAgentContext } from '../../../../../tests/helpers'
import { IndyVdrPool } from '../IndyVdrPool'

describe('IndyVdrPool', () => {
  test('signs a write request with the expected public key and optional endorser', async () => {
    const agentContext = getAgentContext()
    const kms = agentContext.dependencyManager.resolve(Kms.KeyManagementApi)
    const { keyId, publicJwk } = await kms.createKey({ type: { kty: 'OKP', crv: 'Ed25519' } })
    const signingKey = Kms.PublicJwk.fromPublicJwk(publicJwk)
    const pool = new IndyVdrPool({
      genesisTransactions: '',
      isProduction: false,
      indyNamespace: 'pool:localtest',
    })
    pool.authorAgreement = null

    const request = new NymRequest({
      dest: 'V4SGRU86Z58d6TV7PBUe6f',
      submitterDid: 'V4SGRU86Z58d6TV7PBUe6f',
      verkey: '43X4NhAFqREffK7eWdKgFH',
    })
    const sign = vi.spyOn(kms, 'sign')
    const setEndorser = vi.spyOn(request, 'setEndorser')
    const setSignature = vi.spyOn(request, 'setSignature')
    const endorserDid = 'did:indy:pool:localtest:V4SGRU86Z58d6TV7PBUe6f'

    const result = await pool.prepareWriteRequest(agentContext, request, signingKey, endorserDid)

    expect(sign).toHaveBeenCalledWith(
      expect.objectContaining({
        keyId,
        expectedPublicJwk: signingKey.toJson(),
      })
    )
    expect(setEndorser).toHaveBeenCalledWith({ endorser: 'V4SGRU86Z58d6TV7PBUe6f' })
    expect(setSignature).toHaveBeenCalledWith({ signature: expect.any(Uint8Array) })
    expect(result).toBe(request)
  })
})
