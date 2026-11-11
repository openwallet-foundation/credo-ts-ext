<p align="center">
  <br />
  <img
    alt="Credo Logo"
    src="https://github.com/openwallet-foundation/credo-ts/blob/c7886cb8377ceb8ee4efe8d264211e561a75072d/images/credo-logo.png"
    height="250px"
  />
</p>
<h1 align="center"><b>Credo - Indy Verifiable Data Registry (Indy VDR) Module</b></h1>
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
    <a href="https://www.npmjs.com/package/@credo-ts/indy-vdr"
    ><img
      alt="@credo-ts/anoncreds version"
      src="https://img.shields.io/npm/v/@credo-ts/indy-vdr"
  /></a>

</p>
<br />

Credo Indy VDR provides integration of the Hyperledger Indy blockchain into Credo. See the [Indy VDR Setup](https://credo.js.org/guides/getting-started/set-up/indy-vdr) for installation instructions.

The `@credo-ts/indy-vdr` package provides DID registration/resolution, ledger pools and transaction endorsement.
Its optional `@credo-ts/indy-vdr/anoncreds` entry point provides an AnonCreds registry.

This checkout targets the exact published Credo alpha pinned in
[pnpm-workspace.yaml](../../pnpm-workspace.yaml). Keep all Credo dependencies aligned with that baseline.
Install a platform binding such as `@hyperledger/indy-vdr-nodejs` alongside the compatible
`@hyperledger/indy-vdr-shared` peer. Using the AnonCreds entry point additionally requires `@credo-ts/anoncreds`.

## Development

From the repository root:

```sh
pnpm install
pnpm test --project unit packages/indy-vdr
pnpm --filter @credo-ts/indy-vdr build
docker compose up -d --build --wait --wait-timeout 600
pnpm test --project e2e packages/indy-vdr
docker compose down
```

The test suite includes nine unit and four E2E test files with fixtures. The E2E suites cover pool access,
DID creation/resolution, internal/external endorsement and AnonCreds registry operations.
See the [repository development guide](../../README.md#ledger-package-development) for Apple Silicon startup
and genesis configuration. No sibling Credo checkout is required.
