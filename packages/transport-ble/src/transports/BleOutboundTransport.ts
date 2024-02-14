import type { Ble } from '@animo-id/react-native-ble-didcomm'
import type { Agent, Logger, OutboundPackage, OutboundTransport } from '@credo-ts/core'

import { CredoError } from '@credo-ts/core'

export class BleOutboundTransport implements OutboundTransport {
  public supportedSchemes: string[] = ['ble']
  private messenger: Ble
  private logger?: Logger

  public constructor(messenger: Ble) {
    this.messenger = messenger
  }

  public async start(agent: Agent): Promise<void> {
    this.logger = agent.config.logger

    this.logger.debug('Starting BLE outbound transport')
  }

  public async sendMessage(outboundPackage: OutboundPackage): Promise<void> {
    const { payload, endpoint } = outboundPackage
    if (!endpoint) {
      throw new CredoError(`Missing endpoint. I don't know how and where to send the message.`)
    }

    this.logger?.debug(`Sending outbound message to endpoint '${endpoint}'`, {
      payload,
    })

    const serializedMessage = JSON.stringify(payload)

    this.logger?.debug('Sending BLE outbound message')
    await this.messenger.sendMessage(serializedMessage)
  }

  public async stop(): Promise<void> {
    this.logger?.debug('Stopping BLE outbound transport')
    await this.messenger.shutdown()
  }
}
