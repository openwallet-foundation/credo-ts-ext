import type { InboundTransport, Transports, AriesRestConfig } from './cliAgent'

import yargs from 'yargs'

import { runRestAgent } from './cliAgent'

const parsed = yargs
  .command('start', 'Start AFJ Rest agent')
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
  .option('public-did-seed', {
    string: true,
  })
  .option('endpoint', {
    array: true,
  })
  .option('log-level', {
    number: true,
    default: 3,
  })
  .option('use-legacy-did-sov-prefix', {
    boolean: true,
    default: false,
  })
  .option('outbound-transport', {
    default: [],
    choices: ['http', 'ws'],
    array: true,
  })
  .option('inbound-transport', {
    array: true,
    default: [],
    coerce: (input: string[]) => {
      // Configured using config object
      if (typeof input[0] === 'object') return input
      if (input.length % 2 !== 0) {
        throw new Error(
          'Inbound transport should be specified as transport port pairs (e.g. --inbound-transport http 5000 ws 5001)'
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
    choices: ['always', 'never', 'contentApproved'],
    default: 'never',
  })
  .option('auto-accept-mediation-requests', {
    boolean: true,
    default: false,
  })
  .option('auto-accept-proofs', {
    choices: ['always', 'never', 'contentApproved'],
    default: 'never',
  })
  .option('connection-image-url', {
    string: true,
  })
  .option('webhook-url', {
    string: true,
  })
  .option('admin-port', {
    number: true,
    demandOption: true,
  })
  .config()
  .env('AFJ_REST')
  .parse()

export async function runCliServer() {
  await runRestAgent({
    label: parsed.label,
    walletConfig: {
      id: parsed['wallet-id'],
      key: parsed['wallet-key'],
    },
    indyLedgers: parsed['indy-ledger'],
    publicDidSeed: parsed['public-did-seed'],
    endpoints: parsed.endpoint,
    autoAcceptConnections: parsed['auto-accept-connections'],
    autoAcceptCredentials: parsed['auto-accept-credentials'],
    autoAcceptProofs: parsed['auto-accept-proofs'],
    autoAcceptMediationRequests: parsed['auto-accept-mediation-requests'],
    useLegacyDidSovPrefix: parsed['use-legacy-did-sov-prefix'],
    logLevel: parsed['log-level'],
    inboundTransports: parsed['inbound-transport'],
    outboundTransports: parsed['outbound-transport'],
    connectionImageUrl: parsed['connection-image-url'],
    webhookUrl: parsed['webhook-url'],
    adminPort: parsed['admin-port'],
  } as AriesRestConfig)
}
