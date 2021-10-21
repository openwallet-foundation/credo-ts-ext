import {
  Agent,
  AutoAcceptCredential,
  AutoAcceptProof,
  ConsoleLogger,
  HttpOutboundTransport,
  LogLevel,
  WsOutboundTransport,
} from '@aries-framework/core'
import { agentDependencies } from '@aries-framework/node'

export const setupAgent = ({ name, publicDidSeed }: { name: string; publicDidSeed: string }) => {
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
