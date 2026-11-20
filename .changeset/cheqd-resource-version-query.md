---
'@credo-ts/cheqd': patch
---

Resolving a DID-Linked Resource with a `resourceVersion` query parameter now returns that version. Before, the resolver only read the non-standard `version` parameter, so a `resourceVersion` query was ignored and returned the latest resource. `version` is still accepted.
