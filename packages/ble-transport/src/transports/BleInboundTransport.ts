import type { Central } from '@animo-id/react-native-ble-didcomm'
import type { Agent, InboundTransport, Logger } from '@aries-framework/core'
import type { EmitterSubscription } from 'react-native'

import { utils } from '@aries-framework/core'
import { MessageReceiver } from '@aries-framework/core/build/agent/MessageReceiver'
import { isValidJweStructure, JsonEncoder } from '@aries-framework/core/build/utils'

import { BleTransportSession } from './BleTransportSession'

export class BleInboundTransport implements InboundTransport {
  public supportedSchemes: string[] = ['ble']
  private agent!: Agent
  private central: Central
  private logger!: Logger
  private listener!: EmitterSubscription

  public constructor(sdk: Central) {
    this.central = sdk
  }

  public async start(agent: Agent): Promise<void> {
    this.agent = agent

    this.logger = agent.config.logger

    this.logger.debug('Starting BLE inbound transport')

    const messageListener = async (message: string) => {
      const session = new BleTransportSession(utils.uuid(), this.central)
      const messageReceiver = this.agent.injectionContainer.resolve(MessageReceiver)

      const encryptedMessage = JsonEncoder.fromString(message)

      this.logger.debug('BLE indicate message received.', { message: encryptedMessage })

      if (!isValidJweStructure(encryptedMessage)) {
        throw new Error(
          `Received a response from the other agent but the structure of the incoming message is not a DIDComm message: ${encryptedMessage}`
        )
      }

      await messageReceiver.receiveMessage(encryptedMessage, {
        session,
      })
    }

    this.listener = this.central.registerMessageListener(messageListener)
  }

  public async stop(): Promise<void> {
    this.listener.remove()
  }
}
