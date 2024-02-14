import type { Ble } from '@animo-id/react-native-ble-didcomm'
import type { Agent, InboundTransport, Logger } from '@credo-ts/core'
import type { EmitterSubscription } from 'react-native'

import { TransportService, utils, MessageReceiver } from '@credo-ts/core'

import { BleTransportSession } from './BleTransportSession'

export class BleInboundTransport implements InboundTransport {
  public supportedSchemes: string[] = ['ble']
  private messenger: Ble
  private messageListener?: EmitterSubscription
  private session!: BleTransportSession
  private disconnectionListener?: EmitterSubscription
  private logger?: Logger

  public constructor(messenger: Ble) {
    this.messenger = messenger
  }

  public async start(agent: Agent): Promise<void> {
    this.logger = agent.config.logger
    this.logger.debug('Starting BLE inbound transport')

    const sessionId = utils.uuid()
    this.session = new BleTransportSession(sessionId, this.messenger, agent.context)

    const messageListener = async (data: { message: string }) => {
      const message = data.message

      const messageReceiver = agent.dependencyManager.resolve(MessageReceiver)

      try {
        const encryptedMessage = await JSON.parse(message)

        await messageReceiver.receiveMessage(encryptedMessage, {
          session: this.session,
        })
      } catch (error) {
        this.logger?.error(`Error processing message: ${error}`)
      }
    }

    this.messageListener = this.messenger.registerMessageListener(messageListener)

    const disconnectionListener = async (data: { identifier: string }) => {
      this.logger?.debug('BLE disconnection detected', { data })

      const transportService = agent.dependencyManager.resolve(TransportService)
      transportService.removeSession(this.session)
    }

    this.disconnectionListener = this.messenger.registerOnDisconnectedListener(disconnectionListener)
  }

  public async stop(): Promise<void> {
    this.logger?.debug('Stopping BLE inbound transport')

    this.messageListener?.remove()
    this.disconnectionListener?.remove()
    await this.messenger.shutdown()
  }
}
