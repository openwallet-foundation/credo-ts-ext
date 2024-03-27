import type {
  DidCreateFinishedResponse,
  DidResolveFailedResponse,
  DidResolveSuccessResponse,
} from './DidsControllerTypes'

export const didResolveSuccessResponseExample: DidResolveSuccessResponse = {
  didDocument: {
    '@context': [
      'https://w3id.org/did/v1',
      'https://w3id.org/security/suites/ed25519-2018/v1',
      'https://w3id.org/security/suites/x25519-2019/v1',
    ],
    id: 'did:key:z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL',
    alsoKnownAs: undefined,
    controller: undefined,
    verificationMethod: [
      {
        id: 'did:key:z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL#z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL',
        type: 'Ed25519VerificationKey2018',
        controller: 'did:key:z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL',
        publicKeyBase58: '6fioC1zcDPyPEL19pXRS2E4iJ46zH7xP6uSgAaPdwDrx',
      },
    ],
    authentication: [
      'did:key:z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL#z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL',
    ],
    assertionMethod: [
      'did:key:z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL#z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL',
    ],
    capabilityInvocation: [
      'did:key:z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL#z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL',
    ],
    capabilityDelegation: [
      'did:key:z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL#z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL',
    ],
    keyAgreement: [
      {
        id: 'did:key:z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL#z6LSrdqo4M24WRDJj1h2hXxgtDTyzjjKCiyapYVgrhwZAySn',
        type: 'X25519KeyAgreementKey2019',
        controller: 'did:key:z6Mkk7yqnGF3YwTrLpqrW6PGsKci7dNqh1CjnvMbzrMerSeL',
        publicKeyBase58: 'FxfdY3DCQxVZddKGAtSjZdFW9bCCW7oRwZn1NFJ2Tbg2',
      },
    ],
    service: undefined,
  },
  didDocumentMetadata: {},
  didResolutionMetadata: {
    contentType: 'application/did+ld+json',
  },
}

export const didResolveFailedResponseExample: DidResolveFailedResponse = {
  didDocument: null,
  didDocumentMetadata: {},
  didResolutionMetadata: {
    error: 'notFound',
    message: 'DID not found',
  },
}

export const didCreateFinishedResponseExample: DidCreateFinishedResponse = {
  didState: {
    did: 'did:key:z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc',
    state: 'finished',
    didDocument: {
      '@context': [
        'https://w3id.org/did/v1',
        'https://w3id.org/security/suites/ed25519-2018/v1',
        'https://w3id.org/security/suites/x25519-2019/v1',
      ],
      id: 'did:key:z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc',
      verificationMethod: [
        {
          id: 'did:key:z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc#z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc',
          type: 'Ed25519VerificationKey2018',
          controller: 'did:key:z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc',
          publicKeyBase58: 'ApexJxnhZHC6Ctq4fCoNHKYgu87HuRTZ7oSyfehG57zE',
        },
      ],
      authentication: [
        'did:key:z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc#z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc',
      ],
      assertionMethod: [
        'did:key:z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc#z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc',
      ],
      keyAgreement: [
        {
          id: 'did:key:z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc#z6LSm5B4fB9NA55xB7PSeMYTMS9sf8uboJvyZBaDLLSZ7Ryd',
          type: 'X25519KeyAgreementKey2019',
          controller: 'did:key:z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc',
          publicKeyBase58: 'APzu8sLW4cND5j1g7i2W2qwPozNV6hkpgCrXqso2Q4Cs',
        },
      ],
      capabilityInvocation: [
        'did:key:z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc#z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc',
      ],
      capabilityDelegation: [
        'did:key:z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc#z6MkpGuzuD38tpgZKPfmLmmD8R6gihP9KJhuopMuVvfGzLmc',
      ],
    },
  },

  didDocumentMetadata: {},
  didRegistrationMetadata: {},
}
