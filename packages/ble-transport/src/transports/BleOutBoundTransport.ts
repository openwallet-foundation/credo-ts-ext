import type { StartOptions } from '@animo-id/react-native-ble-didcomm'
import type { Agent, Logger, OutboundPackage, OutboundTransport } from '@aries-framework/core'
import type { EmitterSubscription } from 'react-native'

import { Central } from '@animo-id/react-native-ble-didcomm'
import { MessageReceiver } from '@aries-framework/core/build/agent/MessageReceiver'
import { isValidJweStructure, JsonEncoder } from '@aries-framework/core/build/utils'

export class BleOutboundTransport implements OutboundTransport {
  private agent!: Agent
  private logger!: Logger
  private sdk: Central

  // FIXME: When is this going to be invoked, the connection (or invitation) would need a ble: endpoint?
  // AFJ Needs an endpoint
  // @berend, any thoughts on this?

  public supportedSchemes: string[] = []
  public uuids: StartOptions

  // We can only initialize this transport when the QR is scanned.
  public constructor(uuids: StartOptions) {
    this.sdk = new Central()
    this.uuids = uuids
  }

  public async start(agent: Agent): Promise<void> {
    this.agent = agent

    this.logger = agent.config.logger

    this.logger.debug('Starting BLE outbound transport')

    // Start the Central
    await this.sdk.start({
      serviceUUID: this.uuids.serviceUUID,
      messagingUUID: this.uuids.messagingUUID,
      indicationUUID: this.uuids.indicationUUID,
    })

    await this.sdk.scan()

    const onDiscoveredPeripheralListener = this.sdk.registerOnDiscoveredListener(async ({ peripheralId, name }) => {
      this.logger.debug(`Discovered: ${name} with id: ${peripheralId}`)
      await this.sdk.connect(peripheralId)
    })

    const onConnectedPeripheralListener = this.sdk.registerOnConnectedListener(async ({ peripheralId, name }) => {
      this.logger.debug(`Connected to: ${name} with id: ${peripheralId}`)
      onDiscoveredPeripheralListener.remove()
    })

    this.sdk.registerMessageListener(
      async (message) => await this.handleMessage(message, onConnectedPeripheralListener)
    )
  }

  public async sendMessage(outboundPackage: OutboundPackage) {
    await this.sdk.sendMessage(JSON.stringify(outboundPackage))
  }

  private handleMessage = async (message: string, onConnectedPeripheralListener: EmitterSubscription) => {
    const messageReceiver = this.agent.injectionContainer.resolve(MessageReceiver)

    const encryptedMessage = JsonEncoder.fromString(message)

    this.logger.debug('BLE notify message received.', { message: encryptedMessage })

    if (!isValidJweStructure(encryptedMessage)) {
      throw new Error(
        `Received a response from the other agent but the structure of the incoming message is not a DIDComm message: ${encryptedMessage}`
      )
    }

    this.logger.debug('Payload received from mediator:', encryptedMessage)

    await messageReceiver.receiveMessage(encryptedMessage, {})

    onConnectedPeripheralListener.remove()
  }

  public async stop(): Promise<void> {
    await this.sdk.shutdown()
  }
}
