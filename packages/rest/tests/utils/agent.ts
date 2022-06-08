import type { TsLogger } from '../../src/utils/logger'
import type { AutoAcceptCredential, InitConfig } from '@aries-framework/core'

import { Agent, ConnectionInvitationMessage, HttpOutboundTransport } from '@aries-framework/core'
import { agentDependencies, HttpInboundTransport } from '@aries-framework/node'
import path from 'path'

export const genesisPath = process.env.GENESIS_TXN_PATH
  ? path.resolve(process.env.GENESIS_TXN_PATH)
  : path.join(__dirname, '../../../../network/genesis/local-genesis.txn')

export async function setupAgent({
  port,
  publicDidSeed,
  endpoints,
  name,
  logger,
  autoAcceptConnections,
  autoAcceptCredentials,
  useLegacyDidSovPrefix,
}: {
  port: number
  publicDidSeed: string
  endpoints: string[]
  name: string
  logger: TsLogger
  autoAcceptConnections: boolean
  autoAcceptCredentials: AutoAcceptCredential
  useLegacyDidSovPrefix: boolean
}) {
  const agentConfig: InitConfig = {
    label: name,
    walletConfig: {
      id: name,
      key: name,
    },
    indyLedgers: [
      {
        id: 'LocalLedger',
        genesisPath,
        isProduction: false,
      },
    ],
    publicDidSeed: publicDidSeed,
    endpoints: endpoints,
    autoAcceptConnections: autoAcceptConnections,
    autoAcceptCredentials: autoAcceptCredentials,
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
