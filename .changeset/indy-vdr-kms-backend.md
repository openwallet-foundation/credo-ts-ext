---
"@credo-ts/indy-vdr": patch
---

The did:indy registrar stores the KMS backend of the verification key on the DID record and signs ledger requests with it. It now has `deactivationSupport: 'notSupportedByRegistrar'`. When creating a did:indy fails before it is written to the ledger, the key that was created for it is now deleted.
