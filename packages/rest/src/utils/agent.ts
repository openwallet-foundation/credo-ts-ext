import type { AnonCredsRegistry } from '@credo-ts/anoncreds'
import type { Agent, AutoAcceptCredential, AutoAcceptProof } from '@credo-ts/core'
import type { IndyVdrPoolConfig } from '@credo-ts/indy-vdr'
import type { TenantAgent } from '@credo-ts/tenants/build/TenantAgent'

import {
  AnonCredsCredentialFormatService,
  AnonCredsProofFormatService,
  V1CredentialProtocol,
  AnonCredsModule,
  LegacyIndyCredentialFormatService,
  LegacyIndyProofFormatService,
  V1ProofProtocol,
} from '@credo-ts/anoncreds'
import { AskarModule, AskarMultiWalletDatabaseScheme } from '@credo-ts/askar'
import {
  V2CredentialProtocol,
  V2ProofProtocol,
  ConnectionsModule,
  CredentialsModule,
  MediatorModule,
  ProofsModule,
  DidsModule,
  KeyDidRegistrar,
  JwkDidRegistrar,
  PeerDidRegistrar,
  WebDidResolver,
  KeyDidResolver,
  JwkDidResolver,
  PeerDidResolver,
} from '@credo-ts/core'
import {
  IndyVdrAnonCredsRegistry,
  IndyVdrModule,
  IndyVdrIndyDidResolver,
  IndyVdrSovDidResolver,
  IndyVdrIndyDidRegistrar,
} from '@credo-ts/indy-vdr'
import { OpenId4VcIssuerModule, OpenId4VcHolderModule, OpenId4VcVerifierModule } from '@credo-ts/openid4vc'
import { TenantsModule } from '@credo-ts/tenants'
import { anoncreds } from '@hyperledger/anoncreds-nodejs'
import { ariesAskar } from '@hyperledger/aries-askar-nodejs'
import { indyVdr } from '@hyperledger/indy-vdr-nodejs'

type ModulesWithoutTenants = Omit<ReturnType<typeof getAgentModules>, 'tenants'>

export type RestRootAgent = Agent<ModulesWithoutTenants>
export type RestRootAgentWithTenants = Agent<ModulesWithoutTenants & { tenants: TenantsModule<ModulesWithoutTenants> }>
export type RestTenantAgent = TenantAgent<ModulesWithoutTenants>
export type RestAgent = RestRootAgent | RestTenantAgent | RestRootAgentWithTenants

export function getAgentModules(options: {
  autoAcceptConnections: boolean
  autoAcceptProofs: AutoAcceptProof
  autoAcceptCredentials: AutoAcceptCredential
  autoAcceptMediationRequests: boolean
  indyLedgers?: [IndyVdrPoolConfig, ...IndyVdrPoolConfig[]]
  extraAnonCredsRegistries?: AnonCredsRegistry[]
  multiTenant: boolean
  baseUrl: string
}) {
  const legacyIndyCredentialFormatService = new LegacyIndyCredentialFormatService()
  const legacyIndyProofFormatService = new LegacyIndyProofFormatService()

  const baseUrlWithoutSlash = options.baseUrl.endsWith('/') ? options.baseUrl.slice(0, -1) : options.baseUrl

  const baseModules = {
    connections: new ConnectionsModule({
      autoAcceptConnections: options.autoAcceptConnections,
    }),
    proofs: new ProofsModule({
      autoAcceptProofs: options.autoAcceptProofs,
      proofProtocols: [
        new V1ProofProtocol({
          indyProofFormat: legacyIndyProofFormatService,
        }),
        new V2ProofProtocol({
          proofFormats: [legacyIndyProofFormatService, new AnonCredsProofFormatService()],
        }),
      ],
    }),
    credentials: new CredentialsModule({
      autoAcceptCredentials: options.autoAcceptCredentials,
      credentialProtocols: [
        new V1CredentialProtocol({
          indyCredentialFormat: legacyIndyCredentialFormatService,
        }),
        new V2CredentialProtocol({
          credentialFormats: [legacyIndyCredentialFormatService, new AnonCredsCredentialFormatService()],
        }),
      ],
    }),
    anoncreds: new AnonCredsModule({
      registries: [new IndyVdrAnonCredsRegistry(), ...(options.extraAnonCredsRegistries ?? [])],
      anoncreds,
    }),
    askar: new AskarModule({
      ariesAskar,
      multiWalletDatabaseScheme: AskarMultiWalletDatabaseScheme.ProfilePerWallet,
    }),
    mediator: new MediatorModule({
      autoAcceptMediationRequests: options.autoAcceptMediationRequests,
    }),
    dids: new DidsModule({
      registrars: [new KeyDidRegistrar(), new JwkDidRegistrar(), new PeerDidRegistrar(), new IndyVdrIndyDidRegistrar()],
      resolvers: [
        new WebDidResolver(),
        new KeyDidResolver(),
        new JwkDidResolver(),
        new PeerDidResolver(),
        new IndyVdrIndyDidResolver(),
        new IndyVdrSovDidResolver(),
      ],
    }),
    openId4VcIssuer: new OpenId4VcIssuerModule({
      baseUrl: `${baseUrlWithoutSlash}/oid4vci`,
      endpoints: {
        credential: {
          credentialRequestToCredentialMapper: () => {
            throw new Error('Not implemented')
          },
        },
      },
    }),
    openId4VcHolder: new OpenId4VcHolderModule(),
    openId4VcVerifier: new OpenId4VcVerifierModule({
      baseUrl: `${baseUrlWithoutSlash}/siop`,
    }),
  } as const

  const modules: typeof baseModules & { tenants?: TenantsModule<typeof baseModules>; indyVdr?: IndyVdrModule } =
    baseModules

  if (options.multiTenant) {
    modules.tenants = new TenantsModule({
      sessionLimit: Infinity,
    })
  }

  if (options.indyLedgers) {
    modules.indyVdr = new IndyVdrModule({
      indyVdr,
      networks: options.indyLedgers,
    })
  }

  return modules
}
