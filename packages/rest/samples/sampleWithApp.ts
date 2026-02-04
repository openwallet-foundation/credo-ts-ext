/** * WORKAROUND: Explicitly import askar-nodejs to register the native bindings.
 * This is required in Credo v0.6.x to prevent 'keyGetJwkSecret' undefined errors.
 * @see https://github.com/openwallet-foundation/credo-ts/issues/2597
 */
import '@openwallet-foundation/askar-nodejs'
import type { CheqdModuleConfigOptions } from '@credo-ts/cheqd'

import { LogLevel } from '@credo-ts/core'
import { DidCommAutoAcceptCredential, DidCommAutoAcceptProof } from '@credo-ts/didcomm'
import bodyParser from 'body-parser'
import express from 'express'

import { createRestAgent, setupApp } from '../src/index'

const run = async () => {
  const agent = await createRestAgent({
    label: 'Aries Test Agent',
    inboundTransports: [
      {
        transport: 'http',
        port: 3001,
      },
    ],
    outboundTransports: ['http', 'ws'],
    multiTenant: true,
    autoUpdateStorageOnStartup: false,
    useDidSovPrefixWhereAllowed: false,
    autoAcceptCredentials: DidCommAutoAcceptCredential.Always,
    autoAcceptProofs: DidCommAutoAcceptProof.ContentApproved,
    autoAcceptConnections: true,
    cheqdLedgers: {
      networks: [
        { network: 'mainnet' },
        {
          network: 'testnet',
          cosmosPayerSeed: 'oval cargo light exile eyebrow leaf debris net fold help segment raven',
        },
      ],
    } as CheqdModuleConfigOptions,
    logLevel: LogLevel.debug,
    endpoints: ['http://localhost:3001'],
    walletConfig: {
      id: 'sample10',
      key: 'sample10',
      database: {
        type: 'postgres',
        config: {
          host: 'localhost:5453',
        },
        credentials: {
          account: 'root',
          password: 'root',
        },
      },
    },
  })

  const app = express()
  const jsonParser = bodyParser.json()

  app.get('/greeting', jsonParser, (_, res) => {
    const config = agent.config

    res.send(`Hello!`)
  })

  const { start } = await setupApp({
    baseApp: app,
    adminPort: 3000,
    enableCors: true,

    agent,
  })

  start()
}
run()
