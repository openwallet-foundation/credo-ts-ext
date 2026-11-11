# Contributing

## How to contribute

You are encouraged to contribute to the repository by **forking and submitting a pull request**.

If you would like to propose a significant change, please open an issue first to discuss the work with the community to avoid re-work.

(If you are new to GitHub, you might want to start with a [basic tutorial](https://help.github.com/articles/set-up-git) and check out a more detailed guide to [pull requests](https://help.github.com/articles/using-pull-requests/).)

Pull requests will be evaluated by the repository guardians on a schedule and if deemed beneficial will be committed to the `main` branch. Pull requests should have a descriptive name and include an summary of all changes made in the pull request description.

Contributions are made pursuant to the Developer's Certificate of Origin, available at [https://developercertificate.org](https://developercertificate.org), and licensed under the Apache License, version 2.0 (Apache-2.0).

## Creating a new package

Packages are managed using pnpm workspaces and [Changesets](https://github.com/changesets/changesets). Use Node.js 22 or newer and the pnpm version pinned in `package.json` (via Corepack).

```sh
corepack enable
pnpm install
pnpm validate
pnpm build
pnpm test
```

Run `pnpm style:fix` to apply Biome formatting and lint fixes. Shared tooling versions are defined in the `pnpm-workspace.yaml` catalog.

CI runs the unit and end-to-end test projects on Node.js 22, 24, and 26, matching Credo main.

To create a package, add a directory under `packages` with its own `package.json` and the configuration files listed below.

Some general notes on creating a new package:

- Source files should be hosted in the `packages/<package-name>/src` directory
- Test files that test multiple features should be hosted in the `packages/<package-name>/tests` directory
- If you want to include sample files for your package, you can host these in the `packages/<package-name>/samples` directory.
- Make sure to update all references of the package names in the `package.json`, `README.md` files
- Changesets generates `CHANGELOG.md` when versioning packages.
- Make sure your package includes all the needed build files:
  - `tsconfig.build.json`
  - `tsdown.config.ts`
- Packages use ESM (`"type": "module"`). Add a `build` script using `tsdown --config tsdown.config.ts` and export the generated JavaScript and declaration files.
- Extend the root `tsconfig.build.json` in your package's build configuration, set `outDir` to `build`, and include `src`.
- Re-export the default from `../../tsdown.config.base.ts` in your package's tsdown configuration. The explicit extension supports native config loading. The shared configuration emits unbundled ESM and declaration maps for a neutral ES2020 target.
- Use `workspace:*` for internal dependencies and `catalog:` for shared tooling versions.
- Tests use Vitest globals and live alongside source or in package `tests` directories. Tests ending in `.e2e.test.ts` run in the `e2e` project; other `.test.ts` and `.spec.ts` files run in `unit`.
- Run `pnpm test:unit` or `pnpm test:e2e` to select a project. No tests is currently a successful result because the workspace is empty.

## Release Process

Releases are managed using Changesets. Run `pnpm changeset` for changes affecting published packages, select the affected packages and bump types, and describe the changes and migration steps. Commit the generated changeset with your code; this command does not commit automatically.

The release workflow opens a PR with updated versions and changelogs using `pnpm changeset-version`. Merging the release PR builds packages and publishes them using `pnpm release`. Packages are versioned independently. npm trusted publishing must be configured for each package to trust this repository's `release.yml` workflow before its first automated publication.

This monorepo follows Credo-ts main's pnpm, Biome, TypeScript, tsdown, Vitest, and Changesets tooling. Unlike core's fixed release group, extensions retain independent versions; core-specific native dependencies, test projects, and snapshot publishing are not included.

To keep changes easy to review:

- Make sure your commits follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.
  - If you want to squash your PR only the title of the PR should be following conventional commits.
  - If you want to rebase your PR **ALL** commit messages should follow the conventional commits specification. This is a good option for PRs that make a lot of changes that can't be captured in a single message
- Use scopes to indicate the package the commit affects.
  - E.g. for a package named `example`, start your commit with `feat(example): `.
- Indicate breaking changes using `!`
  - E.g. for a package named `example`, start your breaking-change commit with `feat(example)!: `.
- For changes affecting multiple packages, select each affected package in the changeset. Commit messages do not determine package version bumps.
