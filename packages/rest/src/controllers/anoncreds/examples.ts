import type {
  GetCredentialDefinitionReturn,
  GetSchemaReturn,
  RegisterCredentialDefinitionReturn,
  RegisterSchemaReturn,
} from '@credo-ts/anoncreds'

export const anonCredsGetSchemaExample: GetSchemaReturn = {
  resolutionMetadata: {},
  schemaMetadata: {},
  schemaId: 'did:indy:bcovrin:test:WgWxqztrNooG92RXvxSTWv/anoncreds/v0/SCHEMA/schema-name/1.0',
  schema: {
    issuerId: 'did:indy:bcovrin:test:WgWxqztrNooG92RXvxSTWv',
    name: 'schema-name',
    version: '1.0',
    attrNames: ['string'],
  },
}

export const anonCredsRegisterSchemaExample: RegisterSchemaReturn = {
  registrationMetadata: {},
  schemaMetadata: {},
  schemaState: {
    state: 'finished',
    schemaId: 'did:indy:bcovrin:test:WgWxqztrNooG92RXvxSTWv/anoncreds/v0/SCHEMA/schema-name/1.0',
    schema: {
      issuerId: 'did:indy:bcovrin:test:WgWxqztrNooG92RXvxSTWv',
      name: 'schema-name',
      version: '1.0',
      attrNames: ['string'],
    },
  },
}

export const anonCredsRegisterCredentialDefinitionExample: RegisterCredentialDefinitionReturn = {
  credentialDefinitionState: {
    state: 'finished',
    credentialDefinitionId: 'did:indy:bcovrin:test:WgWxqztrNooG92RXvxSTWv/anoncreds/v0/CLAIM_DEF/20/definition',
    credentialDefinition: {
      issuerId: 'did:indy:bcovrin:test:WgWxqztrNooG92RXvxSTWv',
      schemaId: 'did:indy:bcovrin:test:WgWxqztrNooG92RXvxSTWv/anoncreds/v0/SCHEMA/schema-name/1.0',
      type: 'CL',
      tag: 'definition',
      value: {
        primary: {
          n: 'string',
          s: 'string',
          r: {
            master_secret: 'string',
            string: 'string',
          },
          rctxt: 'string',
          z: 'string',
        },
        revocation: {
          g: '1 string',
          g_dash: 'string',
          h: 'string',
          h0: 'string',
          h1: 'string',
          h2: 'string',
          htilde: 'string',
          h_cap: 'string',
          u: 'string',
          pk: 'string',
          y: 'string',
        },
      },
    },
  },
  credentialDefinitionMetadata: {},
  registrationMetadata: {},
}

export const anonCredsGetCredentialDefinitionExample: GetCredentialDefinitionReturn = {
  credentialDefinitionId: 'did:indy:bcovrin:test:WgWxqztrNooG92RXvxSTWv/anoncreds/v0/CLAIM_DEF/20/definition',
  credentialDefinition: {
    issuerId: 'did:indy:bcovrin:test:WgWxqztrNooG92RXvxSTWv',
    schemaId: 'did:indy:bcovrin:test:WgWxqztrNooG92RXvxSTWv/anoncreds/v0/SCHEMA/schema-name/1.0',
    type: 'CL',
    tag: 'definition',
    value: {
      primary: {
        n: 'string',
        s: 'string',
        r: {
          master_secret: 'string',
          string: 'string',
        },
        rctxt: 'string',
        z: 'string',
      },
      revocation: {
        g: '1 string',
        g_dash: 'string',
        h: 'string',
        h0: 'string',
        h1: 'string',
        h2: 'string',
        htilde: 'string',
        h_cap: 'string',
        u: 'string',
        pk: 'string',
        y: 'string',
      },
    },
  },
  credentialDefinitionMetadata: {},
  resolutionMetadata: {},
}
