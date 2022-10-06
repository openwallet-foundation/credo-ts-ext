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

The Aries Framework JavaScript REST API is the most convenient way for self-sovereign identity (SSI) developers to interact with SSI agents.

- ⭐ **Endpoints** to create connections, issue credentials, and request proofs.
- 💻 **CLI** that makes it super easy to start an instance of the REST API.
- 🌐 **Interoperable** with all major Aries implementations.

### Quick start

The Rest API provides an OpenAPI schema that can easily be viewed using the SwaggerUI that is provided with the server. The docs can be viewed on the `/docs` endpoint (e.g. http://localhost:3000/docs).

> The OpenAPI spec is generated from the model classes used by Aries Framework JavaScript. Due to limitations in the inspection of these classes, the generated schema does not always exactly match the expected format. Keep this in mind when using this package. If you encounter any issues, feel free to open an issue.

#### Using the CLI

Using the CLI is the easiest way to get started with REST API.

**With Docker (easiest)**

Make sure you have [Docker](https://docs.docker.com/get-docker/) installed. To get a minimal version of the agent running the following command is sufficient:

```sh
docker run -p 5000:5000 -p 3000:3000 ghcr.io/hyperledger/afj-rest \
  --label "AFJ Rest" \
  --wallet-id "walletId" \
  --wallet-key "walletKey" \
  --endpoint http://localhost:5000 \
  --admin-port 3000 \
  --outbound-transport http \
  --inbound-transport http 5000
```

See the [docker-compose.yml](https://github.com/hyperledger/aries-framework-javascript-ext/tree/main/docker-compose.yml) file for an example of using the afj-rest image with docker compose.

> ⚠️ The docker image is not optimized for ARM architectures and won't work on Apple Silicon macs. See the **Directly on Computer** below on how to run it directly on your computer without docker.

**Directly on Computer**

To run AFJ rest directly on your computer you need to have the indy-sdk installed. Follow the indy [installation steps](https://github.com/hyperledger/aries-framework-javascript/tree/main/docs/libindy) for your platform and verify indy is installed.

Once you have installed indy you can start the rest server using the following command:

```sh
npx -p @aries-framework/rest afj-rest start \
  --label "AFJ Rest" \
  --wallet-id "walletId" \
  --wallet-key "walletKey" \
  --endpoint http://localhost:5000 \
  --admin-port 3000 \
  --outbound-transport http \
  --inbound-transport http 5000
```

**Configuration**

To find out all available configuration options from the cli, you can run the cli command with `--help`. This will print a full list of all available options.

```sh
# With docker
docker run ghcr.io/hyperledger/afj-rest --help

# Directly on computer
npx -p @aries-framework/rest afj-rest start --help
```

It is also possible to configure the rest API using a json config. When providing a lot of configuration options, this is definitely the easiest way to use configure the agent. All properties should use camelCase for the key names. See the example [CLI Config](https://github.com/hyperledger/aries-framework-javascript-ext/tree/main/packages/rest/samples/cliConfig.json) for an detailed example.

```json
{
  "label": "AFJ Rest Agent",
  "walletId": "walletId",
  "walletKey": "walletKey"
  // ... other config options ... //
}
```

As a final option it is possible to configure the agent using environment variables. All properties are prefixed by `AFJ_REST` transformed to UPPER_SNAKE_CASE.

```sh
# With docker
docker run -e AFJ_REST_WALLET_KEY=my-secret-key ghcr.io/hyperledger/afj-rest ...

# Directly on computer
AFJ_REST_WALLET_KEY="my-secret-key" npx -p @aries-framework/rest afj-rest start ...
```

#### Starting Own Server

Starting your own server is more involved than using the CLI, but allows more fine-grained control over the settings and allows you to extend the rest api with custom endpoints.

You can create an agent instance and import the `startServer` method from the rest package. That's all you have to do.

```ts
import { startServer } from '@aries-framework/rest'
import { Agent } from '@aries-framework/core'
import { agentDependencies } from '@aries-framework/node'

// The startServer function requires an initialized agent and a port.
// An example of how to setup an agent is located in the `samples` directory.
const run = async () => {
  const agent = new Agent(
    {
      // ... AFJ Config ... //
    },
    agentDependencies
  )
  await startServer(agent, { port: 3000 })
}

// A Swagger (OpenAPI) definition is exposed on http://localhost:3000/docs
run()
```

### WebSocket & Webhooks

The REST API provides the option to connect as a client and receive events emitted from your agent using WebSocket and Webhooks

You can hook into the events listener using webhooks, or connect a Websocket client directly to the default server.

The currently supported events are:

- `Basic messages`
- `Connections`
- `Credentials`
- `Proofs`

When using the CLI, a webhook url can be specified using the `--webhook-url` config option.

When using the REST server as an library, the WebSocket server and webhook url can be configured in the `startServer` and `setupServer` methods.

```ts
// You can either call startServer() or setupServer() and pass the ServerConfig interface with a webhookUrl and/or a WebSocket server

const run = async (agent: Agent) => {
  const config = {
    port: 3000,
    webhookUrl: 'http://test.com',
    socketServer: new Server({ port: 8080 }),
  }
  await startServer(agent, config)
}
run()
```

The `startServer` method will create and start a WebSocket server on the default http port if no socketServer is provided, and will use the provided socketServer if available.

However, the `setupServer` method does not automatically create a socketServer, if one is not provided in the config options.

In case of an event, we will send the event to the webhookUrl with the topic of the event added to the url (http://test.com/{topic}).

So in this case when a connection event is triggered, it will be sent to: http://test.com/connections

The payload of the webhook contains the serialized record related to the topic of the event. For the `connections` topic this will be a `ConnectionRecord`, for the `credentials` topic it will be a `CredentialRecord`, and so on.

For the Websocket clients, the events are sent as JSON stringified objects
