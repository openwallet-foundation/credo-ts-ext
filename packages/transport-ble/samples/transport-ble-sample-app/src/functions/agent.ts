/* This example agent setup shows how to use setup and agent to use indy sdk and anoncreds.
To use this with other ledgers/credential formats, you will have to update the necessary config values/modules */

import type { InitConfig } from '@aries-framework/core'

import {
  AnonCredsModule,
  LegacyIndyCredentialFormatService,
  LegacyIndyProofFormatService,
  V1CredentialProtocol,
  V1ProofProtocol,
} from '@aries-framework/anoncreds'
import {
  ConnectionsModule,
  Agent,
  AutoAcceptCredential,
  AutoAcceptProof,
  ConsoleLogger,
  CredentialsModule,
  DidsModule,
  HttpOutboundTransport,
  LogLevel,
  ProofsModule,
  V2CredentialProtocol,
  V2ProofProtocol,
  WsOutboundTransport,
} from '@aries-framework/core'
import {
  IndySdkAnonCredsRegistry,
  IndySdkIndyDidRegistrar,
  IndySdkIndyDidResolver,
  IndySdkModule,
  IndySdkSovDidResolver,
} from '@aries-framework/indy-sdk'
import { agentDependencies } from '@aries-framework/react-native'
import indySdk from 'indy-sdk-react-native'

import { GENESIS_BCORVIN_TEST_NET } from '../constants/ledgers'

const legacyIndyCredentialFormat = new LegacyIndyCredentialFormatService()
const legacyIndyProofFormat = new LegacyIndyProofFormatService()

export const createAgent = () => {
  const value = new Date().toISOString()
  const config: InitConfig = {
    label: `wallet-demo-id-${value}`,
    walletConfig: {
      id: `wallet-demo-id-${value}`,
      key: 'testkey0000000000000000000000004',
    },
    useDidSovPrefixWhereAllowed: true,
    logger: new ConsoleLogger(LogLevel.trace),
    autoUpdateStorageOnStartup: true,
  }

  const agent = new Agent({
    config,
    modules: {
      indySdk: new IndySdkModule({
        indySdk,
        networks: [
          {
            id: 'bcovrin-test-net',
            indyNamespace: 'bcovrin:test',
            isProduction: false,
            genesisTransactions: GENESIS_BCORVIN_TEST_NET,
            connectOnStartup: true,
          },
        ],
      }),
      anoncreds: new AnonCredsModule({
        registries: [new IndySdkAnonCredsRegistry()],
      }),
      dids: new DidsModule({
        registrars: [new IndySdkIndyDidRegistrar()],
        resolvers: [new IndySdkSovDidResolver(), new IndySdkIndyDidResolver()],
      }),
      connections: new ConnectionsModule({
        autoAcceptConnections: true,
      }),
      credentials: new CredentialsModule({
        credentialProtocols: [
          new V1CredentialProtocol({
            indyCredentialFormat: legacyIndyCredentialFormat,
          }),
          new V2CredentialProtocol({
            credentialFormats: [legacyIndyCredentialFormat],
          }),
        ],
        autoAcceptCredentials: AutoAcceptCredential.Always,
      }),
      proofs: new ProofsModule({
        proofProtocols: [
          new V1ProofProtocol({
            indyProofFormat: legacyIndyProofFormat,
          }),
          new V2ProofProtocol({
            proofFormats: [legacyIndyProofFormat],
          }),
        ],
        autoAcceptProofs: AutoAcceptProof.Always,
      }),
    },
    dependencies: agentDependencies,
  })

  agent.registerOutboundTransport(new HttpOutboundTransport())
  agent.registerOutboundTransport(new WsOutboundTransport())

  return { agent, config }
}
