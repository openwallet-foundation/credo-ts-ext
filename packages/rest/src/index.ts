import 'reflect-metadata'

import type { ServerConfig } from './utils/ServerConfig'
import type { Agent } from '@aries-framework/core'

import { setupServer } from './server'

export const startServer = async (agent: Agent, config: ServerConfig) => {
  const server = await setupServer(agent, config)

  server.listen(config.port)
}
