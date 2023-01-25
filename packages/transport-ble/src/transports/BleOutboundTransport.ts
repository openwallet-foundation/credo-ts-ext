import type { Peripheral } from '@animo-id/react-native-ble-didcomm'
import type { Agent, Logger, OutboundPackage, OutboundTransport } from '@aries-framework/core'

import { JsonEncoder } from '@aries-framework/core/build/utils'

export class BleOutboundTransport implements OutboundTransport {
  public supportedSchemes: string[] = ['ble']
  private peripheral: Peripheral
  private logger!: Logger

  public constructor(sdk: Peripheral) {
    this.peripheral = sdk
  }

  public async start(agent: Agent): Promise<void> {
    this.logger = agent.config.logger

    agent.config.logger.debug('Starting BLE outbound transport')

    await this.peripheral.start()
  }

  public async sendMessage(outboundPackage: OutboundPackage): Promise<void> {
    const { payload } = outboundPackage
    const serializedMessage = JsonEncoder.toString(payload)

    this.logger.debug('Sending BLE outbound message')

    await this.peripheral.sendMessage(serializedMessage)
  }

  public async stop(): Promise<void> {
    this.logger.debug('Stopping BLE outbound transport')

    await this.peripheral.shutdown()
  }
}
