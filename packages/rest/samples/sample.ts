import type { ServerConfig } from '../src/utils/ServerConfig'

import { startServer } from '../src/index'
import { setupAgent } from '../src/utils/agent'

const run = async () => {
  const agent = await setupAgent({
    httpInboundTransportPort: 3001,
    endpoints: ['http://localhost:3001'],
    name: 'Aries Test Agent',
  })

  const conf: ServerConfig = {
    port: 3000,
    cors: true,
  }

  await startServer(agent, conf)
}

run()
