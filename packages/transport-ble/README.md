<p align="center">
  <br />
  <img
    alt="Credo logo"
    src="https://github.com/openwallet-foundation/credo-ts/blob/c7886cb8377ceb8ee4efe8d264211e561a75072d/images/credo-logo.png"
    height="250px"
  />
</p>
<h1 align="center"><b>Bluetooth Low Energy transport for Credo</b></h1>
<p align="center">
  <a
    href="https://raw.githubusercontent.com/openwallet-foundation/credo-ts-ext/main/LICENSE"
    ><img
      alt="License"
      src="https://img.shields.io/badge/License-Apache%202.0-blue.svg"
  /></a>
  <a href="https://www.typescriptlang.org/"
    ><img
      alt="typescript"
      src="https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg"
  /></a>
    <a href="https://www.npmjs.com/package/@credo-ts/transport-ble"
    ><img
      alt="@credo-ts/transport-ble version"
      src="https://img.shield.io/npm/v/@credo-ts/transport-ble"
  /></a>
  <br />
</p>

The Credo BLE Transport package provides a simple way to add Bluetooth Low Energy (BLE) data transport into Credo React Native mobile agents.

It implements the same transport interface as the outbound transports in [@credo-ts/core](https://www.npmjs.com/package/@credo-ts/core), and the inbound transports in [@credo-ts/node](https://www.npmjs.com/package/@credo-ts/node).

With this transport enabled, Credo React Native mobile agents gain the ability to do offline DIDComm exchanges using Bluetooth Low Energy (BLE).

To keep this transport implementation focused on the 'DIDComm' wrapper needed to make it useful to Credo agents, this transport package is built on this [BLE DIDComm SDK](https://www.npmjs.com/package/@animo-id/react-native-ble-didcomm).

The **BLE DIDComm SDK** implements the core Bluetooth hardware interface for Android (in Kotlin) and iOS (Swift), and exposes the simple APIs that this BLE transport implementation uses.

And to keep the implementation simple, this transport only implements the core message listening and receiving functionality, and leaves the powerful startup and service controls provided by the BLE DIDComm SDK, to user control and discretion.

We're this discussing if this is the best approach to use in future versions. If after using this first version and you have strong opinions on this, kindly join the conversation [here](https://github.com/openwallet-foundation/credo-ts-ext/issues/197).

## Installing the required dependencies

```sh
yarn add @credo-ts/transport-ble @credo-ts/core @credo-ts/react-native @animo-id/react-native-ble-didcomm
```

## Configuration

Configuring your agent to use the transport is simple; all you need is to import the transports, `BleOutboundTransport` and `BleInboundTransport`, from the package, and register them on the agent, either before or after agent initialization.

The only difference is that unlike HTTP and WebSockets, an agent can only register one of either outbound, `BleOutboundTransport`, or inbound, `BleInboundTransport`, transport, depending on which role the agent wants to take in the BLE DIDComm exchange.

The BLE DIDComm SDK provides two controllers: `Central`, to be used by the agent who will be initiating the exchange (creating and sending the out-of-band invitation), and `Peripheral`, for the agent who will be receiving and accepting the invitation.

This means that the agent acting as the connection initiator should use the `Central` controller with `BleInboundTransport`, while the agent acting as the connection receptor uses the Peripheral controller with `BleOutboundTransport`.

```ts
// If you want to register the transports only after initializing the agent, you can do this anywhere else in your app, and just leave out the agent config and initialization

import { BleOutboundTransport, BleInboundTransport } from '@credo-ts/transport-ble'
import { Agent } from '@credo-ts/core'
import { agentDependencies } from '@credo-ts/react-native'
import {
  Central,
  Peripheral,
  DEFAULT_DIDCOMM_SERVICE_CHARACTERISTIC_UUID,
  DEFAULT_DIDCOMM_MESSAGE_CHARACTERISTIC_UUID,
  DEFAULT_DIDCOMM_INDICATE_CHARACTERISTIC_UUID,
} from '@animo-id/react-native-ble-didcomm'

const createAgent = async () => {
  const agent = new Agent({
    config: {
      // ... Credo Config ... //
    },
    modules: {
      // ... Credo Module config
    },
    dependencies: agentDependencies,
  })

  // Instantiate the BLE controller you want
  const central = new Central() // const peripheral = new Peripheral() for the peripheral agent

  // It is important that you start the BLE controllers before you use/register them on your agent
  await central.start() // await peripheral.start()

  /* IMPORTANT: Setting up the service, messaging and indication UUIDs. 
  The values passed must be the same in the central and peripheral, 
  as this is how both devices will be able to recognize each other. 
  There are default values for these that can be imported, 
  but if you want to maintain control over the sessions and/or prevent collisions 
  (due to multiple other devices broadcasting using these same values), 
  you might want to generate your own serviceUUID and share it across both mobile agents 
  (using a scannable QR code or something similar that allows easy sharing with little overhead)
  
  This can be done anywhere after starting the controller (step above), 
  even after registering the controller as a transport on the agent (step below) */

  const uuid = '56847593-40ea-4a92-bd8c-e1514dca1c61'
  await central.setService({
    serviceUUID: uuid || DEFAULT_DIDCOMM_SERVICE_CHARACTERISTIC_UUID,
    messagingUUID: DEFAULT_DIDCOMM_MESSAGE_CHARACTERISTIC_UUID,
    indicationUUID: DEFAULT_DIDCOMM_INDICATE_CHARACTERISTIC_UUID,
  })

  /* On the peripheral agent
    await peripheral.setService({
      serviceUUID: uuid || DEFAULT_DIDCOMM_SERVICE_CHARACTERISTIC_UUID,
      messagingUUID: DEFAULT_DIDCOMM_MESSAGE_CHARACTERISTIC_UUID,
      indicationUUID: DEFAULT_DIDCOMM_INDICATE_CHARACTERISTIC_UUID
    })
  */

  // Registering the controller as a transport on the agent
  const bleInboundTransport = new BleInboundTransport(central) // const bleOutboundTransport = new BleOutboundTransport(peripheral)
  agent.registerInboundTransport(bleInboundTransport) // agent.registerOutboundTransport(bleOutboundTransport)

  await agent.initialize()

  return agent
}

// Inside your React Native app/component
const agent = await createAgent()
```
