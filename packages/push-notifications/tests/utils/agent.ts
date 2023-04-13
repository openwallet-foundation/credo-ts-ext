import type { InitConfig } from '@aries-framework/core'

import { Agent, ConsoleLogger, HttpOutboundTransport, LogLevel, WsOutboundTransport } from '@aries-framework/core'
import { agentDependencies } from '@aries-framework/node'

export const setupAgent = ({ name, publicDidSeed }: { name: string; publicDidSeed: string }) => {
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
    modules: undefined,
  })

  agent.registerOutboundTransport(new WsOutboundTransport())
  agent.registerOutboundTransport(new HttpOutboundTransport())

  return agent
}
