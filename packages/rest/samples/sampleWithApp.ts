import type { ServerConfig } from '../src/utils/ServerConfig'
import type { Express } from 'express'

import { connect } from 'ngrok'
import { createExpressServer } from 'routing-controllers'

import { startServer } from '../src/index'
import { setupAgent } from '../tests/utils/agent'

import { GreetingController } from './utils/GreetingController'

const run = async () => {
  const endpoint = await connect(3001)

  const agent = await setupAgent({
    port: 3001,
    publicDidSeed: 'testtesttesttesttesttesttesttest',
    endpoints: [endpoint],
    name: 'Aries Test Agent',
  })

  const app: Express = createExpressServer({
    controllers: [GreetingController],
  })

  const conf: ServerConfig = {
    port: 3000,
    app: app,
    webhookUrl: 'http://localhost:5000/agent-events',
  }

  await startServer(agent, conf)
}

run()
