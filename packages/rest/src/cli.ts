import type { InboundTransport, Transports } from './setup/CredoRestConfig'
import type { AskarWalletPostgresStorageConfig } from '@credo-ts/askar'

import { AutoAcceptCredential, AutoAcceptProof } from '@credo-ts/core'
import process from 'process'
import yargs from 'yargs'

import { setupApp } from './setup/setupApp'

const parsed = yargs
  .scriptName('credo-rest')
  .command('start', 'Start Credo Rest agent')
  .option('label', {
    alias: 'l',
    string: true,
    demandOption: true,
  })
  .option('wallet-id', {
    string: true,
    demandOption: true,
  })
  .option('wallet-key', {
    string: true,
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
    coerce: (items: unknown[]) => items.map((i) => (typeof i === 'string' ? JSON.parse(i) : i)),
  })
  .option('endpoint', {
    array: true,
    string: true,
  })
  .option('log-level', {
    number: true,
    default: 3,
  })
  .option('use-did-sov-prefix-where-allowed', {
    boolean: true,
    default: false,
  })
  .option('use-did-key-in-protocols', {
    boolean: true,
    default: true,
  })
  .option('outbound-transport', {
    default: [],
    choices: ['http', 'ws'] as const,
    array: true,
  })
  .option('multi-tenant', {
    boolean: true,
    default: false,
    describe:
      'Start the agent as a multi-tenant agent. Once enabled, all operations (except tenant management) must be performed under a specific tenant. Tenants can be created in the tenants controller (POST /tenants, see swagger UI), and the scope for a specific tenant can be set using the x-tenant-id header.',
  })
  .option('inbound-transport', {
    array: true,
    default: [],
    coerce: (input: string[]) => {
      // Configured using config object
      if (typeof input[0] === 'object') return input as unknown as InboundTransport[]
      if (input.length % 2 !== 0) {
        throw new Error(
          'Inbound transport should be specified as transport port pairs (e.g. --inbound-transport http 5000 ws 5001)',
        )
      }

      return input.reduce<Array<InboundTransport>>((transports, item, index) => {
        const isEven = index % 2 === 0
        // isEven means it is the transport
        // transport port transport port
        const isTransport = isEven

        if (isTransport) {
          transports.push({
            transport: item as Transports,
            port: Number(input[index + 1]),
          })
        }

        return transports
      }, [])
    },
  })
  .option('auto-accept-connections', {
    boolean: true,
    default: false,
  })
  .option('auto-accept-credentials', {
    choices: [AutoAcceptCredential.Always, AutoAcceptCredential.Never, AutoAcceptCredential.ContentApproved] as const,
    default: AutoAcceptCredential.ContentApproved,
  })
  .option('auto-accept-mediation-requests', {
    boolean: true,
    default: false,
  })
  .option('auto-accept-proofs', {
    choices: [AutoAcceptProof.Always, AutoAcceptProof.Never, AutoAcceptProof.ContentApproved] as const,
    default: AutoAcceptProof.ContentApproved,
  })
  .option('auto-update-storage-on-startup', {
    boolean: true,
    default: true,
  })
  .option('connection-image-url', {
    string: true,
  })
  .option('webhook-url', {
    string: true,
  })
  .option('websocket-events', {
    boolean: true,
    default: false,
    describe:
      'Enable websocket events on the admin API server. When a client connects, it will receive events from the agent.',
  })
  .option('admin-port', {
    number: true,
    demandOption: true,
  })
  .option('storage-type', {
    choices: ['sqlite', 'postgres'] as const,
    default: 'sqlite',
  })
  .option('postgres-host', {
    string: true,
  })
  .option('postgres-username', {
    string: true,
  })
  .option('postgres-password', {
    string: true,
  })
  .check((argv) => {
    if (
      argv['storage-type'] === 'postgres' &&
      (!argv['postgres-host'] || !argv['postgres-username'] || !argv['postgres-password'])
    ) {
      throw new Error(
        "--postgres-host, --postgres-username, and postgres-password are required when setting --storage-type to 'postgres'",
      )
    }

    return true
  })
  .config()
  .env('CREDO_REST')
  .parseSync()

export async function runCliServer() {
  const { start, shutdown } = await setupApp({
    webhookUrl: parsed['webhook-url'],
    adminPort: parsed['admin-port'],
    enableWebsocketEvents: true,
    enableCors: true,

    agent: {
      label: parsed.label,
      walletConfig: {
        id: parsed['wallet-id'],
        key: parsed['wallet-key'],
        storage:
          parsed['storage-type'] === 'sqlite'
            ? {
                type: 'sqlite',
              }
            : ({
                type: 'postgres',
                config: {
                  host: parsed['postgres-host'] as string,
                },
                credentials: {
                  account: parsed['postgres-username'] as string,
                  password: parsed['postgres-password'] as string,
                },
              } satisfies AskarWalletPostgresStorageConfig),
      },
      indyLedgers: parsed['indy-ledger'],
      cheqdLedgers: parsed['cheqd-ledger'],
      endpoints: parsed.endpoint,
      autoAcceptConnections: parsed['auto-accept-connections'],
      autoAcceptCredentials: parsed['auto-accept-credentials'],
      autoAcceptProofs: parsed['auto-accept-proofs'],
      autoUpdateStorageOnStartup: parsed['auto-update-storage-on-startup'],
      autoAcceptMediationRequests: parsed['auto-accept-mediation-requests'],
      useDidKeyInProtocols: parsed['use-did-key-in-protocols'],
      useDidSovPrefixWhereAllowed: parsed['use-did-sov-prefix-where-allowed'],
      logLevel: parsed['log-level'],
      inboundTransports: parsed['inbound-transport'],
      outboundTransports: parsed['outbound-transport'],
      connectionImageUrl: parsed['connection-image-url'],
      multiTenant: parsed['multi-tenant'],
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
