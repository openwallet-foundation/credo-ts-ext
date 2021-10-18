import type { InitConfig, Logger } from '@aries-framework/core'

import { Agent, AutoAcceptCredential, AutoAcceptProof, HttpOutboundTransport } from '@aries-framework/core'
import { agentDependencies } from '@aries-framework/node'

export const setupAgent = ({
  publicDidSeed,
  name,
  logger,
}: {
  publicDidSeed: string
  name: string
  logger: Logger
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
