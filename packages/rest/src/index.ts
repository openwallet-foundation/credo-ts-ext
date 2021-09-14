import 'reflect-metadata'

import type { Agent } from '@aries-framework/core'

import { setupServer } from './server'

export const startServer = async (agent: Agent, port: number) => {
  const app = await setupServer(agent)

  app.listen(port)
}
