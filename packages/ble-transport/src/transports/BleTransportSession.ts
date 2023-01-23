import type { Central } from '@animo-id/react-native-ble-didcomm'
import type { EncryptedMessage, Logger, TransportSession } from '@aries-framework/core'

import { ConsoleLogger, LogLevel, JsonEncoder } from '@aries-framework/core'

export class BleTransportSession implements TransportSession {
  public readonly type = 'Bluetooth Low Energy'
  public id: string
  private logger: Logger
  private central: Central

  public constructor(id: string, sdk: Central) {
    this.id = id
    this.logger = new ConsoleLogger(LogLevel.debug)
    this.central = sdk
  }

  public async send(encryptedMessage: EncryptedMessage): Promise<void> {
    const serializedMessage = JsonEncoder.toString(encryptedMessage)

    this.logger.debug('Sending BLE inbound message')

    await this.central.sendMessage(serializedMessage)
  }

  public async close(): Promise<void> {
    this.logger.debug('Stopping BLE inbound transport')

    await this.central.shutdown()
  }
}
