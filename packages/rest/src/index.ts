import 'reflect-metadata'

import type { ServerConfig } from './utils/ServerConfig'
import type { Agent } from '@aries-framework/core'
import type { Express } from 'express'

import { setupServer } from './server'

export const startServer = async (agent: Agent, config: ServerConfig, app?: Express) => {
  const server = await setupServer(agent, config, app)

  server.listen(config.port)
}
