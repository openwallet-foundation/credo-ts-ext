import type { TestLogger } from './logger'
import type { InitConfig, AutoAcceptCredential } from '@aries-framework/core'

import { Agent, HttpOutboundTransport } from '@aries-framework/core'
import { agentDependencies, HttpInboundTransport } from '@aries-framework/node'

import { BCOVRIN_TEST_GENESIS } from './util'

export async function setupAgent({
  port,
  publicDidSeed,
  endpoints,
  name,
  logger,
  autoAcceptConnection,
  autoAcceptCredential,
  useLegacyDidSovPrefix,
}: {
  port: number
  publicDidSeed: string
  endpoints: string[]
  name: string
  logger: TestLogger
  autoAcceptConnection: boolean
  autoAcceptCredential: AutoAcceptCredential
  useLegacyDidSovPrefix: boolean
}) {
  const agentConfig: InitConfig = {
    label: name,
    walletConfig: {
      id: name,
      key: name,
    },
    poolName: 'pool-holder',
    genesisTransactions: BCOVRIN_TEST_GENESIS,
    publicDidSeed: publicDidSeed,
    endpoints: endpoints,
    autoAcceptConnections: autoAcceptConnection,
    autoAcceptCredentials: autoAcceptCredential,
    useLegacyDidSovPrefix: useLegacyDidSovPrefix,
    logger: logger,
  }

  const agent = new Agent(agentConfig, agentDependencies)

  const httpInbound = new HttpInboundTransport({
    port: port,
  })

  agent.registerInboundTransport(httpInbound)
  agent.registerOutboundTransport(new HttpOutboundTransport())

  await agent.initialize()

  return agent
}
