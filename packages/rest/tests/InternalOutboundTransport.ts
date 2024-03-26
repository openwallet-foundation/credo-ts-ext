import type { OutboundPackage, OutboundTransport, Agent, Logger } from '@credo-ts/core'

import { MessageReceiver, InjectionSymbols } from '@credo-ts/core'

export class InternalOutboundTransport implements OutboundTransport {
  private logger!: Logger
  private agent!: Agent

  public supportedSchemes = ['internal']

  public async start(agent: Agent): Promise<void> {
    this.agent = agent

    this.logger = agent.dependencyManager.resolve(InjectionSymbols.Logger)
  }

  public async stop(): Promise<void> {
    // No logic needed
  }

  public async sendMessage(outboundPackage: OutboundPackage) {
    const messageReceiver = this.agent.dependencyManager.resolve(MessageReceiver)

    this.logger.debug(`Sending outbound message to self`)

    // We can just receive the message as it's internal.
    messageReceiver.receiveMessage(outboundPackage.payload)
  }
}
