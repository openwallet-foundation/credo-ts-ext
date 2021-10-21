import {
  Agent,
  AutoAcceptCredential,
  AutoAcceptProof,
  ConsoleLogger,
  HttpOutboundTransport,
  LogLevel,
  MediatorPickupStrategy,
  WsOutboundTransport,
} from '@aries-framework/core'
import { agentDependencies } from '@aries-framework/node'

export const setupAgent = (name = 'test-agent-blobbieb', publicDidSeed = '12312312312312312312312312312356') => {
  const agent = new Agent(
    {
      logger: new ConsoleLogger(LogLevel.off),
      publicDidSeed,
      label: name,
      autoAcceptConnections: true,
      autoAcceptProofs: AutoAcceptProof.ContentApproved,
      autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
      walletConfig: { id: name, key: name },
    },
    agentDependencies
  )

  agent.registerOutboundTransport(new WsOutboundTransport())
  agent.registerOutboundTransport(new HttpOutboundTransport())

  return agent
}
