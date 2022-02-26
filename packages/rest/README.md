<p align="center">
  <br />
  <img
    alt="Hyperledger Aries logo"
    src="https://raw.githubusercontent.com/hyperledger/aries-framework-javascript/aa31131825e3331dc93694bc58414d955dcb1129/images/aries-logo.png"
    height="250px"
  />
</p>
<h1 align="center"><b>Aries Framework JavaScript REST API</b></h1>
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
    <a href="https://www.npmjs.com/package/@aries-framework/rest"
    ><img
      alt="@aries-framework/rest version"
      src="https://img.shields.io/npm/v/@aries-framework/rest"
  /></a>

</p>
<br />

Aries Framework JavaScript REST API is a wrapper around [Aries Framework JavaScript](https://github.com/hyperledger/aries-framework-javascript.git).

### Installation

Make sure you have set up the correct version of Aries Framework JavaScript according to the AFJ repository. To find out which version of AFJ you need to have installed you can run the following command. This will list the required peer dependency for `@aries-framework/core`.

```sh
npm info "@aries-framework/rest" peerDependencies
```

Then add the rest package to your project.

```sh
yarn add @aries-framework/rest
```

### Quick start

> The OpenAPI spec is generated using the OpenAPI Schema (Swagger). However this schema is not representing the real API. A lot of types are not correct. Keep this in mind when using this package.

Aries Framework JavaScript REST API provides a Swagger (OpenAPI) definition of the exposed API. After you start the REST API the generated API Client will be available on `/docs`.

### Example of usage

```ts
import { startServer } from '@aries-framework/rest'

// The startServer function requires an initialized agent and a port.
// An example of how to setup an agent is located in the `samples` directory.
const run = async (agent: Agent) => {
  await startServer(agent, { port: 3000 })
}

// A Swagger (OpenAPI) definition is exposed on http://localhost:3000/docs
run()
```

### Webhooks

We use webhooks as a method for the rest api to have the option to call the controller in case of an event.

Current supported events are:

- `Basic messages`
- `Connections`
- `Credentials`
- `Proofs`

Example of usage:

```ts
// You can either call startServer() or setupServer() and pass the ServerConfig interface with a webhookUrl

const run = async (agent: Agent) => {
  const config = {
    port: 3000,
    webhookUrl: 'http://test.com',
  }
  await startServer(agent, config)
}
run()
```

In case of an event, we will send the event to the webhookUrl with the topic of the event added to the url (http://test.com/{topic}).

So in this case when a connection event is triggered, it will be sent to: http://test.com/connections

The payload of the webhook contains the serialized record related to the topic of the event. For the `connections` topic this will be a `ConnectionRecord`, for the `credentials` topic it will be a `CredentialRecord`, and so on.
