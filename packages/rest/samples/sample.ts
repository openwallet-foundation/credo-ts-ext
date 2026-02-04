/** * WORKAROUND: Explicitly import askar-nodejs to register the native bindings.
 * This is required in Credo v0.6.x to prevent 'keyGetJwkSecret' undefined errors.
 * @see https://github.com/openwallet-foundation/credo-ts/issues/2597
 */
import '@openwallet-foundation/askar-nodejs'
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
