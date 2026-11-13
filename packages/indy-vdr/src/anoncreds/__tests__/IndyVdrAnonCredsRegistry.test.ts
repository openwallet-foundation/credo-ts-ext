import '@hyperledger/indy-vdr-nodejs'
import type { AnonCredsRevocationRegistryDefinition } from '@credo-ts/anoncreds'
import { AnonCredsRegistryService } from '@credo-ts/anoncreds'

import { getAgentContext } from '../../../../../tests/helpers'
import { IndyVdrModuleConfig } from '../../IndyVdrModuleConfig'
import { IndyVdrPoolService } from '../../pool'
import { IndyVdrAnonCredsRegistry } from '../IndyVdrAnonCredsRegistry'

const revocationRegistryDefinitionId =
  'did:indy:pool:localtest:V4SGRU86Z58d6TV7PBUe6f/anoncreds/v0/REV_REG_DEF/1/TAG/REV_TAG'

const revocationRegistryDefinition: AnonCredsRevocationRegistryDefinition = {
  issuerId: 'did:indy:pool:localtest:V4SGRU86Z58d6TV7PBUe6f',
  revocDefType: 'CL_ACCUM',
  credDefId: 'did:indy:pool:localtest:V4SGRU86Z58d6TV7PBUe6f/anoncreds/v0/CLAIM_DEF/1/TAG',
  tag: 'REV_TAG',
  value: {
    publicKeys: {
      accumKey: {
        z: 'accumulator-key',
      },
    },
    maxCredNum: 3,
    tailsLocation: 'https://example.com/tails',
    tailsHash: 'tails-hash',
  },
}

