import type { ServerConfig } from '../src/utils/ServerConfig'
import type { Express } from 'express'

import { AutoAcceptCredential, LogLevel } from '@aries-framework/core'
import { connect } from 'ngrok'
import { createExpressServer } from 'routing-controllers'

import { startServer } from '../src/index'
import { setupAgent } from '../tests/utils/agent'
import { TestLogger } from '../tests/utils/logger'

import { GreetingController } from './utils/GreetingController'

const run = async () => {
  const logger = new TestLogger(LogLevel.debug)
  const endpoint = await connect(3001)

  const agent = await setupAgent({
    port: 3001,
    publicDidSeed: 'testtesttesttesttesttesttesttest',
    endpoints: [endpoint],
    name: 'Aries Test Agent',
    logger: logger,
    autoAcceptConnection: true,
    autoAcceptCredential: AutoAcceptCredential.ContentApproved,
    useLegacyDidSovPrefix: true,
  })

  const conf: ServerConfig = {
    port: 3000,
    cors: true,
  }

  const app: Express = createExpressServer({
    controllers: [GreetingController],
  })

  await startServer(agent, conf, app)
}

run()
