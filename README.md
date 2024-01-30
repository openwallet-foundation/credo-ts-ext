<p align="center">
  <br />
  <img
    alt="Hyperledger Aries logo"
    src="https://raw.githubusercontent.com/hyperledger/aries-framework-javascript/aa31131825e3331dc93694bc58414d955dcb1129/images/aries-logo.png"
    height="250px"
  />
</p>
<h1 align="center"><b>Aries Framework JavaScript Extensions</b></h1>
<p align="center">
  <img
    alt="Pipeline Status"
    src="https://github.com/openwallet-foundation/credo-ts-ext/workflows/Continuous%20Integration/badge.svg?branch=main"
  />
  <a
    href="https://lgtm.com/projects/g/hyperledger/aries-framework-javascript-ext/context:javascript"
    ><img
      alt="Language grade: JavaScript"
      src="https://img.shields.io/lgtm/grade/javascript/g/hyperledger/aries-framework-javascript-ext.svg?logo=lgtm&logoWidth=18"
  /></a>
  <a href="https://codecov.io/gh/hyperledger/aries-framework-javascript-ext/"
    ><img
      alt="Codecov Coverage"
      src="https://img.shields.io/codecov/c/github/hyperledger/aries-framework-javascript-ext/coverage.svg?style=flat-square"
  /></a>
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
</p>
<br />

<p align="center">
  <a href="#packages">Packages</a> &nbsp;|&nbsp;
  <a href="#contributing">Contributing</a> &nbsp;|&nbsp;
  <a href="#license">License</a>
</p>

Aries Framework JavaScript Extensions is an extension repo to [Aries Framework JavaScript](https://github.com/openwallet-foundation/credo-ts.git) (AFJ). It hosts libraries built on top of Aries Framework JavaScript that don't necessarily belong to the core of the project. Example extension libraries include React Hooks for AFJ and a REST API wrapper.

If you're just getting started the [AFJ repo](https://github.com/openwallet-foundation/credo-ts.git) is probably the place to start.

## Packages

All packages are placed in the [`packages/`](./packages) directory.

| Package                                                                                      | Version                                                                                            | Description                                                   |
| -------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- |
| [`@credo-ts/rest`](https://www.npmjs.com/package/@credo-ts/rest)                             | ![@credo-ts/rest version](https://img.shields.io/npm/v/@credo-ts/rest)                             | REST endpoint wrapper for using your agent over HTTP          |
| [`@credo-ts/react-hooks`](https://www.npmjs.com/package/@credo-ts/react-hooks)               | ![@credo-ts/react-hooks version](https://img.shields.io/npm/v/@credo-ts/react-hooks)               | React Hooks for data handling and agent interaction           |
| [`@credo-ts/redux-store`](https://www.npmjs.com/package/@credo-ts/redux-store)               | ![@credo-ts/redux-store version](https://img.shields.io/npm/v/@credo-ts/redux-store)               | Redux Toolkit wrapper around Aries Framework JavaScript       |
| [`@credo-ts/push-notifications`](https://www.npmjs.com/package/@credo-ts/push-notifications) | ![@credo-ts/push-notifications version](https://img.shields.io/npm/v/@credo-ts/push-notifications) | Push notification plugin for Aries Framework JavaScript       |
| [`@credo-ts/transport-ble`](https://www.npmjs.com/package/@credo-ts/transport-ble)           | ![@credo-ts/transport-ble version](https://img.shields.io/npm/v/@credo-ts/transport-ble)           | Bluetooth Low Energy transport for Aries Framework JavaScript |

## Contributing

If you would like to contribute to this repository, please read the [CONTRIBUTING](/CONTRIBUTING.md) guidelines. These documents will provide more information to get you started!

For running tests, make sure to follow the network setup guides from the Aries Framework JavaScript [DEVREADME.md](https://github.com/openwallet-foundation/credo-ts/blob/main/DEVREADME.md).

The Aries Framework JavaScript call takes place every week at Thursday, 14:00 UTC via [Zoom](https://zoom.us/j/99751084865?pwd=TW1rU0FDVTBqUlhnWnY2NERkd1diZz09). This meeting is for contributors to groom and plan the backlog, and discuss issues. Feel free to join!

## License

Hyperledger Aries Framework JavaScript is licensed under the [Apache License Version 2.0 (Apache-2.0)](/LICENSE).
