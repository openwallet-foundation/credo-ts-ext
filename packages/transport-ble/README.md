<p align="center">
  <br />
  <img
    alt="Hyperledger Aries logo"
    src="https://raw.githubusercontent.com/hyperledger/aries-framework-javascript/aa31131825e3331dc93694bc58414d955dcb1129/images/aries-logo.png"
    height="250px"
  />
</p>
<h1 align="center"><b>Bluetooth Low Energy transport for Aries Framework JavaScript</b></h1>
<p align="center">
  <a
    href="https://raw.githubusercontent.com/hyperledger/aries-framework-javascript-ext/main/LICENSE"
    ><img
      alt="License"
      src="https://img.shields.io/badge/License-Apache%202.0-blue.svg"
  /></a>
  <a href="https://www.typescriptlang.org/"
    ><img
      alt="typescript"
      src="https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg"
  /></a>
    <a href="https://www.npmjs.com/package/@aries-framework/transport-ble"
    ><img
      alt="@aries-framework/transport-ble version"
      src="https://img.shield.io/npm/v/@aries-framework/transport-ble"
  /></a>
  <br />
</p>

The Aries Framework JavaScript BLE Transport package provides a simple way to add Bluetooth Low Energy (BLE) data transport into AFJ React Native mobile agents.

It implements the same transport interface as the outbound transports in [@aries-framework/core](https://www.npmjs.com/package/@aries-framework/core), and the inbound transports in [@aries-framework/node](https://www.npmjs.com/package/@aries-framework/node).

With this transport enabled, AFJ React Native mobile agents gain the ability to do offline DIDComm exchanges using Bluetooth Low Energy (BLE).

To keep this transport implementation focused on the 'DIDComm' wrapper needed to make it useful to AFJ agents, this transport package is built on this [BLE DIDComm SDK](https://www.npmjs.com/package/@animo-id/react-native-ble-didcomm).

The **BLE DIDComm SDK** implements the core Bluetooth hardware interface for Android (in Kotlin) and iOS (Swift), and exposes the simple APIs that this BLE transport implementation uses.

And to keep the implementation simple, this transport only implements the core message listening and receiving functionality, and leaves the powerful startup and service controls provided by the BLE DIDComm SDK, to user control and discretion.

We're this discussing if this is the best approach to use in future versions. If after using this first version and you have strong opinions on this, kindly join the conversation [here]()

## Installing the required dependencies

```sh
yarn add @aries-framework/transport-ble @aries-framework/core @aries-framework/react-native @animo-id/react-native-ble-didcomm
```

## Configuration

Configuring your agent to use the transport is simple; all you need is to import the transports (`BleOutboundTransport` and `BleInboundTransport`) from the package, and register them on the agent, either before or after initialization.

The only difference is that unlike HTTP and WebSockets, an agent can only register one of either outbound (`BleOutboundTransport`) or inbound (`BleInboundTransport`) transport, depending on which role the agent wants to take in the BLE DIDComm exchange.

To this end, the BLE DIDComm SDK provides two controllers for this purpose: `Central`, to be used by the agent who will be initiating the exchange (creating and sending the out-of-band invitation), and `Peripheral`, for the agent who will be receiving and accepting the invitation.

So, `BleInboundTransport` for agent acting as the `Central` , and `BleOutboundTransport` for the agent acting as the `Peripheral`.

```ts
// If you want to register the transports only after initializing the agent, you can do this anywhere else in your app, and just leave out the agent config and initialization

// Full examples of how to use the transports are located in the `samples` directory.

import { BleOutboundTransport, BleInboundTransport } from '@aries-framework/transport-ble'
import { Agent } from '@aries-framework/core'
import { agentDependencies } from '@aries-framework/react-native'
import { Central, Peripheral } from '@animo-id/react-native-ble-didcomm'

const createAgent = async () => {
  const agent = new Agent({
    config: {
      // ... AFJ Config ... //
    },
    modules: {
      // ... AFJ Module config
    },
    dependencies: agentDependencies,
  })

  // Instantiate the BLE controller you want
  const central = new Central() // const peripheral = new Peripheral() for the peripheral agent

  // It is important that you start the BLE controllers before you use/register them on your agent
  await central.start() // await peripheral.start()

  const bleInboundTransport = new BleInboundTransport(central) // const bleOutboundTransport = new BleOutboundTransport(peripheral)
  agent.registerInboundTransport(bleInboundTransport) // agent.registerOutboundTransport(bleOutboundTransport)

  await agent.initialize()

  return agent
}

// Inside your React Native app/component
const agent = await createAgent()
```
