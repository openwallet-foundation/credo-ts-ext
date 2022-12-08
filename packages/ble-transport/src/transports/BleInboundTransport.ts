import type { StartOptions } from '@animo-id/react-native-ble-didcomm'
import type { Agent, InboundTransport, Logger } from '@aries-framework/core'

import { Peripheral } from '@animo-id/react-native-ble-didcomm'
import { utils } from '@aries-framework/core'
import { MessageReceiver } from '@aries-framework/core/build/agent/MessageReceiver'
import { isValidJweStructure, JsonEncoder } from '@aries-framework/core/build/utils'

import { BleTransportSession } from './BleTransportSession'

export class BleInboundTransport implements InboundTransport {
  private agent!: Agent
  private logger!: Logger
  private sdk: Peripheral

  // FIXME: When is this going to be invoked, the connection (or invitation) would need a ble: endpoint?
  // AFJ Needs an endpoint
  // @berend, any thoughts on this?

  public supportedSchemes: string[] = []
  public uuids: StartOptions

  // We can only initialize this transport when the QR is scanned.
  public constructor(uuids: StartOptions) {
    this.sdk = new Peripheral()
    this.uuids = uuids
  }

  public async start(agent: Agent): Promise<void> {
    this.agent = agent

    this.logger = agent.config.logger

    this.logger.debug('Starting BLE inbound transport')

    // Start the Peripheral
    await this.sdk.start({
      serviceUUID: this.uuids.serviceUUID,
      messagingUUID: this.uuids.messagingUUID,
      indicationUUID: this.uuids.indicationUUID,
    })

    // Listen for messages
    this.sdk.registerMessageListener(this.handleNotification)
  }

  public async sendMessage(message: unknown) {
    await this.sdk.sendMessage(message as string)
  }

  public handleNotification = async (message: string) => {
    const messageReceiver = this.agent.injectionContainer.resolve(MessageReceiver)

    const encryptedMessage = JsonEncoder.fromString(message)

    this.logger.trace('BLE write message received.', { message: encryptedMessage })

    if (!isValidJweStructure(encryptedMessage)) {
      throw new Error(
        `Received a response from the other agent but the structure of the incoming message is not a DIDComm message: ${encryptedMessage}`
      )
    }

    this.logger.debug('Payload received from mediator:', encryptedMessage)

    await messageReceiver.receiveMessage(encryptedMessage, {
      session: new BleTransportSession(utils.uuid(), this.sdk),
    })
  }

  public async stop(): Promise<void> {
    await this.sdk.shutdown()
  }
}
