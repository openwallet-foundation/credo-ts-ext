# Contributing

## How to contribute

You are encouraged to contribute to the repository by **forking and submitting a pull request**.

If you would like to propose a significant change, please open an issue first to discuss the work with the community to avoid re-work.

(If you are new to GitHub, you might want to start with a [basic tutorial](https://help.github.com/articles/set-up-git) and check out a more detailed guide to [pull requests](https://help.github.com/articles/using-pull-requests/).)

Pull requests will be evaluated by the repository guardians on a schedule and if deemed beneficial will be committed to the `main` branch. Pull requests should have a descriptive name and include an summary of all changes made in the pull request description.

Contributions are made pursuant to the Developer's Certificate of Origin, available at [https://developercertificate.org](https://developercertificate.org), and licensed under the Apache License, version 2.0 (Apache-2.0).

## Creating a new package

Packages in this repo are managed using yarn workspaces and [release-please](https://github.com/googleapis/release-please). To create a new package, it is easiest to duplicate of one the existing packages in the `packages` directory and remove and rename everything that is not needed.

Some general notes on creating a new package:

- Source files should be hosted in the `packages/<package-name>/src` directory
- Test files that test multiple features should be hosted in the `packages/<package-name>/tests` directory
- If you want to include sample files for your package, you can host these in the `packages/<package-name>/samples` directory.
- Make sure to update all references of the package names in the `package.json`, `README.md` files
- Delete the `CHANGELOG.md` file. This will be automatically added by release-please.
- Make sure your package includes all the needed build files:
  - `jest.config.ts`
  - `tsconfig.json`
  - `tsconfig.build.json`

## Release Process

Releases are managed using [Release Please](https://github.com/googleapis/release-please). It will automatically scan all commits using conventional commits standard. If changes are detected that will trigger a version bump using either the `feat:` or `fix:` scope, or `!` (e.g. `feat!:`) for breaking changes, release please will open a PR with the version bump and updates to `CHANGELOG.md`. The PR will be automatically kept up to date, and once it will be merged a new release will be created on Github and the package will be released on NPM.

See [this PR](https://github.com/hyperledger/aries-framework-javascript-ext/pull/32) for an example. Each package is versioned independently, to let packages evolve at their own pace. To make the release process as smooth as possible, make sure you're following these guidelines:

- Make sure your commits follow the [Conventional Commits](https://www.conventionalcommits.org/) specification.
  - If you want to squash your PR only the title of the PR should be following conventional commits.
  - If you want to rebase your PR **ALL** commit messages should follow the conventional commits specification. This is a good option for PRs that make a lot of changes that can't be captured in a single message
- Use scopes to indicate the package the commit affects.
  - E.g. if you're adding a new feature to the `redux-store` package start your commit with `feat(redux-store): `.
- Indicate breaking changes using `!`
  - E.g. if you're adding a new breaking feature to the `redux-store` package start your commit with `feat(redux-store)!: `
- If you're working on multiple packages in a single PR, make sure to split the commits and use the rebase strategy. The commit message will be applied to all packages that it affects, meaning that all packages will receive the same version bump.
