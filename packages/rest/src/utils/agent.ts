import type { ModulesMap } from '@aries-framework/core'
import type { IndyVdrPoolConfig } from '@aries-framework/indy-vdr'

import {
  AnonCredsCredentialFormatService,
  AnonCredsProofFormatService,
  V1CredentialProtocol,
  AnonCredsModule,
  LegacyIndyCredentialFormatService,
  LegacyIndyProofFormatService,
  V1ProofProtocol,
} from '@aries-framework/anoncreds'
import { AnonCredsRsModule } from '@aries-framework/anoncreds-rs'
import { AskarModule } from '@aries-framework/askar'
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
} from '@aries-framework/core'
import { IndyVdrAnonCredsRegistry, IndyVdrModule } from '@aries-framework/indy-vdr'
import { agentDependencies, HttpInboundTransport } from '@aries-framework/node'
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
    credentials: CredentialsModule<[V1CredentialProtocol, V2CredentialProtocol]>
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
      registries: [new IndyVdrAnonCredsRegistry()],
    }),
    anoncredsRs: new AnonCredsRsModule({
      anoncreds,
    }),
    askar: new AskarModule({
      ariesAskar,
    }),
    mediator: new MediatorModule({
      autoAcceptMediationRequests: options.autoAcceptMediationRequests,
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

export const setupAgent = async ({ name, endpoints, port }: { name: string; endpoints: string[]; port: number }) => {
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

  const httpInbound = new HttpInboundTransport({
    port: port,
  })

  agent.registerInboundTransport(httpInbound)
  agent.registerOutboundTransport(new HttpOutboundTransport())

  await agent.initialize()

  return agent
}
