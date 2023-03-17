import type { Central } from '@animo-id/react-native-ble-didcomm'
import type { Agent, InboundTransport, Logger } from '@aries-framework/core'
import type { EmitterSubscription } from 'react-native'

import { TransportService, utils, MessageReceiver } from '@aries-framework/core'

import { BleTransportSession } from './BleTransportSession'

export class BleInboundTransport implements InboundTransport {
  public supportedSchemes: string[] = ['ble']
  private central: Central
  private messageListener?: EmitterSubscription
  private session!: BleTransportSession
  private disconnectionListener?: EmitterSubscription
  private logger!: Logger

  public constructor(sdk: Central) {
    this.central = sdk
  }

  public async start(agent: Agent): Promise<void> {
    this.logger = agent.config.logger

    this.logger.debug('Starting BLE inbound transport')

    const sessionId = utils.uuid()

    this.session = new BleTransportSession(sessionId, this.central, agent)

    const messageListener = async (data: unknown) => {
      this.logger.debug('BLE indicate message object received: ', { message: data })

      this.logger.debug('Resolving BLE indicate message object to correct type')

      const messageData = (await data) as { message: string }

      this.logger.debug('Resolved BLE indicate message object: ', { message: messageData })

      const message = messageData.message

      this.logger.debug('Parsing stringified object payload: ', { message })

      const encryptedMessage = await JSON.parse(message)

      this.logger.debug('Starting agent message receiver')

      const messageReceiver = agent.dependencyManager.resolve(MessageReceiver)

      this.logger.debug('Receiving parsed BLE indicate message payload: ', {
        message: encryptedMessage,
      })

      try {
        await messageReceiver.receiveMessage(encryptedMessage, {
          session: this.session,
        })
      } catch (error) {
        agent.config.logger.error(`Error processing message: ${error}`)
      }
    }

    this.messageListener = this.central.registerMessageListener(messageListener)

    const disconnectionListener = async (data: unknown) => {
      this.logger.debug('BLE disconnection detected', data as Record<string, unknown>)

      const transportService = agent.dependencyManager.resolve(TransportService)

      transportService.removeSession(this.session)
    }

    this.disconnectionListener = this.central.registerOnDisconnectedListener(disconnectionListener)
  }

  public async stop(): Promise<void> {
    this.logger.debug('Stopping BLE inbound transport')

    this.messageListener?.remove()

    this.disconnectionListener?.remove()
  }
}
