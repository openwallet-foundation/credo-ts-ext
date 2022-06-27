import type { ServerConfig } from '../src/utils/ServerConfig'

import bodyParser from 'body-parser'
import express from 'express'
import { connect } from 'ngrok'

import { startServer } from '../src/index'
import { setupAgent } from '../tests/utils/agent'

const run = async () => {
  const endpoint = await connect(3001)

  const agent = await setupAgent({
    port: 3001,
    publicDidSeed: 'testtesttesttesttesttesttesttest',
    endpoints: [endpoint],
    name: 'Aries Test Agent',
  })

  const app = express()
  const jsonParser = bodyParser.json()

  app.post('/greeting/:name', jsonParser, (req, res) => {
    res.send(`Hello ${req.params.name}!`)
  })

  const conf: ServerConfig = {
    port: 3000,
    webhookUrl: 'http://localhost:5000/agent-events',
    app: app,
  }

  await startServer(agent, conf)
}

run()
