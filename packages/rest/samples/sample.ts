import type { ServerConfig } from '../src/utils/ServerConfig'

import { AutoAcceptCredential, LogLevel } from '@aries-framework/core'
import { connect } from 'ngrok'

import { startServer } from '../src/index'
import { TsLogger } from '../src/utils/logger'
import { setupAgent } from '../tests/utils/agent'

const run = async () => {
  const logger = new TsLogger(LogLevel.debug)
  const endpoint = await connect(3001)

  const agent = await setupAgent({
    port: 3001,
    publicDidSeed: 'testtesttesttesttesttesttesttest',
    endpoints: [endpoint],
    name: 'Aries Test Agent',
    logger: logger,
    autoAcceptConnections: true,
    autoAcceptCredentials: AutoAcceptCredential.ContentApproved,
    useLegacyDidSovPrefix: true,
  })

  const conf: ServerConfig = {
    port: 3000,
    cors: true,
  }

  await startServer(agent, conf)
}

run()
