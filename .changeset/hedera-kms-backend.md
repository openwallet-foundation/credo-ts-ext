---
"@credo-ts/hedera": patch
---

The did:hedera registrar stores the KMS backend of its keys on the DID record and signs with it. It now has `deactivationSupport: 'supported'` and marks the DID record as deactivated when deactivating. Updating returns the `removedKeys`, so `deleteRemovedKeys` can delete them. Deactivating a did:hedera that is already deactivated on the ledger now succeeds. When creating a did:hedera fails before it is published, the root key that was created for it is now deleted.
