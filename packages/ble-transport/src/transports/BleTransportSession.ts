import type { Peripheral } from '@animo-id/react-native-ble-didcomm'
import type { EncryptedMessage, TransportSession } from '@aries-framework/core'

export class BleTransportSession implements TransportSession {
  public id: string
  public readonly type = 'ble'
  public sdk: Peripheral

  public constructor(id: string, sdk: Peripheral) {
    this.id = id
    this.sdk = sdk
  }

  public send(encryptedMessage: EncryptedMessage): Promise<void> {
    return this.sdk.sendMessage(JSON.stringify(encryptedMessage))
  }

  public async close(): Promise<void> {
    this.sdk.shutdown()
  }
}
