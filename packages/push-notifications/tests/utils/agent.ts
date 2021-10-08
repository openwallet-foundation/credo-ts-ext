import type { TestLogger } from './logger'
import type { InitConfig } from '@aries-framework/core'

import { Agent, HttpOutboundTransport, AutoAcceptCredential, AutoAcceptProof } from '@aries-framework/core'
import { agentDependencies } from '@aries-framework/node'

import { BCOVRIN_TEST_GENESIS } from './util'

export const setupAgent = ({
  publicDidSeed,
  name,
  logger,
}: {
  publicDidSeed: string
  name: string
  logger: TestLogger
  autoAcceptConnection: boolean
  autoAcceptCredential: AutoAcceptCredential
}): Agent => {
  const agentConfig: InitConfig = {
    label: name,
    walletConfig: {
      id: name,
      key: name,
    },
    poolName: 'pool-holder',
    genesisTransactions: BCOVRIN_TEST_GENESIS,
    publicDidSeed: publicDidSeed,
    autoAcceptConnections: true,
    autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
    autoAcceptProofs: AutoAcceptProof.ContentApproved,
    logger: logger,
  }

  const agent = new Agent(agentConfig, agentDependencies)

  agent.registerOutboundTransport(new HttpOutboundTransport())

  return agent
}
