import {
  DEFAULT_DIDCOMM_INDICATE_CHARACTERISTIC_UUID,
  DEFAULT_DIDCOMM_MESSAGE_CHARACTERISTIC_UUID,
  DEFAULT_DIDCOMM_SERVICE_UUID,
  Peripheral
} from '@animo-id/react-native-ble-didcomm'
import { Agent, InitConfig } from '@aries-framework/core'
import { useState } from 'react'
import { Text, Button } from 'react-native'

import { Spacer } from './spacer'

import { createAgent } from './agent'

import { BleOutboundTransport } from './transports'

export const Sender = () => {
  const [{ agent }] = useState<{ agent: Agent; config: InitConfig }>(() => createAgent())
  const [peripheral] = useState<Peripheral>(() => new Peripheral())

  const registerBleOutboundTransport = async () => {
    await peripheral.start()

    const bleOutboundTransport = new BleOutboundTransport(peripheral)
    agent.registerOutboundTransport(bleOutboundTransport)
  }

  const initializeAgent = async () => {
    await agent.initialize()

    await agent.modules.anoncreds.createLinkSecret({
      setAsDefault: true
    })
  }

  const prepareAdvertising = async () => {
    peripheral.registerMessageListener(async (data: unknown) => {
      const messageData = (await data) as { message: string }

      const message = messageData.message

      await agent.receiveMessage(await JSON.parse(message))
    })

    peripheral.registerOnConnectedListener(console.log)
    peripheral.registerOnDisconnectedListener(console.log)
    await peripheral.setService({
      serviceUUID: DEFAULT_DIDCOMM_SERVICE_UUID,
      messagingUUID: DEFAULT_DIDCOMM_MESSAGE_CHARACTERISTIC_UUID,
      indicationUUID: DEFAULT_DIDCOMM_INDICATE_CHARACTERISTIC_UUID
    })
  }

  const startAdvertising = async () => {
    await peripheral.advertise()
  }

  return (
    <>
      <Text>Sender!</Text>
      <Button title="register BLE outbound transport" onPress={registerBleOutboundTransport} />
      <Spacer />
      <Button title="Initialize the agent" onPress={initializeAgent} />
      <Spacer />
      <Button title="Prepare for advertising" onPress={prepareAdvertising} />
      <Spacer />
      <Button title="Start advertising" onPress={startAdvertising} />
      <Spacer />
    </>
  )
}
