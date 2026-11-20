---
'@credo-ts/cheqd': minor
---

Move `@credo-ts/cheqd` into Credo Extensions while retaining its npm package name and public entry points. This release
requires Credo 0.8.0 and Node.js 22 or later. `@credo-ts/anoncreds` is now an optional peer dependency and
`CheqdAnonCredsRegistry` is only exported from the `@credo-ts/cheqd/anoncreds` entry point. Consumers using the
registry must install `@credo-ts/anoncreds` explicitly.
