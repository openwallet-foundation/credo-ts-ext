import type { Agent, AgentContext, Logger } from '@credo-ts/core'

import { InjectionSymbols } from '@credo-ts/core'
import { DidCommMessageReceiver, type DidCommOutboundPackage, type DidCommOutboundTransport } from '@credo-ts/didcomm'

export class InternalOutboundTransport implements DidCommOutboundTransport {
  private logger!: Logger
  private agentContext!: AgentContext

  public supportedSchemes = ['internal']

  public async start(agentContext: AgentContext): Promise<void> {

    // TODO: Check if this works correctly, coz earlier we used to accept "agent" instead of the "agentContext"
    this.agentContext = agentContext
    this.logger = agentContext.dependencyManager.resolve(InjectionSymbols.Logger)
  }

  public async stop(): Promise<void> {
    // No logic needed
  }

  public async sendMessage(outboundPackage: DidCommOutboundPackage) {
    const messageReceiver = this.agentContext.dependencyManager.resolve(DidCommMessageReceiver)

    this.logger.debug(`Sending outbound message to self`)

    // We can just receive the message as it's internal.
    messageReceiver.receiveMessage(outboundPackage.payload)
  }
}
