import type { AnonCredsRegistry } from '@credo-ts/anoncreds'
import type { ModulesMap } from '@credo-ts/core'
import type { IndyVdrPoolConfig } from '@credo-ts/indy-vdr'

import {
  AnonCredsCredentialFormatService,
  AnonCredsProofFormatService,
  V1CredentialProtocol,
  AnonCredsModule,
  LegacyIndyCredentialFormatService,
  LegacyIndyProofFormatService,
  V1ProofProtocol,
} from '@credo-ts/anoncreds'
import { AskarModule } from '@credo-ts/askar'
import {
  V2CredentialProtocol,
  V2ProofProtocol,
  Agent,
  AutoAcceptCredential,
  AutoAcceptProof,
  ConnectionsModule,
  CredentialsModule,
  HttpOutboundTransport,
  LogLevel,
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
import { agentDependencies, HttpInboundTransport } from '@credo-ts/node'
import { anoncreds } from '@hyperledger/anoncreds-nodejs'
import { ariesAskar } from '@hyperledger/aries-askar-nodejs'
import { indyVdr } from '@hyperledger/indy-vdr-nodejs'
import path from 'path'

import { TsLogger } from './logger'
import { BCOVRIN_TEST_GENESIS } from './util'

export interface RestAgentModules extends ModulesMap {
  connections: ConnectionsModule
  proofs: ProofsModule<[V1ProofProtocol, V2ProofProtocol<[LegacyIndyProofFormatService, AnonCredsProofFormatService]>]>
  credentials: CredentialsModule<[V1CredentialProtocol, V2CredentialProtocol]>
  anoncreds: AnonCredsModule
}

export type RestAgent<
  modules extends RestAgentModules = {
    connections: ConnectionsModule
    proofs: ProofsModule<
      [V1ProofProtocol, V2ProofProtocol<[LegacyIndyProofFormatService, AnonCredsProofFormatService]>]
    >
    credentials: CredentialsModule<
      [
        V1CredentialProtocol,
        V2CredentialProtocol<[LegacyIndyCredentialFormatService, AnonCredsCredentialFormatService]>,
      ]
    >
    anoncreds: AnonCredsModule
  },
> = Agent<modules>

export const genesisPath = process.env.GENESIS_TXN_PATH
  ? path.resolve(process.env.GENESIS_TXN_PATH)
  : path.join(__dirname, '../../../../network/genesis/local-genesis.txn')

export const getAgentModules = (options: {
  autoAcceptConnections: boolean
  autoAcceptProofs: AutoAcceptProof
  autoAcceptCredentials: AutoAcceptCredential
  autoAcceptMediationRequests: boolean
  indyLedgers?: [IndyVdrPoolConfig, ...IndyVdrPoolConfig[]]
  extraAnonCredsRegistries?: AnonCredsRegistry[]
}): RestAgentModules => {
  const legacyIndyCredentialFormatService = new LegacyIndyCredentialFormatService()
  const legacyIndyProofFormatService = new LegacyIndyProofFormatService()

  const modules: RestAgentModules = {
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
  }

  if (!options.indyLedgers) {
    return modules
  }

  return {
    ...modules,
    indyVdr: new IndyVdrModule({
      indyVdr,
      networks: options.indyLedgers,
    }),
  }
}

export const setupAgent = async ({
  name,
  endpoints,
  extraAnonCredsRegistries,
  httpInboundTransportPort,
}: {
  name: string
  endpoints: string[]
  extraAnonCredsRegistries?: AnonCredsRegistry[]
  httpInboundTransportPort?: number
}) => {
  // FIXME: logger should not be enabled by default
  const logger = new TsLogger(LogLevel.debug)

  const modules = getAgentModules({
    autoAcceptConnections: true,
    autoAcceptProofs: AutoAcceptProof.ContentApproved,
    autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
    autoAcceptMediationRequests: true,
    indyLedgers: [
      {
        isProduction: false,
        indyNamespace: 'bcovrin:test',
        genesisTransactions: BCOVRIN_TEST_GENESIS,
        connectOnStartup: true,
      },
    ],
    extraAnonCredsRegistries,
  })

  const agent = new Agent({
    config: {
      label: name,
      endpoints,
      walletConfig: { id: name, key: name },
      useDidSovPrefixWhereAllowed: true,
      logger: logger,
      autoUpdateStorageOnStartup: true,
    },
    dependencies: agentDependencies,
    modules,
  })

  agent.registerOutboundTransport(new HttpOutboundTransport())
  if (httpInboundTransportPort) {
    const httpInbound = new HttpInboundTransport({
      port: httpInboundTransportPort,
    })

    agent.registerInboundTransport(httpInbound)
  }

  await agent.initialize()

  return agent
}
