import { AutoAcceptCredential, AutoAcceptProof, Agent, LogLevel, utils, ConsoleLogger } from '@aries-framework/core'
import { agentDependencies } from '@aries-framework/node'

import { BleInboundTransport, BleOutboundTransport } from '../transports'

import { BCOVRIN_TEST_GENESIS } from './util'

export const setupAgent = async ({ name, publicDidSeed }: { name: string; publicDidSeed: string }) => {
  const agent = new Agent(
    {
      publicDidSeed,
      label: name,
      autoAcceptConnections: true,
      autoAcceptProofs: AutoAcceptProof.ContentApproved,
      autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
      walletConfig: { id: name, key: name },
      useLegacyDidSovPrefix: true,
      logger: new ConsoleLogger(LogLevel.off),
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
