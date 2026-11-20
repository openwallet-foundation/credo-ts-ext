<p align="center">
  <br />
  <img
    alt="Credo Logo"
    src="https://github.com/openwallet-foundation/credo-ts/blob/c7886cb8377ceb8ee4efe8d264211e561a75072d/images/credo-logo.png"
    height="250px"
  />
</p>
<h1 align="center"><b>Credo Cheqd Module</b></h1>
<p align="center">
  <a
    href="https://raw.githubusercontent.com/openwallet-foundation/credo-ts/main/LICENSE"
    ><img
      alt="License"
      src="https://img.shields.io/badge/License-Apache%202.0-blue.svg"
  /></a>
  <a href="https://www.typescriptlang.org/"
    ><img
      alt="typescript"
      src="https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg"
  /></a>
    <a href="https://www.npmjs.com/package/@credo-ts/cheqd"
    ><img
      alt="@credo-ts/cheqd version"
      src="https://img.shields.io/npm/v/@credo-ts/cheqd"
  /></a>

</p>
<br />

Credo cheqd provides integration of the cheqd network into Credo. See the [Cheqd Setup](https://credo.js.org/guides/getting-started/set-up/cheqd) for installation instructions.

## AnonCreds registry integration

The Cheqd DID resolver, registrar, and module are available from the package root without installing AnonCreds:

```ts
import { CheqdDidRegistrar, CheqdDidResolver, CheqdModule } from '@credo-ts/cheqd'
```

To use Cheqd as an AnonCreds registry, install `@credo-ts/anoncreds` explicitly and import the registry from the
AnonCreds integration entry point:

```ts
import { AnonCredsModule } from '@credo-ts/anoncreds'
import { CheqdAnonCredsRegistry } from '@credo-ts/cheqd/anoncreds'

const anoncreds = new AnonCredsModule({
  registries: [new CheqdAnonCredsRegistry()],
})
```

`@credo-ts/anoncreds` is an optional peer dependency of `@credo-ts/cheqd` and is only required when using this
integration. `CheqdAnonCredsRegistry` is not exported from the `@credo-ts/cheqd` package root.

## Development

From the repository root:

```sh
pnpm install
pnpm --filter @credo-ts/cheqd build
pnpm test --project unit packages/cheqd
```

The E2E suites write to a single-node cheqd ledger at `http://localhost:26657`. Start it with this package's Docker
Compose file before running them:

```sh
docker compose -f packages/cheqd/docker-compose.yml up -d --wait --wait-timeout 600
pnpm test --project e2e packages/cheqd
docker compose -f packages/cheqd/docker-compose.yml down
```

On Apple Silicon, add `-f packages/cheqd/docker-compose.arm.yml` and `--build`. This builds a local image with the
official Linux ARM64 `cheqd-noded` release archive, as the upstream 4.2.1 ARM64 image contains an AMD64 node binary.
The build verifies the archive checksum. Update the pinned archive, checksum and base image together when upgrading
cheqd. The ledger is healthy once the test payer accounts are funded and DID fees can be priced.
