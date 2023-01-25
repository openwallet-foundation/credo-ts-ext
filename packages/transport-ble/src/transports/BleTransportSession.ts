import type { Central } from '@animo-id/react-native-ble-didcomm'
import type { Agent, EncryptedMessage, TransportSession } from '@aries-framework/core'

import { JsonEncoder } from '@aries-framework/core'

export class BleTransportSession implements TransportSession {
  public readonly type = 'BluetoothLowEnergy'
  public id: string
  private agent: Agent
  private central: Central

  public constructor(id: string, sdk: Central, agent: Agent) {
    this.id = id
    this.agent = agent
    this.central = sdk
  }

  public async send(encryptedMessage: EncryptedMessage): Promise<void> {
    const serializedMessage = JsonEncoder.toString(encryptedMessage)

    this.agent.config.logger.debug('Sending BLE inbound message')

    await this.central.sendMessage(serializedMessage)
  }

  public async close(): Promise<void> {
    this.agent.config.logger.debug('Stopping BLE inbound transport')
  }
}
