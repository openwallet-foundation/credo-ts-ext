import '@hyperledger/indy-vdr-nodejs'
import { Kms } from '@credo-ts/core'
import { NymRequest } from '@hyperledger/indy-vdr-shared'
import { getAgentContext } from '../../../../../tests/helpers'
import { multiSignRequest } from '../sign'

describe('multiSignRequest', () => {
  test('signs with the expected public key and attaches the multisignature', async () => {
    const agentContext = getAgentContext()
    const kms = agentContext.dependencyManager.resolve(Kms.KeyManagementApi)
    const { keyId, publicJwk } = await kms.createKey({ type: { kty: 'OKP', crv: 'Ed25519' } })
    const signingKey = Kms.PublicJwk.fromPublicJwk(publicJwk)
    const request = new NymRequest({
      dest: 'V4SGRU86Z58d6TV7PBUe6f',
      submitterDid: 'V4SGRU86Z58d6TV7PBUe6f',
      verkey: '43X4NhAFqREffK7eWdKgFH',
    })
    const sign = vi.spyOn(kms, 'sign')
    const setMultiSignature = vi.spyOn(request, 'setMultiSignature')

    const identifier = 'V4SGRU86Z58d6TV7PBUe6f'
    const result = await multiSignRequest(agentContext, request, signingKey, identifier)

    expect(sign).toHaveBeenCalledWith(
      expect.objectContaining({
        keyId,
        expectedPublicJwk: signingKey.toJson(),
      })
    )
    expect(setMultiSignature).toHaveBeenCalledWith({
      signature: expect.any(Uint8Array),
      identifier,
    })
    expect(result).toBe(request)
  })
})
