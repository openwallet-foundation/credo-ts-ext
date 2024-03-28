import type { CredoRestAgentConfig } from '../src'

import { LogLevel } from '@credo-ts/core'

import { setupApp } from '../src'

const run = async () => {
  const { start } = await setupApp({
    adminPort: 3000,
    enableCors: true,

    agent: {
      label: 'Aries Test Agent',
      inboundTransports: [
        {
          transport: 'http',
          port: 3001,
        },
      ],
      logLevel: LogLevel.debug,
      endpoints: ['http://localhost:3001'],
      walletConfig: {
        id: 'test-agent',
        key: 'test-agent',
      },
    } satisfies CredoRestAgentConfig,
  })

  start()
}

run()
