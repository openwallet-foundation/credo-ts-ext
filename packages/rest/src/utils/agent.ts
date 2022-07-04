import {
  AutoAcceptCredential,
  AutoAcceptProof,
  Agent,
  ConnectionInvitationMessage,
  HttpOutboundTransport,
  LogLevel,
} from '@aries-framework/core'
import { agentDependencies, HttpInboundTransport } from '@aries-framework/node'
import path from 'path'

import { BCOVRIN_TEST_GENESIS } from '../../tests/utils/util'

import { TsLogger } from './logger'

export const genesisPath = process.env.GENESIS_TXN_PATH
  ? path.resolve(process.env.GENESIS_TXN_PATH)
  : path.join(__dirname, '../../../../network/genesis/local-genesis.txn')

export const setupAgent = async ({
  name,
  publicDidSeed,
  endpoints,
  port,
}: {
  name: string
  publicDidSeed: string
  endpoints: string[]
  port: number
}) => {
  const logger = new TsLogger(LogLevel.off)

  const agent = new Agent(
    {
      publicDidSeed,
      label: name,
      endpoints: endpoints,
      autoAcceptConnections: true,
      autoAcceptProofs: AutoAcceptProof.ContentApproved,
      autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
      walletConfig: { id: name, key: name },
      useLegacyDidSovPrefix: true,
      logger: logger,
      indyLedgers: [
        {
          id: 'TestLedger',
          genesisTransactions: BCOVRIN_TEST_GENESIS,
          isProduction: false,
        },
      ],
      autoUpdateStorageOnStartup: true,
    },
    agentDependencies
  )

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
      const { outOfBandInvitation } = await agent.oob.createInvitation()

      res.send(outOfBandInvitation.toUrl({ domain: endpoints + '/invitation' }))
    }
  })

  await agent.initialize()

  return agent
}