describe('IndyVdrAnonCredsRegistry', () => {
  test.each([new Error('ledger unavailable'), 'ledger unavailable'])(
    'reports credential definition failures for Error and non-Error rejections',
    async (error) => {
      const agentContext = getAgentContext({
        registerInstances: [
          [
            IndyVdrPoolService,
            {
              getPoolForDid: () => {
                throw error
              },
            },
          ],
        ],
      })

      const result = await new IndyVdrAnonCredsRegistry().getCredentialDefinition(
        agentContext,
        revocationRegistryDefinition.credDefId
      )

      expect(result.resolutionMetadata).toEqual({
        error: 'notFound',
        message: 'unable to resolve credential definition: ledger unavailable',
      })
    }
  )

  test('defaults missing issuance metadata of local records, uses ledger metadata and reports missing definitions', async () => {
    const getRevocationRegistryDefinition = vi
      .fn()
      .mockResolvedValueOnce({
        revocationRegistryDefinition,
        revocationRegistryDefinitionId,
        revocationRegistryDefinitionMetadata: {},
        resolutionMetadata: {
          servedFromRecord: true,
        },
      })
      .mockResolvedValueOnce({
        revocationRegistryDefinition,
        revocationRegistryDefinitionId,
        revocationRegistryDefinitionMetadata: {
          issuanceType: 'ISSUANCE_ON_DEMAND',
        },
        resolutionMetadata: {},
      })
      .mockResolvedValueOnce({
        revocationRegistryDefinitionId,
        revocationRegistryDefinitionMetadata: {},
        resolutionMetadata: {},
      })
    const pool = {
      indyNamespace: 'pool:localtest',
      submitRequest: vi.fn().mockResolvedValue({
        result: {
          data: {
            value: {
              accum_to: { value: { accum: 'accumulator' } },
              issued: [],
              revoked: [],
            },
          },
          txnTime: 1,
          type: '117',
        },
      }),
    }
    const agentContext = getAgentContext({
      registerInstances: [
        [IndyVdrPoolService, { getPoolForDid: vi.fn().mockReturnValue({ pool }) }],
        [
          AnonCredsRegistryService,
          {
            getRevocationRegistryDefinition,
          },
        ],
      ],
    })

    const result = await new IndyVdrAnonCredsRegistry().getRevocationStatusList(
      agentContext,
      revocationRegistryDefinitionId,
      1
    )

    // Local record without issuance type defaults to ISSUANCE_BY_DEFAULT
    expect(result.resolutionMetadata).toEqual({})
    expect(result.revocationStatusList?.revocationList).toEqual([0, 0, 0])
    expect(getRevocationRegistryDefinition).toHaveBeenCalledTimes(1)

    // Issuance type from the ledger is used
    const ledgerResult = await new IndyVdrAnonCredsRegistry().getRevocationStatusList(
      agentContext,
      revocationRegistryDefinitionId,
      1
    )

    expect(ledgerResult.resolutionMetadata).toEqual({})
    expect(ledgerResult.revocationStatusList?.revocationList).toEqual([1, 1, 1])

    const missingDefinitionResult = await new IndyVdrAnonCredsRegistry().getRevocationStatusList(
      agentContext,
      revocationRegistryDefinitionId,
      1
    )

    expect(missingDefinitionResult.revocationStatusList).toBeUndefined()
    expect(missingDefinitionResult.resolutionMetadata.message).toBeTruthy()
  })

  describe('percent-encoded identifiers', () => {
    const did = 'did:indy:pool:localtest:V4SGRU86Z58d6TV7PBUe6f'

    function getRegistryAgentContext(submitRequest: ReturnType<typeof vi.fn>, encodeAnonCredsIdentifiers?: boolean) {
      const pool = {
        indyNamespace: 'pool:localtest',
        submitRequest,
      }

      return getAgentContext({
        registerInstances: [
          [IndyVdrPoolService, { getPoolForDid: vi.fn().mockReturnValue({ pool }) }],
          [
            IndyVdrModuleConfig,
            new IndyVdrModuleConfig({
              indyVdr: {} as never,
              networks: [] as never,
              encodeAnonCredsIdentifiers,
            }),
          ],
        ],
      })
    }

    test('resolves encoded schema names against their decoded ledger identifier', async () => {
      const submitRequest = vi.fn().mockResolvedValue({
        result: { seqNo: 10, data: { attr_names: ['name'], name: 'Medical Bill', version: '1.0' } },
      })
      const schemaId = `${did}/anoncreds/v0/SCHEMA/Medical%20Bill/1.0`
      const result = await new IndyVdrAnonCredsRegistry().getSchema(getRegistryAgentContext(submitRequest), schemaId)

      expect(submitRequest).toHaveBeenCalledTimes(1)
      expect(JSON.parse(submitRequest.mock.calls[0][0].body).operation.data.name).toBe('Medical Bill')
      expect(result.schemaId).toBe(schemaId)
      expect(result.schema?.name).toBe('Medical Bill')
    })

    test.each([
      [false, `${did}/anoncreds/v0/SCHEMA/Medical Bill/1.0`],
      [true, `${did}/anoncreds/v0/SCHEMA/Medical%20Bill/1.0`],
    ])('formats resolved schema identifiers according to the option (%s)', async (encode, expectedSchemaId) => {
      const submitRequest = vi
        .fn()
        .mockResolvedValueOnce({ result: { ref: 10, tag: 'SCH Employee ID', data: { primary: {} } } })
        .mockResolvedValueOnce({
          result: {
            data: {
              txn: {
                type: '101',
                data: { data: { attr_names: ['name'], name: 'Medical Bill', version: '1.0' } },
                metadata: { from: 'V4SGRU86Z58d6TV7PBUe6f' },
              },
            },
          },
        })

      const result = await new IndyVdrAnonCredsRegistry().getCredentialDefinition(
        getRegistryAgentContext(submitRequest, encode),
        `${did}/anoncreds/v0/CLAIM_DEF/10/SCH%20Employee%20ID`
      )

      expect(result.credentialDefinition?.schemaId).toBe(expectedSchemaId)
    })

    test('formats the resolved credential definition identifier according to the option', async () => {
      const submitRequest = vi.fn().mockResolvedValue({
        result: {
          data: {
            revocDefType: 'CL_ACCUM',
            tag: 'REV 1',
            value: {
              maxCredNum: 3,
              tailsHash: 'hash',
              tailsLocation: 'https://example.com/tails',
              publicKeys: { accumKey: { z: 'z' } },
              issuanceType: 'ISSUANCE_BY_DEFAULT',
            },
          },
        },
      })

      const result = await new IndyVdrAnonCredsRegistry().getRevocationRegistryDefinition(
        getRegistryAgentContext(submitRequest, true),
        `${did}/anoncreds/v0/REV_REG_DEF/10/SCH%20Employee%20ID/REV%201`
      )

      expect(result.revocationRegistryDefinition?.credDefId).toBe(
        `${did}/anoncreds/v0/CLAIM_DEF/10/SCH%20Employee%20ID`
      )
    })
  })
})
