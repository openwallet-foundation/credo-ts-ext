import type { InitConfig } from '@aries-framework/core'

import {
  Agent,
  ConsoleLogger,
  DidsModule,
  HttpOutboundTransport,
  LogLevel,
  WsOutboundTransport,
} from '@aries-framework/core'
import {
  IndySdkIndyDidRegistrar,
  IndySdkIndyDidResolver,
  IndySdkModule,
  IndySdkSovDidResolver,
} from '@aries-framework/indy-sdk'
import { agentDependencies } from '@aries-framework/node'
import indySdk from 'indy-sdk-react-native'

import { indyNetworks } from './genesis'

export const setupAgent = ({ name, publicDidSeed }: { name: string; publicDidSeed: string }) => {
  const modules = {
    indySdk: new IndySdkModule({
      indySdk,
      networks: indyNetworks,
    }),
    dids: new DidsModule({
      registrars: [new IndySdkIndyDidRegistrar()],
      resolvers: [new IndySdkSovDidResolver(), new IndySdkIndyDidResolver()],
    }),
  }
  const agentConfig: InitConfig = {
    label: name,
    walletConfig: {
      id: name,
      key: publicDidSeed,
    },
    logger: new ConsoleLogger(LogLevel.off),
    autoUpdateStorageOnStartup: true,
  }
  const agent = new Agent({
    config: agentConfig,
    dependencies: agentDependencies,
    modules: modules,
  })

  agent.registerOutboundTransport(new WsOutboundTransport())
  agent.registerOutboundTransport(new HttpOutboundTransport())

  return agent
}
