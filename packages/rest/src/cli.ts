/** * WORKAROUND: Explicitly import askar-nodejs to register the native bindings.
 * This is required in Credo v0.6.x to prevent 'keyGetJwkSecret' undefined errors.
 * @see https://github.com/openwallet-foundation/credo-ts/issues/2597
 */
import '@openwallet-foundation/askar-nodejs'
import type { InboundTransport, Transports } from './setup/CredoRestConfig'
import type { AskarPostgresStorageConfig } from '@credo-ts/askar'
import type { CheqdModuleConfigOptions } from '@credo-ts/cheqd'
import type { IndyVdrPoolConfig } from '@credo-ts/indy-vdr'

import { DidCommAutoAcceptCredential, DidCommAutoAcceptProof } from '@credo-ts/didcomm'
import process from 'node:process'
// import * as process from 'process'.
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

// eslint-disable-next-line import/no-cycle
import { setupApp } from './setup/setupApp'

interface CliArgs {
  label: string
  'wallet-id': string
  'wallet-key': string
  'admin-port': number
  'indy-ledger': IndyVdrPoolConfig[]
  'cheqd-ledger': CheqdModuleConfigOptions
  endpoint?: string[]
  'log-level': number
  'use-did-sov-prefix-where-allowed': boolean
  'use-did-key-in-protocols': boolean
  'outbound-transport': Transports[]
  'multi-tenant': boolean
  'inbound-transport': InboundTransport[]
  'auto-accept-connections': boolean
  'auto-accept-credentials': DidCommAutoAcceptCredential
  'auto-accept-mediation-requests': boolean
  'auto-accept-proofs': DidCommAutoAcceptProof
  'auto-update-storage-on-startup': boolean
  'connection-image-url'?: string
  'webhook-url'?: string
  'websocket-events': boolean
  'storage-type': 'sqlite' | 'postgres'
  'postgres-host'?: string
  'postgres-username'?: string
  'postgres-password'?: string
}

const parsed = yargs(hideBin(process.argv))
  .scriptName('credo-rest')
  .config('config')
  .alias('c', 'config')
  .env('CREDO_REST')
  .command('start', 'Start Credo Rest agent')
  .option('label', {
    alias: 'l',
    type: 'string',
    demandOption: true,
  })
  .option('wallet-id', {
    type: 'string',
    demandOption: true,
  })
  .option('wallet-key', {
    type: 'string',
    demandOption: true,
  })
  .option('indy-ledger', {
    array: true,
    default: [],
    coerce: (items: unknown[]) => items.map((i) => (typeof i === 'string' ? JSON.parse(i) : i)),
  })
  .option('cheqd-ledger', {
    array: true,
    default: [],
    coerce: (items: unknown[]) => ({
      networks: items.map((i) => (typeof i === 'string' ? JSON.parse(i) : i)),
    }),
  })
  .option('endpoint', {
    array: true,
    type: 'string',
  })
  .option('log-level', {
    type: 'number',
    default: 3,
  })
  .option('use-did-sov-prefix-where-allowed', {
    type: 'boolean',
    default: false,
  })
  .option('use-did-key-in-protocols', {
    type: 'boolean',
    default: true,
  })
  .option('outbound-transport', {
    default: [],
    choices: ['http', 'ws'] as const,
    array: true,
  })
  .option('multi-tenant', {
    type: 'boolean',
    default: false,
    describe: 'Start the agent as a multi-tenant agent.',
  })
  .option('inbound-transport', {
    array: true,
    default: [],
    coerce: (input: string[]) => {
      if (typeof input[0] === 'object') return input
      if (input.length % 2 !== 0) {
        throw new Error('Inbound transport should be specified as transport port pairs.')
      }
      return input.reduce<any[]>((transports, item, index) => {
        if (index % 2 === 0) {
          transports.push({ transport: item, port: Number(input[index + 1]) })
        }
        return transports
      }, [])
    },
  })
  .option('auto-accept-connections', {
    type: 'boolean',
    default: false,
  })
  .option('auto-accept-credentials', {
    choices: [
      DidCommAutoAcceptCredential.Always,
      DidCommAutoAcceptCredential.Never,
      DidCommAutoAcceptCredential.ContentApproved,
    ] as const,
    default: DidCommAutoAcceptCredential.ContentApproved,
  })
  .option('auto-accept-mediation-requests', {
    type: 'boolean',
    default: false,
  })
  .option('auto-accept-proofs', {
    choices: [
      DidCommAutoAcceptProof.Always,
      DidCommAutoAcceptProof.Never,
      DidCommAutoAcceptProof.ContentApproved,
    ] as const,
    default: DidCommAutoAcceptProof.ContentApproved,
  })
  .option('auto-update-storage-on-startup', {
    type: 'boolean',
    default: true,
  })
  .option('connection-image-url', {
    type: 'string',
  })
  .option('webhook-url', {
    type: 'string',
  })
  .option('websocket-events', {
    type: 'boolean',
    default: false,
  })
  .option('admin-port', {
    type: 'number',
    demandOption: true,
  })
  .option('storage-type', {
    choices: ['sqlite', 'postgres'] as const,
    default: 'sqlite',
  })
  .option('postgres-host', {
    type: 'string',
  })
  .option('postgres-username', {
    type: 'string',
  })
  .option('postgres-password', {
    type: 'string',
  })
  .check((argv) => {
    if (
      argv['storage-type'] === 'postgres' &&
      (!argv['postgres-host'] || !argv['postgres-username'] || !argv['postgres-password'])
    ) {
      throw new Error("Postgres host, username, and password are required for 'postgres' storage.")
    }
    return true
  })
  .parseSync()

