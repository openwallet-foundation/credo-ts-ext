import type { Central } from '@animo-id/react-native-ble-didcomm'
import type { Agent, AgentContext, EncryptedMessage, TransportSession } from '@aries-framework/core'

import { utils } from '@aries-framework/core'

export class BleTransportSession implements TransportSession {
  public readonly type = 'ble'
  public id: string
  private agent: Agent
  private central: Central

  public constructor(id: string, central: Central, agent: Agent) {
    this.id = id ?? utils.uuid()
    this.agent = agent
    this.central = central
  }

  public async send(agentContext: AgentContext, encryptedMessage: EncryptedMessage): Promise<void> {
    const serializedMessage = JSON.stringify(encryptedMessage)

    this.agent.config.logger.debug('Sending BLE inbound message via session')
    await this.central.sendMessage(serializedMessage)
  }

  public async close(): Promise<void> {
    this.agent.config.logger.debug('Stopping BLE inbound session')
  }
}
