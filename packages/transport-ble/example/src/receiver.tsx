import {
  Central,
  DEFAULT_DIDCOMM_INDICATE_CHARACTERISTIC_UUID,
  DEFAULT_DIDCOMM_MESSAGE_CHARACTERISTIC_UUID,
  DEFAULT_DIDCOMM_SERVICE_UUID
} from '@animo-id/react-native-ble-didcomm'
import { Agent, InitConfig } from '@aries-framework/core'
import React, { useState } from 'react'
import { Text, Button } from 'react-native'

import { Spacer } from './spacer'
import { BleInboundTransport } from '../transports'
import { createAgent } from './agent'

export const Receiver = () => {
  const [{ agent }] = useState<{ agent: Agent; config: InitConfig }>(() => createAgent())
  const [central] = useState<Central>(() => new Central())

  // const [isConnected, setIsConnected] = useState<boolean>()

  const [peripheralId, setPeripheralId] = useState<string>()

  const registerBleInboundTransport = async () => {
    await central.start()

    const bleInboundTransport = new BleInboundTransport(central)
    agent.registerInboundTransport(bleInboundTransport)
  }

  const initializeAgent = async () => {
    await agent.initialize()

    await agent.modules.anoncreds.createLinkSecret({
      setAsDefault: true
    })
  }

  const prepareScanning = async () => {
    central.registerOnDiscoveredListener((out) => {
      console.log(out)
      setPeripheralId(out.identifier)
    })
    central.registerOnConnectedListener((out) => {
      console.log(out)
      //   setIsConnected(true)
    })
    central.registerOnDisconnectedListener(console.log)
    await central.setService({
      serviceUUID: DEFAULT_DIDCOMM_SERVICE_UUID,
      messagingUUID: DEFAULT_DIDCOMM_MESSAGE_CHARACTERISTIC_UUID,
      indicationUUID: DEFAULT_DIDCOMM_INDICATE_CHARACTERISTIC_UUID
    })
  }

  const startScanning = async () => {
    await central.scan()
  }

  const connect = async () => {
    if (!peripheralId) throw new Error('no peripheral id found')
    await central.connect(peripheralId)
  }

  const sendOobMessage = async () => {
    const routing = await agent.mediationRecipient.getRouting({ useDefaultMediator: false })

    routing.endpoints = [`ble://${DEFAULT_DIDCOMM_SERVICE_UUID}`]

    const { invitation } = await agent.oob.createLegacyInvitation({
      routing
    })

    // const { message: agentMessage } = await agent.oob.createLegacyConnectionlessInvitation({
    //   recordId: outOfBandRecord.id,
    //   message: invitation,
    //   domain: `ble://${DEFAULT_DIDCOMM_SERVICE_UUID}`
    // })

    if (invitation.service)
      invitation.service.serviceEndpoint = `ble://${DEFAULT_DIDCOMM_SERVICE_UUID}`

    agent.config.endpoints = [`ble://${DEFAULT_DIDCOMM_SERVICE_UUID}`]

    await central.sendMessage(JSON.stringify(invitation.toJSON()))
  }

  return (
    <>
      <Text>Receiver!</Text>
      <Button title="register BLE inbound transport" onPress={registerBleInboundTransport} />
      <Spacer />
      <Button title="Initialize the agent" onPress={initializeAgent} />
      <Spacer />
      <Button title="Prepare for scanning" onPress={prepareScanning} />
      <Spacer />

      <Button title="Start scanning" onPress={startScanning} />
      <Spacer />

      <Button title="Connect" onPress={connect} />
      <Spacer />

      <Button title="Send message" onPress={sendOobMessage} />
      <Spacer />
    </>
  )
}
