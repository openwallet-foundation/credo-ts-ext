import { AutoAcceptCredential, AutoAcceptProof, Agent, LogLevel, utils } from '@aries-framework/core'
import { agentDependencies } from '@aries-framework/node'
import path from 'path'

import { BleInboundTransport, BleOutboundTransport } from '../transports'

import { TsLogger } from './logger'
import { BCOVRIN_TEST_GENESIS } from './util'

export const genesisPath = process.env.GENESIS_TXN_PATH
  ? path.resolve(process.env.GENESIS_TXN_PATH)
  : path.join(__dirname, '../../../../network/genesis/local-genesis.txn')

export const setupAgent = async ({ name, publicDidSeed }: { name: string; publicDidSeed: string }) => {
  const logger = new TsLogger(LogLevel.debug)

  const agent = new Agent(
    {
      publicDidSeed,
      label: name,
      autoAcceptConnections: true,
      autoAcceptProofs: AutoAcceptProof.ContentApproved,
      autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
      walletConfig: { id: name, key: name },
      useLegacyDidSovPrefix: true,
      logger: logger,
      indyLedgers: [
        {
          id: `TestLedger-${utils.uuid()}`,
          genesisTransactions: BCOVRIN_TEST_GENESIS,
          isProduction: false,
        },
      ],
    },
    agentDependencies
  )

  const bleInbound = new BleInboundTransport({
    serviceUUID: 'd2f195b6-2e80-4ab0-be24-32ebe761352f',
    messagingUUID: 'c3103ded-afd7-477c-b279-2ad264e20e74',
    indicationUUID: 'e6e97879-780a-4c9b-b4e6-dcae3793a3e8',
  })

  agent.registerInboundTransport(bleInbound)

  const bleOutbound = new BleOutboundTransport({
    serviceUUID: 'd2f195b6-2e80-4ab0-be24-32ebe761352f',
    messagingUUID: 'c3103ded-afd7-477c-b279-2ad264e20e74',
    indicationUUID: 'e6e97879-780a-4c9b-b4e6-dcae3793a3e8',
  })

  agent.registerOutboundTransport(bleOutbound)

  await agent.initialize()

  return agent
}
