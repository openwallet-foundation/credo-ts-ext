/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TenantsController } from './../controllers/tenants/TenantsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OpenId4VcVerifiersController } from './../controllers/openid4vc/verifiers/OpenId4VcVerifiersController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OpenId4VcVerificationSessionsController } from './../controllers/openid4vc/verification-sessions/OpenId4VcVerificationSessionsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OpenId4VcIssuersController } from './../controllers/openid4vc/issuers/OpenId4VcIssuersController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OpenId4VcIssuanceSessionsController } from './../controllers/openid4vc/issuance-sessions/OpenId4VcIssuanceSessionsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProofsController } from './../controllers/didcomm/proofs/ProofsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OutOfBandController } from './../controllers/didcomm/out-of-band/OutOfBandController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CredentialsController } from './../controllers/didcomm/credentials/CredentialsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ConnectionsController } from './../controllers/didcomm/connections/ConnectionsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DidCommBasicMessagesController } from './../controllers/didcomm/basic-messages/BasicMessagesController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DidController } from './../controllers/did/DidsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AnonCredsController } from './../controllers/anoncreds/AnonCredsController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AgentController } from './../controllers/agent/AgentController';
import { expressAuthentication } from './../tenantMiddleware';
// @ts-ignore - no great way to install types from subpackage
import { iocContainer } from './../utils/tsyringeTsoaIocContainer';
import type { IocContainer, IocContainerFactory } from '@tsoa/runtime';
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Pick_TenantConfig.Exclude_keyofTenantConfig.walletConfig__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"label":{"dataType":"string","required":true},"connectionImageUrl":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_TenantConfig.walletConfig_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_TenantConfig.Exclude_keyofTenantConfig.walletConfig__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TenantApiConfig": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_TenantConfig.walletConfig_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RecordId": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TenantRecord": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"RecordId","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime"},
            "type": {"dataType":"string","required":true},
            "storageVersion": {"dataType":"string","required":true},
            "config": {"ref":"TenantApiConfig","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TenantsCreateOptions": {
        "dataType": "refObject",
        "properties": {
            "config": {"dataType":"nestedObjectLiteral","nestedProperties":{"connectionImageUrl":{"dataType":"string"},"label":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TenantsUpdateOptions": {
        "dataType": "refObject",
        "properties": {
            "config": {"dataType":"nestedObjectLiteral","nestedProperties":{"connectionImageUrl":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}]},"label":{"dataType":"string"}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PublicVerifierId": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VcVerifierRecord": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"RecordId","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime"},
            "type": {"dataType":"string","required":true},
            "publicVerifierId": {"ref":"PublicVerifierId","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VcVerifiersCreateOptions": {
        "dataType": "refObject",
        "properties": {
            "publicVerifierId": {"ref":"PublicVerifierId"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VcVerificationSessionState": {
        "dataType": "refEnum",
        "enums": ["RequestCreated","RequestUriRetrieved","ResponseVerified","Error"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICredentialContext": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "did": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_string.any_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AdditionalClaims": {
        "dataType": "refAlias",
        "type": {"ref":"Record_string.any_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICredentialContextType": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"intersection","subSchemas":[{"ref":"ICredentialContext"},{"ref":"AdditionalClaims"}]},{"dataType":"string"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICredentialSchema": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "type": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICredentialSchemaType": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"ICredentialSchema"},{"dataType":"string"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IIssuerId": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IIssuer": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
        },
        "additionalProperties": {"dataType":"any"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICredentialSubject": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICredentialStatus": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "type": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ICredential": {
        "dataType": "refObject",
        "properties": {
            "@context": {"dataType":"union","subSchemas":[{"ref":"ICredentialContextType"},{"dataType":"array","array":{"dataType":"refAlias","ref":"ICredentialContextType"}}],"required":true},
            "type": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "credentialSchema": {"dataType":"union","subSchemas":[{"dataType":"undefined"},{"ref":"ICredentialSchemaType"},{"dataType":"array","array":{"dataType":"refAlias","ref":"ICredentialSchemaType"}}]},
            "issuer": {"dataType":"union","subSchemas":[{"ref":"IIssuerId"},{"ref":"IIssuer"}],"required":true},
            "issuanceDate": {"dataType":"string","required":true},
            "credentialSubject": {"dataType":"union","subSchemas":[{"dataType":"intersection","subSchemas":[{"ref":"ICredentialSubject"},{"ref":"AdditionalClaims"}]},{"dataType":"array","array":{"dataType":"intersection","subSchemas":[{"ref":"ICredentialSubject"},{"ref":"AdditionalClaims"}]}}],"required":true},
            "expirationDate": {"dataType":"string"},
            "id": {"dataType":"string"},
            "credentialStatus": {"ref":"ICredentialStatus"},
            "description": {"dataType":"string"},
            "name": {"dataType":"string"},
        },
        "additionalProperties": {"dataType":"any"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProofType": {
        "dataType": "refEnum",
        "enums": ["Ed25519Signature2018","Ed25519Signature2020","EcdsaSecp256k1Signature2019","EcdsaSecp256k1RecoverySignature2020","JsonWebSignature2020","RsaSignature2018","GpgSignature2020","JcsEd25519Signature2020","BbsBlsSignatureProof2020","BbsBlsBoundSignatureProof2020","JwtProof2020"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProofPurpose": {
        "dataType": "refEnum",
        "enums": ["verificationMethod","assertionMethod","authentication","keyAgreement","contactAgreement","capabilityInvocation","capabilityDelegation"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IProof": {
        "dataType": "refObject",
        "properties": {
            "type": {"dataType":"union","subSchemas":[{"ref":"IProofType"},{"dataType":"string"}],"required":true},
            "created": {"dataType":"string","required":true},
            "proofPurpose": {"dataType":"union","subSchemas":[{"ref":"IProofPurpose"},{"dataType":"string"}],"required":true},
            "verificationMethod": {"dataType":"string","required":true},
            "challenge": {"dataType":"string"},
            "domain": {"dataType":"string"},
            "proofValue": {"dataType":"string"},
            "jws": {"dataType":"string"},
            "jwt": {"dataType":"string"},
            "nonce": {"dataType":"string"},
            "requiredRevealStatements": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": {"dataType":"any"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IHasProof": {
        "dataType": "refObject",
        "properties": {
            "proof": {"dataType":"union","subSchemas":[{"ref":"IProof"},{"dataType":"array","array":{"dataType":"refObject","ref":"IProof"}}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IVerifiableCredential": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"ICredential"},{"ref":"IHasProof"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CompactJWT": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "W3CVerifiableCredential": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"IVerifiableCredential"},{"ref":"CompactJWT"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Descriptor": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "path": {"dataType":"string","required":true},
            "path_nested": {"ref":"Descriptor"},
            "format": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PresentationSubmission": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "definition_id": {"dataType":"string","required":true},
            "descriptor_map": {"dataType":"array","array":{"dataType":"refObject","ref":"Descriptor"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IPresentation": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "@context": {"dataType":"union","subSchemas":[{"ref":"ICredentialContextType"},{"dataType":"array","array":{"dataType":"refAlias","ref":"ICredentialContextType"}}],"required":true},
            "type": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"array","array":{"dataType":"string"}}]},
            "verifiableCredential": {"dataType":"array","array":{"dataType":"refAlias","ref":"W3CVerifiableCredential"}},
            "presentation_submission": {"ref":"PresentationSubmission"},
            "holder": {"dataType":"string"},
            "verifier": {"dataType":"string"},
        },
        "additionalProperties": {"dataType":"any"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IVerifiablePresentation": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"IPresentation"},{"ref":"IHasProof"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "W3CVerifiablePresentation": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"IVerifiablePresentation"},{"ref":"CompactJWT"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CompactSdJwtVc": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AuthorizationResponsePayload": {
        "dataType": "refObject",
        "properties": {
            "access_token": {"dataType":"string"},
            "token_type": {"dataType":"string"},
            "refresh_token": {"dataType":"string"},
            "expires_in": {"dataType":"double"},
            "state": {"dataType":"string"},
            "id_token": {"dataType":"string"},
            "vp_token": {"dataType":"union","subSchemas":[{"dataType":"array","array":{"dataType":"union","subSchemas":[{"ref":"W3CVerifiablePresentation"},{"ref":"CompactSdJwtVc"}]}},{"ref":"W3CVerifiablePresentation"},{"ref":"CompactSdJwtVc"}]},
            "presentation_submission": {"ref":"PresentationSubmission"},
            "verifiedData": {"dataType":"union","subSchemas":[{"ref":"IPresentation"},{"ref":"AdditionalClaims"}]},
        },
        "additionalProperties": {"dataType":"any"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VcSiopAuthorizationResponsePayload": {
        "dataType": "refAlias",
        "type": {"ref":"AuthorizationResponsePayload","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VcVerificationSessionRecord": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"RecordId","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime"},
            "type": {"dataType":"string","required":true},
            "publicVerifierId": {"ref":"PublicVerifierId","required":true},
            "state": {"ref":"OpenId4VcVerificationSessionState","required":true},
            "errorMessage": {"dataType":"string"},
            "authorizationRequestJwt": {"dataType":"string","required":true},
            "authorizationRequestUri": {"dataType":"string","required":true},
            "authorizationResponsePayload": {"ref":"OpenId4VcSiopAuthorizationResponsePayload"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VcVerificationSessionsCreateRequestResponse": {
        "dataType": "refObject",
        "properties": {
            "verificationSession": {"ref":"OpenId4VcVerificationSessionRecord","required":true},
            "authorizationRequest": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VcJwtIssuerDid": {
        "dataType": "refObject",
        "properties": {
            "method": {"dataType":"enum","enums":["did"],"required":true},
            "didUrl": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VcJwtIssuer": {
        "dataType": "refAlias",
        "type": {"ref":"OpenId4VcJwtIssuerDid","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JwtObject": {
        "dataType": "refObject",
        "properties": {
            "alg": {"dataType":"array","array":{"dataType":"string"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LdpObject": {
        "dataType": "refObject",
        "properties": {
            "proof_type": {"dataType":"array","array":{"dataType":"string"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DiObject": {
        "dataType": "refObject",
        "properties": {
            "proof_type": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "cryptosuite": {"dataType":"array","array":{"dataType":"string"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SdJwtObject": {
        "dataType": "refObject",
        "properties": {
            "undefined": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Format": {
        "dataType": "refObject",
        "properties": {
            "jwt": {"ref":"JwtObject"},
            "jwt_vc": {"ref":"JwtObject"},
            "jwt_vc_json": {"ref":"JwtObject"},
            "jwt_vp": {"ref":"JwtObject"},
            "jwt_vp_json": {"ref":"JwtObject"},
            "ldp": {"ref":"LdpObject"},
            "ldp_vc": {"ref":"LdpObject"},
            "ldp_vp": {"ref":"LdpObject"},
            "di": {"ref":"DiObject"},
            "di_vc": {"ref":"DiObject"},
            "di_vp": {"ref":"DiObject"},
            "undefined": {"ref":"SdJwtObject"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Rules": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["all"]},{"dataType":"enum","enums":["pick"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SubmissionRequirement": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "purpose": {"dataType":"string"},
            "rule": {"ref":"Rules","required":true},
            "count": {"dataType":"double"},
            "min": {"dataType":"double"},
            "max": {"dataType":"double"},
            "from": {"dataType":"string"},
            "from_nested": {"dataType":"array","array":{"dataType":"refObject","ref":"SubmissionRequirement"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Issuance": {
        "dataType": "refObject",
        "properties": {
            "manifest": {"dataType":"string"},
        },
        "additionalProperties": {"dataType":"union","subSchemas":[{"dataType":"any"},{"dataType":"any"}]},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Optionality": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["required"]},{"dataType":"enum","enums":["preferred"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Directives": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["required"]},{"dataType":"enum","enums":["allowed"]},{"dataType":"enum","enums":["disallowed"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PdStatus": {
        "dataType": "refObject",
        "properties": {
            "directive": {"ref":"Directives"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Statuses": {
        "dataType": "refObject",
        "properties": {
            "active": {"ref":"PdStatus"},
            "suspended": {"ref":"PdStatus"},
            "revoked": {"ref":"PdStatus"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OneOfNumberString": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"double"},{"dataType":"string"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FilterV2Base": {
        "dataType": "refObject",
        "properties": {
            "const": {"ref":"OneOfNumberString"},
            "enum": {"dataType":"array","array":{"dataType":"refAlias","ref":"OneOfNumberString"}},
            "exclusiveMinimum": {"ref":"OneOfNumberString"},
            "exclusiveMaximum": {"ref":"OneOfNumberString"},
            "format": {"dataType":"string"},
            "formatMaximum": {"dataType":"string"},
            "formatMinimum": {"dataType":"string"},
            "formatExclusiveMaximum": {"dataType":"string"},
            "formatExclusiveMinimum": {"dataType":"string"},
            "minLength": {"dataType":"double"},
            "maxLength": {"dataType":"double"},
            "minimum": {"ref":"OneOfNumberString"},
            "maximum": {"ref":"OneOfNumberString"},
            "not": {"dataType":"object"},
            "pattern": {"dataType":"string"},
            "type": {"dataType":"string"},
            "contains": {"ref":"FilterV2Base"},
            "items": {"ref":"FilterV2BaseItems"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FilterV2BaseItems": {
        "dataType": "refObject",
        "properties": {
            "const": {"ref":"OneOfNumberString"},
            "enum": {"dataType":"array","array":{"dataType":"refAlias","ref":"OneOfNumberString"}},
            "exclusiveMinimum": {"ref":"OneOfNumberString"},
            "exclusiveMaximum": {"ref":"OneOfNumberString"},
            "format": {"dataType":"string"},
            "formatMaximum": {"dataType":"string"},
            "formatMinimum": {"dataType":"string"},
            "formatExclusiveMaximum": {"dataType":"string"},
            "formatExclusiveMinimum": {"dataType":"string"},
            "minLength": {"dataType":"double"},
            "maxLength": {"dataType":"double"},
            "minimum": {"ref":"OneOfNumberString"},
            "maximum": {"ref":"OneOfNumberString"},
            "not": {"dataType":"object"},
            "pattern": {"dataType":"string"},
            "type": {"dataType":"string","required":true},
            "contains": {"ref":"FilterV2Base"},
            "items": {"ref":"FilterV2BaseItems"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FilterV2": {
        "dataType": "refObject",
        "properties": {
            "const": {"ref":"OneOfNumberString"},
            "enum": {"dataType":"array","array":{"dataType":"refAlias","ref":"OneOfNumberString"}},
            "exclusiveMinimum": {"ref":"OneOfNumberString"},
            "exclusiveMaximum": {"ref":"OneOfNumberString"},
            "format": {"dataType":"string"},
            "formatMaximum": {"dataType":"string"},
            "formatMinimum": {"dataType":"string"},
            "formatExclusiveMaximum": {"dataType":"string"},
            "formatExclusiveMinimum": {"dataType":"string"},
            "minLength": {"dataType":"double"},
            "maxLength": {"dataType":"double"},
            "minimum": {"ref":"OneOfNumberString"},
            "maximum": {"ref":"OneOfNumberString"},
            "not": {"dataType":"object"},
            "pattern": {"dataType":"string"},
            "type": {"dataType":"string","required":true},
            "contains": {"ref":"FilterV2Base"},
            "items": {"ref":"FilterV2BaseItems"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FieldV2": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "path": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "purpose": {"dataType":"string"},
            "filter": {"ref":"FilterV2"},
            "predicate": {"ref":"Optionality"},
            "name": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "HolderSubject": {
        "dataType": "refObject",
        "properties": {
            "field_id": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "directive": {"ref":"Optionality","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ConstraintsV2": {
        "dataType": "refObject",
        "properties": {
            "limit_disclosure": {"ref":"Optionality"},
            "statuses": {"ref":"Statuses"},
            "fields": {"dataType":"array","array":{"dataType":"refObject","ref":"FieldV2"}},
            "subject_is_issuer": {"ref":"Optionality"},
            "is_holder": {"dataType":"array","array":{"dataType":"refObject","ref":"HolderSubject"}},
            "same_subject": {"dataType":"array","array":{"dataType":"refObject","ref":"HolderSubject"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InputDescriptorV2": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string"},
            "purpose": {"dataType":"string"},
            "format": {"ref":"Format"},
            "group": {"dataType":"array","array":{"dataType":"string"}},
            "issuance": {"dataType":"array","array":{"dataType":"refObject","ref":"Issuance"}},
            "constraints": {"ref":"ConstraintsV2","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PresentationDefinitionV2": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string"},
            "purpose": {"dataType":"string"},
            "format": {"ref":"Format"},
            "submission_requirements": {"dataType":"array","array":{"dataType":"refObject","ref":"SubmissionRequirement"}},
            "input_descriptors": {"dataType":"array","array":{"dataType":"refObject","ref":"InputDescriptorV2"},"required":true},
            "frame": {"dataType":"object"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DifPresentationExchangeDefinitionV2": {
        "dataType": "refAlias",
        "type": {"ref":"PresentationDefinitionV2","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VcVerificationSessionsCreateRequestOptions": {
        "dataType": "refObject",
        "properties": {
            "requestSigner": {"ref":"OpenId4VcJwtIssuer","required":true},
            "presentationExchange": {"dataType":"nestedObjectLiteral","nestedProperties":{"definition":{"ref":"DifPresentationExchangeDefinitionV2","required":true}}},
            "publicVerifierId": {"ref":"PublicVerifierId","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResponseIss.SELF_ISSUED_V2": {
        "dataType": "refEnum",
        "enums": ["https://self-issued.me/v2"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IDTokenPayload": {
        "dataType": "refObject",
        "properties": {
            "iss": {"dataType":"union","subSchemas":[{"ref":"ResponseIss.SELF_ISSUED_V2"},{"dataType":"string"}]},
            "sub": {"dataType":"string"},
            "aud": {"dataType":"string"},
            "iat": {"dataType":"double"},
            "nbf": {"dataType":"double"},
            "type": {"dataType":"string"},
            "exp": {"dataType":"double"},
            "rexp": {"dataType":"double"},
            "jti": {"dataType":"string"},
            "auth_time": {"dataType":"double"},
            "nonce": {"dataType":"string"},
            "_vp_token": {"dataType":"nestedObjectLiteral","nestedProperties":{"presentation_submission":{"ref":"PresentationSubmission","required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VcSiopIdTokenPayload": {
        "dataType": "refAlias",
        "type": {"ref":"IDTokenPayload","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Schema": {
        "dataType": "refObject",
        "properties": {
            "uri": {"dataType":"string","required":true},
            "required": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FilterV1": {
        "dataType": "refObject",
        "properties": {
            "const": {"ref":"OneOfNumberString"},
            "enum": {"dataType":"array","array":{"dataType":"refAlias","ref":"OneOfNumberString"}},
            "exclusiveMinimum": {"ref":"OneOfNumberString"},
            "exclusiveMaximum": {"ref":"OneOfNumberString"},
            "format": {"dataType":"string"},
            "minLength": {"dataType":"double"},
            "maxLength": {"dataType":"double"},
            "minimum": {"ref":"OneOfNumberString"},
            "maximum": {"ref":"OneOfNumberString"},
            "not": {"dataType":"object"},
            "pattern": {"dataType":"string"},
            "type": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FieldV1": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string"},
            "path": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "purpose": {"dataType":"string"},
            "filter": {"ref":"FilterV1"},
            "predicate": {"ref":"Optionality"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ConstraintsV1": {
        "dataType": "refObject",
        "properties": {
            "limit_disclosure": {"ref":"Optionality"},
            "statuses": {"ref":"Statuses"},
            "fields": {"dataType":"array","array":{"dataType":"refObject","ref":"FieldV1"}},
            "subject_is_issuer": {"ref":"Optionality"},
            "is_holder": {"dataType":"array","array":{"dataType":"refObject","ref":"HolderSubject"}},
            "same_subject": {"dataType":"array","array":{"dataType":"refObject","ref":"HolderSubject"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "InputDescriptorV1": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string"},
            "purpose": {"dataType":"string"},
            "group": {"dataType":"array","array":{"dataType":"string"}},
            "schema": {"dataType":"array","array":{"dataType":"refObject","ref":"Schema"},"required":true},
            "issuance": {"dataType":"array","array":{"dataType":"refObject","ref":"Issuance"}},
            "constraints": {"ref":"ConstraintsV1"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PresentationDefinitionV1": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "name": {"dataType":"string"},
            "purpose": {"dataType":"string"},
            "format": {"ref":"Format"},
            "submission_requirements": {"dataType":"array","array":{"dataType":"refObject","ref":"SubmissionRequirement"}},
            "input_descriptors": {"dataType":"array","array":{"dataType":"refObject","ref":"InputDescriptorV1"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DifPresentationExchangeDefinition": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"PresentationDefinitionV1"},{"ref":"PresentationDefinitionV2"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ClaimFormat.SdJwtVc": {
        "dataType": "refEnum",
        "enums": ["vc+sd-jwt"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JwtPayloadJson": {
        "dataType": "refObject",
        "properties": {
            "iss": {"dataType":"string"},
            "sub": {"dataType":"string"},
            "aud": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"array","array":{"dataType":"string"}}]},
            "exp": {"dataType":"double"},
            "nbf": {"dataType":"double"},
            "iat": {"dataType":"double"},
            "jti": {"dataType":"string"},
        },
        "additionalProperties": {"dataType":"any"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JwkJson": {
        "dataType": "refObject",
        "properties": {
            "kty": {"dataType":"string","required":true},
            "use": {"dataType":"string"},
        },
        "additionalProperties": {"dataType":"any"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JwtHeader": {
        "dataType": "refObject",
        "properties": {
            "alg": {"dataType":"string","required":true},
            "kid": {"dataType":"string"},
            "jwk": {"ref":"JwkJson"},
        },
        "additionalProperties": {"dataType":"any"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ClaimFormat.JwtVp": {
        "dataType": "refEnum",
        "enums": ["jwt_vp"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JsonObject": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": {"ref":"JsonValue"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JsonValue": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"},{"dataType":"boolean"},{"dataType":"enum","enums":[null]},{"ref":"JsonObject"},{"ref":"JsonArray"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JsonArray": {
        "dataType": "refAlias",
        "type": {"dataType":"array","array":{"dataType":"refAlias","ref":"JsonValue"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SingleOrArray_JsonObject_": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"JsonObject"},{"dataType":"array","array":{"dataType":"refObject","ref":"JsonObject"}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "W3cJsonCredential": {
        "dataType": "refObject",
        "properties": {
            "@context": {"dataType":"array","array":{"dataType":"union","subSchemas":[{"dataType":"string"},{"ref":"JsonObject"}]},"required":true},
            "id": {"dataType":"string"},
            "type": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "issuer": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string"}}}],"required":true},
            "issuanceDate": {"dataType":"string","required":true},
            "expirationDate": {"dataType":"string"},
            "credentialSubject": {"ref":"SingleOrArray_JsonObject_","required":true},
        },
        "additionalProperties": {"dataType":"any"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "W3cJsonPresentation": {
        "dataType": "refObject",
        "properties": {
            "@context": {"dataType":"array","array":{"dataType":"union","subSchemas":[{"dataType":"string"},{"ref":"JsonObject"}]},"required":true},
            "id": {"dataType":"string"},
            "type": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "holder": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string"}}}],"required":true},
            "verifiableCredential": {"dataType":"array","array":{"dataType":"union","subSchemas":[{"ref":"W3cJsonCredential"},{"dataType":"string"}]},"required":true},
        },
        "additionalProperties": {"dataType":"any"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ClaimFormat.LdpVp": {
        "dataType": "refEnum",
        "enums": ["ldp_vp"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VcVerificationSessionsGetVerifiedAuthorizationResponseResponse": {
        "dataType": "refObject",
        "properties": {
            "idToken": {"dataType":"nestedObjectLiteral","nestedProperties":{"payload":{"ref":"OpenId4VcSiopIdTokenPayload","required":true}}},
            "presentationExchange": {"dataType":"nestedObjectLiteral","nestedProperties":{"presentations":{"dataType":"array","array":{"dataType":"union","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{"header":{"ref":"JwtHeader","required":true},"signedPayload":{"ref":"JwtPayloadJson","required":true},"vcPayload":{"ref":"JwtPayloadJson","required":true},"encoded":{"dataType":"string","required":true},"format":{"ref":"ClaimFormat.SdJwtVc","required":true}}},{"dataType":"nestedObjectLiteral","nestedProperties":{"header":{"ref":"JwtHeader","required":true},"signedPayload":{"ref":"JwtPayloadJson","required":true},"vcPayload":{"ref":"W3cJsonPresentation","required":true},"encoded":{"dataType":"string","required":true},"format":{"ref":"ClaimFormat.JwtVp","required":true}}},{"dataType":"nestedObjectLiteral","nestedProperties":{"vcPayload":{"ref":"W3cJsonPresentation","required":true},"encoded":{"ref":"W3cJsonPresentation","required":true},"format":{"ref":"ClaimFormat.LdpVp","required":true}}}]},"required":true},"definition":{"ref":"DifPresentationExchangeDefinition","required":true},"submission":{"ref":"PresentationSubmission","required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PublicIssuerId": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialSupportedBrief": {
        "dataType": "refObject",
        "properties": {
            "cryptographic_binding_methods_supported": {"dataType":"array","array":{"dataType":"string"}},
            "cryptographic_suites_supported": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OID4VCICredentialFormat": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["jwt_vc_json"]},{"dataType":"enum","enums":["jwt_vc_json-ld"]},{"dataType":"enum","enums":["ldp_vc"]},{"dataType":"enum","enums":["vc+sd-jwt"]},{"dataType":"enum","enums":["jwt_vc"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "NameAndLocale": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "locale": {"dataType":"string"},
        },
        "additionalProperties": {"dataType":"any"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ImageInfo": {
        "dataType": "refObject",
        "properties": {
            "url": {"dataType":"string"},
            "alt_text": {"dataType":"string"},
        },
        "additionalProperties": {"dataType":"any"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LogoAndColor": {
        "dataType": "refObject",
        "properties": {
            "logo": {"ref":"ImageInfo"},
            "description": {"dataType":"string"},
            "background_color": {"dataType":"string"},
            "text_color": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialsSupportedDisplay": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"NameAndLocale"},{"ref":"LogoAndColor"},{"dataType":"nestedObjectLiteral","nestedProperties":{"background_image":{"ref":"ImageInfo"},"name":{"dataType":"string","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonCredentialSupported": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"CredentialSupportedBrief"},{"dataType":"nestedObjectLiteral","nestedProperties":{"display":{"dataType":"array","array":{"dataType":"refAlias","ref":"CredentialsSupportedDisplay"}},"id":{"dataType":"string"},"format":{"dataType":"union","subSchemas":[{"ref":"OID4VCICredentialFormat"},{"dataType":"string"}],"required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialSubjectDisplay": {
        "dataType": "refObject",
        "properties": {
            "mandatory": {"dataType":"boolean"},
            "value_type": {"dataType":"string"},
            "display": {"dataType":"array","array":{"dataType":"refObject","ref":"NameAndLocale"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IssuerCredentialSubjectDisplay": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"CredentialSubjectDisplay"},{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"ref":"CredentialSubjectDisplay"}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IssuerCredentialSubject": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": {"ref":"IssuerCredentialSubjectDisplay"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialSupportedJwtVcJson": {
        "dataType": "refObject",
        "properties": {
            "types": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "credentialSubject": {"ref":"IssuerCredentialSubject"},
            "order": {"dataType":"array","array":{"dataType":"string"}},
            "format": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["jwt_vc_json"]},{"dataType":"enum","enums":["jwt_vc"]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialSupportedJwtVcJsonLdAndLdpVc": {
        "dataType": "refObject",
        "properties": {
            "types": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "@context": {"dataType":"array","array":{"dataType":"refAlias","ref":"ICredentialContextType"},"required":true},
            "credentialSubject": {"ref":"IssuerCredentialSubject"},
            "order": {"dataType":"array","array":{"dataType":"string"}},
            "format": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["ldp_vc"]},{"dataType":"enum","enums":["jwt_vc_json-ld"]}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialSupportedSdJwtVc": {
        "dataType": "refObject",
        "properties": {
            "format": {"dataType":"enum","enums":["vc+sd-jwt"],"required":true},
            "vct": {"dataType":"string","required":true},
            "claims": {"ref":"IssuerCredentialSubject"},
            "order": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialSupported": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"CommonCredentialSupported"},{"dataType":"union","subSchemas":[{"ref":"CredentialSupportedJwtVcJson"},{"ref":"CredentialSupportedJwtVcJsonLdAndLdpVc"},{"ref":"CredentialSupportedSdJwtVc"}]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VciCredentialSupportedWithId": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"CredentialSupported"},{"dataType":"nestedObjectLiteral","nestedProperties":{"id":{"dataType":"string","required":true}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MetadataDisplay": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"NameAndLocale"},{"ref":"LogoAndColor"},{"dataType":"nestedObjectLiteral","nestedProperties":{"name":{"dataType":"string"}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VciIssuerMetadataDisplay": {
        "dataType": "refAlias",
        "type": {"ref":"MetadataDisplay","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VcIssuerRecord": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"RecordId","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime"},
            "type": {"dataType":"string","required":true},
            "publicIssuerId": {"ref":"PublicIssuerId","required":true},
            "accessTokenPublicKeyFingerprint": {"dataType":"string","required":true},
            "credentialsSupported": {"dataType":"array","array":{"dataType":"refAlias","ref":"OpenId4VciCredentialSupportedWithId"},"required":true},
            "display": {"dataType":"array","array":{"dataType":"refAlias","ref":"OpenId4VciIssuerMetadataDisplay"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VcIssuersCreateOptions": {
        "dataType": "refObject",
        "properties": {
            "publicIssuerId": {"ref":"PublicIssuerId"},
            "credentialsSupported": {"dataType":"array","array":{"dataType":"refAlias","ref":"OpenId4VciCredentialSupportedWithId"},"required":true},
            "display": {"dataType":"array","array":{"dataType":"refAlias","ref":"OpenId4VciIssuerMetadataDisplay"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VcIssuersUpdateMetadataOptions": {
        "dataType": "refObject",
        "properties": {
            "credentialsSupported": {"dataType":"array","array":{"dataType":"refAlias","ref":"OpenId4VciCredentialSupportedWithId"},"required":true},
            "display": {"dataType":"array","array":{"dataType":"refAlias","ref":"OpenId4VciIssuerMetadataDisplay"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VcIssuanceSessionState": {
        "dataType": "refEnum",
        "enums": ["OfferCreated","OfferUriRetrieved","AccessTokenRequested","AccessTokenCreated","CredentialRequestReceived","CredentialIssued","Error"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_string.unknown_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CommonCredentialOfferFormat": {
        "dataType": "refObject",
        "properties": {
            "format": {"dataType":"union","subSchemas":[{"ref":"OID4VCICredentialFormat"},{"dataType":"string"}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JsonLdIssuerCredentialDefinition": {
        "dataType": "refObject",
        "properties": {
            "@context": {"dataType":"array","array":{"dataType":"refAlias","ref":"ICredentialContextType"},"required":true},
            "types": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "credentialSubject": {"ref":"IssuerCredentialSubject"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialOfferFormatJwtVcJsonLdAndLdpVc": {
        "dataType": "refObject",
        "properties": {
            "format": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["ldp_vc"]},{"dataType":"enum","enums":["jwt_vc_json-ld"]}],"required":true},
            "credential_definition": {"ref":"JsonLdIssuerCredentialDefinition","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialOfferFormatJwtVcJson": {
        "dataType": "refObject",
        "properties": {
            "format": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["jwt_vc_json"]},{"dataType":"enum","enums":["jwt_vc"]}],"required":true},
            "types": {"dataType":"array","array":{"dataType":"string"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialOfferFormatSdJwtVc": {
        "dataType": "refObject",
        "properties": {
            "format": {"dataType":"enum","enums":["vc+sd-jwt"],"required":true},
            "vct": {"dataType":"string","required":true},
            "claims": {"ref":"IssuerCredentialSubject"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialOfferFormat": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"ref":"CommonCredentialOfferFormat"},{"dataType":"union","subSchemas":[{"ref":"CredentialOfferFormatJwtVcJsonLdAndLdpVc"},{"ref":"CredentialOfferFormatJwtVcJson"},{"ref":"CredentialOfferFormatSdJwtVc"}]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GrantAuthorizationCode": {
        "dataType": "refObject",
        "properties": {
            "issuer_state": {"dataType":"string"},
            "authorization_server": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "GrantUrnIetf": {
        "dataType": "refObject",
        "properties": {
            "pre-authorized_code": {"dataType":"string","required":true},
            "user_pin_required": {"dataType":"boolean","required":true},
            "interval": {"dataType":"double"},
            "authorization_server": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Grant": {
        "dataType": "refObject",
        "properties": {
            "authorization_code": {"ref":"GrantAuthorizationCode"},
            "urn:ietf:params:oauth:grant-type:pre-authorized_code": {"ref":"GrantUrnIetf"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialOfferPayloadV1_0_11": {
        "dataType": "refObject",
        "properties": {
            "credential_issuer": {"dataType":"string","required":true},
            "credentials": {"dataType":"array","array":{"dataType":"union","subSchemas":[{"ref":"CredentialOfferFormat"},{"dataType":"string"}]},"required":true},
            "grants": {"ref":"Grant"},
            "client_id": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VciCredentialOfferPayload": {
        "dataType": "refAlias",
        "type": {"ref":"CredentialOfferPayloadV1_0_11","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VcIssuanceSessionRecord": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"RecordId","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime"},
            "type": {"dataType":"string","required":true},
            "publicIssuerId": {"ref":"PublicIssuerId","required":true},
            "state": {"ref":"OpenId4VcIssuanceSessionState","required":true},
            "cNonce": {"dataType":"string"},
            "cNonceExpiresAt": {"dataType":"datetime"},
            "preAuthorizedCode": {"dataType":"string"},
            "userPin": {"dataType":"string"},
            "issuanceMetadata": {"ref":"Record_string.unknown_"},
            "credentialOfferPayload": {"ref":"OpenId4VciCredentialOfferPayload","required":true},
            "credentialOfferUri": {"dataType":"string","required":true},
            "errorMessage": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VcIssuanceSessionsCreateOfferResponse": {
        "dataType": "refObject",
        "properties": {
            "issuanceSession": {"ref":"OpenId4VcIssuanceSessionRecord","required":true},
            "credentialOffer": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VciCredentialFormatProfile.SdJwtVc": {
        "dataType": "refEnum",
        "enums": ["vc+sd-jwt"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Did": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DisclosureFrame": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"union","subSchemas":[{"dataType":"boolean"},{"ref":"DisclosureFrame"}]},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VcIssuanceSessionCreateOfferSdJwtCredentialOptions": {
        "dataType": "refObject",
        "properties": {
            "credentialSupportedId": {"dataType":"string","required":true},
            "format": {"ref":"OpenId4VciCredentialFormatProfile.SdJwtVc","required":true},
            "issuer": {"dataType":"nestedObjectLiteral","nestedProperties":{"didUrl":{"ref":"Did","required":true},"method":{"dataType":"enum","enums":["did"],"required":true}},"required":true},
            "payload": {"dataType":"nestedObjectLiteral","nestedProperties":{"vct":{"dataType":"string"}},"additionalProperties":{"dataType":"any"},"required":true},
            "disclosureFrame": {"ref":"DisclosureFrame","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VciPreAuthorizedCodeFlowConfig": {
        "dataType": "refObject",
        "properties": {
            "preAuthorizedCode": {"dataType":"string"},
            "userPinRequired": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_OpenId4VciCreateCredentialOfferOptions.Exclude_keyofOpenId4VciCreateCredentialOfferOptions.offeredCredentials__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"baseUri":{"dataType":"string"},"preAuthorizedCodeFlowConfig":{"ref":"OpenId4VciPreAuthorizedCodeFlowConfig","required":true},"issuanceMetadata":{"ref":"Record_string.unknown_"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OpenId4VcIssuanceSessionsCreateOfferOptions": {
        "dataType": "refObject",
        "properties": {
            "baseUri": {"dataType":"string"},
            "preAuthorizedCodeFlowConfig": {"ref":"OpenId4VciPreAuthorizedCodeFlowConfig","required":true},
            "issuanceMetadata": {"ref":"Record_string.unknown_"},
            "publicIssuerId": {"ref":"PublicIssuerId","required":true},
            "credentials": {"dataType":"array","array":{"dataType":"refObject","ref":"OpenId4VcIssuanceSessionCreateOfferSdJwtCredentialOptions"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ThreadId": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProofState": {
        "dataType": "refEnum",
        "enums": ["proposal-sent","proposal-received","request-sent","request-received","presentation-sent","presentation-received","declined","abandoned","done"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProofRole": {
        "dataType": "refEnum",
        "enums": ["verifier","prover"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AutoAcceptProof": {
        "dataType": "refEnum",
        "enums": ["always","contentApproved","never"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommProofExchangeRecord": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"RecordId","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime"},
            "type": {"dataType":"string","required":true},
            "connectionId": {"ref":"RecordId"},
            "threadId": {"ref":"ThreadId","required":true},
            "parentThreadId": {"ref":"ThreadId"},
            "state": {"ref":"ProofState","required":true},
            "role": {"ref":"ProofRole","required":true},
            "autoAcceptProof": {"ref":"AutoAcceptProof"},
            "errorMessage": {"dataType":"string"},
            "protocolVersion": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProofFormatDataMessagePayload_ProofFormats.proposal_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProofFormatDataMessagePayload_ProofFormats.request_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProofFormatDataMessagePayload_ProofFormats.presentation_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommProofsGetFormatDataResponse": {
        "dataType": "refObject",
        "properties": {
            "presentation": {"ref":"ProofFormatDataMessagePayload_ProofFormats.presentation_"},
            "request": {"ref":"ProofFormatDataMessagePayload_ProofFormats.request_"},
            "proposal": {"ref":"ProofFormatDataMessagePayload_ProofFormats.proposal_"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProofProtocolVersion": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["v1"]},{"dataType":"enum","enums":["v2"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsPresentationPreviewAttribute": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "credentialDefinitionId": {"dataType":"string"},
            "mimeType": {"dataType":"string"},
            "value": {"dataType":"string"},
            "referent": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsPredicateType": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":[">="]},{"dataType":"enum","enums":[">"]},{"dataType":"enum","enums":["<="]},{"dataType":"enum","enums":["<"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsPresentationPreviewPredicate": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "credentialDefinitionId": {"dataType":"string","required":true},
            "predicate": {"ref":"AnonCredsPredicateType","required":true},
            "threshold": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsNonRevokedInterval": {
        "dataType": "refObject",
        "properties": {
            "from": {"dataType":"double"},
            "to": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsProposeProofFormat": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "version": {"dataType":"string"},
            "attributes": {"dataType":"array","array":{"dataType":"refObject","ref":"AnonCredsPresentationPreviewAttribute"}},
            "predicates": {"dataType":"array","array":{"dataType":"refObject","ref":"AnonCredsPresentationPreviewPredicate"}},
            "nonRevokedInterval": {"ref":"AnonCredsNonRevokedInterval"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ProposeProofOptions.Exclude_keyofProposeProofOptions.proofFormats-or-protocolVersion__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"connectionId":{"dataType":"string","required":true},"goalCode":{"dataType":"string"},"parentThreadId":{"dataType":"string"},"autoAcceptProof":{"ref":"AutoAcceptProof"},"comment":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommProofsProposeProofOptions": {
        "dataType": "refObject",
        "properties": {
            "connectionId": {"dataType":"string","required":true},
            "goalCode": {"dataType":"string"},
            "parentThreadId": {"dataType":"string"},
            "autoAcceptProof": {"ref":"AutoAcceptProof"},
            "comment": {"dataType":"string"},
            "protocolVersion": {"ref":"ProofProtocolVersion","required":true},
            "proofFormats": {"dataType":"nestedObjectLiteral","nestedProperties":{"anoncreds":{"ref":"AnonCredsProposeProofFormat"},"indy":{"ref":"AnonCredsProposeProofFormat"}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AcceptAnonCredsProposalOptions": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_AcceptProofProposalOptions.Exclude_keyofAcceptProofProposalOptions.proofFormats-or-proofRecordId__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"goalCode":{"dataType":"string"},"autoAcceptProof":{"ref":"AutoAcceptProof"},"comment":{"dataType":"string"},"willConfirm":{"dataType":"boolean","default":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommProofsAcceptProposalOptions": {
        "dataType": "refObject",
        "properties": {
            "goalCode": {"dataType":"string"},
            "autoAcceptProof": {"ref":"AutoAcceptProof"},
            "comment": {"dataType":"string"},
            "willConfirm": {"dataType":"boolean","default":true},
            "protocolVersion": {"ref":"ProofProtocolVersion","required":true},
            "proofFormats": {"dataType":"nestedObjectLiteral","nestedProperties":{"anoncreds":{"ref":"AcceptAnonCredsProposalOptions"},"indy":{"ref":"AcceptAnonCredsProposalOptions"}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PlaintextMessage": {
        "dataType": "refObject",
        "properties": {
            "@type": {"dataType":"string","required":true},
            "@id": {"dataType":"string","required":true},
            "~thread": {"dataType":"nestedObjectLiteral","nestedProperties":{"pthid":{"dataType":"string"},"thid":{"dataType":"string"}}},
        },
        "additionalProperties": {"dataType":"any"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommProofsCreateRequestResponse": {
        "dataType": "refObject",
        "properties": {
            "message": {"ref":"PlaintextMessage","required":true},
            "proofExchange": {"ref":"DidCommProofExchangeRecord","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsProofRequestRestrictionOptions": {
        "dataType": "refObject",
        "properties": {
            "schema_id": {"dataType":"string"},
            "schema_issuer_id": {"dataType":"string"},
            "schema_name": {"dataType":"string"},
            "schema_version": {"dataType":"string"},
            "issuer_id": {"dataType":"string"},
            "cred_def_id": {"dataType":"string"},
            "rev_reg_id": {"dataType":"string"},
            "schema_issuer_did": {"dataType":"string"},
            "issuer_did": {"dataType":"string"},
            "attributeValues": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"string"}},
            "attributeMarkers": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"boolean"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsRequestedAttributeOptions": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "names": {"dataType":"array","array":{"dataType":"string"}},
            "restrictions": {"dataType":"array","array":{"dataType":"refObject","ref":"AnonCredsProofRequestRestrictionOptions"}},
            "non_revoked": {"ref":"AnonCredsNonRevokedInterval"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsRequestedPredicateOptions": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "p_type": {"ref":"AnonCredsPredicateType","required":true},
            "p_value": {"dataType":"double","required":true},
            "restrictions": {"dataType":"array","array":{"dataType":"refObject","ref":"AnonCredsProofRequestRestrictionOptions"}},
            "non_revoked": {"ref":"AnonCredsNonRevokedInterval"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsRequestProofFormatOptions": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "version": {"dataType":"string","required":true},
            "non_revoked": {"ref":"AnonCredsNonRevokedInterval"},
            "requested_attributes": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"ref":"AnonCredsRequestedAttributeOptions"}},
            "requested_predicates": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"ref":"AnonCredsRequestedPredicateOptions"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_CreateProofRequestOptions.Exclude_keyofCreateProofRequestOptions.proofFormats-or-protocolVersion__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"goalCode":{"dataType":"string"},"parentThreadId":{"dataType":"string"},"autoAcceptProof":{"ref":"AutoAcceptProof"},"comment":{"dataType":"string"},"willConfirm":{"dataType":"boolean","default":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommProofsCreateRequestOptions": {
        "dataType": "refObject",
        "properties": {
            "goalCode": {"dataType":"string"},
            "parentThreadId": {"dataType":"string"},
            "autoAcceptProof": {"ref":"AutoAcceptProof"},
            "comment": {"dataType":"string"},
            "willConfirm": {"dataType":"boolean","default":true},
            "protocolVersion": {"ref":"ProofProtocolVersion","required":true},
            "proofFormats": {"dataType":"nestedObjectLiteral","nestedProperties":{"anoncreds":{"ref":"AnonCredsRequestProofFormatOptions"},"indy":{"ref":"AnonCredsRequestProofFormatOptions"}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommProofsSendRequestOptions": {
        "dataType": "refObject",
        "properties": {
            "goalCode": {"dataType":"string"},
            "parentThreadId": {"dataType":"string"},
            "autoAcceptProof": {"ref":"AutoAcceptProof"},
            "comment": {"dataType":"string"},
            "willConfirm": {"dataType":"boolean","default":true},
            "protocolVersion": {"ref":"ProofProtocolVersion","required":true},
            "proofFormats": {"dataType":"nestedObjectLiteral","nestedProperties":{"anoncreds":{"ref":"AnonCredsRequestProofFormatOptions"},"indy":{"ref":"AnonCredsRequestProofFormatOptions"}},"required":true},
            "connectionId": {"ref":"RecordId","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_string.string-or-number_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"double"}]},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsClaimRecord": {
        "dataType": "refAlias",
        "type": {"ref":"Record_string.string-or-number_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsCredentialInfo": {
        "dataType": "refObject",
        "properties": {
            "credentialId": {"dataType":"string","required":true},
            "attributes": {"ref":"AnonCredsClaimRecord","required":true},
            "schemaId": {"dataType":"string","required":true},
            "credentialDefinitionId": {"dataType":"string","required":true},
            "revocationRegistryId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "credentialRevocationId": {"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"enum","enums":[null]}],"required":true},
            "methodName": {"dataType":"string","required":true},
            "linkSecretId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsRequestedAttributeMatch": {
        "dataType": "refObject",
        "properties": {
            "credentialId": {"dataType":"string","required":true},
            "timestamp": {"dataType":"double"},
            "revealed": {"dataType":"boolean","required":true},
            "credentialInfo": {"ref":"AnonCredsCredentialInfo","required":true},
            "revoked": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_string.AnonCredsRequestedAttributeMatch_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"ref":"AnonCredsRequestedAttributeMatch"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsRequestedPredicateMatch": {
        "dataType": "refObject",
        "properties": {
            "credentialId": {"dataType":"string","required":true},
            "timestamp": {"dataType":"double"},
            "credentialInfo": {"ref":"AnonCredsCredentialInfo","required":true},
            "revoked": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_string.AnonCredsRequestedPredicateMatch_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"ref":"AnonCredsRequestedPredicateMatch"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_string.string_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"string"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsSelectedCredentials": {
        "dataType": "refObject",
        "properties": {
            "attributes": {"ref":"Record_string.AnonCredsRequestedAttributeMatch_","required":true},
            "predicates": {"ref":"Record_string.AnonCredsRequestedPredicateMatch_","required":true},
            "selfAttestedAttributes": {"ref":"Record_string.string_","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_AcceptProofRequestOptions.Exclude_keyofAcceptProofRequestOptions.proofFormats-or-proofRecordId__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"goalCode":{"dataType":"string"},"autoAcceptProof":{"ref":"AutoAcceptProof"},"comment":{"dataType":"string"},"willConfirm":{"dataType":"boolean","default":true},"useReturnRoute":{"dataType":"boolean"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommProofsAcceptRequestOptions": {
        "dataType": "refObject",
        "properties": {
            "goalCode": {"dataType":"string"},
            "autoAcceptProof": {"ref":"AutoAcceptProof"},
            "comment": {"dataType":"string"},
            "willConfirm": {"dataType":"boolean","default":true},
            "useReturnRoute": {"dataType":"boolean"},
            "proofFormats": {"dataType":"nestedObjectLiteral","nestedProperties":{"anoncreds":{"ref":"AnonCredsSelectedCredentials"},"indy":{"ref":"AnonCredsSelectedCredentials"}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OutOfBandRole": {
        "dataType": "refEnum",
        "enums": ["sender","receiver"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OutOfBandState": {
        "dataType": "refEnum",
        "enums": ["initial","await-response","prepare-response","done"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommOutOfBandRecord": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"RecordId","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime"},
            "type": {"dataType":"string","required":true},
            "outOfBandInvitation": {"ref":"PlaintextMessage","required":true},
            "role": {"ref":"OutOfBandRole","required":true},
            "state": {"ref":"OutOfBandState","required":true},
            "alias": {"dataType":"string"},
            "reusable": {"dataType":"boolean","required":true},
            "autoAcceptConnection": {"dataType":"boolean"},
            "mediatorId": {"ref":"RecordId"},
            "reuseConnectionId": {"ref":"RecordId"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommOutOfBandCreateInvitationResponse": {
        "dataType": "refObject",
        "properties": {
            "invitation": {"ref":"PlaintextMessage","required":true},
            "outOfBandRecord": {"ref":"DidCommOutOfBandRecord","required":true},
            "invitationUrl": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "HandshakeProtocol": {
        "dataType": "refEnum",
        "enums": ["https://didcomm.org/didexchange/1.x","https://didcomm.org/connections/1.x"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_CreateOutOfBandInvitationConfig.Exclude_keyofCreateOutOfBandInvitationConfig.routing-or-appendedAttachments-or-messages__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"label":{"dataType":"string"},"goalCode":{"dataType":"string"},"alias":{"dataType":"string"},"imageUrl":{"dataType":"string"},"goal":{"dataType":"string"},"handshake":{"dataType":"boolean"},"handshakeProtocols":{"dataType":"array","array":{"dataType":"refEnum","ref":"HandshakeProtocol"}},"multiUseInvitation":{"dataType":"boolean"},"autoAcceptConnection":{"dataType":"boolean"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommOutOfBandCreateInvitationOptions": {
        "dataType": "refObject",
        "properties": {
            "label": {"dataType":"string"},
            "goalCode": {"dataType":"string"},
            "alias": {"dataType":"string"},
            "imageUrl": {"dataType":"string"},
            "goal": {"dataType":"string"},
            "handshake": {"dataType":"boolean"},
            "handshakeProtocols": {"dataType":"array","array":{"dataType":"refEnum","ref":"HandshakeProtocol"}},
            "multiUseInvitation": {"dataType":"boolean"},
            "autoAcceptConnection": {"dataType":"boolean"},
            "messages": {"dataType":"array","array":{"dataType":"refObject","ref":"PlaintextMessage"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_CreateLegacyInvitationConfig.Exclude_keyofCreateLegacyInvitationConfig.routing__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"label":{"dataType":"string"},"alias":{"dataType":"string"},"imageUrl":{"dataType":"string"},"multiUseInvitation":{"dataType":"boolean"},"autoAcceptConnection":{"dataType":"boolean"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommOutOfBandCreateLegacyConnectionInvitationOptions": {
        "dataType": "refObject",
        "properties": {
            "label": {"dataType":"string"},
            "alias": {"dataType":"string"},
            "imageUrl": {"dataType":"string"},
            "multiUseInvitation": {"dataType":"boolean"},
            "autoAcceptConnection": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommOutOfBandCreateLegacyConnectionlessInvitationOptions": {
        "dataType": "refObject",
        "properties": {
            "message": {"ref":"PlaintextMessage","required":true},
            "domain": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ReceiveOutOfBandInvitationConfig.Exclude_keyofReceiveOutOfBandInvitationConfig.routing__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"label":{"dataType":"string"},"alias":{"dataType":"string"},"imageUrl":{"dataType":"string"},"autoAcceptConnection":{"dataType":"boolean"},"autoAcceptInvitation":{"dataType":"boolean"},"reuseConnection":{"dataType":"boolean"},"acceptInvitationTimeoutMs":{"dataType":"double"},"ourDid":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommOutOfBandReceiveInvitationOptions": {
        "dataType": "refObject",
        "properties": {
            "label": {"dataType":"string"},
            "alias": {"dataType":"string"},
            "imageUrl": {"dataType":"string"},
            "autoAcceptConnection": {"dataType":"boolean"},
            "autoAcceptInvitation": {"dataType":"boolean"},
            "reuseConnection": {"dataType":"boolean"},
            "acceptInvitationTimeoutMs": {"dataType":"double"},
            "ourDid": {"dataType":"string"},
            "invitation": {"dataType":"union","subSchemas":[{"ref":"PlaintextMessage"},{"dataType":"string"}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommOutOfBandAcceptInvitationOptions": {
        "dataType": "refObject",
        "properties": {
            "autoAcceptConnection": {"dataType":"boolean"},
            "reuseConnection": {"dataType":"boolean"},
            "label": {"dataType":"string"},
            "alias": {"dataType":"string"},
            "imageUrl": {"dataType":"string"},
            "timeoutMs": {"dataType":"double"},
            "ourDid": {"ref":"Did"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialState": {
        "dataType": "refEnum",
        "enums": ["proposal-sent","proposal-received","offer-sent","offer-received","declined","request-sent","request-received","credential-issued","credential-received","done","abandoned"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialRole": {
        "dataType": "refEnum",
        "enums": ["issuer","holder"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AutoAcceptCredential": {
        "dataType": "refEnum",
        "enums": ["always","contentApproved","never"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialRecordBinding": {
        "dataType": "refObject",
        "properties": {
            "credentialRecordType": {"dataType":"string","required":true},
            "credentialRecordId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialPreviewAttributeOptions": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "mimeType": {"dataType":"string"},
            "value": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommCredentialExchangeRecord": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"RecordId","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime"},
            "type": {"dataType":"string","required":true},
            "connectionId": {"ref":"RecordId"},
            "threadId": {"ref":"ThreadId","required":true},
            "parentThreadId": {"ref":"ThreadId"},
            "state": {"ref":"CredentialState","required":true},
            "role": {"ref":"CredentialRole","required":true},
            "autoAcceptCredential": {"ref":"AutoAcceptCredential"},
            "revocationNotification": {"dataType":"nestedObjectLiteral","nestedProperties":{"comment":{"dataType":"string"},"revocationDate":{"dataType":"datetime","required":true}}},
            "errorMessage": {"dataType":"string"},
            "protocolVersion": {"dataType":"string","required":true},
            "credentials": {"dataType":"array","array":{"dataType":"refObject","ref":"CredentialRecordBinding"},"required":true},
            "credentialAttributes": {"dataType":"array","array":{"dataType":"refObject","ref":"CredentialPreviewAttributeOptions"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_AnonCredsCredentialProposalFormat.Exclude_keyofAnonCredsCredentialProposalFormat.schema_issuer_id-or-issuer_id__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"schema_name":{"dataType":"string"},"schema_version":{"dataType":"string"},"schema_id":{"dataType":"string"},"cred_def_id":{"dataType":"string"},"schema_issuer_did":{"dataType":"string"},"issuer_did":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_AnonCredsCredentialProposalFormat.schema_issuer_id-or-issuer_id_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_AnonCredsCredentialProposalFormat.Exclude_keyofAnonCredsCredentialProposalFormat.schema_issuer_id-or-issuer_id__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LegacyIndyCredentialProposalFormat": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_AnonCredsCredentialProposalFormat.schema_issuer_id-or-issuer_id_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsCredentialProposalFormat": {
        "dataType": "refObject",
        "properties": {
            "schema_issuer_id": {"dataType":"string"},
            "schema_name": {"dataType":"string"},
            "schema_version": {"dataType":"string"},
            "schema_id": {"dataType":"string"},
            "cred_def_id": {"dataType":"string"},
            "issuer_id": {"dataType":"string"},
            "schema_issuer_did": {"dataType":"string"},
            "issuer_did": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialFormatDataMessagePayload_CredentialFormats.proposal_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"indy":{"ref":"LegacyIndyCredentialProposalFormat"},"anoncreds":{"ref":"AnonCredsCredentialProposalFormat"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LegacyIndyCredentialRequest": {
        "dataType": "refObject",
        "properties": {
            "prover_did": {"dataType":"string","required":true},
            "entropy": {"dataType":"string"},
            "cred_def_id": {"dataType":"string","required":true},
            "blinded_ms": {"ref":"Record_string.unknown_","required":true},
            "blinded_ms_correctness_proof": {"ref":"Record_string.unknown_","required":true},
            "nonce": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsCredentialRequest": {
        "dataType": "refObject",
        "properties": {
            "prover_did": {"dataType":"string"},
            "entropy": {"dataType":"string"},
            "cred_def_id": {"dataType":"string","required":true},
            "blinded_ms": {"ref":"Record_string.unknown_","required":true},
            "blinded_ms_correctness_proof": {"ref":"Record_string.unknown_","required":true},
            "nonce": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialFormatDataMessagePayload_CredentialFormats.request_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"indy":{"ref":"LegacyIndyCredentialRequest"},"anoncreds":{"ref":"AnonCredsCredentialRequest"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsCredentialOffer": {
        "dataType": "refObject",
        "properties": {
            "schema_id": {"dataType":"string","required":true},
            "cred_def_id": {"dataType":"string","required":true},
            "nonce": {"dataType":"string","required":true},
            "key_correctness_proof": {"ref":"Record_string.unknown_","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialFormatDataMessagePayload_CredentialFormats.offer_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"indy":{"ref":"AnonCredsCredentialOffer"},"anoncreds":{"ref":"AnonCredsCredentialOffer"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsCredentialValue": {
        "dataType": "refObject",
        "properties": {
            "raw": {"dataType":"string","required":true},
            "encoded": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_string.AnonCredsCredentialValue_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"ref":"AnonCredsCredentialValue"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsCredential": {
        "dataType": "refObject",
        "properties": {
            "schema_id": {"dataType":"string","required":true},
            "cred_def_id": {"dataType":"string","required":true},
            "rev_reg_id": {"dataType":"string"},
            "values": {"ref":"Record_string.AnonCredsCredentialValue_","required":true},
            "signature": {"dataType":"any","required":true},
            "signature_correctness_proof": {"dataType":"any","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialFormatDataMessagePayload_CredentialFormats.credential_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"indy":{"ref":"AnonCredsCredential"},"anoncreds":{"ref":"AnonCredsCredential"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_GetCredentialFormatDataReturn_CredentialFormats_.Exclude_keyofGetCredentialFormatDataReturn_CredentialFormats_.offerAttributes__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"proposal":{"ref":"CredentialFormatDataMessagePayload_CredentialFormats.proposal_"},"request":{"ref":"CredentialFormatDataMessagePayload_CredentialFormats.request_"},"offer":{"ref":"CredentialFormatDataMessagePayload_CredentialFormats.offer_"},"credential":{"ref":"CredentialFormatDataMessagePayload_CredentialFormats.credential_"},"proposalAttributes":{"dataType":"array","array":{"dataType":"refObject","ref":"CredentialPreviewAttributeOptions"}}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommCredentialsGetFormatDataResponse": {
        "dataType": "refObject",
        "properties": {
            "proposal": {"ref":"CredentialFormatDataMessagePayload_CredentialFormats.proposal_"},
            "request": {"ref":"CredentialFormatDataMessagePayload_CredentialFormats.request_"},
            "offer": {"ref":"CredentialFormatDataMessagePayload_CredentialFormats.offer_"},
            "credential": {"ref":"CredentialFormatDataMessagePayload_CredentialFormats.credential_"},
            "proposalAttributes": {"dataType":"array","array":{"dataType":"refObject","ref":"CredentialPreviewAttributeOptions"}},
            "offerAttributes": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"value":{"dataType":"string","required":true},"name":{"dataType":"string","required":true},"mime-type":{"dataType":"string"}}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialProtocolVersion": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["v1"]},{"dataType":"enum","enums":["v2"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_JwsGeneralFormat.Exclude_keyofJwsGeneralFormat.payload__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"header":{"ref":"Record_string.unknown_","required":true},"signature":{"dataType":"string","required":true},"protected":{"dataType":"string","required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_JwsGeneralFormat.payload_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_JwsGeneralFormat.Exclude_keyofJwsGeneralFormat.payload__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JwsDetachedFormat": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_JwsGeneralFormat.payload_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JwsFlattenedDetachedFormat": {
        "dataType": "refObject",
        "properties": {
            "signatures": {"dataType":"array","array":{"dataType":"refAlias","ref":"JwsDetachedFormat"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AttachmentData": {
        "dataType": "refObject",
        "properties": {
            "base64": {"dataType":"string"},
            "json": {"ref":"JsonValue"},
            "links": {"dataType":"array","array":{"dataType":"string"}},
            "jws": {"dataType":"union","subSchemas":[{"ref":"JwsDetachedFormat"},{"ref":"JwsFlattenedDetachedFormat"}]},
            "sha256": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Attachment": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "description": {"dataType":"string"},
            "filename": {"dataType":"string"},
            "mimeType": {"dataType":"string"},
            "lastmodTime": {"dataType":"datetime"},
            "byteCount": {"dataType":"double"},
            "data": {"ref":"AttachmentData","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LinkedAttachment": {
        "dataType": "refObject",
        "properties": {
            "attributeName": {"dataType":"string","required":true},
            "attachment": {"ref":"Attachment","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsProposeCredentialFormat": {
        "dataType": "refObject",
        "properties": {
            "schemaIssuerId": {"dataType":"string"},
            "schemaId": {"dataType":"string"},
            "schemaName": {"dataType":"string"},
            "schemaVersion": {"dataType":"string"},
            "credentialDefinitionId": {"dataType":"string"},
            "issuerId": {"dataType":"string"},
            "attributes": {"dataType":"array","array":{"dataType":"refObject","ref":"CredentialPreviewAttributeOptions"}},
            "linkedAttachments": {"dataType":"array","array":{"dataType":"refObject","ref":"LinkedAttachment"}},
            "schemaIssuerDid": {"dataType":"string"},
            "issuerDid": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_AnonCredsProposeCredentialFormat.Exclude_keyofAnonCredsProposeCredentialFormat.schemaIssuerId-or-issuerId__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"schemaId":{"dataType":"string"},"schemaName":{"dataType":"string"},"schemaVersion":{"dataType":"string"},"credentialDefinitionId":{"dataType":"string"},"attributes":{"dataType":"array","array":{"dataType":"refObject","ref":"CredentialPreviewAttributeOptions"}},"linkedAttachments":{"dataType":"array","array":{"dataType":"refObject","ref":"LinkedAttachment"}},"schemaIssuerDid":{"dataType":"string"},"issuerDid":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_AnonCredsProposeCredentialFormat.schemaIssuerId-or-issuerId_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_AnonCredsProposeCredentialFormat.Exclude_keyofAnonCredsProposeCredentialFormat.schemaIssuerId-or-issuerId__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LegacyIndyProposeCredentialFormat": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_AnonCredsProposeCredentialFormat.schemaIssuerId-or-issuerId_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProposeCredentialOptions": {
        "dataType": "refObject",
        "properties": {
            "protocolVersion": {"ref":"CredentialProtocolVersion","required":true},
            "credentialFormats": {"dataType":"nestedObjectLiteral","nestedProperties":{"indy":{"dataType":"union","subSchemas":[{"ref":"AnonCredsProposeCredentialFormat"},{"ref":"LegacyIndyProposeCredentialFormat"}]},"anoncreds":{"dataType":"union","subSchemas":[{"ref":"AnonCredsProposeCredentialFormat"},{"ref":"LegacyIndyProposeCredentialFormat"}]}},"required":true},
            "autoAcceptCredential": {"ref":"AutoAcceptCredential"},
            "comment": {"dataType":"string"},
            "connectionId": {"ref":"RecordId","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsAcceptProposalFormat": {
        "dataType": "refObject",
        "properties": {
            "credentialDefinitionId": {"dataType":"string"},
            "revocationRegistryDefinitionId": {"dataType":"string"},
            "revocationRegistryIndex": {"dataType":"double"},
            "attributes": {"dataType":"array","array":{"dataType":"refObject","ref":"CredentialPreviewAttributeOptions"}},
            "linkedAttachments": {"dataType":"array","array":{"dataType":"refObject","ref":"LinkedAttachment"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AcceptCredentialProposalOptions": {
        "dataType": "refObject",
        "properties": {
            "credentialFormats": {"dataType":"nestedObjectLiteral","nestedProperties":{"indy":{"ref":"AnonCredsAcceptProposalFormat"},"anoncreds":{"ref":"AnonCredsAcceptProposalFormat"}}},
            "autoAcceptCredential": {"ref":"AutoAcceptCredential"},
            "comment": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommCredentialsCreateOfferResponse": {
        "dataType": "refObject",
        "properties": {
            "message": {"ref":"PlaintextMessage","required":true},
            "credentialExchange": {"ref":"DidCommCredentialExchangeRecord","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsOfferCredentialFormat": {
        "dataType": "refObject",
        "properties": {
            "credentialDefinitionId": {"dataType":"string","required":true},
            "revocationRegistryDefinitionId": {"dataType":"string"},
            "revocationRegistryIndex": {"dataType":"double"},
            "attributes": {"dataType":"array","array":{"dataType":"refObject","ref":"CredentialPreviewAttributeOptions"},"required":true},
            "linkedAttachments": {"dataType":"array","array":{"dataType":"refObject","ref":"LinkedAttachment"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialFormatPayload_CredentialFormats.createOffer_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"indy":{"ref":"AnonCredsOfferCredentialFormat"},"anoncreds":{"ref":"AnonCredsOfferCredentialFormat"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateOfferOptions": {
        "dataType": "refObject",
        "properties": {
            "protocolVersion": {"ref":"CredentialProtocolVersion","required":true},
            "credentialFormats": {"ref":"CredentialFormatPayload_CredentialFormats.createOffer_","required":true},
            "autoAcceptCredential": {"ref":"AutoAcceptCredential"},
            "comment": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OfferCredentialOptions": {
        "dataType": "refObject",
        "properties": {
            "protocolVersion": {"ref":"CredentialProtocolVersion","required":true},
            "credentialFormats": {"ref":"CredentialFormatPayload_CredentialFormats.createOffer_","required":true},
            "autoAcceptCredential": {"ref":"AutoAcceptCredential"},
            "comment": {"dataType":"string"},
            "connectionId": {"ref":"RecordId","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsAcceptOfferFormat": {
        "dataType": "refObject",
        "properties": {
            "linkSecretId": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialFormatPayload_CredentialFormats.acceptOffer_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"indy":{"ref":"AnonCredsAcceptOfferFormat"},"anoncreds":{"ref":"AnonCredsAcceptOfferFormat"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AcceptCredentialOfferOptions": {
        "dataType": "refObject",
        "properties": {
            "credentialFormats": {"ref":"CredentialFormatPayload_CredentialFormats.acceptOffer_"},
            "autoAcceptCredential": {"ref":"AutoAcceptCredential"},
            "comment": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_string.never_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsAcceptRequestFormat": {
        "dataType": "refAlias",
        "type": {"ref":"Record_string.never_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialFormatPayload_CredentialFormats.acceptRequest_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"indy":{"ref":"AnonCredsAcceptRequestFormat"},"anoncreds":{"ref":"AnonCredsAcceptRequestFormat"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AcceptCredentialRequestOptions": {
        "dataType": "refObject",
        "properties": {
            "credentialFormats": {"ref":"CredentialFormatPayload_CredentialFormats.acceptRequest_"},
            "autoAcceptCredential": {"ref":"AutoAcceptCredential"},
            "comment": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidExchangeState": {
        "dataType": "refEnum",
        "enums": ["start","invitation-sent","invitation-received","request-sent","request-received","response-sent","response-received","abandoned","completed"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidExchangeRole": {
        "dataType": "refEnum",
        "enums": ["requester","responder"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ConnectionType": {
        "dataType": "refEnum",
        "enums": ["mediator"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommConnectionRecord": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"RecordId","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime"},
            "type": {"dataType":"string","required":true},
            "did": {"ref":"Did"},
            "theirDid": {"ref":"Did"},
            "theirLabel": {"dataType":"string"},
            "state": {"ref":"DidExchangeState","required":true},
            "role": {"ref":"DidExchangeRole","required":true},
            "alias": {"dataType":"string"},
            "autoAcceptConnection": {"dataType":"boolean"},
            "threadId": {"ref":"ThreadId"},
            "imageUrl": {"dataType":"string"},
            "mediatorId": {"dataType":"string"},
            "errorMessage": {"dataType":"string"},
            "protocol": {"ref":"HandshakeProtocol"},
            "outOfBandId": {"dataType":"string"},
            "invitationDid": {"ref":"Did"},
            "connectionTypes": {"dataType":"array","array":{"dataType":"union","subSchemas":[{"ref":"ConnectionType"},{"dataType":"string"}]}},
            "previousDids": {"dataType":"array","array":{"dataType":"refAlias","ref":"Did"}},
            "previousTheirDids": {"dataType":"array","array":{"dataType":"refAlias","ref":"Did"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicMessageRole": {
        "dataType": "refEnum",
        "enums": ["sender","receiver"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommBasicMessageRecord": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"RecordId","required":true},
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime"},
            "type": {"dataType":"string","required":true},
            "connectionId": {"ref":"RecordId","required":true},
            "role": {"ref":"BasicMessageRole","required":true},
            "content": {"dataType":"string","required":true},
            "sentTime": {"dataType":"string","required":true},
            "threadId": {"ref":"ThreadId"},
            "parentThreadId": {"ref":"ThreadId"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommBasicMessagesSendOptions": {
        "dataType": "refObject",
        "properties": {
            "connectionId": {"ref":"RecordId","required":true},
            "content": {"dataType":"string","required":true},
            "parentThreadId": {"ref":"ThreadId"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidResolutionMetadata": {
        "dataType": "refObject",
        "properties": {
            "contentType": {"dataType":"string"},
            "error": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["invalidDid"]},{"dataType":"enum","enums":["notFound"]},{"dataType":"enum","enums":["representationNotSupported"]},{"dataType":"enum","enums":["unsupportedDidMethod"]},{"dataType":"string"}]},
            "message": {"dataType":"string"},
            "servedFromCache": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "JsonWebKey": {
        "dataType": "refObject",
        "properties": {
            "alg": {"dataType":"string"},
            "crv": {"dataType":"string"},
            "e": {"dataType":"string"},
            "ext": {"dataType":"boolean"},
            "key_ops": {"dataType":"array","array":{"dataType":"string"}},
            "kid": {"dataType":"string"},
            "kty": {"dataType":"string","required":true},
            "n": {"dataType":"string"},
            "use": {"dataType":"string"},
            "x": {"dataType":"string"},
            "y": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "VerificationMethod": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "type": {"dataType":"string","required":true},
            "controller": {"dataType":"string","required":true},
            "publicKeyBase58": {"dataType":"string"},
            "publicKeyBase64": {"dataType":"string"},
            "publicKeyJwk": {"ref":"JsonWebKey"},
            "publicKeyHex": {"dataType":"string"},
            "publicKeyMultibase": {"dataType":"string"},
            "blockchainAccountId": {"dataType":"string"},
            "ethereumAddress": {"dataType":"string"},
            "conditionOr": {"dataType":"array","array":{"dataType":"refObject","ref":"VerificationMethod"}},
            "conditionAnd": {"dataType":"array","array":{"dataType":"refObject","ref":"VerificationMethod"}},
            "threshold": {"dataType":"double"},
            "conditionThreshold": {"dataType":"array","array":{"dataType":"refObject","ref":"VerificationMethod"}},
            "conditionWeightedThreshold": {"dataType":"array","array":{"dataType":"refObject","ref":"ConditionWeightedThreshold"}},
            "conditionDelegated": {"dataType":"string"},
            "relationshipParent": {"dataType":"array","array":{"dataType":"string"}},
            "relationshipChild": {"dataType":"array","array":{"dataType":"string"}},
            "relationshipSibling": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ConditionWeightedThreshold": {
        "dataType": "refObject",
        "properties": {
            "condition": {"ref":"VerificationMethod","required":true},
            "weight": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ServiceEndpoint": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"string"},{"ref":"Record_string.any_"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Service": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "type": {"dataType":"string","required":true},
            "serviceEndpoint": {"dataType":"union","subSchemas":[{"ref":"ServiceEndpoint"},{"dataType":"array","array":{"dataType":"refAlias","ref":"ServiceEndpoint"}}],"required":true},
        },
        "additionalProperties": {"dataType":"any"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DIDDocument": {
        "dataType": "refAlias",
        "type": {"dataType":"intersection","subSchemas":[{"dataType":"nestedObjectLiteral","nestedProperties":{"publicKey":{"dataType":"array","array":{"dataType":"refObject","ref":"VerificationMethod"}},"service":{"dataType":"array","array":{"dataType":"refObject","ref":"Service"}},"verificationMethod":{"dataType":"array","array":{"dataType":"refObject","ref":"VerificationMethod"}},"controller":{"dataType":"union","subSchemas":[{"dataType":"string"},{"dataType":"array","array":{"dataType":"string"}}]},"alsoKnownAs":{"dataType":"array","array":{"dataType":"string"}},"id":{"dataType":"string","required":true},"@context":{"dataType":"union","subSchemas":[{"dataType":"enum","enums":["https://www.w3.org/ns/did/v1"]},{"dataType":"string"},{"dataType":"array","array":{"dataType":"string"}}]}}},{"dataType":"nestedObjectLiteral","nestedProperties":{"authentication":{"dataType":"array","array":{"dataType":"union","subSchemas":[{"dataType":"string"},{"ref":"VerificationMethod"}]}},"assertionMethod":{"dataType":"array","array":{"dataType":"union","subSchemas":[{"dataType":"string"},{"ref":"VerificationMethod"}]}},"keyAgreement":{"dataType":"array","array":{"dataType":"union","subSchemas":[{"dataType":"string"},{"ref":"VerificationMethod"}]}},"capabilityInvocation":{"dataType":"array","array":{"dataType":"union","subSchemas":[{"dataType":"string"},{"ref":"VerificationMethod"}]}},"capabilityDelegation":{"dataType":"array","array":{"dataType":"union","subSchemas":[{"dataType":"string"},{"ref":"VerificationMethod"}]}}}}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidDocumentJson": {
        "dataType": "refAlias",
        "type": {"ref":"DIDDocument","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DIDDocumentMetadata": {
        "dataType": "refObject",
        "properties": {
            "created": {"dataType":"string"},
            "updated": {"dataType":"string"},
            "deactivated": {"dataType":"boolean"},
            "versionId": {"dataType":"string"},
            "nextUpdate": {"dataType":"string"},
            "nextVersionId": {"dataType":"string"},
            "equivalentId": {"dataType":"string"},
            "canonicalId": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidDocumentMetadata": {
        "dataType": "refAlias",
        "type": {"ref":"DIDDocumentMetadata","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidResolveSuccessResponse": {
        "dataType": "refObject",
        "properties": {
            "didResolutionMetadata": {"ref":"DidResolutionMetadata","required":true},
            "didDocument": {"ref":"DidDocumentJson","required":true},
            "didDocumentMetadata": {"ref":"DidDocumentMetadata","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidResolveFailedResponse": {
        "dataType": "refObject",
        "properties": {
            "didResolutionMetadata": {"dataType":"intersection","subSchemas":[{"ref":"DidResolutionMetadata"},{"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true},"message":{"dataType":"string","required":true}}}],"required":true},
            "didDocument": {"dataType":"union","subSchemas":[{"ref":"DidDocumentJson"},{"dataType":"enum","enums":[null]}],"required":true},
            "didDocumentMetadata": {"ref":"DidDocumentMetadata","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "KeyType": {
        "dataType": "refEnum",
        "enums": ["ed25519","bls12381g1g2","bls12381g1","bls12381g2","x25519","p256","p384","p521","k256"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PrivateKey": {
        "dataType": "refObject",
        "properties": {
            "keyType": {"ref":"KeyType","required":true},
            "privateKeyBase58": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidImportOptions": {
        "dataType": "refObject",
        "properties": {
            "did": {"ref":"Did","required":true},
            "didDocument": {"ref":"DidDocumentJson"},
            "privateKeys": {"dataType":"array","array":{"dataType":"refObject","ref":"PrivateKey"}},
            "overwrite": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnyJsonObject": {
        "dataType": "refObject",
        "properties": {
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCreateBaseResponse__state-finished--did-Did--didDocument-DidDocumentJson--secret_63_-AnyJsonObject__": {
        "dataType": "refObject",
        "properties": {
            "jobId": {"dataType":"string"},
            "didRegistrationMetadata": {"ref":"AnyJsonObject","required":true},
            "didDocumentMetadata": {"ref":"DidResolutionMetadata","required":true},
            "didState": {"dataType":"nestedObjectLiteral","nestedProperties":{"secret":{"ref":"AnyJsonObject"},"didDocument":{"ref":"DidDocumentJson","required":true},"did":{"ref":"Did","required":true},"state":{"dataType":"enum","enums":["finished"],"required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCreateFinishedResponse": {
        "dataType": "refAlias",
        "type": {"ref":"DidCreateBaseResponse__state-finished--did-Did--didDocument-DidDocumentJson--secret_63_-AnyJsonObject__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCreateBaseResponse__state-failed--did_63_-Did--didDocument_63_-DidDocumentJson--secret_63_-AnyJsonObject--reason-string__": {
        "dataType": "refObject",
        "properties": {
            "jobId": {"dataType":"string"},
            "didRegistrationMetadata": {"ref":"AnyJsonObject","required":true},
            "didDocumentMetadata": {"ref":"DidResolutionMetadata","required":true},
            "didState": {"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true},"secret":{"ref":"AnyJsonObject"},"didDocument":{"ref":"DidDocumentJson"},"did":{"ref":"Did"},"state":{"dataType":"enum","enums":["failed"],"required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCreateFailedResponse": {
        "dataType": "refAlias",
        "type": {"ref":"DidCreateBaseResponse__state-failed--did_63_-Did--didDocument_63_-DidDocumentJson--secret_63_-AnyJsonObject--reason-string__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCreateBaseResponse__state-action--action-string--did_63_-Did--didDocument_63_-DidDocumentJson--secret_63_-AnyJsonObject--_91_key-string_93__58_unknown__": {
        "dataType": "refObject",
        "properties": {
            "jobId": {"dataType":"string"},
            "didRegistrationMetadata": {"ref":"AnyJsonObject","required":true},
            "didDocumentMetadata": {"ref":"DidResolutionMetadata","required":true},
            "didState": {"dataType":"nestedObjectLiteral","nestedProperties":{"secret":{"ref":"AnyJsonObject"},"didDocument":{"ref":"DidDocumentJson"},"did":{"ref":"Did"},"action":{"dataType":"string","required":true},"state":{"dataType":"enum","enums":["action"],"required":true}},"additionalProperties":{"dataType":"any"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCreateActionResponse": {
        "dataType": "refAlias",
        "type": {"ref":"DidCreateBaseResponse__state-action--action-string--did_63_-Did--didDocument_63_-DidDocumentJson--secret_63_-AnyJsonObject--_91_key-string_93__58_unknown__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCreateBaseResponse__state-wait--did_63_-Did--didDocument_63_-DidDocumentJson--secret_63_-AnyJsonObject__": {
        "dataType": "refObject",
        "properties": {
            "jobId": {"dataType":"string"},
            "didRegistrationMetadata": {"ref":"AnyJsonObject","required":true},
            "didDocumentMetadata": {"ref":"DidResolutionMetadata","required":true},
            "didState": {"dataType":"nestedObjectLiteral","nestedProperties":{"secret":{"ref":"AnyJsonObject"},"didDocument":{"ref":"DidDocumentJson"},"did":{"ref":"Did"},"state":{"dataType":"enum","enums":["wait"],"required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCreateWaitResponse": {
        "dataType": "refAlias",
        "type": {"ref":"DidCreateBaseResponse__state-wait--did_63_-Did--didDocument_63_-DidDocumentJson--secret_63_-AnyJsonObject__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_DidCreateBaseOptions.Exclude_keyofDidCreateBaseOptions.did-or-didDocument__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"method":{"dataType":"string"},"options":{"ref":"AnyJsonObject"},"secret":{"ref":"AnyJsonObject"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "KeyOrJwkDidCreateOptions": {
        "dataType": "refObject",
        "properties": {
            "method": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["key"]},{"dataType":"enum","enums":["jwk"]}],"required":true},
            "options": {"dataType":"nestedObjectLiteral","nestedProperties":{"keyType":{"ref":"KeyType","required":true}},"required":true},
            "secret": {"dataType":"nestedObjectLiteral","nestedProperties":{"privateKeyBase58":{"dataType":"string"},"seedBase58":{"dataType":"string"}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCreateBaseOptions": {
        "dataType": "refObject",
        "properties": {
            "method": {"dataType":"string"},
            "did": {"ref":"Did"},
            "options": {"ref":"AnyJsonObject"},
            "secret": {"ref":"AnyJsonObject"},
            "didDocument": {"ref":"DidDocumentJson"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCreateOptions": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"ref":"KeyOrJwkDidCreateOptions"},{"ref":"DidCreateBaseOptions"}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsSchemaId": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsSchema": {
        "dataType": "refObject",
        "properties": {
            "issuerId": {"dataType":"string","required":true},
            "name": {"dataType":"string","required":true},
            "version": {"dataType":"string","required":true},
            "attrNames": {"dataType":"array","array":{"dataType":"string"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsGetSchemaSuccessResponse": {
        "dataType": "refObject",
        "properties": {
            "schemaId": {"ref":"AnonCredsSchemaId","required":true},
            "schema": {"ref":"AnonCredsSchema","required":true},
            "resolutionMetadata": {"ref":"AnyJsonObject","required":true},
            "schemaMetadata": {"ref":"AnyJsonObject","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Required_AnonCredsResolutionMetadata_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true},"message":{"dataType":"string","required":true}},"additionalProperties":{"dataType":"any"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsGetSchemaFailedResponse": {
        "dataType": "refObject",
        "properties": {
            "schemaId": {"ref":"AnonCredsSchemaId","required":true},
            "schema": {"ref":"AnonCredsSchema"},
            "resolutionMetadata": {"ref":"Required_AnonCredsResolutionMetadata_","required":true},
            "schemaMetadata": {"ref":"AnyJsonObject","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RegisterSchemaReturnStateFinished": {
        "dataType": "refObject",
        "properties": {
            "state": {"dataType":"enum","enums":["finished"],"required":true},
            "schema": {"ref":"AnonCredsSchema","required":true},
            "schemaId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsRegisterSchemaSuccessResponse": {
        "dataType": "refObject",
        "properties": {
            "jobId": {"dataType":"string"},
            "schemaState": {"ref":"RegisterSchemaReturnStateFinished","required":true},
            "schemaMetadata": {"ref":"AnyJsonObject","required":true},
            "registrationMetadata": {"ref":"AnyJsonObject","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RegisterSchemaReturnStateFailed": {
        "dataType": "refObject",
        "properties": {
            "state": {"dataType":"enum","enums":["failed"],"required":true},
            "reason": {"dataType":"string","required":true},
            "schema": {"ref":"AnonCredsSchema"},
            "schemaId": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsRegisterSchemaFailedResponse": {
        "dataType": "refObject",
        "properties": {
            "jobId": {"dataType":"string"},
            "schemaState": {"ref":"RegisterSchemaReturnStateFailed","required":true},
            "schemaMetadata": {"ref":"AnyJsonObject","required":true},
            "registrationMetadata": {"ref":"AnyJsonObject","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RegisterSchemaReturnStateAction": {
        "dataType": "refObject",
        "properties": {
            "state": {"dataType":"enum","enums":["action"],"required":true},
            "action": {"dataType":"string","required":true},
            "schema": {"ref":"AnonCredsSchema","required":true},
            "schemaId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsRegisterSchemaActionResponse": {
        "dataType": "refObject",
        "properties": {
            "jobId": {"dataType":"string"},
            "schemaState": {"ref":"RegisterSchemaReturnStateAction","required":true},
            "schemaMetadata": {"ref":"AnyJsonObject","required":true},
            "registrationMetadata": {"ref":"AnyJsonObject","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RegisterSchemaReturnStateWait": {
        "dataType": "refObject",
        "properties": {
            "state": {"dataType":"enum","enums":["wait"],"required":true},
            "schema": {"ref":"AnonCredsSchema"},
            "schemaId": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsRegisterSchemaWaitResponse": {
        "dataType": "refObject",
        "properties": {
            "jobId": {"dataType":"string"},
            "schemaState": {"ref":"RegisterSchemaReturnStateWait","required":true},
            "schemaMetadata": {"ref":"AnyJsonObject","required":true},
            "registrationMetadata": {"ref":"AnyJsonObject","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsRegisterSchemaBody": {
        "dataType": "refObject",
        "properties": {
            "schema": {"ref":"AnonCredsSchema","required":true},
            "options": {"ref":"AnyJsonObject"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsCredentialDefinitionId": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsCredentialDefinition": {
        "dataType": "refObject",
        "properties": {
            "issuerId": {"dataType":"string","required":true},
            "schemaId": {"dataType":"string","required":true},
            "type": {"dataType":"enum","enums":["CL"],"required":true},
            "tag": {"dataType":"string","required":true},
            "value": {"dataType":"nestedObjectLiteral","nestedProperties":{"revocation":{"dataType":"any"},"primary":{"ref":"Record_string.unknown_","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsGetCredentialDefinitionSuccessResponse": {
        "dataType": "refObject",
        "properties": {
            "credentialDefinitionId": {"ref":"AnonCredsCredentialDefinitionId","required":true},
            "credentialDefinition": {"ref":"AnonCredsCredentialDefinition","required":true},
            "resolutionMetadata": {"ref":"AnyJsonObject","required":true},
            "credentialDefinitionMetadata": {"ref":"AnyJsonObject","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsGetCredentialDefinitionFailedResponse": {
        "dataType": "refObject",
        "properties": {
            "credentialDefinitionId": {"ref":"AnonCredsCredentialDefinitionId","required":true},
            "credentialDefinition": {"ref":"AnonCredsCredentialDefinition"},
            "resolutionMetadata": {"ref":"Required_AnonCredsResolutionMetadata_","required":true},
            "credentialDefinitionMetadata": {"ref":"AnyJsonObject","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RegisterCredentialDefinitionReturnStateFinished": {
        "dataType": "refObject",
        "properties": {
            "state": {"dataType":"enum","enums":["finished"],"required":true},
            "credentialDefinition": {"ref":"AnonCredsCredentialDefinition","required":true},
            "credentialDefinitionId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsRegisterCredentialDefinitionSuccessResponse": {
        "dataType": "refObject",
        "properties": {
            "jobId": {"dataType":"string"},
            "credentialDefinitionState": {"ref":"RegisterCredentialDefinitionReturnStateFinished","required":true},
            "credentialDefinitionMetadata": {"ref":"AnyJsonObject","required":true},
            "registrationMetadata": {"ref":"AnyJsonObject","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RegisterCredentialDefinitionReturnStateFailed": {
        "dataType": "refObject",
        "properties": {
            "state": {"dataType":"enum","enums":["failed"],"required":true},
            "reason": {"dataType":"string","required":true},
            "credentialDefinition": {"ref":"AnonCredsCredentialDefinition"},
            "credentialDefinitionId": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsRegisterCredentialDefinitionFailedResponse": {
        "dataType": "refObject",
        "properties": {
            "jobId": {"dataType":"string"},
            "credentialDefinitionState": {"ref":"RegisterCredentialDefinitionReturnStateFailed","required":true},
            "credentialDefinitionMetadata": {"ref":"AnyJsonObject","required":true},
            "registrationMetadata": {"ref":"AnyJsonObject","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RegisterCredentialDefinitionReturnStateAction": {
        "dataType": "refObject",
        "properties": {
            "state": {"dataType":"enum","enums":["action"],"required":true},
            "action": {"dataType":"string","required":true},
            "credentialDefinitionId": {"dataType":"string","required":true},
            "credentialDefinition": {"ref":"AnonCredsCredentialDefinition","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsRegisterCredentialDefinitionActionResponse": {
        "dataType": "refObject",
        "properties": {
            "jobId": {"dataType":"string"},
            "credentialDefinitionState": {"ref":"RegisterCredentialDefinitionReturnStateAction","required":true},
            "credentialDefinitionMetadata": {"ref":"AnyJsonObject","required":true},
            "registrationMetadata": {"ref":"AnyJsonObject","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RegisterCredentialDefinitionReturnStateWait": {
        "dataType": "refObject",
        "properties": {
            "state": {"dataType":"enum","enums":["wait"],"required":true},
            "credentialDefinition": {"ref":"AnonCredsCredentialDefinition"},
            "credentialDefinitionId": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsRegisterCredentialDefinitionWaitResponse": {
        "dataType": "refObject",
        "properties": {
            "jobId": {"dataType":"string"},
            "credentialDefinitionState": {"ref":"RegisterCredentialDefinitionReturnStateWait","required":true},
            "credentialDefinitionMetadata": {"ref":"AnyJsonObject","required":true},
            "registrationMetadata": {"ref":"AnyJsonObject","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsRegisterCredentialDefinitionInput": {
        "dataType": "refObject",
        "properties": {
            "issuerId": {"dataType":"string","required":true},
            "schemaId": {"dataType":"string","required":true},
            "tag": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsRegisterCredentialDefinitionOptions": {
        "dataType": "refObject",
        "properties": {
            "supportRevocation": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsRegisterCredentialDefinitionBody": {
        "dataType": "refObject",
        "properties": {
            "credentialDefinition": {"ref":"AnonCredsRegisterCredentialDefinitionInput","required":true},
            "options": {"ref":"AnonCredsRegisterCredentialDefinitionOptions","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommMimeType": {
        "dataType": "refEnum",
        "enums": ["application/ssi-agent-wire","application/didcomm-envelope-enc"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ReturnType_AgentConfig-at-toJSON_.Exclude_keyofReturnType_AgentConfig-at-toJSON_.walletConfig-or-logger-or-agentDependencies__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"label":{"dataType":"string","required":true},"connectionImageUrl":{"dataType":"string"},"endpoints":{"dataType":"array","array":{"dataType":"string"}},"didCommMimeType":{"ref":"DidCommMimeType"},"useDidKeyInProtocols":{"dataType":"boolean"},"useDidSovPrefixWhereAllowed":{"dataType":"boolean"},"autoUpdateStorageOnStartup":{"dataType":"boolean"},"backupBeforeStorageUpdate":{"dataType":"boolean"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiAgentConfig": {
        "dataType": "refObject",
        "properties": {
            "label": {"dataType":"string","required":true},
            "connectionImageUrl": {"dataType":"string"},
            "endpoints": {"dataType":"array","array":{"dataType":"string"}},
            "didCommMimeType": {"ref":"DidCommMimeType"},
            "useDidKeyInProtocols": {"dataType":"boolean"},
            "useDidSovPrefixWhereAllowed": {"dataType":"boolean"},
            "autoUpdateStorageOnStartup": {"dataType":"boolean"},
            "backupBeforeStorageUpdate": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AgentInfo": {
        "dataType": "refObject",
        "properties": {
            "config": {"ref":"ApiAgentConfig","required":true},
            "isInitialized": {"dataType":"boolean","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"throw-on-extras","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.post('/tenants',
            authenticateMiddleware([{"tenants":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(TenantsController)),
            ...(fetchMiddlewares<RequestHandler>(TenantsController.prototype.createTenant)),

            async function TenantsController_createTenant(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    body: {"in":"body","name":"body","required":true,"ref":"TenantsCreateOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<TenantsController>(TenantsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'createTenant',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/tenants/:tenantId',
            authenticateMiddleware([{"tenants":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(TenantsController)),
            ...(fetchMiddlewares<RequestHandler>(TenantsController.prototype.getTenant)),

            async function TenantsController_getTenant(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    tenantId: {"in":"path","name":"tenantId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<TenantsController>(TenantsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getTenant',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/tenants/:tenantId',
            authenticateMiddleware([{"tenants":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(TenantsController)),
            ...(fetchMiddlewares<RequestHandler>(TenantsController.prototype.updateTenant)),

            async function TenantsController_updateTenant(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    tenantId: {"in":"path","name":"tenantId","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"TenantsUpdateOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<TenantsController>(TenantsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'updateTenant',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/tenants/:tenantId',
            authenticateMiddleware([{"tenants":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(TenantsController)),
            ...(fetchMiddlewares<RequestHandler>(TenantsController.prototype.deleteTenant)),

            async function TenantsController_deleteTenant(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    tenantId: {"in":"path","name":"tenantId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<TenantsController>(TenantsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'deleteTenant',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/tenants',
            authenticateMiddleware([{"tenants":["admin"]}]),
            ...(fetchMiddlewares<RequestHandler>(TenantsController)),
            ...(fetchMiddlewares<RequestHandler>(TenantsController.prototype.getTenantsByQuery)),

            async function TenantsController_getTenantsByQuery(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    label: {"in":"query","name":"label","dataType":"string"},
                    storageVersion: {"in":"query","name":"storageVersion","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<TenantsController>(TenantsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getTenantsByQuery',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/openid4vc/verifiers',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcVerifiersController)),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcVerifiersController.prototype.createVerifier)),

            async function OpenId4VcVerifiersController_createVerifier(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    options: {"in":"body","name":"options","required":true,"ref":"OpenId4VcVerifiersCreateOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OpenId4VcVerifiersController>(OpenId4VcVerifiersController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'createVerifier',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/openid4vc/verifiers',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcVerifiersController)),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcVerifiersController.prototype.getVerifiersByQuery)),

            async function OpenId4VcVerifiersController_getVerifiersByQuery(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    publicVerifierId: {"in":"query","name":"publicVerifierId","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OpenId4VcVerifiersController>(OpenId4VcVerifiersController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getVerifiersByQuery',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/openid4vc/verifiers/:verifierId',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcVerifiersController)),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcVerifiersController.prototype.getVerifier)),

            async function OpenId4VcVerifiersController_getVerifier(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    verifierId: {"in":"path","name":"verifierId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OpenId4VcVerifiersController>(OpenId4VcVerifiersController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getVerifier',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/openid4vc/verifiers/:verifierId',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcVerifiersController)),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcVerifiersController.prototype.deleteVerifier)),

            async function OpenId4VcVerifiersController_deleteVerifier(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    verifierId: {"in":"path","name":"verifierId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OpenId4VcVerifiersController>(OpenId4VcVerifiersController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'deleteVerifier',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/openid4vc/verifiers/sessions/create-request',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcVerificationSessionsController)),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcVerificationSessionsController.prototype.createRequest)),

            async function OpenId4VcVerificationSessionsController_createRequest(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    options: {"in":"body","name":"options","required":true,"ref":"OpenId4VcVerificationSessionsCreateRequestOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OpenId4VcVerificationSessionsController>(OpenId4VcVerificationSessionsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'createRequest',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/openid4vc/verifiers/sessions/:verificationSessionId/verified-authorization-response',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcVerificationSessionsController)),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcVerificationSessionsController.prototype.getVerifiedAuthorizationResponse)),

            async function OpenId4VcVerificationSessionsController_getVerifiedAuthorizationResponse(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    verificationSessionId: {"in":"path","name":"verificationSessionId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OpenId4VcVerificationSessionsController>(OpenId4VcVerificationSessionsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getVerifiedAuthorizationResponse',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/openid4vc/verifiers/sessions',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcVerificationSessionsController)),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcVerificationSessionsController.prototype.getVerificationSessionsByQuery)),

            async function OpenId4VcVerificationSessionsController_getVerificationSessionsByQuery(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    nonce: {"in":"query","name":"nonce","dataType":"string"},
                    publicVerifierId: {"in":"query","name":"publicVerifierId","ref":"PublicIssuerId"},
                    payloadState: {"in":"query","name":"payloadState","dataType":"string"},
                    state: {"in":"query","name":"state","ref":"OpenId4VcVerificationSessionState"},
                    authorizationRequestUri: {"in":"query","name":"authorizationRequestUri","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OpenId4VcVerificationSessionsController>(OpenId4VcVerificationSessionsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getVerificationSessionsByQuery',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/openid4vc/verifiers/sessions/:verificationSessionId',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcVerificationSessionsController)),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcVerificationSessionsController.prototype.getVerificationSession)),

            async function OpenId4VcVerificationSessionsController_getVerificationSession(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    verificationSessionId: {"in":"path","name":"verificationSessionId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OpenId4VcVerificationSessionsController>(OpenId4VcVerificationSessionsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getVerificationSession',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/openid4vc/verifiers/sessions/:verificationSessionId',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcVerificationSessionsController)),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcVerificationSessionsController.prototype.deleteVerificationSession)),

            async function OpenId4VcVerificationSessionsController_deleteVerificationSession(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    verificationSessionId: {"in":"path","name":"verificationSessionId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OpenId4VcVerificationSessionsController>(OpenId4VcVerificationSessionsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'deleteVerificationSession',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/openid4vc/issuers',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcIssuersController)),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcIssuersController.prototype.createIssuer)),

            async function OpenId4VcIssuersController_createIssuer(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    options: {"in":"body","name":"options","required":true,"ref":"OpenId4VcIssuersCreateOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OpenId4VcIssuersController>(OpenId4VcIssuersController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'createIssuer',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/openid4vc/issuers',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcIssuersController)),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcIssuersController.prototype.getIssuersByQuery)),

            async function OpenId4VcIssuersController_getIssuersByQuery(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    publicIssuerId: {"in":"query","name":"publicIssuerId","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OpenId4VcIssuersController>(OpenId4VcIssuersController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getIssuersByQuery',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/openid4vc/issuers/:issuerId',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcIssuersController)),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcIssuersController.prototype.deleteIssuer)),

            async function OpenId4VcIssuersController_deleteIssuer(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    issuerId: {"in":"path","name":"issuerId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OpenId4VcIssuersController>(OpenId4VcIssuersController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'deleteIssuer',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/openid4vc/issuers/:issuerId',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcIssuersController)),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcIssuersController.prototype.getIssuer)),

            async function OpenId4VcIssuersController_getIssuer(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    issuerId: {"in":"path","name":"issuerId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OpenId4VcIssuersController>(OpenId4VcIssuersController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getIssuer',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/openid4vc/issuers/:issuerId',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcIssuersController)),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcIssuersController.prototype.updateIssuerMetadata)),

            async function OpenId4VcIssuersController_updateIssuerMetadata(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    issuerId: {"in":"path","name":"issuerId","required":true,"dataType":"string"},
                    body: {"in":"body","name":"body","required":true,"ref":"OpenId4VcIssuersUpdateMetadataOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OpenId4VcIssuersController>(OpenId4VcIssuersController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'updateIssuerMetadata',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/openid4vc/issuers/sessions/create-offer',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcIssuanceSessionsController)),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcIssuanceSessionsController.prototype.createOffer)),

            async function OpenId4VcIssuanceSessionsController_createOffer(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    options: {"in":"body","name":"options","required":true,"ref":"OpenId4VcIssuanceSessionsCreateOfferOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OpenId4VcIssuanceSessionsController>(OpenId4VcIssuanceSessionsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'createOffer',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/openid4vc/issuers/sessions',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcIssuanceSessionsController)),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcIssuanceSessionsController.prototype.getIssuanceSessionsByQuery)),

            async function OpenId4VcIssuanceSessionsController_getIssuanceSessionsByQuery(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    cNonce: {"in":"query","name":"cNonce","dataType":"string"},
                    publicIssuerId: {"in":"query","name":"publicIssuerId","ref":"PublicIssuerId"},
                    preAuthorizedCode: {"in":"query","name":"preAuthorizedCode","dataType":"string"},
                    state: {"in":"query","name":"state","ref":"OpenId4VcIssuanceSessionState"},
                    credentialOfferUri: {"in":"query","name":"credentialOfferUri","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OpenId4VcIssuanceSessionsController>(OpenId4VcIssuanceSessionsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getIssuanceSessionsByQuery',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/openid4vc/issuers/sessions/:issuanceSessionId',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcIssuanceSessionsController)),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcIssuanceSessionsController.prototype.getIssuanceSession)),

            async function OpenId4VcIssuanceSessionsController_getIssuanceSession(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    issuanceSessionId: {"in":"path","name":"issuanceSessionId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OpenId4VcIssuanceSessionsController>(OpenId4VcIssuanceSessionsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getIssuanceSession',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/openid4vc/issuers/sessions/:issuanceSessionId',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcIssuanceSessionsController)),
            ...(fetchMiddlewares<RequestHandler>(OpenId4VcIssuanceSessionsController.prototype.deleteIssuanceSession)),

            async function OpenId4VcIssuanceSessionsController_deleteIssuanceSession(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    issuanceSessionId: {"in":"path","name":"issuanceSessionId","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OpenId4VcIssuanceSessionsController>(OpenId4VcIssuanceSessionsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'deleteIssuanceSession',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/didcomm/proofs',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProofsController)),
            ...(fetchMiddlewares<RequestHandler>(ProofsController.prototype.findProofsByQuery)),

            async function ProofsController_findProofsByQuery(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    threadId: {"in":"query","name":"threadId","ref":"ThreadId"},
                    connectionId: {"in":"query","name":"connectionId","ref":"RecordId"},
                    state: {"in":"query","name":"state","ref":"ProofState"},
                    parentThreadId: {"in":"query","name":"parentThreadId","ref":"ThreadId"},
                    role: {"in":"query","name":"role","ref":"ProofRole"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ProofsController>(ProofsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'findProofsByQuery',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/didcomm/proofs/:proofExchangeId/format-data',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProofsController)),
            ...(fetchMiddlewares<RequestHandler>(ProofsController.prototype.getFormatDateForProofExchange)),

            async function ProofsController_getFormatDateForProofExchange(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    proofExchangeId: {"in":"path","name":"proofExchangeId","required":true,"ref":"RecordId"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ProofsController>(ProofsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getFormatDateForProofExchange',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/didcomm/proofs/:proofExchangeId',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProofsController)),
            ...(fetchMiddlewares<RequestHandler>(ProofsController.prototype.getProofExchangeById)),

            async function ProofsController_getProofExchangeById(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    proofExchangeId: {"in":"path","name":"proofExchangeId","required":true,"ref":"RecordId"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ProofsController>(ProofsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getProofExchangeById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/didcomm/proofs/:proofExchangeId',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProofsController)),
            ...(fetchMiddlewares<RequestHandler>(ProofsController.prototype.deleteProof)),

            async function ProofsController_deleteProof(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    proofExchangeId: {"in":"path","name":"proofExchangeId","required":true,"ref":"RecordId"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ProofsController>(ProofsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'deleteProof',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/didcomm/proofs/propose-proof',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProofsController)),
            ...(fetchMiddlewares<RequestHandler>(ProofsController.prototype.proposeProof)),

            async function ProofsController_proposeProof(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    body: {"in":"body","name":"body","required":true,"ref":"DidCommProofsProposeProofOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ProofsController>(ProofsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'proposeProof',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/didcomm/proofs/:proofExchangeId/accept-proposal',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProofsController)),
            ...(fetchMiddlewares<RequestHandler>(ProofsController.prototype.acceptProposal)),

            async function ProofsController_acceptProposal(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    proofExchangeId: {"in":"path","name":"proofExchangeId","required":true,"ref":"RecordId"},
                    body: {"in":"body","name":"body","required":true,"ref":"DidCommProofsAcceptProposalOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ProofsController>(ProofsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'acceptProposal',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/didcomm/proofs/create-request',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProofsController)),
            ...(fetchMiddlewares<RequestHandler>(ProofsController.prototype.createRequest)),

            async function ProofsController_createRequest(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    body: {"in":"body","name":"body","required":true,"ref":"DidCommProofsCreateRequestOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ProofsController>(ProofsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'createRequest',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/didcomm/proofs/request-proof',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProofsController)),
            ...(fetchMiddlewares<RequestHandler>(ProofsController.prototype.requestProof)),

            async function ProofsController_requestProof(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    body: {"in":"body","name":"body","required":true,"ref":"DidCommProofsSendRequestOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ProofsController>(ProofsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'requestProof',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/didcomm/proofs/:proofExchangeId/accept-request',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProofsController)),
            ...(fetchMiddlewares<RequestHandler>(ProofsController.prototype.acceptRequest)),

            async function ProofsController_acceptRequest(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    proofExchangeId: {"in":"path","name":"proofExchangeId","required":true,"ref":"RecordId"},
                    body: {"in":"body","name":"body","required":true,"ref":"DidCommProofsAcceptRequestOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ProofsController>(ProofsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'acceptRequest',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/didcomm/proofs/:proofExchangeId/accept-presentation',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProofsController)),
            ...(fetchMiddlewares<RequestHandler>(ProofsController.prototype.acceptPresentation)),

            async function ProofsController_acceptPresentation(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    proofExchangeId: {"in":"path","name":"proofExchangeId","required":true,"ref":"RecordId"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ProofsController>(ProofsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'acceptPresentation',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/didcomm/out-of-band',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController)),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController.prototype.findOutOfBandRecordsByQuery)),

            async function OutOfBandController_findOutOfBandRecordsByQuery(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    invitationId: {"in":"query","name":"invitationId","dataType":"string"},
                    role: {"in":"query","name":"role","ref":"OutOfBandRole"},
                    state: {"in":"query","name":"state","ref":"OutOfBandState"},
                    threadId: {"in":"query","name":"threadId","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OutOfBandController>(OutOfBandController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'findOutOfBandRecordsByQuery',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/didcomm/out-of-band/:outOfBandId',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController)),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController.prototype.getOutOfBandRecordById)),

            async function OutOfBandController_getOutOfBandRecordById(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    outOfBandId: {"in":"path","name":"outOfBandId","required":true,"ref":"RecordId"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OutOfBandController>(OutOfBandController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getOutOfBandRecordById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/didcomm/out-of-band/create-invitation',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController)),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController.prototype.createInvitation)),

            async function OutOfBandController_createInvitation(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    body: {"in":"body","name":"body","ref":"DidCommOutOfBandCreateInvitationOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OutOfBandController>(OutOfBandController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'createInvitation',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/didcomm/out-of-band/create-legacy-invitation',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController)),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController.prototype.createLegacyInvitation)),

            async function OutOfBandController_createLegacyInvitation(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    body: {"in":"body","name":"body","ref":"DidCommOutOfBandCreateLegacyConnectionInvitationOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OutOfBandController>(OutOfBandController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'createLegacyInvitation',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/didcomm/out-of-band/create-legacy-connectionless-invitation',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController)),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController.prototype.createLegacyConnectionlessInvitation)),

            async function OutOfBandController_createLegacyConnectionlessInvitation(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    config: {"in":"body","name":"config","required":true,"ref":"DidCommOutOfBandCreateLegacyConnectionlessInvitationOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OutOfBandController>(OutOfBandController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'createLegacyConnectionlessInvitation',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/didcomm/out-of-band/receive-invitation',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController)),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController.prototype.receiveInvitation)),

            async function OutOfBandController_receiveInvitation(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    body: {"in":"body","name":"body","required":true,"ref":"DidCommOutOfBandReceiveInvitationOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OutOfBandController>(OutOfBandController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'receiveInvitation',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/didcomm/out-of-band/:outOfBandId/accept-invitation',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController)),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController.prototype.acceptInvitation)),

            async function OutOfBandController_acceptInvitation(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    outOfBandId: {"in":"path","name":"outOfBandId","required":true,"ref":"RecordId"},
                    acceptInvitationConfig: {"in":"body","name":"acceptInvitationConfig","required":true,"ref":"DidCommOutOfBandAcceptInvitationOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OutOfBandController>(OutOfBandController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'acceptInvitation',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/didcomm/out-of-band/:outOfBandId',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController)),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController.prototype.deleteOutOfBandRecord)),

            async function OutOfBandController_deleteOutOfBandRecord(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    outOfBandId: {"in":"path","name":"outOfBandId","required":true,"ref":"RecordId"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OutOfBandController>(OutOfBandController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'deleteOutOfBandRecord',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/didcomm/credentials',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(CredentialsController)),
            ...(fetchMiddlewares<RequestHandler>(CredentialsController.prototype.findCredentialsByQuery)),

            async function CredentialsController_findCredentialsByQuery(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    threadId: {"in":"query","name":"threadId","ref":"ThreadId"},
                    parentThreadId: {"in":"query","name":"parentThreadId","ref":"ThreadId"},
                    connectionId: {"in":"query","name":"connectionId","ref":"RecordId"},
                    state: {"in":"query","name":"state","ref":"CredentialState"},
                    role: {"in":"query","name":"role","ref":"CredentialRole"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CredentialsController>(CredentialsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'findCredentialsByQuery',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/didcomm/credentials/:credentialExchangeId',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(CredentialsController)),
            ...(fetchMiddlewares<RequestHandler>(CredentialsController.prototype.getCredentialById)),

            async function CredentialsController_getCredentialById(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    credentialExchangeId: {"in":"path","name":"credentialExchangeId","required":true,"ref":"RecordId"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CredentialsController>(CredentialsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getCredentialById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/didcomm/credentials/:credentialExchangeId/format-data',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(CredentialsController)),
            ...(fetchMiddlewares<RequestHandler>(CredentialsController.prototype.getFormatDateForCredentialExchange)),

            async function CredentialsController_getFormatDateForCredentialExchange(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    credentialExchangeId: {"in":"path","name":"credentialExchangeId","required":true,"ref":"RecordId"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CredentialsController>(CredentialsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getFormatDateForCredentialExchange',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/didcomm/credentials/:credentialExchangeId',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(CredentialsController)),
            ...(fetchMiddlewares<RequestHandler>(CredentialsController.prototype.deleteCredential)),

            async function CredentialsController_deleteCredential(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    credentialExchangeId: {"in":"path","name":"credentialExchangeId","required":true,"ref":"RecordId"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CredentialsController>(CredentialsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'deleteCredential',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/didcomm/credentials/propose-credential',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(CredentialsController)),
            ...(fetchMiddlewares<RequestHandler>(CredentialsController.prototype.proposeCredential)),

            async function CredentialsController_proposeCredential(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    options: {"in":"body","name":"options","required":true,"ref":"ProposeCredentialOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CredentialsController>(CredentialsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'proposeCredential',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/didcomm/credentials/:credentialExchangeId/accept-proposal',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(CredentialsController)),
            ...(fetchMiddlewares<RequestHandler>(CredentialsController.prototype.acceptProposal)),

            async function CredentialsController_acceptProposal(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    credentialExchangeId: {"in":"path","name":"credentialExchangeId","required":true,"ref":"RecordId"},
                    options: {"in":"body","name":"options","ref":"AcceptCredentialProposalOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CredentialsController>(CredentialsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'acceptProposal',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/didcomm/credentials/create-offer',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(CredentialsController)),
            ...(fetchMiddlewares<RequestHandler>(CredentialsController.prototype.createOffer)),

            async function CredentialsController_createOffer(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    options: {"in":"body","name":"options","required":true,"ref":"CreateOfferOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CredentialsController>(CredentialsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'createOffer',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/didcomm/credentials/offer-credential',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(CredentialsController)),
            ...(fetchMiddlewares<RequestHandler>(CredentialsController.prototype.offerCredential)),

            async function CredentialsController_offerCredential(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    options: {"in":"body","name":"options","required":true,"ref":"OfferCredentialOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CredentialsController>(CredentialsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'offerCredential',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/didcomm/credentials/:credentialExchangeId/accept-offer',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(CredentialsController)),
            ...(fetchMiddlewares<RequestHandler>(CredentialsController.prototype.acceptOffer)),

            async function CredentialsController_acceptOffer(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    credentialExchangeId: {"in":"path","name":"credentialExchangeId","required":true,"ref":"RecordId"},
                    options: {"in":"body","name":"options","ref":"AcceptCredentialOfferOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CredentialsController>(CredentialsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'acceptOffer',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/didcomm/credentials/:credentialExchangeId/accept-request',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(CredentialsController)),
            ...(fetchMiddlewares<RequestHandler>(CredentialsController.prototype.acceptRequest)),

            async function CredentialsController_acceptRequest(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    credentialExchangeId: {"in":"path","name":"credentialExchangeId","required":true,"ref":"RecordId"},
                    options: {"in":"body","name":"options","ref":"AcceptCredentialRequestOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CredentialsController>(CredentialsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'acceptRequest',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/didcomm/credentials/:credentialExchangeId/accept-credential',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(CredentialsController)),
            ...(fetchMiddlewares<RequestHandler>(CredentialsController.prototype.acceptCredential)),

            async function CredentialsController_acceptCredential(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    credentialExchangeId: {"in":"path","name":"credentialExchangeId","required":true,"ref":"RecordId"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CredentialsController>(CredentialsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'acceptCredential',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/didcomm/connections',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(ConnectionsController)),
            ...(fetchMiddlewares<RequestHandler>(ConnectionsController.prototype.findConnectionsByQuery)),

            async function ConnectionsController_findConnectionsByQuery(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    outOfBandId: {"in":"query","name":"outOfBandId","ref":"RecordId"},
                    alias: {"in":"query","name":"alias","dataType":"string"},
                    state: {"in":"query","name":"state","ref":"DidExchangeState"},
                    did: {"in":"query","name":"did","ref":"Did"},
                    theirDid: {"in":"query","name":"theirDid","ref":"Did"},
                    theirLabel: {"in":"query","name":"theirLabel","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ConnectionsController>(ConnectionsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'findConnectionsByQuery',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/didcomm/connections/:connectionId',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(ConnectionsController)),
            ...(fetchMiddlewares<RequestHandler>(ConnectionsController.prototype.getConnectionById)),

            async function ConnectionsController_getConnectionById(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    connectionId: {"in":"path","name":"connectionId","required":true,"ref":"RecordId"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ConnectionsController>(ConnectionsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getConnectionById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/didcomm/connections/:connectionId',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(ConnectionsController)),
            ...(fetchMiddlewares<RequestHandler>(ConnectionsController.prototype.deleteConnection)),

            async function ConnectionsController_deleteConnection(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    connectionId: {"in":"path","name":"connectionId","required":true,"ref":"RecordId"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ConnectionsController>(ConnectionsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'deleteConnection',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/didcomm/connections/:connectionId/accept-request',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(ConnectionsController)),
            ...(fetchMiddlewares<RequestHandler>(ConnectionsController.prototype.acceptRequest)),

            async function ConnectionsController_acceptRequest(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    connectionId: {"in":"path","name":"connectionId","required":true,"ref":"RecordId"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ConnectionsController>(ConnectionsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'acceptRequest',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/didcomm/connections/:connectionId/accept-response',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(ConnectionsController)),
            ...(fetchMiddlewares<RequestHandler>(ConnectionsController.prototype.acceptResponse)),

            async function ConnectionsController_acceptResponse(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    connectionId: {"in":"path","name":"connectionId","required":true,"ref":"RecordId"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ConnectionsController>(ConnectionsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'acceptResponse',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/didcomm/basic-messages',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(DidCommBasicMessagesController)),
            ...(fetchMiddlewares<RequestHandler>(DidCommBasicMessagesController.prototype.findBasicMessagesByQuery)),

            async function DidCommBasicMessagesController_findBasicMessagesByQuery(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    connectionId: {"in":"query","name":"connectionId","ref":"RecordId"},
                    role: {"in":"query","name":"role","ref":"BasicMessageRole"},
                    threadId: {"in":"query","name":"threadId","ref":"ThreadId"},
                    parentThreadId: {"in":"query","name":"parentThreadId","ref":"ThreadId"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<DidCommBasicMessagesController>(DidCommBasicMessagesController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'findBasicMessagesByQuery',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/didcomm/basic-messages/send',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(DidCommBasicMessagesController)),
            ...(fetchMiddlewares<RequestHandler>(DidCommBasicMessagesController.prototype.sendMessage)),

            async function DidCommBasicMessagesController_sendMessage(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    body: {"in":"body","name":"body","required":true,"ref":"DidCommBasicMessagesSendOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<DidCommBasicMessagesController>(DidCommBasicMessagesController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'sendMessage',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/dids/:did',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(DidController)),
            ...(fetchMiddlewares<RequestHandler>(DidController.prototype.resolveDid)),

            async function DidController_resolveDid(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    did: {"in":"path","name":"did","required":true,"dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<DidController>(DidController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'resolveDid',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/dids/import',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(DidController)),
            ...(fetchMiddlewares<RequestHandler>(DidController.prototype.importDid)),

            async function DidController_importDid(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    options: {"in":"body","name":"options","required":true,"ref":"DidImportOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<DidController>(DidController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'importDid',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/dids/create',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(DidController)),
            ...(fetchMiddlewares<RequestHandler>(DidController.prototype.createDid)),

            async function DidController_createDid(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    options: {"in":"body","name":"options","required":true,"ref":"DidCreateOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<DidController>(DidController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'createDid',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/anoncreds/schemas/:schemaId',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(AnonCredsController)),
            ...(fetchMiddlewares<RequestHandler>(AnonCredsController.prototype.getSchemaById)),

            async function AnonCredsController_getSchemaById(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    schemaId: {"in":"path","name":"schemaId","required":true,"ref":"AnonCredsSchemaId"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AnonCredsController>(AnonCredsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getSchemaById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/anoncreds/schemas',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(AnonCredsController)),
            ...(fetchMiddlewares<RequestHandler>(AnonCredsController.prototype.registerSchema)),

            async function AnonCredsController_registerSchema(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    body: {"in":"body","name":"body","required":true,"ref":"AnonCredsRegisterSchemaBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AnonCredsController>(AnonCredsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'registerSchema',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/anoncreds/credential-definitions/:credentialDefinitionId',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(AnonCredsController)),
            ...(fetchMiddlewares<RequestHandler>(AnonCredsController.prototype.getCredentialDefinitionById)),

            async function AnonCredsController_getCredentialDefinitionById(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    credentialDefinitionId: {"in":"path","name":"credentialDefinitionId","required":true,"ref":"AnonCredsCredentialDefinitionId"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AnonCredsController>(AnonCredsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getCredentialDefinitionById',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/anoncreds/credential-definitions',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(AnonCredsController)),
            ...(fetchMiddlewares<RequestHandler>(AnonCredsController.prototype.registerCredentialDefinition)),

            async function AnonCredsController_registerCredentialDefinition(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    body: {"in":"body","name":"body","required":true,"ref":"AnonCredsRegisterCredentialDefinitionBody"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AnonCredsController>(AnonCredsController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'registerCredentialDefinition',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/agent',
            authenticateMiddleware([{"tenants":["default"]}]),
            ...(fetchMiddlewares<RequestHandler>(AgentController)),
            ...(fetchMiddlewares<RequestHandler>(AgentController.prototype.getAgentInfo)),

            async function AgentController_getAgentInfo(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args, request, response });

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AgentController>(AgentController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }

              await templateService.apiHandler({
                methodName: 'getAgentInfo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
              next()
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa