import { LogLevel, AutoAcceptCredential } from '@aries-framework/core'
import { connect } from 'ngrok'

import { setupAgent } from '../../tests/utils/agent'
import { TestLogger } from '../../tests/utils/logger'
import { startServer } from '../index'

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

  await startServer(agent, 3000)
}

run()