export const parsedArgs = parsed as unknown as CliArgs

export async function runCliServer() {
  const { start, shutdown } = await setupApp({
    webhookUrl: parsedArgs['webhook-url'],
    adminPort: parsedArgs['admin-port'],
    enableWebsocketEvents: true,
    enableCors: true,

    agent: {
      label: parsedArgs.label,
      walletConfig: {
        id: parsedArgs['wallet-id'],
        key: parsedArgs['wallet-key'],
        database:
          parsedArgs['storage-type'] === 'sqlite'
            ? {
                type: 'sqlite',
              }
            : ({
                type: 'postgres',
                config: {
                  host: parsedArgs['postgres-host'] as string,
                },
                credentials: {
                  account: parsedArgs['postgres-username'] as string,
                  password: parsedArgs['postgres-password'] as string,
                },
              } satisfies AskarPostgresStorageConfig),
      },
      indyLedgers: parsedArgs['indy-ledger'],
      cheqdLedgers: parsedArgs['cheqd-ledger'],
      endpoints: parsedArgs.endpoint,
      autoAcceptConnections: parsedArgs['auto-accept-connections'],
      autoAcceptCredentials: parsedArgs['auto-accept-credentials'],
      autoAcceptProofs: parsedArgs['auto-accept-proofs'],
      autoUpdateStorageOnStartup: parsedArgs['auto-update-storage-on-startup'],
      autoAcceptMediationRequests: parsedArgs['auto-accept-mediation-requests'],
      useDidKeyInProtocols: parsedArgs['use-did-key-in-protocols'],
      useDidSovPrefixWhereAllowed: parsedArgs['use-did-sov-prefix-where-allowed'],
      logLevel: parsedArgs['log-level'],
      inboundTransports: parsedArgs['inbound-transport'],
      outboundTransports: parsedArgs['outbound-transport'],
      connectionImageUrl: parsedArgs['connection-image-url'],
      multiTenant: parsedArgs['multi-tenant'],
    },
  })

  start()

  process.on('SIGINT', async () => {
    try {
      await shutdown()
    } finally {
      process.exit(0)
    }
  })
}

runCliServer()
