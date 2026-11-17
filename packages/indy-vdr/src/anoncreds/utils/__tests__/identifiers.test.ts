import { getIndyNamespaceFromIndyDid } from '@credo-ts/indy-vdr'
import {
  parseIndyCredentialDefinitionId,
  parseIndyRevocationRegistryId,
  parseIndySchemaId,
} from '@credo-ts/indy-vdr/anoncreds'
import {
  didIndyCredentialDefinitionIdRegex,
  didIndyRevocationRegistryIdRegex,
  didIndySchemaIdRegex,
  getDidIndyCredentialDefinitionId,
  getDidIndyIdentifierVariants,
  getDidIndyRevocationRegistryDefinitionId,
  getDidIndySchemaId,
  getIndyLedgerCredentialDefinitionId,
  getIndyLedgerRevocationRegistryDefinitionId,
  getIndyLedgerSchemaId,
  indyVdrAnonCredsRegistryIdentifierRegex,
  isDidIndyCredentialDefinitionId,
  isDidIndyRevocationRegistryId,
  isDidIndySchemaId,
} from '../identifiers'

describe('identifiers', () => {
  test('use the root helper for bare DIDs and the AnonCreds subpath parsers for object ID namespaces', () => {
    const did = 'did:indy:bcovrin:test:SDqTzbVuCowusqGBNbNDjH'
    const schemaId = `${did}/anoncreds/v0/SCHEMA/example/1.0`
    const credentialDefinitionId = `${did}/anoncreds/v0/CLAIM_DEF/10/TAG`
    const revocationRegistryId = `${did}/anoncreds/v0/REV_REG_DEF/10/TAG/REV_TAG`

    expect(getIndyNamespaceFromIndyDid(did)).toBe('bcovrin:test')
    expect(parseIndySchemaId(schemaId).namespace).toBe('bcovrin:test')
    expect(parseIndyCredentialDefinitionId(credentialDefinitionId).namespace).toBe('bcovrin:test')
    expect(parseIndyRevocationRegistryId(revocationRegistryId).namespace).toBe('bcovrin:test')

    for (const objectId of [schemaId, credentialDefinitionId, revocationRegistryId]) {
      expect(() => getIndyNamespaceFromIndyDid(objectId)).toThrow(`${objectId} is not a valid did:indy did`)
    }
  })

  test('did:indy object identifier regexes and predicates accept qualified IDs only', () => {
    const schemaId = 'did:indy:sovrin:q7ATwTYbQDgiigVijUAej/anoncreds/v0/SCHEMA/test/1.0'
    const credentialDefinitionId = 'did:indy:sovrin:q7ATwTYbQDgiigVijUAej/anoncreds/v0/CLAIM_DEF/160971/1.0.0'
    const revocationRegistryId =
      'did:indy:sovrin:q7ATwTYbQDgiigVijUAej/anoncreds/v0/REV_REG_DEF/100669/SCH Employee ID/1-1024'

    expect(didIndySchemaIdRegex.test(schemaId)).toBe(true)
    expect(didIndyCredentialDefinitionIdRegex.test(credentialDefinitionId)).toBe(true)
    expect(didIndyRevocationRegistryIdRegex.test(revocationRegistryId)).toBe(true)
    expect(isDidIndySchemaId(schemaId)).toBe(true)
    expect(isDidIndyCredentialDefinitionId(credentialDefinitionId)).toBe(true)
    expect(isDidIndyRevocationRegistryId(revocationRegistryId)).toBe(true)
    expect(isDidIndySchemaId('q7ATwTYbQDgiigVijUAej:2:test:1.0')).toBe(false)
    expect(isDidIndyCredentialDefinitionId('q7ATwTYbQDgiigVijUAej:3:CL:160971:1.0.0')).toBe(false)
    expect(isDidIndyRevocationRegistryId('q7ATwTYbQDgiigVijUAej:4:...')).toBe(false)
  })

  test('did:indy object identifier parsers return their components', () => {
    expect(
      parseIndySchemaId('did:indy:bcovrin:test:SDqTzbVuCowusqGBNbNDjH/anoncreds/v0/SCHEMA/schema-name/1.0')
    ).toEqual({
      did: 'did:indy:bcovrin:test:SDqTzbVuCowusqGBNbNDjH',
      namespace: 'bcovrin:test',
      namespaceIdentifier: 'SDqTzbVuCowusqGBNbNDjH',
      schemaName: 'schema-name',
      schemaVersion: '1.0',
    })
    expect(
      parseIndyCredentialDefinitionId('did:indy:pool:localtest:TL1EaPFCZ8Si5aUrqScBDt/anoncreds/v0/CLAIM_DEF/10/TAG')
    ).toEqual({
      did: 'did:indy:pool:localtest:TL1EaPFCZ8Si5aUrqScBDt',
      namespace: 'pool:localtest',
      namespaceIdentifier: 'TL1EaPFCZ8Si5aUrqScBDt',
      schemaSeqNo: '10',
      tag: 'TAG',
    })
    expect(
      parseIndyRevocationRegistryId('did:indy:sovrin:5nDyJVP1NrcPAttP3xwMB9/anoncreds/v0/REV_REG_DEF/56495/npdb/TAG1')
    ).toEqual({
      did: 'did:indy:sovrin:5nDyJVP1NrcPAttP3xwMB9',
      namespace: 'sovrin',
      namespaceIdentifier: '5nDyJVP1NrcPAttP3xwMB9',
      schemaSeqNo: '56495',
      credentialDefinitionTag: 'npdb',
      revocationRegistryTag: 'TAG1',
    })
    expect(() => parseIndySchemaId('q7ATwTYbQDgiigVijUAej:2:test:1.0')).toThrow('Invalid did:indy schema id')
    expect(() => parseIndyCredentialDefinitionId('q7ATwTYbQDgiigVijUAej:3:CL:10:TAG')).toThrow(
      'Invalid did:indy credential definition id'
    )
    expect(() => parseIndyRevocationRegistryId('q7ATwTYbQDgiigVijUAej:4:...')).toThrow(
      'Invalid did:indy revocation registry id'
    )
  })

  test('parses encoded components without decoding structural separators', () => {
    const did = 'did:indy:pool:localtest:TL1EaPFCZ8Si5aUrqScBDt'

    expect(parseIndySchemaId(`${did}/anoncreds/v0/SCHEMA/Medical%20Bill%2fClaims/1.0`).schemaName).toBe(
      'Medical Bill/Claims'
    )
    expect(parseIndyCredentialDefinitionId(`${did}/anoncreds/v0/CLAIM_DEF/10/SCH%20Employee%2fID`).tag).toBe(
      'SCH Employee/ID'
    )
    expect(
      parseIndyRevocationRegistryId(`${did}/anoncreds/v0/REV_REG_DEF/10/SCH%20Employee%2FID/REV%201`)
    ).toMatchObject({
      credentialDefinitionTag: 'SCH Employee/ID',
      revocationRegistryTag: 'REV 1',
    })
  })

  describe('indyVdrAnonCredsRegistryIdentifierRegex', () => {
    test('does not match against an unqualified did, schema id, credential definition id and revocation registry id', () => {
      const did = '7Tqg6BwSSWapxgUDm9KKgg'
      const schemaId = 'BQ42WeE24jFHeyGg8x9XAz:2:Medical Bill:1.0'
      const credentialDefinitionId = 'N7baRMcyvPwWc8v85CtZ6e:3:CL:100669:SCH Employee ID'
      const revocationRegistryId =
        'N7baRMcyvPwWc8v85CtZ6e:4:N7baRMcyvPwWc8v85CtZ6e:3:CL:100669:SCH Employee ID:CL_ACCUM:1-1024'

      const anotherId = 'some:id'

      expect(indyVdrAnonCredsRegistryIdentifierRegex.test(did)).toEqual(false)
      expect(indyVdrAnonCredsRegistryIdentifierRegex.test(schemaId)).toEqual(false)
      expect(indyVdrAnonCredsRegistryIdentifierRegex.test(credentialDefinitionId)).toEqual(false)
      expect(indyVdrAnonCredsRegistryIdentifierRegex.test(revocationRegistryId)).toEqual(false)
      expect(indyVdrAnonCredsRegistryIdentifierRegex.test(anotherId)).toEqual(false)
    })

    test('matches against a did indy did, schema id, credential definition id and revocation registry id', () => {
      const did = 'did:indy:local:7Tqg6BwSSWapxgUDm9KKgg'
      const schemaId = 'did:indy:local:BQ42WeE24jFHeyGg8x9XAz/anoncreds/v0/SCHEMA/Medical Bill/1.0'
      const credentialDefinitionId =
        'did:indy:local:N7baRMcyvPwWc8v85CtZ6e/anoncreds/v0/CLAIM_DEF/100669/SCH Employee ID'
      const revocationRegistryId =
        'did:indy:local:N7baRMcyvPwWc8v85CtZ6e/anoncreds/v0/REV_REG_DEF/100669/SCH Employee ID/1-1024'

      const anotherId = 'did:indy:local:N7baRMcyvPwWc8v85CtZ6e/anoncreds/v0/SOME_DEF'

      expect(indyVdrAnonCredsRegistryIdentifierRegex.test(did)).toEqual(true)
      expect(indyVdrAnonCredsRegistryIdentifierRegex.test(schemaId)).toEqual(true)
      expect(indyVdrAnonCredsRegistryIdentifierRegex.test(credentialDefinitionId)).toEqual(true)
      expect(indyVdrAnonCredsRegistryIdentifierRegex.test(revocationRegistryId)).toEqual(true)
      expect(indyVdrAnonCredsRegistryIdentifierRegex.test(anotherId)).toEqual(false)
    })
  })

  test('getDidIndySchemaId returns a valid schema id given a did, name, and version', () => {
    const namespace = 'sovrin:test'
    const did = '12345'
    const name = 'backbench'
    const version = '420'

    expect(getDidIndySchemaId(namespace, did, name, version)).toEqual(
      'did:indy:sovrin:test:12345/anoncreds/v0/SCHEMA/backbench/420'
    )
  })

  test('identifier formatters percent-encode only identifier components when enabled', () => {
    expect(getDidIndySchemaId('sovrin:test', '12345', 'Medical Bill/Claims', '1.0', true)).toBe(
      'did:indy:sovrin:test:12345/anoncreds/v0/SCHEMA/Medical%20Bill%2FClaims/1.0'
    )
    expect(getDidIndyCredentialDefinitionId('sovrin:test', '12345', 420, 'SCH Employee/ID', true)).toBe(
      'did:indy:sovrin:test:12345/anoncreds/v0/CLAIM_DEF/420/SCH%20Employee%2FID'
    )
    expect(
      getDidIndyRevocationRegistryDefinitionId('sovrin:test', '12345', 420, 'SCH Employee/ID', 'REV 1', true)
    ).toBe('did:indy:sovrin:test:12345/anoncreds/v0/REV_REG_DEF/420/SCH%20Employee%2FID/REV%201')
  })

  test('identifier variants are canonical and treat percent-encoding as case-insensitive', () => {
    const did = 'did:indy:pool:localtest:TL1EaPFCZ8Si5aUrqScBDt'
    const encoded = `${did}/anoncreds/v0/SCHEMA/Medical%20Bill%2FClaims/1.0`
    const lowerCaseEncoding = `${did}/anoncreds/v0/SCHEMA/Medical%20Bill%2fClaims/1.0`
    const unencoded = `${did}/anoncreds/v0/SCHEMA/Medical Bill/Claims/1.0`

    expect(getDidIndyIdentifierVariants(encoded)[0]).toBe(encoded)
    expect(getDidIndyIdentifierVariants(lowerCaseEncoding)[0]).toBe(encoded)
    expect(getDidIndyIdentifierVariants(unencoded)[0]).toBe(encoded)
    expect(getDidIndyIdentifierVariants('other:registry:id')).toEqual(['other:registry:id'])
  })

  test('preserves components with invalid percent-encoding', () => {
    const did = 'did:indy:pool:localtest:TL1EaPFCZ8Si5aUrqScBDt'

    expect(getDidIndyIdentifierVariants(`${did}/anoncreds/v0/SCHEMA/50% off/1.0`)).toEqual([
      `${did}/anoncreds/v0/SCHEMA/50%25%20off/1.0`,
      `${did}/anoncreds/v0/SCHEMA/50% off/1.0`,
    ])
  })

  test('returns canonical, original, and decoded variants for partially encoded components', () => {
    const did = 'did:indy:pool:localtest:TL1EaPFCZ8Si5aUrqScBDt'

    expect(getDidIndyIdentifierVariants(`${did}/anoncreds/v0/CLAIM_DEF/10/my%20big tag`)).toEqual([
      `${did}/anoncreds/v0/CLAIM_DEF/10/my%20big%20tag`,
      `${did}/anoncreds/v0/CLAIM_DEF/10/my%20big tag`,
      `${did}/anoncreds/v0/CLAIM_DEF/10/my big tag`,
    ])
  })

  test('getDidIndyCredentialDefinitionId returns a valid credential definition id given a did, seqNo, and tag', () => {
    const namespace = 'sovrin:test'
    const did = '12345'
    const seqNo = 420
    const tag = 'someTag'

    expect(getDidIndyCredentialDefinitionId(namespace, did, seqNo, tag)).toEqual(
      'did:indy:sovrin:test:12345/anoncreds/v0/CLAIM_DEF/420/someTag'
    )
  })

  test('getDidIndyRevocationRegistryId returns a valid credential definition id given a did, seqNo, and tag', () => {
    const namespace = 'sovrin:test'
    const did = '12345'
    const seqNo = 420
    const credentialDefinitionTag = 'someTag'
    const tag = 'anotherTag'

    expect(getDidIndyRevocationRegistryDefinitionId(namespace, did, seqNo, credentialDefinitionTag, tag)).toEqual(
      'did:indy:sovrin:test:12345/anoncreds/v0/REV_REG_DEF/420/someTag/anotherTag'
    )
  })

  test('getIndyLedgerSchemaId returns the ledger schema id given a did, name, and version', () => {
    expect(getIndyLedgerSchemaId('12345', 'backbench', '420')).toEqual('12345:2:backbench:420')
  })

  test('getIndyLedgerCredentialDefinitionId returns the ledger credential definition id given a did, seqNo, and tag', () => {
    expect(getIndyLedgerCredentialDefinitionId('12345', 420, 'someTag')).toEqual('12345:3:CL:420:someTag')
  })

  test('getIndyLedgerRevocationRegistryDefinitionId returns the ledger revocation registry id given a did, seqNo, and tags', () => {
    expect(getIndyLedgerRevocationRegistryDefinitionId('12345', 420, 'someTag', 'anotherTag')).toEqual(
      '12345:4:12345:3:CL:420:someTag:CL_ACCUM:anotherTag'
    )
  })
})
