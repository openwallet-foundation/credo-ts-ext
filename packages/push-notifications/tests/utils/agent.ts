import type { InitConfig } from '@aries-framework/core'

import { AskarModule } from '@aries-framework/askar'
import { Agent, HttpOutboundTransport, KeyDerivationMethod, WsOutboundTransport } from '@aries-framework/core'
// import { IndySdkModule } from '@aries-framework/indy-sdk'
import { agentDependencies } from '@aries-framework/node'
import { ariesAskar } from '@hyperledger/aries-askar-nodejs'
// import indySDKMod from 'indy-sdk'

// import { indyNetworks } from './genesis'

export const setupAgent = async ({ name, publicDidSeed }: { name: string; publicDidSeed: string }) => {
  const agentConfig: InitConfig = {
    label: name,
    walletConfig: {
      id: name,
      key: publicDidSeed,
      keyDerivationMethod: KeyDerivationMethod.Raw,
    },
    autoUpdateStorageOnStartup: true,
  }

  // const createAgentModules = () => {
  //   const modules = {
  //     indySdk: new IndySdkModule({
  //       indySdk,
  //       networks: indyNetworks,
  //     }),
  //   }

  //   return modules
  // }

  const agent = new Agent({
    config: agentConfig,
    dependencies: agentDependencies,
    modules: {
      askar: new AskarModule({
        ariesAskar,
      }),
    },
  })

  agent.registerOutboundTransport(new HttpOutboundTransport())
  agent.registerOutboundTransport(new WsOutboundTransport())

  await agent.initialize()
  return agent
}
