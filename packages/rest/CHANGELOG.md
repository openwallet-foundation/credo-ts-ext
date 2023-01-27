# Changelog

### [0.9.4](https://www.github.com/hyperledger/aries-framework-javascript-ext/compare/rest-v0.9.3...rest-v0.9.4) (2022-10-07)


### Features

* **rest:** added did resolver endpoint and tests ([#172](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/172)) ([9a1a24e](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/9a1a24ee2c958d09fff13075e0f56e0d3ed9ce7c))

### [0.9.3](https://www.github.com/hyperledger/aries-framework-javascript-ext/compare/rest-v0.9.2...rest-v0.9.3) (2022-09-21)


### Features

* **rest:** added create-offer endpoint and tests ([#169](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/169)) ([5458e9e](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/5458e9ee06c8a8d61fb6a812ea04f4d1a59b21dc))
* **rest:** added filters to getAllCredentials ([#166](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/166)) ([af7ec19](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/af7ec197b317b16cb5d2083d880006f29d0272c6))
* **rest:** added WebSocket event server ([#170](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/170)) ([e190821](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/e190821b3f71c97e03cc92222fedceeadb514aab))

### [0.9.2](https://www.github.com/hyperledger/aries-framework-javascript-ext/compare/rest-v0.9.1...rest-v0.9.2) (2022-09-07)


### Bug Fixes

* **rest:** accept proof properties now optional ([#162](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/162)) ([f927fdc](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/f927fdcd4a6142a6bc086d82d3b6e6ed1317108d))

### [0.9.1](https://www.github.com/hyperledger/aries-framework-javascript-ext/compare/rest-v0.9.0...rest-v0.9.1) (2022-09-05)


### Bug Fixes

* **rest:** moved route generation to compile ([#160](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/160)) ([8c70864](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/8c70864cacaada486b0ca7a7f9ba0ca2395f9efd))

## [0.9.0](https://www.github.com/hyperledger/aries-framework-javascript-ext/compare/rest-v0.8.1...rest-v0.9.0) (2022-09-02)


### ⚠ BREAKING CHANGES

* **rest:** update to AFJ 0.2.0 (#148)

### Features

* **rest:** update to AFJ 0.2.0 ([#148](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/148)) ([8ec4dc4](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/8ec4dc4548305d5cc8180b657f5865002eb3ee4a))

### [0.8.1](https://www.github.com/hyperledger/aries-framework-javascript-ext/compare/rest-v0.8.0...rest-v0.8.1) (2022-06-28)


### Features

* **rest:** added multi use param to create invitation ([#100](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/100)) ([d00f11d](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/d00f11d78e9f65de3907bd6bf94dd6c38e2ddc3b))
* **rest:** improved class validation ([#108](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/108)) ([cb48752](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/cb48752f0e222080f46c0699528e901de1226211))


### Bug Fixes

* **rest:** changed webhook event topic to type ([#117](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/117)) ([fed645e](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/fed645ec4ba77313e092bce097444a96aa66cf6e))
* **rest:** ledger not found error ([2374b42](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/2374b4232a0b11738fb57e23dd2a3ac1b81ad073))

## [0.8.0](https://www.github.com/hyperledger/aries-framework-javascript-ext/compare/rest-v0.7.0...rest-v0.8.0) (2022-02-26)


### Features

* **rest:** add cli and docker image publishing ([#96](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/96)) ([87d0205](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/87d02058e4b7d1fba1039265f5d595880f862097))
* **rest:** add webhooks ([#93](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/93)) ([9fc020d](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/9fc020d7db0f002894e520766987eec327a2ed69))
* **rest:** added basic messages and receive invitation by url ([#97](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/97)) ([956c928](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/956c928e3599925c65d8f99852bf06cebc06dba7))

## [0.7.0](https://www.github.com/hyperledger/aries-framework-javascript-ext/compare/rest-v0.6.1...rest-v0.7.0) (2022-01-04)


### ⚠ BREAKING CHANGES

* update aries framework javascript version to 0.1.0 (#86)

### Miscellaneous Chores

* update aries framework javascript version to 0.1.0 ([#86](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/86)) ([ebaa11a](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/ebaa11a8f1c4588b020e870abd092a5813ec28ef))

### [0.6.1](https://www.github.com/hyperledger/aries-framework-javascript-ext/compare/rest-v0.6.0...rest-v0.6.1) (2021-12-07)


### Bug Fixes

* **rest:** made nonce optional on proofrequest ([#84](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/84)) ([c1efe58](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/c1efe58055639e1c3df0429df6a0efe8fcdeb850))

## [0.6.0](https://www.github.com/hyperledger/aries-framework-javascript-ext/compare/rest-v0.5.0...rest-v0.6.0) (2021-12-06)


### ⚠ BREAKING CHANGES

* **rest:** proof request indy fields are now snake_case as used by indy instead of camelCase as used by AFJ.

### Bug Fixes

* **deps:** update dependencies ([#78](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/78)) ([ca38eba](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/ca38eba50dbb524269865d4fbfcb2d33720d0b48))
* **rest:** remove record transformer ([#77](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/77)) ([cda30f5](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/cda30f56b557a11645e9201ecf3e615ce8c890f5))

## [0.5.0](https://www.github.com/hyperledger/aries-framework-javascript-ext/compare/rest-v0.4.0...rest-v0.5.0) (2021-11-15)


### ⚠ BREAKING CHANGES

* **rest:** the 'extraControllers' config property has been removed in favor of a custom 'app' property. This allows for a more flexible wat to customize the express app. See the sample for an example.

### Features

* **rest:** allow app instance for custom configuration ([#73](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/73)) ([35400df](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/35400df5bdf1f621109e38aca4fa6644664612c8))

## [0.4.0](https://www.github.com/hyperledger/aries-framework-javascript-ext/compare/rest-v0.3.0...rest-v0.4.0) (2021-11-07)


### ⚠ BREAKING CHANGES

* **rest:** changed oob proof parameter from c_i to d_m (#67)

### Features

* **rest:** added outofband offer to credentialController ([#70](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/70)) ([d514688](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/d514688e2ca2c36312ef27b4d4a59ee3059e33de))
* **rest:** added support for custom label and custom imageUrl ([#71](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/71)) ([686bddd](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/686bddd58d0947ab4dda1b1d4a49ce721c6b464b))


### Code Refactoring

* **rest:** changed oob proof parameter from c_i to d_m ([#67](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/67)) ([5f9b1ae](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/5f9b1aeabcd81b5d3a084f69b280ceff84298b7e))

## [0.3.0](https://www.github.com/hyperledger/aries-framework-javascript-ext/compare/rest-v0.2.0...rest-v0.3.0) (2021-11-01)


### ⚠ BREAKING CHANGES

* **rest:** The credentential-definitions endpoint topic contained a typo (credential-defintions instead of credential-definitions)
* **rest:** The connection id is moved from the path to the request body for credential and proof endpoints

### Bug Fixes

* **rest:** typo in credential definition endpoint ([b4d345e](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/b4d345ed2af112679389ad4d8ed76760e442cc26))


### Code Refactoring

* **rest:** moved connectionId from path to requestbody ([#59](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/59)) ([1d37f0b](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/1d37f0bdde96742fc947213f8b934353872c570c))

## [0.2.0](https://www.github.com/hyperledger/aries-framework-javascript-ext/compare/rest-v0.1.2...rest-v0.2.0) (2021-10-05)


### ⚠ BREAKING CHANGES

* **rest:** The port property has been moved into a new configuration object.

### Features

* **rest:** added support for custom controllers ([#39](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/39)) ([8362e30](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/8362e30d8a4c9ef24779769f81b6e74f7f5978cc))

### [0.1.2](https://www.github.com/hyperledger/aries-framework-javascript-ext/compare/rest-v0.1.1...rest-v0.1.2) (2021-09-17)


### Bug Fixes

* **rest:** routing fix and moved cors to dependencies ([#31](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/31)) ([0999658](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/09996580a0015004ca18d36487276588460d0dfd))

### [0.1.1](https://www.github.com/hyperledger/aries-framework-javascript-ext/compare/rest-v0.1.0...rest-v0.1.1) (2021-09-16)


### Bug Fixes

* **rest:** require package.json to avoid error ([43e683a](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/43e683a11f4eed1d848f612c6e32e82d62141769))

## 0.1.0 (2021-09-16)


### Features

* add rest package ([#10](https://www.github.com/hyperledger/aries-framework-javascript-ext/issues/10)) ([e761767](https://www.github.com/hyperledger/aries-framework-javascript-ext/commit/e7617670c3cc05ee63e827cc5a5c5079a5e8eea5))
