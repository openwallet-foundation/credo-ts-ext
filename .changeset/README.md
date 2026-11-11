# Changesets

Run `pnpm changeset` for changes that affect published packages. Select each affected package and its semver bump, then describe the change and any migration steps.

The release workflow updates package versions and changelogs in a release PR. Merging that PR publishes the new versions. Packages are versioned independently, and Changesets does not automatically commit local changes.
