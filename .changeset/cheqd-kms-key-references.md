---
'@credo-ts/cheqd': patch
---

The did:cheqd registrar stores the KMS backend of the keys it creates or imports as a `KmsKeyReference`, and its
`createKey` option accepts a `backend`. Keys passed with a DID document are checked with `Kms.checkKmsKeyReferences`,
which logs a warning for keys without a backend. Signing DID and resource transactions passes the expected public key,
so the KMS checks the signing key before it signs.
