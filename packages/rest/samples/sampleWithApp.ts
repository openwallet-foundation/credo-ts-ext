import { LogLevel } from '@credo-ts/core'
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
    logLevel: LogLevel.debug,
    endpoints: ['http://localhost:3001'],
    walletConfig: {
      id: 'test-agent',
      key: 'test-agent',
    },
  })

  const app = express()
  const jsonParser = bodyParser.json()

  app.get('/greeting', jsonParser, (_, res) => {
    const config = agent.config

    res.send(`Hello, ${config.label}!`)
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
