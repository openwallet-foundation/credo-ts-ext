import type { InitConfig } from '@aries-framework/core'

import { Agent, HttpOutboundTransport, WsOutboundTransport } from '@aries-framework/core'
import { IndySdkModule } from '@aries-framework/indy-sdk'
import { agentDependencies } from '@aries-framework/node'
import indySdk from 'indy-sdk'

import { PushNotificationsApnsModule, PushNotificationsFcmModule } from '../../src'

export const setupAgentFcm = async ({ name }: { name: string }) => {
  const agentConfig: InitConfig = {
    label: name,
    walletConfig: {
      id: name,
      key: 'someKey',
    },
    autoUpdateStorageOnStartup: true,
  }

  const agent = new Agent({
    config: agentConfig,
    dependencies: agentDependencies,
    modules: {
      indySdk: new IndySdkModule({
        indySdk,
      }),
      pushNotificationsFcm: new PushNotificationsFcmModule(),
    },
  })

  agent.registerOutboundTransport(new HttpOutboundTransport())
  agent.registerOutboundTransport(new WsOutboundTransport())

  await agent.initialize()
  return agent
}

export const setupAgentApns = async ({ name }: { name: string }) => {
  const agentConfig: InitConfig = {
    label: name,
    walletConfig: {
      id: name,
      key: 'someKey',
    },
    autoUpdateStorageOnStartup: true,
  }

  const agent = new Agent({
    config: agentConfig,
    dependencies: agentDependencies,
    modules: {
      indySdk: new IndySdkModule({
        indySdk,
      }),
      pushNotificationsApns: new PushNotificationsApnsModule(),
    },
  })

  agent.registerOutboundTransport(new HttpOutboundTransport())
  agent.registerOutboundTransport(new WsOutboundTransport())

  await agent.initialize()
  return agent
}
