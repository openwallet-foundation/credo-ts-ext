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

Usage: add a webhook url to the ServerConfig you pass to startServer()

Current supported events are:

- connections
- credentials
- proofs
