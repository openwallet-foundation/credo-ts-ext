<p align="center">
  <br />
  <img
    alt="Credo logo"
    src="https://github.com/openwallet-foundation/credo-ts/blob/c7886cb8377ceb8ee4efe8d264211e561a75072d/images/credo-logo.png"
    height="250px"
  />
</p>
<h1 align="center"><b>Credo Extensions</b></h1>
<p align="center">
  <img
    alt="Pipeline Status"
    src="https://github.com/openwallet-foundation/credo-ts-ext/workflows/Continuous%20Integration/badge.svg?branch=main"
  />
  <a
    href="https://lgtm.com/projects/g/openwallet-foundation/credo-ts-ext/context:javascript"
    ><img
      alt="Language grade: JavaScript"
      src="https://img.shields.io/lgtm/grade/javascript/g/openwallet-foundation/credo-ts-ext.svg?logo=lgtm&logoWidth=18"
  /></a>
  <a href="https://codecov.io/gh/openwallet-foundation/credo-ts-ext/"
    ><img
      alt="Codecov Coverage"
      src="https://img.shields.io/codecov/c/github/openwallet-foundation/credo-ts-ext/coverage.svg?style=flat-square"
  /></a>
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
</p>
<br />

<p align="center">
  <a href="#packages">Packages</a> &nbsp;|&nbsp;
  <a href="#contributing">Contributing</a> &nbsp;|&nbsp;
  <a href="#license">License</a>
</p>

Credo Extensions previously hosted libraries built on top of [Credo](https://github.com/openwallet-foundation/credo-ts.git). All packages have now been removed or relocated; the monorepo scaffold is retained for future packages.

If you're just getting started the [Credo repo](https://github.com/openwallet-foundation/credo-ts.git) is probably the place to start.

## Packages

There are currently no packages in this repository.

The Cheqd, Hedera and Indy VDR packages are being transferred wholesale from Credo, retaining their
`@credo-ts/cheqd`, `@credo-ts/hedera` and `@credo-ts/indy-vdr` names and `/anoncreds` entry points.
Packages and their complete test suites will be established here before the originals are removed separately.
Subsequent releases of these packages will be published from this repository, not from Credo.

### Removed packages

- Push notifications is now part of [DIDComm Mediator Credo](https://github.com/openwallet-foundation/didcomm-mediator-credo), available as [`@credo-ts/didcomm-push-notifications`](https://github.com/openwallet-foundation/didcomm-mediator-credo/tree/main/packages/push-notifications).
- React hooks is now part of [Bifold Wallet](https://github.com/openwallet-foundation/bifold-wallet), available as [`@bifold/react-hooks`](https://github.com/openwallet-foundation/bifold-wallet/tree/main/packages/react-hooks).
- BLE transport (`@credo-ts/transport-ble`) has moved to [Credo DIDComm Extensions](https://github.com/openwallet-foundation/credo-ts-didcomm-ext).
- `@credo-ts/redux-store` has been removed from this repository.
- `@credo-ts/rest` has been removed from this repository, along with its Docker image deployment workflow.

## Contributing

If you would like to contribute to this repository, please read the [CONTRIBUTING](/CONTRIBUTING.md) guidelines. These documents will provide more information to get you started!

The monorepo uses Node.js 22+, pnpm, Biome, tsdown, Vitest, and Changesets, aligned with Credo-ts main. Run `pnpm install`, `pnpm validate`, `pnpm build`, and `pnpm test` to validate changes.

### Ledger package development

Credo dependencies are pinned to the same published alpha in [pnpm-workspace.yaml](./pnpm-workspace.yaml).
Use `catalog:` for those dependencies rather than `workspace:*`, sibling-repository paths or moving dist-tags.
Update the pins together and verify compatibility with the shared tests before adopting another alpha.
Runtime dependencies belong in each package's manifest; root development dependencies support the shared tests only.

Shared utilities in [tests/helpers.ts](./tests/helpers.ts) provide unit-test agent contexts, Node KMS backends
and typed mock helpers using public package exports. [tests/agent.ts](./tests/agent.ts) provides full-agent
options with a unique, in-memory Askar store per call. Call `agent.initialize()` before use and always
`await agent.shutdown()` during cleanup. These helpers intentionally do not mirror Credo's internal test-helper
signatures or pull in its Drizzle and DIDComm test infrastructure.

Run `pnpm test:unit` for offline tests and `pnpm test:e2e` for `*.e2e.test.ts` suites.
Shared helper tests are discovered alongside package tests. CI runs unit and E2E suites separately;
an empty E2E suite is allowed only while the package ports are pending.

Each package port must bring its fixtures and E2E prerequisites with it: Indy pool/genesis/seeded identities,
the Cheqd validator and funded test accounts, or explicit Hedera network/operator credentials.
Add service startup and readiness checks to the E2E job when introducing local-ledger suites.
Do not copy embedded Hedera operator keys or silently skip tests when required services or credentials are missing.
No sibling checkout of Credo is needed for development or CI.

There are regular community working groups to discuss ongoing efforts within Credo, showcase items you've built with Credo, or ask questions. See [Meeting Information](https://github.com/openwallet-foundation/credo-ts/wiki/Meeting-Information) for up to date information on the meeting schedule. Everyone is welcome to join!

We welcome you to join our mailing list and Discord channel. See the [Wiki](https://github.com/openwallet-foundation/credo-ts/wiki/Communication) for up to date information.

## License

Credo is licensed under the [Apache License Version 2.0 (Apache-2.0)](/LICENSE).
