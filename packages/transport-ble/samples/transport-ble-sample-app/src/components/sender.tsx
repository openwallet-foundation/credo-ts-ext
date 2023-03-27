import {
  DEFAULT_DIDCOMM_INDICATE_CHARACTERISTIC_UUID,
  DEFAULT_DIDCOMM_MESSAGE_CHARACTERISTIC_UUID,
  DEFAULT_DIDCOMM_SERVICE_UUID,
  Peripheral,
} from '@animo-id/react-native-ble-didcomm'
import { Agent, CredentialEventTypes, CredentialState, CredentialStateChangedEvent, InitConfig } from '@aries-framework/core'
import { useState } from 'react'
import { Text, Button } from 'react-native'

import { Spacer } from './spacer'

import {
  COMMUNITY_AGENT_API_ENDPOINT,
  CREDENTIAL_OFFER_DATA,
  MEDIATOR_INVITATION
} from '../constants'

import { createAgent } from '../functions/agent'
import React from 'react'
import { BleOutboundTransport } from '@aries-framework/transport-ble'

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
      setAsDefault: true,
    })

    let { connectionRecord } = await agent.oob.receiveInvitationFromUrl(MEDIATOR_INVITATION)

    if (!connectionRecord) throw new Error('No connection')

    connectionRecord = await agent.connections.returnWhenIsConnected(connectionRecord.id)

    const mediationRecord = await agent.mediationRecipient.provision(connectionRecord)

    await agent.mediationRecipient.setDefaultMediator(mediationRecord)

    await agent.mediationRecipient.pickupMessages(connectionRecord)

    try {
      const connectionInvitation = await (
        await fetch(
          `${COMMUNITY_AGENT_API_ENDPOINT}/connections/create-invitation?auto_accept=true`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
      ).json()

      const { connectionRecord } = await agent.oob.receiveInvitationFromUrl(
        connectionInvitation.invitation_url
      )

      if (!connectionRecord) throw new Error('No connection')

      await agent.connections.returnWhenIsConnected(connectionRecord.id)

      const waitForCredentialExchangeStateToBeDone = new Promise((resolve) => {
        agent.events.on<CredentialStateChangedEvent>(
          CredentialEventTypes.CredentialStateChanged,
          ({ payload }) => {
            if (payload.credentialRecord.state === CredentialState.Done)
              resolve(payload.credentialRecord)
          }
        )
      })

      CREDENTIAL_OFFER_DATA.connection_id = connectionInvitation.connection_id

      await fetch(`${COMMUNITY_AGENT_API_ENDPOINT}/issue-credential/send-offer`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(CREDENTIAL_OFFER_DATA)
      })

      // Wait for process to complete
      const credentialExchangeRecord = await waitForCredentialExchangeStateToBeDone

      console.log('Credential issuance completed', credentialExchangeRecord as Record<string, any>)
    } catch (error) {
      agent.config.logger.error(error as string)
    }
  }

  const prepareAdvertising = async () => {
    peripheral.registerMessageListener(async (data: { message: string }) => {
      console.log(`Received out-of-band message: ${data.message}`)

      const message = data.message

      await agent.receiveMessage(await JSON.parse(message))
    })

    peripheral.registerOnConnectedListener(console.log)
    peripheral.registerOnDisconnectedListener(console.log)
    await peripheral.setService({
      serviceUUID: DEFAULT_DIDCOMM_SERVICE_UUID,
      messagingUUID: DEFAULT_DIDCOMM_MESSAGE_CHARACTERISTIC_UUID,
      indicationUUID: DEFAULT_DIDCOMM_INDICATE_CHARACTERISTIC_UUID,
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
