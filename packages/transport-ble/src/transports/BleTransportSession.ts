import type { Ble } from '@animo-id/react-native-ble-didcomm'
import type { AgentContext, EncryptedMessage, TransportSession } from '@credo-ts/core'

import { utils } from '@credo-ts/core'

export class BleTransportSession implements TransportSession {
  public readonly type = 'ble'
  public id: string

  private agentContext: AgentContext
  private messenger: Ble

  public constructor(id: string, messenger: Ble, agentContext: AgentContext) {
    this.id = id ?? utils.uuid()
    this.messenger = messenger
    this.agentContext = agentContext
  }

  public async send(agentContext: AgentContext, encryptedMessage: EncryptedMessage): Promise<void> {
    const serializedMessage = JSON.stringify(encryptedMessage)

    agentContext.config.logger.debug('Sending BLE inbound message via session')
    await this.messenger.sendMessage(serializedMessage)
  }

  public async close(): Promise<void> {
    this.agentContext.config.logger.debug('Stopping BLE inbound session')
  }
}
