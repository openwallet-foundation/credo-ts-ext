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
      mediatorPickupStrategy: MediatorPickupStrategy.Implicit,
      mediatorConnectionsInvite:
        'http://localhost:9001?c_i=eyJAdHlwZSI6ICJkaWQ6c292OkJ6Q2JzTlloTXJqSGlxWkRUVUFTSGc7c3BlYy9jb25uZWN0aW9ucy8xLjAvaW52aXRhdGlvbiIsICJAaWQiOiAiZjg0OWM5YjktMDFiYi00NGQ4LThlZTMtMDk3ZDcwYTY4YTUzIiwgImxhYmVsIjogIm1lZGlhdG9yICsgcHVzaCBub3RpZmljYXRpb25zICsgZXhhbXBsZSIsICJzZXJ2aWNlRW5kcG9pbnQiOiAiaHR0cDovL2xvY2FsaG9zdDo5MDAxIiwgInJlY2lwaWVudEtleXMiOiBbIjVwMUtWbjNxcEhDTXdlbVFldlhpZXlreXdTOWpUTUprZUg2NlQ2YVpxdUZuIl19',
    },
    agentDependencies
  )

  agent.registerOutboundTransport(new WsOutboundTransport())
  agent.registerOutboundTransport(new HttpOutboundTransport())

  return agent
}
