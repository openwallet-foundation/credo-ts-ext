import type {
  AnonCredsGetCredentialDefinitionFailedResponse,
  AnonCredsGetCredentialDefinitionSuccessResponse,
  AnonCredsGetSchemaFailedResponse,
  AnonCredsGetSchemaSuccessResponse,
  AnonCredsRegisterCredentialDefinitionFailedResponse,
  AnonCredsRegisterCredentialDefinitionSuccessResponse,
  AnonCredsRegisterSchemaFailedResponse,
  AnonCredsRegisterSchemaSuccessResponse,
} from './AnonCredsControllerTypes'

export const anonCredsGetSchemaSuccessExample: AnonCredsGetSchemaSuccessResponse = {
  resolutionMetadata: {},
  schemaMetadata: {},
  schemaId: 'did:indy:bcovrin:test:WgWxqztrNooG92RXvxSTWv/anoncreds/v0/SCHEMA/schema-name/1.0',
  schema: {
    issuerId: 'did:indy:bcovrin:test:WgWxqztrNooG92RXvxSTWv',
    name: 'schema-name',
    version: '1.0',
    attrNames: ['age'],
  },
}

export const anonCredsGetSchemaFailedExample: AnonCredsGetSchemaFailedResponse = {
  resolutionMetadata: {
    error: 'notFound',
    message: 'Schema not found',
  },
  schemaMetadata: {},
  schemaId: 'did:indy:bcovrin:test:WgWxqztrNooG92RXvxSTWv/anoncreds/v0/SCHEMA/schema-name/1.0',
}

export const anonCredsRegisterSchemaSuccessExample: AnonCredsRegisterSchemaSuccessResponse = {
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

export const anonCredsRegisterSchemaFailedExample: AnonCredsRegisterSchemaFailedResponse = {
  registrationMetadata: {},
  schemaMetadata: {},
  schemaState: {
    state: 'failed',
    reason: 'Unknown error occurred while registering schema',
    schemaId: 'did:indy:bcovrin:test:WgWxqztrNooG92RXvxSTWv/anoncreds/v0/SCHEMA/schema-name/1.0',
  },
}

export const anonCredsGetCredentialDefinitionSuccessExample: AnonCredsGetCredentialDefinitionSuccessResponse = {
  resolutionMetadata: {},
  credentialDefinitionMetadata: {},
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
}

export const anonCredsGetCredentialDefinitionFailedExample: AnonCredsGetCredentialDefinitionFailedResponse = {
  resolutionMetadata: {
    error: 'notFound',
    message: 'CredentialDefinition not found',
  },
  credentialDefinitionMetadata: {},
  credentialDefinitionId: 'did:indy:bcovrin:test:WgWxqztrNooG92RXvxSTWv/anoncreds/v0/CLAIM_DEF/20/definition',
}

export const anonCredsRegisterCredentialDefinitionSuccessExample: AnonCredsRegisterCredentialDefinitionSuccessResponse =
  {
    registrationMetadata: {},
    credentialDefinitionMetadata: {},
    credentialDefinitionState: {
      state: 'finished',
      credentialDefinitionId:
        'did:indy:bcovrin:test:WgWxqztrNooG92RXvxSTWv/anoncreds/v0/SCHEMA/credentialDefinition-name/1.0',
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
  }

export const anonCredsRegisterCredentialDefinitionFailedExample: AnonCredsRegisterCredentialDefinitionFailedResponse = {
  registrationMetadata: {},
  credentialDefinitionMetadata: {},
  credentialDefinitionState: {
    state: 'failed',
    reason: 'Unknown error occurred while registering credentialDefinition',
    credentialDefinitionId:
      'did:indy:bcovrin:test:WgWxqztrNooG92RXvxSTWv/anoncreds/v0/SCHEMA/credentialDefinition-name/1.0',
  },
}
