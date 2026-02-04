/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TsoaRoute, fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TenantsController } from './../controllers/tenants/TenantsController';
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
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"label":{"dataType":"string","required":true}},"validators":{}},
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
    "ThreadId": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommProofState": {
        "dataType": "refEnum",
        "enums": ["proposal-sent","proposal-received","request-sent","request-received","presentation-sent","presentation-received","declined","abandoned","done"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommProofRole": {
        "dataType": "refEnum",
        "enums": ["verifier","prover"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommAutoAcceptProof": {
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
            "state": {"ref":"DidCommProofState","required":true},
            "role": {"ref":"DidCommProofRole","required":true},
            "autoAcceptProof": {"ref":"DidCommAutoAcceptProof"},
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
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"connectionId":{"dataType":"string","required":true},"parentThreadId":{"dataType":"string"},"autoAcceptProof":{"ref":"DidCommAutoAcceptProof"},"comment":{"dataType":"string"},"goalCode":{"dataType":"string"},"goal":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommProofsProposeProofOptions": {
        "dataType": "refObject",
        "properties": {
            "connectionId": {"dataType":"string","required":true},
            "parentThreadId": {"dataType":"string"},
            "autoAcceptProof": {"ref":"DidCommAutoAcceptProof"},
            "comment": {"dataType":"string"},
            "goalCode": {"dataType":"string"},
            "goal": {"dataType":"string"},
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
    "Pick_AcceptProofProposalOptions.Exclude_keyofAcceptProofProposalOptions.proofFormats-or-proofExchangeRecordId__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"autoAcceptProof":{"ref":"DidCommAutoAcceptProof"},"comment":{"dataType":"string"},"goalCode":{"dataType":"string"},"goal":{"dataType":"string"},"willConfirm":{"dataType":"boolean","default":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommProofsAcceptProposalOptions": {
        "dataType": "refObject",
        "properties": {
            "autoAcceptProof": {"ref":"DidCommAutoAcceptProof"},
            "comment": {"dataType":"string"},
            "goalCode": {"dataType":"string"},
            "goal": {"dataType":"string"},
            "willConfirm": {"dataType":"boolean","default":true},
            "protocolVersion": {"ref":"ProofProtocolVersion","required":true},
            "proofFormats": {"dataType":"nestedObjectLiteral","nestedProperties":{"anoncreds":{"ref":"AcceptAnonCredsProposalOptions"},"indy":{"ref":"AcceptAnonCredsProposalOptions"}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommPlaintextMessage": {
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
            "message": {"ref":"DidCommPlaintextMessage","required":true},
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
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"parentThreadId":{"dataType":"string"},"autoAcceptProof":{"ref":"DidCommAutoAcceptProof"},"comment":{"dataType":"string"},"goalCode":{"dataType":"string"},"goal":{"dataType":"string"},"willConfirm":{"dataType":"boolean","default":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommProofsCreateRequestOptions": {
        "dataType": "refObject",
        "properties": {
            "parentThreadId": {"dataType":"string"},
            "autoAcceptProof": {"ref":"DidCommAutoAcceptProof"},
            "comment": {"dataType":"string"},
            "goalCode": {"dataType":"string"},
            "goal": {"dataType":"string"},
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
            "parentThreadId": {"dataType":"string"},
            "autoAcceptProof": {"ref":"DidCommAutoAcceptProof"},
            "comment": {"dataType":"string"},
            "goalCode": {"dataType":"string"},
            "goal": {"dataType":"string"},
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
            "createdAt": {"dataType":"datetime","required":true},
            "updatedAt": {"dataType":"datetime","required":true},
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
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"autoAcceptProof":{"ref":"DidCommAutoAcceptProof"},"comment":{"dataType":"string"},"goalCode":{"dataType":"string"},"goal":{"dataType":"string"},"proofExchangeRecordId":{"dataType":"string","required":true},"willConfirm":{"dataType":"boolean","default":true},"useReturnRoute":{"dataType":"boolean"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommProofsAcceptRequestOptions": {
        "dataType": "refObject",
        "properties": {
            "autoAcceptProof": {"ref":"DidCommAutoAcceptProof"},
            "comment": {"dataType":"string"},
            "goalCode": {"dataType":"string"},
            "goal": {"dataType":"string"},
            "proofExchangeRecordId": {"dataType":"string","required":true},
            "willConfirm": {"dataType":"boolean","default":true},
            "useReturnRoute": {"dataType":"boolean"},
            "proofFormats": {"dataType":"nestedObjectLiteral","nestedProperties":{"anoncreds":{"ref":"AnonCredsSelectedCredentials"},"indy":{"ref":"AnonCredsSelectedCredentials"}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommOutOfBandRole": {
        "dataType": "refEnum",
        "enums": ["sender","receiver"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommOutOfBandState": {
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
            "outOfBandInvitation": {"ref":"DidCommPlaintextMessage","required":true},
            "role": {"ref":"DidCommOutOfBandRole","required":true},
            "state": {"ref":"DidCommOutOfBandState","required":true},
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
            "invitation": {"ref":"DidCommPlaintextMessage","required":true},
            "outOfBandRecord": {"ref":"DidCommOutOfBandRecord","required":true},
            "invitationUrl": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommHandshakeProtocol": {
        "dataType": "refEnum",
        "enums": ["https://didcomm.org/didexchange/1.x","https://didcomm.org/connections/1.x"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_CreateOutOfBandInvitationConfig.Exclude_keyofCreateOutOfBandInvitationConfig.routing-or-appendedAttachments-or-messages__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"label":{"dataType":"string"},"goalCode":{"dataType":"string"},"goal":{"dataType":"string"},"alias":{"dataType":"string"},"imageUrl":{"dataType":"string"},"handshake":{"dataType":"boolean"},"handshakeProtocols":{"dataType":"array","array":{"dataType":"refEnum","ref":"DidCommHandshakeProtocol"}},"multiUseInvitation":{"dataType":"boolean"},"autoAcceptConnection":{"dataType":"boolean"},"invitationDid":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommOutOfBandCreateInvitationOptions": {
        "dataType": "refObject",
        "properties": {
            "label": {"dataType":"string"},
            "goalCode": {"dataType":"string"},
            "goal": {"dataType":"string"},
            "alias": {"dataType":"string"},
            "imageUrl": {"dataType":"string"},
            "handshake": {"dataType":"boolean"},
            "handshakeProtocols": {"dataType":"array","array":{"dataType":"refEnum","ref":"DidCommHandshakeProtocol"}},
            "multiUseInvitation": {"dataType":"boolean"},
            "autoAcceptConnection": {"dataType":"boolean"},
            "invitationDid": {"dataType":"string"},
            "messages": {"dataType":"array","array":{"dataType":"refObject","ref":"DidCommPlaintextMessage"}},
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
    "Pick_ReceiveOutOfBandInvitationConfig.Exclude_keyofReceiveOutOfBandInvitationConfig.routing__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"label":{"dataType":"string","required":true},"alias":{"dataType":"string"},"imageUrl":{"dataType":"string"},"autoAcceptConnection":{"dataType":"boolean"},"autoAcceptInvitation":{"dataType":"boolean"},"reuseConnection":{"dataType":"boolean"},"acceptInvitationTimeoutMs":{"dataType":"double"},"ourDid":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommOutOfBandReceiveInvitationOptions": {
        "dataType": "refObject",
        "properties": {
            "label": {"dataType":"string","required":true},
            "alias": {"dataType":"string"},
            "imageUrl": {"dataType":"string"},
            "autoAcceptConnection": {"dataType":"boolean"},
            "autoAcceptInvitation": {"dataType":"boolean"},
            "reuseConnection": {"dataType":"boolean"},
            "acceptInvitationTimeoutMs": {"dataType":"double"},
            "ourDid": {"dataType":"string"},
            "invitation": {"dataType":"union","subSchemas":[{"ref":"DidCommPlaintextMessage"},{"dataType":"string"}],"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Did": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommOutOfBandAcceptInvitationOptions": {
        "dataType": "refObject",
        "properties": {
            "autoAcceptConnection": {"dataType":"boolean"},
            "reuseConnection": {"dataType":"boolean"},
            "label": {"dataType":"string","required":true},
            "alias": {"dataType":"string"},
            "imageUrl": {"dataType":"string"},
            "timeoutMs": {"dataType":"double"},
            "ourDid": {"ref":"Did"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommCredentialState": {
        "dataType": "refEnum",
        "enums": ["proposal-sent","proposal-received","offer-sent","offer-received","declined","request-sent","request-received","credential-issued","credential-received","done","abandoned"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommCredentialRole": {
        "dataType": "refEnum",
        "enums": ["issuer","holder"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommAutoAcceptCredential": {
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
    "DidCommCredentialPreviewAttributeOptions": {
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
            "state": {"ref":"DidCommCredentialState","required":true},
            "role": {"ref":"DidCommCredentialRole","required":true},
            "autoAcceptCredential": {"ref":"DidCommAutoAcceptCredential"},
            "revocationNotification": {"dataType":"nestedObjectLiteral","nestedProperties":{"comment":{"dataType":"string"},"revocationDate":{"dataType":"datetime","required":true}}},
            "errorMessage": {"dataType":"string"},
            "protocolVersion": {"dataType":"string","required":true},
            "credentials": {"dataType":"array","array":{"dataType":"refObject","ref":"CredentialRecordBinding"},"required":true},
            "credentialAttributes": {"dataType":"array","array":{"dataType":"refObject","ref":"DidCommCredentialPreviewAttributeOptions"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_AnonCredsDidCommCredentialProposalFormat.Exclude_keyofAnonCredsDidCommCredentialProposalFormat.schema_issuer_id-or-issuer_id__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"schema_name":{"dataType":"string"},"schema_version":{"dataType":"string"},"schema_id":{"dataType":"string"},"cred_def_id":{"dataType":"string"},"schema_issuer_did":{"dataType":"string"},"issuer_did":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_AnonCredsDidCommCredentialProposalFormat.schema_issuer_id-or-issuer_id_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_AnonCredsDidCommCredentialProposalFormat.Exclude_keyofAnonCredsDidCommCredentialProposalFormat.schema_issuer_id-or-issuer_id__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LegacyIndyDidCommCredentialProposalFormat": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_AnonCredsDidCommCredentialProposalFormat.schema_issuer_id-or-issuer_id_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsDidCommCredentialProposalFormat": {
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
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"indy":{"ref":"LegacyIndyDidCommCredentialProposalFormat"},"anoncreds":{"ref":"AnonCredsDidCommCredentialProposalFormat"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_string.unknown_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"},"validators":{}},
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
            "rev_reg": {"dataType":"any"},
            "witness": {"dataType":"any"},
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
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"proposal":{"ref":"CredentialFormatDataMessagePayload_CredentialFormats.proposal_"},"request":{"ref":"CredentialFormatDataMessagePayload_CredentialFormats.request_"},"offer":{"ref":"CredentialFormatDataMessagePayload_CredentialFormats.offer_"},"credential":{"ref":"CredentialFormatDataMessagePayload_CredentialFormats.credential_"},"proposalAttributes":{"dataType":"array","array":{"dataType":"refObject","ref":"DidCommCredentialPreviewAttributeOptions"}}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommCredentialsGetFormatDataResponse": {
        "dataType": "refObject",
        "properties": {
            "proposal": {"ref":"CredentialFormatDataMessagePayload_CredentialFormats.proposal_"},
            "request": {"ref":"CredentialFormatDataMessagePayload_CredentialFormats.request_"},
            "offer": {"ref":"CredentialFormatDataMessagePayload_CredentialFormats.offer_"},
            "credential": {"ref":"CredentialFormatDataMessagePayload_CredentialFormats.credential_"},
            "proposalAttributes": {"dataType":"array","array":{"dataType":"refObject","ref":"DidCommCredentialPreviewAttributeOptions"}},
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
    "AnonCredsDidCommProposeCredentialFormat": {
        "dataType": "refObject",
        "properties": {
            "schemaIssuerId": {"dataType":"string"},
            "schemaId": {"dataType":"string"},
            "schemaName": {"dataType":"string"},
            "schemaVersion": {"dataType":"string"},
            "credentialDefinitionId": {"dataType":"string"},
            "issuerId": {"dataType":"string"},
            "attributes": {"dataType":"array","array":{"dataType":"refObject","ref":"DidCommCredentialPreviewAttributeOptions"}},
            "schemaIssuerDid": {"dataType":"string"},
            "issuerDid": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_AnonCredsDidCommProposeCredentialFormat.Exclude_keyofAnonCredsDidCommProposeCredentialFormat.schemaIssuerId-or-issuerId__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"schemaId":{"dataType":"string"},"schemaName":{"dataType":"string"},"schemaVersion":{"dataType":"string"},"credentialDefinitionId":{"dataType":"string"},"attributes":{"dataType":"array","array":{"dataType":"refObject","ref":"DidCommCredentialPreviewAttributeOptions"}},"schemaIssuerDid":{"dataType":"string"},"issuerDid":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_AnonCredsDidCommProposeCredentialFormat.schemaIssuerId-or-issuerId_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_AnonCredsDidCommProposeCredentialFormat.Exclude_keyofAnonCredsDidCommProposeCredentialFormat.schemaIssuerId-or-issuerId__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LegacyIndyDidCommProposeCredentialFormat": {
        "dataType": "refAlias",
        "type": {"ref":"Omit_AnonCredsDidCommProposeCredentialFormat.schemaIssuerId-or-issuerId_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProposeCredentialOptions": {
        "dataType": "refObject",
        "properties": {
            "protocolVersion": {"ref":"CredentialProtocolVersion","required":true},
            "credentialFormats": {"dataType":"nestedObjectLiteral","nestedProperties":{"indy":{"dataType":"union","subSchemas":[{"ref":"AnonCredsDidCommProposeCredentialFormat"},{"ref":"LegacyIndyDidCommProposeCredentialFormat"}]},"anoncreds":{"dataType":"union","subSchemas":[{"ref":"AnonCredsDidCommProposeCredentialFormat"},{"ref":"LegacyIndyDidCommProposeCredentialFormat"}]}},"required":true},
            "autoAcceptCredential": {"ref":"DidCommAutoAcceptCredential"},
            "comment": {"dataType":"string"},
            "connectionId": {"ref":"RecordId","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsDidCommAcceptProposalFormat": {
        "dataType": "refObject",
        "properties": {
            "credentialDefinitionId": {"dataType":"string"},
            "revocationRegistryDefinitionId": {"dataType":"string"},
            "revocationRegistryIndex": {"dataType":"double"},
            "attributes": {"dataType":"array","array":{"dataType":"refObject","ref":"DidCommCredentialPreviewAttributeOptions"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AcceptCredentialProposalOptions": {
        "dataType": "refObject",
        "properties": {
            "credentialFormats": {"dataType":"nestedObjectLiteral","nestedProperties":{"indy":{"ref":"AnonCredsDidCommAcceptProposalFormat"},"anoncreds":{"ref":"AnonCredsDidCommAcceptProposalFormat"}}},
            "autoAcceptCredential": {"ref":"DidCommAutoAcceptCredential"},
            "comment": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommCredentialsCreateOfferResponse": {
        "dataType": "refObject",
        "properties": {
            "message": {"ref":"DidCommPlaintextMessage","required":true},
            "credentialExchange": {"ref":"DidCommCredentialExchangeRecord","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsDidCommOfferCredentialFormat": {
        "dataType": "refObject",
        "properties": {
            "credentialDefinitionId": {"dataType":"string","required":true},
            "revocationRegistryDefinitionId": {"dataType":"string"},
            "revocationRegistryIndex": {"dataType":"double"},
            "attributes": {"dataType":"array","array":{"dataType":"refObject","ref":"DidCommCredentialPreviewAttributeOptions"},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommCredentialFormatPayload_CredentialFormats.createOffer_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"indy":{"ref":"AnonCredsDidCommOfferCredentialFormat"},"anoncreds":{"ref":"AnonCredsDidCommOfferCredentialFormat"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateOfferOptions": {
        "dataType": "refObject",
        "properties": {
            "protocolVersion": {"ref":"CredentialProtocolVersion","required":true},
            "credentialFormats": {"ref":"DidCommCredentialFormatPayload_CredentialFormats.createOffer_","required":true},
            "autoAcceptCredential": {"ref":"DidCommAutoAcceptCredential"},
            "comment": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OfferCredentialOptions": {
        "dataType": "refObject",
        "properties": {
            "protocolVersion": {"ref":"CredentialProtocolVersion","required":true},
            "credentialFormats": {"ref":"DidCommCredentialFormatPayload_CredentialFormats.createOffer_","required":true},
            "autoAcceptCredential": {"ref":"DidCommAutoAcceptCredential"},
            "comment": {"dataType":"string"},
            "connectionId": {"ref":"RecordId","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsDidCommAcceptOfferFormat": {
        "dataType": "refObject",
        "properties": {
            "linkSecretId": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommCredentialFormatPayload_CredentialFormats.acceptOffer_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"indy":{"ref":"AnonCredsDidCommAcceptOfferFormat"},"anoncreds":{"ref":"AnonCredsDidCommAcceptOfferFormat"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AcceptCredentialOfferOptions": {
        "dataType": "refObject",
        "properties": {
            "credentialFormats": {"ref":"DidCommCredentialFormatPayload_CredentialFormats.acceptOffer_"},
            "autoAcceptCredential": {"ref":"DidCommAutoAcceptCredential"},
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
    "AnonCredsDidCommAcceptRequestFormat": {
        "dataType": "refAlias",
        "type": {"ref":"Record_string.never_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommCredentialFormatPayload_CredentialFormats.acceptRequest_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"indy":{"ref":"AnonCredsDidCommAcceptRequestFormat"},"anoncreds":{"ref":"AnonCredsDidCommAcceptRequestFormat"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AcceptCredentialRequestOptions": {
        "dataType": "refObject",
        "properties": {
            "credentialFormats": {"ref":"DidCommCredentialFormatPayload_CredentialFormats.acceptRequest_"},
            "autoAcceptCredential": {"ref":"DidCommAutoAcceptCredential"},
            "comment": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommDidExchangeState": {
        "dataType": "refEnum",
        "enums": ["start","invitation-sent","invitation-received","request-sent","request-received","response-sent","response-received","abandoned","completed"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommDidExchangeRole": {
        "dataType": "refEnum",
        "enums": ["requester","responder"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommConnectionType": {
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
            "state": {"ref":"DidCommDidExchangeState","required":true},
            "role": {"ref":"DidCommDidExchangeRole","required":true},
            "alias": {"dataType":"string"},
            "autoAcceptConnection": {"dataType":"boolean"},
            "threadId": {"ref":"ThreadId"},
            "imageUrl": {"dataType":"string"},
            "mediatorId": {"dataType":"string"},
            "errorMessage": {"dataType":"string"},
            "protocol": {"ref":"DidCommHandshakeProtocol"},
            "outOfBandId": {"dataType":"string"},
            "invitationDid": {"ref":"Did"},
            "connectionTypes": {"dataType":"array","array":{"dataType":"union","subSchemas":[{"ref":"DidCommConnectionType"},{"dataType":"string"}]}},
            "previousDids": {"dataType":"array","array":{"dataType":"refAlias","ref":"Did"}},
            "previousTheirDids": {"dataType":"array","array":{"dataType":"refAlias","ref":"Did"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCommBasicMessageRole": {
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
            "role": {"ref":"DidCommBasicMessageRole","required":true},
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
    "Record_string.any_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidResolutionMetadata": {
        "dataType": "refObject",
        "properties": {
            "contentType": {"dataType":"string"},
            "error": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["invalidDid"]},{"dataType":"enum","enums":["notFound"]},{"dataType":"enum","enums":["representationNotSupported"]},{"dataType":"enum","enums":["unsupportedDidMethod"]},{"dataType":"string"}]},
            "message": {"dataType":"string"},
            "servedFromCache": {"dataType":"boolean"},
            "servedFromDidRecord": {"dataType":"boolean"},
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
    "DidImportOptions": {
        "dataType": "refObject",
        "properties": {
            "did": {"ref":"Did","required":true},
            "didDocument": {"ref":"DidDocumentJson"},
            "privateKey": {"dataType":"string","required":true},
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
    "DidRegistrationExtraOptions": {
        "dataType": "refAlias",
        "type": {"ref":"Record_string.unknown_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidRegistrationSecretOptions": {
        "dataType": "refAlias",
        "type": {"ref":"Record_string.unknown_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_DidCreateBaseOptions.Exclude_keyofDidCreateBaseOptions.did-or-didDocument__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"method":{"dataType":"string"},"options":{"ref":"DidRegistrationExtraOptions"},"secret":{"ref":"DidRegistrationSecretOptions"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "KeyOrJwkDidCreateOptions": {
        "dataType": "refObject",
        "properties": {
            "method": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["key"]},{"dataType":"enum","enums":["jwk"]}],"required":true},
            "options": {"dataType":"nestedObjectLiteral","nestedProperties":{"keyType":{"dataType":"string","required":true}},"required":true},
            "secret": {"dataType":"nestedObjectLiteral","nestedProperties":{"privateKeyBase58":{"dataType":"string"},"seedBase58":{"dataType":"string"}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidDocument": {
        "dataType": "refAlias",
        "type": {"ref":"Record_string.any_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidCreateBaseOptions": {
        "dataType": "refObject",
        "properties": {
            "method": {"dataType":"string"},
            "did": {"dataType":"string"},
            "options": {"ref":"DidRegistrationExtraOptions"},
            "secret": {"ref":"DidRegistrationSecretOptions"},
            "didDocument": {"ref":"DidDocument"},
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
    "Partial_AnonCredsResolutionMetadata_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string"},"message":{"dataType":"string"},"servedFromCache":{"dataType":"boolean"},"servedFromRecord":{"dataType":"boolean"}},"additionalProperties":{"dataType":"any"},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AnonCredsGetSchemaFailedResponse": {
        "dataType": "refObject",
        "properties": {
            "schemaId": {"ref":"AnonCredsSchemaId","required":true},
            "schema": {"ref":"AnonCredsSchema"},
            "resolutionMetadata": {"ref":"Partial_AnonCredsResolutionMetadata_","required":true},
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
            "options": {"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"dataType":"any"}},
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
            "resolutionMetadata": {"ref":"Partial_AnonCredsResolutionMetadata_","required":true},
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
    "Pick_ReturnType_AgentConfig-at-toJSON_.Exclude_keyofReturnType_AgentConfig-at-toJSON_.walletConfig-or-logger-or-agentDependencies__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"autoUpdateStorageOnStartup":{"dataType":"boolean"},"allowInsecureHttpUrls":{"dataType":"boolean"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ApiAgentConfig": {
        "dataType": "refObject",
        "properties": {
            "autoUpdateStorageOnStartup": {"dataType":"boolean"},
            "allowInsecureHttpUrls": {"dataType":"boolean"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AgentInfo": {
        "dataType": "refObject",
        "properties": {
            "config": {"ref":"ApiAgentConfig"},
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
        app.get('/didcomm/proofs',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProofsController)),
            ...(fetchMiddlewares<RequestHandler>(ProofsController.prototype.findProofsByQuery)),

            async function ProofsController_findProofsByQuery(request: ExRequest, response: ExResponse, next: any) {
            const args: Record<string, TsoaRoute.ParameterSchema> = {
                    request: {"in":"request","name":"request","required":true,"dataType":"object"},
                    threadId: {"in":"query","name":"threadId","ref":"ThreadId"},
                    connectionId: {"in":"query","name":"connectionId","ref":"RecordId"},
                    state: {"in":"query","name":"state","ref":"DidCommProofState"},
                    parentThreadId: {"in":"query","name":"parentThreadId","ref":"ThreadId"},
                    role: {"in":"query","name":"role","ref":"DidCommProofRole"},
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
        app.post('/didcomm/proofs/:proofExchangeId/getCredsForProof',
            authenticateMiddleware([{"tenants":["tenant"]}]),
            ...(fetchMiddlewares<RequestHandler>(ProofsController)),
            ...(fetchMiddlewares<RequestHandler>(ProofsController.prototype.getCredsProofExchangeById)),

            async function ProofsController_getCredsProofExchangeById(request: ExRequest, response: ExResponse, next: any) {
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
                methodName: 'getCredsProofExchangeById',
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
                    proofExchangeRecordId: {"in":"path","name":"proofExchangeId","required":true,"ref":"RecordId"},
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
                    role: {"in":"query","name":"role","ref":"DidCommOutOfBandRole"},
                    state: {"in":"query","name":"state","ref":"DidCommOutOfBandState"},
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
                    state: {"in":"query","name":"state","ref":"DidCommCredentialState"},
                    role: {"in":"query","name":"role","ref":"DidCommCredentialRole"},
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
                    state: {"in":"query","name":"state","ref":"DidCommDidExchangeState"},
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
                    role: {"in":"query","name":"role","ref":"DidCommBasicMessageRole"},
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