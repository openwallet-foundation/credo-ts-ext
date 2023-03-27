<p align="center">
  <br />
  <img
    alt="Hyperledger Aries logo"
    src="https://raw.githubusercontent.com/hyperledger/aries-framework-javascript/aa31131825e3331dc93694bc58414d955dcb1129/images/aries-logo.png"
    height="250px"
  />
</p>
<h1 align="center"><b>Aries Framework JavaScript Push Notifications Plugin</b></h1>
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
    <a href="https://www.npmjs.com/package/@aries-framework/push-notifications"
    ><img
      alt="@aries-framework/push-notifications version"
      src="https://img.shield.io/npm/v/@aries-framework/push-notifications"
  /></a>

</p>
<br />

Push Notifications plugin for [Aries Framework JavaScript](https://github.com/hyperledger/aries-framework-javascript.git).

### Installation

Make sure you have set up the correct version of Aries Framework JavaScript according to the AFJ repository. To find out which version of AFJ you need to have installed you can run the following command. This will list the required peer dependency for `@aries-framework/core`.

```sh
npm info "@aries-framework/push-notifications" peerDependencies
```

Then add the push-notifications plugin to your project.

```sh
yarn add @aries-framework/push-notifications
```

### Quick start

In order for this plugin to work we have to inject it into the agent to access agent functionality. See the example for more information

### Example of usage

> This is the current way however this will be changed someday to improve plugin management

```ts
import { PushNotificationsApnsModule, PushNotificationsFcmModule } from '@aries-framework/push-notifications'

const agent = new Agent(/** agent config... */)

const pushNotificationsApnsModule = agent.injectionContainer.resolve(PushNotificationsApnsModule)
const pushNotificationsFcmModule = agent.injectionContainer.resolve(PushNotificationsFcmModule)

await agent.initialize()

/* -- iOS -- */

// To send apns device info to another agent you have to acquire the device token and send it.
pushNotificationsApnsModule.sendDeviceInfo(
  'a-valid-connection-id'
  { deviceToken: '123' },
)

// To get the device info and the used service back from the other agent
pushNotificationsApnsModule.getDeviceInfo('a-valid-connection')

/* -- fcm -- */

// To send fcm, primarily Android, device info to another agent you have to accquire the device token and send it.
pushNotificationsFcmModule.sendDeviceInfo(
  'a-valid-connection-id'
  { deviceToken: '123' },
)

// To get the device info and the used service back from the other agent
pushNotificationsFcmModule.getDeviceInfo('a-valid-connection')

```
