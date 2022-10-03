/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse, fetchMiddlewares } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AgentController } from './../controllers/agent/AgentController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BasicMessageController } from './../controllers/basic-messages/BasicMessageController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ConnectionController } from './../controllers/connections/ConnectionController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CredentialController } from './../controllers/credentials/CredentialController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CredentialDefinitionController } from './../controllers/credentials/CredentialDefinitionController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { SchemaController } from './../controllers/credentials/SchemaController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DidController } from './../controllers/did/DidController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { OutOfBandController } from './../controllers/outofband/OutOfBandController';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ProofController } from './../controllers/proofs/ProofController';
import { iocContainer } from './../utils/tsyringeTsoaIocContainer';
import { IocContainer, IocContainerFactory } from '@tsoa/runtime';
import type { RequestHandler } from 'express';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "AgentInfo": {
        "dataType": "refObject",
        "properties": {
            "label": {"dataType":"string","required":true},
            "endpoints": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "isInitialized": {"dataType":"boolean","required":true},
            "publicDid": {"dataType":"nestedObjectLiteral","nestedProperties":{"verkey":{"dataType":"string","required":true},"did":{"dataType":"string","required":true}}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_string.unknown_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BasicMessageRecord": {
        "dataType": "refAlias",
        "type": {"ref":"Record_string.unknown_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RecordId": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_content.string_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"content":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidExchangeState": {
        "dataType": "refEnum",
        "enums": ["start","invitation-sent","invitation-received","request-sent","request-received","response-sent","response-received","abandoned","completed"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Record_string.any_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialState": {
        "dataType": "refEnum",
        "enums": ["proposal-sent","proposal-received","offer-sent","offer-received","declined","request-sent","request-received","credential-issued","credential-received","done"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProtocolVersionType_CredentialServices_": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AutoAcceptCredential": {
        "dataType": "refEnum",
        "enums": ["always","contentApproved","never"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProposeCredentialOptions": {
        "dataType": "refObject",
        "properties": {
            "protocolVersion": {"ref":"ProtocolVersionType_CredentialServices_","required":true},
            "credentialFormats": {"dataType":"nestedObjectLiteral","nestedProperties":{"indy":{"dataType":"nestedObjectLiteral","nestedProperties":{"attributes":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"value":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}},"required":true},"issuerDid":{"dataType":"string","required":true},"credentialDefinitionId":{"dataType":"string","required":true},"schemaVersion":{"dataType":"string","required":true},"schemaName":{"dataType":"string","required":true},"schemaId":{"dataType":"string","required":true},"schemaIssuerDid":{"dataType":"string","required":true}},"required":true}},"required":true},
            "autoAcceptCredential": {"ref":"AutoAcceptCredential"},
            "comment": {"dataType":"string"},
            "connectionId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AcceptCredentialProposalOptions": {
        "dataType": "refObject",
        "properties": {
            "credentialFormats": {"dataType":"nestedObjectLiteral","nestedProperties":{"indy":{"dataType":"nestedObjectLiteral","nestedProperties":{"attributes":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"value":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}},"required":true},"issuerDid":{"dataType":"string","required":true},"credentialDefinitionId":{"dataType":"string","required":true},"schemaVersion":{"dataType":"string","required":true},"schemaName":{"dataType":"string","required":true},"schemaId":{"dataType":"string","required":true},"schemaIssuerDid":{"dataType":"string","required":true}},"required":true}}},
            "autoAcceptCredential": {"ref":"AutoAcceptCredential"},
            "comment": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateOfferOptions": {
        "dataType": "refObject",
        "properties": {
            "protocolVersion": {"ref":"ProtocolVersionType_CredentialServices_","required":true},
            "credentialFormats": {"dataType":"nestedObjectLiteral","nestedProperties":{"indy":{"dataType":"nestedObjectLiteral","nestedProperties":{"attributes":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"value":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}},"required":true},"credentialDefinitionId":{"dataType":"string","required":true}},"required":true}},"required":true},
            "autoAcceptCredential": {"ref":"AutoAcceptCredential"},
            "comment": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OfferCredentialOptions": {
        "dataType": "refObject",
        "properties": {
            "protocolVersion": {"ref":"ProtocolVersionType_CredentialServices_","required":true},
            "credentialFormats": {"dataType":"nestedObjectLiteral","nestedProperties":{"indy":{"dataType":"nestedObjectLiteral","nestedProperties":{"attributes":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"value":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}}},"required":true},"credentialDefinitionId":{"dataType":"string","required":true}},"required":true}},"required":true},
            "autoAcceptCredential": {"ref":"AutoAcceptCredential"},
            "comment": {"dataType":"string"},
            "connectionId": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IndyAcceptOfferFormat": {
        "dataType": "refObject",
        "properties": {
            "holderDid": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CredentialFormatPayload_CredentialFormats.acceptOffer_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"indy":{"ref":"IndyAcceptOfferFormat"}},"validators":{}},
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
    "CredentialFormatPayload_CredentialFormats.acceptRequest_": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"indy":{"ref":"Record_string.any_"}},"validators":{}},
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
    "CredentialDefinitionId": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SchemaId": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Version": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidResolutionMetadata": {
        "dataType": "refObject",
        "properties": {
            "contentType": {"dataType":"string"},
            "error": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["invalidDid"]},{"dataType":"enum","enums":["notFound"]},{"dataType":"enum","enums":["representationNotSupported"]},{"dataType":"enum","enums":["unsupportedDidMethod"]},{"dataType":"string"}]},
            "message": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "DidDocument": {
        "dataType": "refAlias",
        "type": {"ref":"Record_string.any_","validators":{}},
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
    "DidResolutionResult": {
        "dataType": "refObject",
        "properties": {
            "didResolutionMetadata": {"ref":"DidResolutionMetadata","required":true},
            "didDocument": {"dataType":"union","subSchemas":[{"ref":"DidDocument"},{"dataType":"enum","enums":[null]}],"required":true},
            "didDocumentMetadata": {"ref":"DidDocumentMetadata","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Did": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "HandshakeProtocol": {
        "dataType": "refEnum",
        "enums": ["https://didcomm.org/connections/1.0","https://didcomm.org/didexchange/1.0"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_CreateOutOfBandInvitationConfig.Exclude_keyofCreateOutOfBandInvitationConfig.routing-or-appendedAttachments-or-messages__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"alias":{"dataType":"string"},"label":{"dataType":"string"},"imageUrl":{"dataType":"string"},"goalCode":{"dataType":"string"},"goal":{"dataType":"string"},"handshake":{"dataType":"boolean"},"handshakeProtocols":{"dataType":"array","array":{"dataType":"refEnum","ref":"HandshakeProtocol"}},"multiUseInvitation":{"dataType":"boolean"},"autoAcceptConnection":{"dataType":"boolean"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_CreateOutOfBandInvitationConfig.routing-or-appendedAttachments-or-messages_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_CreateOutOfBandInvitationConfig.Exclude_keyofCreateOutOfBandInvitationConfig.routing-or-appendedAttachments-or-messages__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_CreateLegacyInvitationConfig.Exclude_keyofCreateLegacyInvitationConfig.routing__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"alias":{"dataType":"string"},"label":{"dataType":"string"},"imageUrl":{"dataType":"string"},"multiUseInvitation":{"dataType":"boolean"},"autoAcceptConnection":{"dataType":"boolean"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_CreateLegacyInvitationConfig.routing_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_CreateLegacyInvitationConfig.Exclude_keyofCreateLegacyInvitationConfig.routing__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AgentMessageType": {
        "dataType": "refObject",
        "properties": {
            "@id": {"dataType":"string","required":true},
            "@type": {"dataType":"string","required":true},
        },
        "additionalProperties": {"dataType":"any"},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "OutOfBandDidCommService": {
        "dataType": "refObject",
        "properties": {
            "id": {"dataType":"string","required":true},
            "serviceEndpoint": {"dataType":"string","required":true},
            "type": {"dataType":"string","required":true},
            "recipientKeys": {"dataType":"array","array":{"dataType":"string"},"required":true},
            "routingKeys": {"dataType":"array","array":{"dataType":"string"}},
            "accept": {"dataType":"array","array":{"dataType":"string"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_OutOfBandInvitationSchema.Exclude_keyofOutOfBandInvitationSchema.appendedAttachments__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"label":{"dataType":"string","required":true},"imageUrl":{"dataType":"string"},"goalCode":{"dataType":"string"},"goal":{"dataType":"string"},"@id":{"dataType":"string"},"@type":{"dataType":"string","required":true},"accept":{"dataType":"array","array":{"dataType":"string"}},"handshake_protocols":{"dataType":"array","array":{"dataType":"refEnum","ref":"HandshakeProtocol"}},"services":{"dataType":"array","array":{"dataType":"union","subSchemas":[{"ref":"OutOfBandDidCommService"},{"dataType":"string"}]},"required":true}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_OutOfBandInvitationSchema.appendedAttachments_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_OutOfBandInvitationSchema.Exclude_keyofOutOfBandInvitationSchema.appendedAttachments__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_ReceiveOutOfBandInvitationConfig.Exclude_keyofReceiveOutOfBandInvitationConfig.routing__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"alias":{"dataType":"string"},"label":{"dataType":"string"},"imageUrl":{"dataType":"string"},"autoAcceptConnection":{"dataType":"boolean"},"autoAcceptInvitation":{"dataType":"boolean"},"reuseConnection":{"dataType":"boolean"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_ReceiveOutOfBandInvitationConfig.routing_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_ReceiveOutOfBandInvitationConfig.Exclude_keyofReceiveOutOfBandInvitationConfig.routing__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReceiveInvitationProps": {
        "dataType": "refObject",
        "properties": {
            "alias": {"dataType":"string"},
            "label": {"dataType":"string"},
            "imageUrl": {"dataType":"string"},
            "autoAcceptConnection": {"dataType":"boolean"},
            "autoAcceptInvitation": {"dataType":"boolean"},
            "reuseConnection": {"dataType":"boolean"},
            "invitation": {"ref":"Omit_OutOfBandInvitationSchema.appendedAttachments_","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ReceiveInvitationByUrlProps": {
        "dataType": "refObject",
        "properties": {
            "alias": {"dataType":"string"},
            "label": {"dataType":"string"},
            "imageUrl": {"dataType":"string"},
            "autoAcceptConnection": {"dataType":"boolean"},
            "autoAcceptInvitation": {"dataType":"boolean"},
            "reuseConnection": {"dataType":"boolean"},
            "invitationUrl": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AcceptInvitationConfig": {
        "dataType": "refObject",
        "properties": {
            "autoAcceptConnection": {"dataType":"boolean"},
            "reuseConnection": {"dataType":"boolean"},
            "label": {"dataType":"string"},
            "alias": {"dataType":"string"},
            "imageUrl": {"dataType":"string"},
            "mediatorId": {"dataType":"string"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PresentationPreviewAttributeOptions": {
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
    "PredicateType": {
        "dataType": "refEnum",
        "enums": ["<","<=",">",">="],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "PresentationPreviewPredicateOptions": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "credentialDefinitionId": {"dataType":"string","required":true},
            "predicate": {"ref":"PredicateType","required":true},
            "threshold": {"dataType":"double","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AutoAcceptProof": {
        "dataType": "refEnum",
        "enums": ["always","contentApproved","never"],
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RequestProofProposalOptions": {
        "dataType": "refObject",
        "properties": {
            "connectionId": {"dataType":"string","required":true},
            "attributes": {"dataType":"array","array":{"dataType":"refObject","ref":"PresentationPreviewAttributeOptions"},"required":true},
            "predicates": {"dataType":"array","array":{"dataType":"refObject","ref":"PresentationPreviewPredicateOptions"},"required":true},
            "comment": {"dataType":"string"},
            "autoAcceptProof": {"ref":"AutoAcceptProof"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProofRecord": {
        "dataType": "refAlias",
        "type": {"ref":"Record_string.unknown_","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "IndyRevocationInterval": {
        "dataType": "refObject",
        "properties": {
            "from": {"dataType":"double"},
            "to": {"dataType":"double"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AttributeValue": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "value": {"dataType":"string","required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AttributeFilter": {
        "dataType": "refObject",
        "properties": {
            "schemaId": {"dataType":"string"},
            "schemaIssuerDid": {"dataType":"string"},
            "schemaName": {"dataType":"string"},
            "schemaVersion": {"dataType":"string"},
            "issuerDid": {"dataType":"string"},
            "credentialDefinitionId": {"dataType":"string"},
            "attributeValue": {"ref":"AttributeValue"},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProofAttributeInfo": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "names": {"dataType":"array","array":{"dataType":"string"}},
            "nonRevoked": {"ref":"IndyRevocationInterval"},
            "restrictions": {"dataType":"array","array":{"dataType":"refObject","ref":"AttributeFilter"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ProofPredicateInfo": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "predicateType": {"ref":"PredicateType","required":true},
            "predicateValue": {"dataType":"double","required":true},
            "nonRevoked": {"ref":"IndyRevocationInterval"},
            "restrictions": {"dataType":"array","array":{"dataType":"refObject","ref":"AttributeFilter"}},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Pick_RequestProofOptions.Exclude_keyofRequestProofOptions.connectionId__": {
        "dataType": "refAlias",
        "type": {"dataType":"nestedObjectLiteral","nestedProperties":{"comment":{"dataType":"string"},"autoAcceptProof":{"ref":"AutoAcceptProof"},"proofRequestOptions":{"dataType":"nestedObjectLiteral","nestedProperties":{"requestedPredicates":{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"ref":"ProofPredicateInfo"}},"requestedAttributes":{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"ref":"ProofAttributeInfo"}},"version":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}},"required":true},"parentThreadId":{"dataType":"string"}},"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Omit_RequestProofOptions.connectionId_": {
        "dataType": "refAlias",
        "type": {"ref":"Pick_RequestProofOptions.Exclude_keyofRequestProofOptions.connectionId__","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RequestProofOptions": {
        "dataType": "refObject",
        "properties": {
            "comment": {"dataType":"string"},
            "autoAcceptProof": {"ref":"AutoAcceptProof"},
            "parentThreadId": {"dataType":"string"},
            "connectionId": {"dataType":"string","required":true},
            "proofRequestOptions": {"dataType":"nestedObjectLiteral","nestedProperties":{"requestedPredicates":{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"ref":"ProofPredicateInfo"}},"requestedAttributes":{"dataType":"nestedObjectLiteral","nestedProperties":{},"additionalProperties":{"ref":"ProofAttributeInfo"}},"version":{"dataType":"string","required":true},"name":{"dataType":"string","required":true}},"required":true},
        },
        "additionalProperties": false,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.get('/agent',
            ...(fetchMiddlewares<RequestHandler>(AgentController)),
            ...(fetchMiddlewares<RequestHandler>(AgentController.prototype.getAgentInfo)),

            async function AgentController_getAgentInfo(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<AgentController>(AgentController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getAgentInfo.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/basic-messages/:connectionId',
            ...(fetchMiddlewares<RequestHandler>(BasicMessageController)),
            ...(fetchMiddlewares<RequestHandler>(BasicMessageController.prototype.getBasicMessages)),

            async function BasicMessageController_getBasicMessages(request: any, response: any, next: any) {
            const args = {
                    connectionId: {"in":"path","name":"connectionId","required":true,"ref":"RecordId"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<BasicMessageController>(BasicMessageController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getBasicMessages.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/basic-messages/:connectionId',
            ...(fetchMiddlewares<RequestHandler>(BasicMessageController)),
            ...(fetchMiddlewares<RequestHandler>(BasicMessageController.prototype.sendMessage)),

            async function BasicMessageController_sendMessage(request: any, response: any, next: any) {
            const args = {
                    connectionId: {"in":"path","name":"connectionId","required":true,"ref":"RecordId"},
                    request: {"in":"body","name":"request","required":true,"ref":"Record_content.string_"},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<BasicMessageController>(BasicMessageController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.sendMessage.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/connections',
            ...(fetchMiddlewares<RequestHandler>(ConnectionController)),
            ...(fetchMiddlewares<RequestHandler>(ConnectionController.prototype.getAllConnections)),

            async function ConnectionController_getAllConnections(request: any, response: any, next: any) {
            const args = {
                    outOfBandId: {"in":"query","name":"outOfBandId","dataType":"string"},
                    alias: {"in":"query","name":"alias","dataType":"string"},
                    state: {"in":"query","name":"state","ref":"DidExchangeState"},
                    myDid: {"in":"query","name":"myDid","dataType":"string"},
                    theirDid: {"in":"query","name":"theirDid","dataType":"string"},
                    theirLabel: {"in":"query","name":"theirLabel","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ConnectionController>(ConnectionController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getAllConnections.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/connections/:connectionId',
            ...(fetchMiddlewares<RequestHandler>(ConnectionController)),
            ...(fetchMiddlewares<RequestHandler>(ConnectionController.prototype.getConnectionById)),

            async function ConnectionController_getConnectionById(request: any, response: any, next: any) {
            const args = {
                    connectionId: {"in":"path","name":"connectionId","required":true,"ref":"RecordId"},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ConnectionController>(ConnectionController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getConnectionById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/connections/:connectionId',
            ...(fetchMiddlewares<RequestHandler>(ConnectionController)),
            ...(fetchMiddlewares<RequestHandler>(ConnectionController.prototype.deleteConnection)),

            async function ConnectionController_deleteConnection(request: any, response: any, next: any) {
            const args = {
                    connectionId: {"in":"path","name":"connectionId","required":true,"ref":"RecordId"},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ConnectionController>(ConnectionController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.deleteConnection.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/connections/:connectionId/accept-request',
            ...(fetchMiddlewares<RequestHandler>(ConnectionController)),
            ...(fetchMiddlewares<RequestHandler>(ConnectionController.prototype.acceptRequest)),

            async function ConnectionController_acceptRequest(request: any, response: any, next: any) {
            const args = {
                    connectionId: {"in":"path","name":"connectionId","required":true,"ref":"RecordId"},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ConnectionController>(ConnectionController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.acceptRequest.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/connections/:connectionId/accept-response',
            ...(fetchMiddlewares<RequestHandler>(ConnectionController)),
            ...(fetchMiddlewares<RequestHandler>(ConnectionController.prototype.acceptResponse)),

            async function ConnectionController_acceptResponse(request: any, response: any, next: any) {
            const args = {
                    connectionId: {"in":"path","name":"connectionId","required":true,"ref":"RecordId"},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ConnectionController>(ConnectionController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.acceptResponse.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/credentials',
            ...(fetchMiddlewares<RequestHandler>(CredentialController)),
            ...(fetchMiddlewares<RequestHandler>(CredentialController.prototype.getAllCredentials)),

            async function CredentialController_getAllCredentials(request: any, response: any, next: any) {
            const args = {
                    threadId: {"in":"query","name":"threadId","dataType":"string"},
                    connectionId: {"in":"query","name":"connectionId","dataType":"string"},
                    state: {"in":"query","name":"state","ref":"CredentialState"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CredentialController>(CredentialController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getAllCredentials.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/credentials/:credentialRecordId',
            ...(fetchMiddlewares<RequestHandler>(CredentialController)),
            ...(fetchMiddlewares<RequestHandler>(CredentialController.prototype.getCredentialById)),

            async function CredentialController_getCredentialById(request: any, response: any, next: any) {
            const args = {
                    credentialRecordId: {"in":"path","name":"credentialRecordId","required":true,"ref":"RecordId"},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CredentialController>(CredentialController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getCredentialById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/credentials/:credentialRecordId',
            ...(fetchMiddlewares<RequestHandler>(CredentialController)),
            ...(fetchMiddlewares<RequestHandler>(CredentialController.prototype.deleteCredential)),

            async function CredentialController_deleteCredential(request: any, response: any, next: any) {
            const args = {
                    credentialRecordId: {"in":"path","name":"credentialRecordId","required":true,"ref":"RecordId"},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CredentialController>(CredentialController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.deleteCredential.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/credentials/propose-credential',
            ...(fetchMiddlewares<RequestHandler>(CredentialController)),
            ...(fetchMiddlewares<RequestHandler>(CredentialController.prototype.proposeCredential)),

            async function CredentialController_proposeCredential(request: any, response: any, next: any) {
            const args = {
                    options: {"in":"body","name":"options","required":true,"ref":"ProposeCredentialOptions"},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CredentialController>(CredentialController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.proposeCredential.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/credentials/:credentialRecordId/accept-proposal',
            ...(fetchMiddlewares<RequestHandler>(CredentialController)),
            ...(fetchMiddlewares<RequestHandler>(CredentialController.prototype.acceptProposal)),

            async function CredentialController_acceptProposal(request: any, response: any, next: any) {
            const args = {
                    credentialRecordId: {"in":"path","name":"credentialRecordId","required":true,"ref":"RecordId"},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
                    options: {"in":"body","name":"options","ref":"AcceptCredentialProposalOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CredentialController>(CredentialController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.acceptProposal.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/credentials/create-offer',
            ...(fetchMiddlewares<RequestHandler>(CredentialController)),
            ...(fetchMiddlewares<RequestHandler>(CredentialController.prototype.createOffer)),

            async function CredentialController_createOffer(request: any, response: any, next: any) {
            const args = {
                    options: {"in":"body","name":"options","required":true,"ref":"CreateOfferOptions"},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CredentialController>(CredentialController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.createOffer.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/credentials/offer-credential',
            ...(fetchMiddlewares<RequestHandler>(CredentialController)),
            ...(fetchMiddlewares<RequestHandler>(CredentialController.prototype.offerCredential)),

            async function CredentialController_offerCredential(request: any, response: any, next: any) {
            const args = {
                    options: {"in":"body","name":"options","required":true,"ref":"OfferCredentialOptions"},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CredentialController>(CredentialController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.offerCredential.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/credentials/:credentialRecordId/accept-offer',
            ...(fetchMiddlewares<RequestHandler>(CredentialController)),
            ...(fetchMiddlewares<RequestHandler>(CredentialController.prototype.acceptOffer)),

            async function CredentialController_acceptOffer(request: any, response: any, next: any) {
            const args = {
                    credentialRecordId: {"in":"path","name":"credentialRecordId","required":true,"ref":"RecordId"},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
                    options: {"in":"body","name":"options","ref":"AcceptCredentialOfferOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CredentialController>(CredentialController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.acceptOffer.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/credentials/:credentialRecordId/accept-request',
            ...(fetchMiddlewares<RequestHandler>(CredentialController)),
            ...(fetchMiddlewares<RequestHandler>(CredentialController.prototype.acceptRequest)),

            async function CredentialController_acceptRequest(request: any, response: any, next: any) {
            const args = {
                    credentialRecordId: {"in":"path","name":"credentialRecordId","required":true,"ref":"RecordId"},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
                    options: {"in":"body","name":"options","ref":"AcceptCredentialRequestOptions"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CredentialController>(CredentialController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.acceptRequest.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/credentials/:credentialRecordId/accept-credential',
            ...(fetchMiddlewares<RequestHandler>(CredentialController)),
            ...(fetchMiddlewares<RequestHandler>(CredentialController.prototype.acceptCredential)),

            async function CredentialController_acceptCredential(request: any, response: any, next: any) {
            const args = {
                    credentialRecordId: {"in":"path","name":"credentialRecordId","required":true,"ref":"RecordId"},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CredentialController>(CredentialController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.acceptCredential.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/credential-definitions/:credentialDefinitionId',
            ...(fetchMiddlewares<RequestHandler>(CredentialDefinitionController)),
            ...(fetchMiddlewares<RequestHandler>(CredentialDefinitionController.prototype.getCredentialDefinitionById)),

            async function CredentialDefinitionController_getCredentialDefinitionById(request: any, response: any, next: any) {
            const args = {
                    credentialDefinitionId: {"in":"path","name":"credentialDefinitionId","required":true,"ref":"CredentialDefinitionId"},
                    badRequestError: {"in":"res","name":"400","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CredentialDefinitionController>(CredentialDefinitionController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getCredentialDefinitionById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/credential-definitions',
            ...(fetchMiddlewares<RequestHandler>(CredentialDefinitionController)),
            ...(fetchMiddlewares<RequestHandler>(CredentialDefinitionController.prototype.createCredentialDefinition)),

            async function CredentialDefinitionController_createCredentialDefinition(request: any, response: any, next: any) {
            const args = {
                    credentialDefinitionRequest: {"in":"body","name":"credentialDefinitionRequest","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"tag":{"dataType":"string","required":true},"supportRevocation":{"dataType":"boolean","required":true},"schemaId":{"ref":"SchemaId","required":true}}},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<CredentialDefinitionController>(CredentialDefinitionController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.createCredentialDefinition.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/schemas/:schemaId',
            ...(fetchMiddlewares<RequestHandler>(SchemaController)),
            ...(fetchMiddlewares<RequestHandler>(SchemaController.prototype.getSchemaById)),

            async function SchemaController_getSchemaById(request: any, response: any, next: any) {
            const args = {
                    schemaId: {"in":"path","name":"schemaId","required":true,"ref":"SchemaId"},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    forbiddenError: {"in":"res","name":"403","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    badRequestError: {"in":"res","name":"400","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<SchemaController>(SchemaController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getSchemaById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/schemas',
            ...(fetchMiddlewares<RequestHandler>(SchemaController)),
            ...(fetchMiddlewares<RequestHandler>(SchemaController.prototype.createSchema)),

            async function SchemaController_createSchema(request: any, response: any, next: any) {
            const args = {
                    schema: {"in":"body","name":"schema","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"attributes":{"dataType":"array","array":{"dataType":"string"},"required":true},"version":{"ref":"Version","required":true},"name":{"dataType":"string","required":true}}},
                    forbiddenError: {"in":"res","name":"400","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<SchemaController>(SchemaController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.createSchema.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/dids/:did',
            ...(fetchMiddlewares<RequestHandler>(DidController)),
            ...(fetchMiddlewares<RequestHandler>(DidController.prototype.getDidRecordByDid)),

            async function DidController_getDidRecordByDid(request: any, response: any, next: any) {
            const args = {
                    did: {"in":"path","name":"did","required":true,"ref":"Did"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<DidController>(DidController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getDidRecordByDid.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/oob',
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController)),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController.prototype.getAllOutOfBandRecords)),

            async function OutOfBandController_getAllOutOfBandRecords(request: any, response: any, next: any) {
            const args = {
                    invitationId: {"in":"query","name":"invitationId","ref":"RecordId"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OutOfBandController>(OutOfBandController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getAllOutOfBandRecords.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/oob/:outOfBandId',
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController)),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController.prototype.getOutOfBandRecordById)),

            async function OutOfBandController_getOutOfBandRecordById(request: any, response: any, next: any) {
            const args = {
                    outOfBandId: {"in":"path","name":"outOfBandId","required":true,"ref":"RecordId"},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OutOfBandController>(OutOfBandController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getOutOfBandRecordById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/oob/create-invitation',
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController)),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController.prototype.createInvitation)),

            async function OutOfBandController_createInvitation(request: any, response: any, next: any) {
            const args = {
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
                    config: {"in":"body","name":"config","ref":"Omit_CreateOutOfBandInvitationConfig.routing-or-appendedAttachments-or-messages_"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OutOfBandController>(OutOfBandController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.createInvitation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/oob/create-legacy-invitation',
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController)),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController.prototype.createLegacyInvitation)),

            async function OutOfBandController_createLegacyInvitation(request: any, response: any, next: any) {
            const args = {
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
                    config: {"in":"body","name":"config","ref":"Omit_CreateLegacyInvitationConfig.routing_"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OutOfBandController>(OutOfBandController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.createLegacyInvitation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/oob/create-legacy-connectionless-invitation',
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController)),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController.prototype.createLegacyConnectionlessInvitation)),

            async function OutOfBandController_createLegacyConnectionlessInvitation(request: any, response: any, next: any) {
            const args = {
                    config: {"in":"body","name":"config","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"domain":{"dataType":"string","required":true},"message":{"ref":"AgentMessageType","required":true},"recordId":{"dataType":"string","required":true}}},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OutOfBandController>(OutOfBandController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.createLegacyConnectionlessInvitation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/oob/receive-invitation',
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController)),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController.prototype.receiveInvitation)),

            async function OutOfBandController_receiveInvitation(request: any, response: any, next: any) {
            const args = {
                    invitationRequest: {"in":"body","name":"invitationRequest","required":true,"ref":"ReceiveInvitationProps"},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OutOfBandController>(OutOfBandController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.receiveInvitation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/oob/receive-invitation-url',
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController)),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController.prototype.receiveInvitationFromUrl)),

            async function OutOfBandController_receiveInvitationFromUrl(request: any, response: any, next: any) {
            const args = {
                    invitationRequest: {"in":"body","name":"invitationRequest","required":true,"ref":"ReceiveInvitationByUrlProps"},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OutOfBandController>(OutOfBandController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.receiveInvitationFromUrl.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/oob/:outOfBandId/accept-invitation',
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController)),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController.prototype.acceptInvitation)),

            async function OutOfBandController_acceptInvitation(request: any, response: any, next: any) {
            const args = {
                    outOfBandId: {"in":"path","name":"outOfBandId","required":true,"ref":"RecordId"},
                    acceptInvitationConfig: {"in":"body","name":"acceptInvitationConfig","required":true,"ref":"AcceptInvitationConfig"},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OutOfBandController>(OutOfBandController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.acceptInvitation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/oob/:outOfBandId',
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController)),
            ...(fetchMiddlewares<RequestHandler>(OutOfBandController.prototype.deleteOutOfBandRecord)),

            async function OutOfBandController_deleteOutOfBandRecord(request: any, response: any, next: any) {
            const args = {
                    outOfBandId: {"in":"path","name":"outOfBandId","required":true,"ref":"RecordId"},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<OutOfBandController>(OutOfBandController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.deleteOutOfBandRecord.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/proofs',
            ...(fetchMiddlewares<RequestHandler>(ProofController)),
            ...(fetchMiddlewares<RequestHandler>(ProofController.prototype.getAllProofs)),

            async function ProofController_getAllProofs(request: any, response: any, next: any) {
            const args = {
                    threadId: {"in":"query","name":"threadId","dataType":"string"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ProofController>(ProofController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getAllProofs.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.get('/proofs/:proofRecordId',
            ...(fetchMiddlewares<RequestHandler>(ProofController)),
            ...(fetchMiddlewares<RequestHandler>(ProofController.prototype.getProofById)),

            async function ProofController_getProofById(request: any, response: any, next: any) {
            const args = {
                    proofRecordId: {"in":"path","name":"proofRecordId","required":true,"ref":"RecordId"},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ProofController>(ProofController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.getProofById.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/proofs/:proofRecordId',
            ...(fetchMiddlewares<RequestHandler>(ProofController)),
            ...(fetchMiddlewares<RequestHandler>(ProofController.prototype.deleteProof)),

            async function ProofController_deleteProof(request: any, response: any, next: any) {
            const args = {
                    proofRecordId: {"in":"path","name":"proofRecordId","required":true,"ref":"RecordId"},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ProofController>(ProofController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.deleteProof.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/proofs/propose-proof',
            ...(fetchMiddlewares<RequestHandler>(ProofController)),
            ...(fetchMiddlewares<RequestHandler>(ProofController.prototype.proposeProof)),

            async function ProofController_proposeProof(request: any, response: any, next: any) {
            const args = {
                    proposal: {"in":"body","name":"proposal","required":true,"ref":"RequestProofProposalOptions"},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ProofController>(ProofController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.proposeProof.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/proofs/:proofRecordId/accept-proposal',
            ...(fetchMiddlewares<RequestHandler>(ProofController)),
            ...(fetchMiddlewares<RequestHandler>(ProofController.prototype.acceptProposal)),

            async function ProofController_acceptProposal(request: any, response: any, next: any) {
            const args = {
                    proofRecordId: {"in":"path","name":"proofRecordId","required":true,"dataType":"string"},
                    proposal: {"in":"body","name":"proposal","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"comment":{"dataType":"string"},"request":{"dataType":"nestedObjectLiteral","nestedProperties":{"nonce":{"dataType":"string"},"version":{"dataType":"string"},"name":{"dataType":"string"}},"required":true}}},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ProofController>(ProofController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.acceptProposal.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/proofs/request-outofband-proof',
            ...(fetchMiddlewares<RequestHandler>(ProofController)),
            ...(fetchMiddlewares<RequestHandler>(ProofController.prototype.requestProofOutOfBand)),

            async function ProofController_requestProofOutOfBand(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"Omit_RequestProofOptions.connectionId_"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ProofController>(ProofController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.requestProofOutOfBand.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/proofs/request-proof',
            ...(fetchMiddlewares<RequestHandler>(ProofController)),
            ...(fetchMiddlewares<RequestHandler>(ProofController.prototype.requestProof)),

            async function ProofController_requestProof(request: any, response: any, next: any) {
            const args = {
                    request: {"in":"body","name":"request","required":true,"ref":"RequestProofOptions"},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ProofController>(ProofController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.requestProof.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/proofs/:proofRecordId/accept-request',
            ...(fetchMiddlewares<RequestHandler>(ProofController)),
            ...(fetchMiddlewares<RequestHandler>(ProofController.prototype.acceptRequest)),

            async function ProofController_acceptRequest(request: any, response: any, next: any) {
            const args = {
                    proofRecordId: {"in":"path","name":"proofRecordId","required":true,"dataType":"string"},
                    request: {"in":"body","name":"request","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"comment":{"dataType":"string"},"filterByNonRevocationRequirements":{"dataType":"boolean"},"filterByPresentationPreview":{"dataType":"boolean"}}},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ProofController>(ProofController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.acceptRequest.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/proofs/:proofRecordId/accept-presentation',
            ...(fetchMiddlewares<RequestHandler>(ProofController)),
            ...(fetchMiddlewares<RequestHandler>(ProofController.prototype.acceptPresentation)),

            async function ProofController_acceptPresentation(request: any, response: any, next: any) {
            const args = {
                    proofRecordId: {"in":"path","name":"proofRecordId","required":true,"dataType":"string"},
                    notFoundError: {"in":"res","name":"404","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"reason":{"dataType":"string","required":true}}},
                    internalServerError: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"message":{"dataType":"string","required":true}}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);

                const container: IocContainer = typeof iocContainer === 'function' ? (iocContainer as IocContainerFactory)(request) : iocContainer;

                const controller: any = await container.get<ProofController>(ProofController);
                if (typeof controller['setStatus'] === 'function') {
                controller.setStatus(undefined);
                }


              const promise = controller.acceptPresentation.apply(controller, validatedArgs as any);
              promiseHandler(controller, promise, response, undefined, next);
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"throw-on-extras"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"throw-on-extras"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
