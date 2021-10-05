import 'reflect-metadata'

import type { ServerConfig } from './utils/ServerConfig'
import type { Agent } from '@aries-framework/core'

import { setupServer } from './server'

export const startServer = async (agent: Agent, config: ServerConfig) => {
  const app = await setupServer(agent, config)

  app.listen(config.port)
}
