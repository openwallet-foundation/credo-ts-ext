import type { ServerConfig } from '../src/utils/ServerConfig'

import { connect } from 'ngrok'

import { startServer } from '../src/index'
import { setupAgent } from '../tests/utils/agent'

import './utils/GreetingController'

const run = async () => {
  const endpoint = await connect(3001)

  const agent = await setupAgent({
    port: 3001,
    publicDidSeed: 'testtesttesttesttesttesttesttest',
    endpoints: [endpoint],
    name: 'Aries Test Agent',
  })

  // todo fix sample with app

  const conf: ServerConfig = {
    port: 3000,
    webhookUrl: 'http://localhost:5000/agent-events',
  }

  await startServer(agent, conf)
}

run()
