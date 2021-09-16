import type { TestLogger } from './logger'
import type { AutoAcceptCredential, InitConfig } from '@aries-framework/core'

import { Agent, ConnectionInvitationMessage, HttpOutboundTransport } from '@aries-framework/core'
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

  httpInbound.app.get('/invitation', async (req, res) => {
    if (typeof req.query.d_m === 'string') {
      const invitation = await ConnectionInvitationMessage.fromUrl(req.url.replace('d_m=', 'c_i='))
      res.send(invitation.toJSON())
    }
    if (typeof req.query.c_i === 'string') {
      const invitation = await ConnectionInvitationMessage.fromUrl(req.url)
      res.send(invitation.toJSON())
    } else {
      const { invitation } = await agent.connections.createConnection()

      res.send(invitation.toUrl({ domain: endpoints + '/invitation', useLegacyDidSovPrefix: useLegacyDidSovPrefix }))
    }
  })

  await agent.initialize()

  return agent
}
