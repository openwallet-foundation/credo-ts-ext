import type { Peripheral } from '@animo-id/react-native-ble-didcomm'
import type { Agent, Logger, OutboundPackage, OutboundTransport } from '@aries-framework/core'

import { AriesFrameworkError } from '@aries-framework/core'

export class BleOutboundTransport implements OutboundTransport {
  public supportedSchemes: string[] = ['ble']
  private peripheral: Peripheral
  private logger!: Logger

  public constructor(peripheral: Peripheral) {
    this.peripheral = peripheral
  }

  public async start(agent: Agent): Promise<void> {
    this.logger = agent.config.logger

    agent.config.logger.debug('Starting BLE outbound transport')
  }

  public async sendMessage(outboundPackage: OutboundPackage): Promise<void> {
    const { payload, endpoint } = outboundPackage
    if (!endpoint) {
      throw new AriesFrameworkError(`Missing endpoint. I don't know how and where to send the message.`)
    }

    this.logger.debug(`Sending outbound message to endpoint '${endpoint}'`, {
      payload,
    })

    const serializedMessage = JSON.stringify(payload)

    this.logger.debug('Sending BLE outbound message')
    await this.peripheral.sendMessage(serializedMessage)
  }

  public async stop(): Promise<void> {
    this.logger.debug('Stopping BLE outbound transport')
  }
}
