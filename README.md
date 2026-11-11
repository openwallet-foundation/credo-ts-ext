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

Credo Extensions is an extension repo to [Credo](https://github.com/openwallet-foundation/credo-ts.git). It hosts libraries built on top of Credo that don't necessarily belong to the core of the project, such as a REST API wrapper.

If you're just getting started the [Credo repo](https://github.com/openwallet-foundation/credo-ts.git) is probably the place to start.

## Packages

All packages are placed in the [`packages/`](./packages) directory.

| Package                                                          | Version                                                                | Description                        |
| ---------------------------------------------------------------- | ---------------------------------------------------------------------- | ---------------------------------- |
| [`@credo-ts/rest`](https://www.npmjs.com/package/@credo-ts/rest) | ![@credo-ts/rest version](https://img.shields.io/npm/v/@credo-ts/rest) | Rest API for using Credo over HTTP |

### Removed packages

- Push notifications is now part of [DIDComm Mediator Credo](https://github.com/openwallet-foundation/didcomm-mediator-credo), available as [`@credo-ts/didcomm-push-notifications`](https://github.com/openwallet-foundation/didcomm-mediator-credo/tree/main/packages/push-notifications).
- React hooks is now part of [Bifold Wallet](https://github.com/openwallet-foundation/bifold-wallet), available as [`@bifold/react-hooks`](https://github.com/openwallet-foundation/bifold-wallet/tree/main/packages/react-hooks).
- BLE transport (`@credo-ts/transport-ble`) has moved to [Credo DIDComm Extensions](https://github.com/openwallet-foundation/credo-ts-didcomm-ext).
- `@credo-ts/redux-store` has been removed from this repository.

## Contributing

If you would like to contribute to this repository, please read the [CONTRIBUTING](/CONTRIBUTING.md) guidelines. These documents will provide more information to get you started!

For running tests, make sure to follow the network setup guides from the Credo [DEVREADME.md](https://github.com/openwallet-foundation/credo-ts/blob/main/DEVREADME.md).

There are regular community working groups to discuss ongoing efforts within Credo, showcase items you've built with Credo, or ask questions. See [Meeting Information](https://github.com/openwallet-foundation/credo-ts/wiki/Meeting-Information) for up to date information on the meeting schedule. Everyone is welcome to join!

We welcome you to join our mailing list and Discord channel. See the [Wiki](https://github.com/openwallet-foundation/credo-ts/wiki/Communication) for up to date information.

## License

Credo is licensed under the [Apache License Version 2.0 (Apache-2.0)](/LICENSE).
