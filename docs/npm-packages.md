# [MGO] - NPM Packages

We publish certain packages to the [npm registry][npm]. We do so manually using [Nx] to generate a CHANGELOG.md and tag the commit with the package version. [Nx] will decide which packages to release and how to update the CHANGELOG based on the commits since the previous release that touches the package.

### Release process

> Nx will publish to the NPM by default. If you want to test the package first to ensure everything is in order you can publish to the github registry first. [See below.](#releasing-to-the-github-registry)

When creating a release Nx will:

- Update the package version
- Update the CHANGELOG.md
- Create a new git commit and tag the commit with `<package>@<version>` e.g. `@minvws/@0.1.1-2`
- (if chosen yes to publish) Publish the package to [NPM]

> **Before you can publish** to either NPM or Github you will need a token that has publish rights (npm) or access to the private repository (github).
> You can add the tokens via the `.env` at the root of the project, Nx will pick them up automatically when running commands. (Also see the `.env.example`)

To start a new release:

1. Create a new branch `release/npm`
2. Run the command `pnpm exec nx release --dry-run`
3. Check if the proposed changes are in order.
4. Run the command `pnpm exec nx release`
5. Create a PR for the `release/npm` branch.
6. Get an approval and merge the `release/npm` branch back to main.

### [Using nx release subcommands independently][nx-release-subcommands]

Using [Nx] release subcommands independently
As explained above, nx release is a wrapper around the three main phases of a release.

If you need more advanced or granular control over your release process you can also run these phases independently using the nx release version, nx release changelog, and nx release publish subcommands.

Each of these subcommands has their own CLI arguments which you can explore using the --help flag.

```shell
pnpm exec nx release version --help
pnpm exec nx release changelog --help
pnpm exec nx release publish --help
```

### Releasing to the Github registry

It can be useful to first publish a package to the Github registry for testing. You can run the regular release script with `--skip-publish` or choose no in the publish prompt. Next you can publish specifically to the github registry using the `--registry` options. Ensure you have the correct `GITHUB_TOKEN` configured in your environment. [Also see authenticating to GitHub Packages][github-npm-auth].

Follow the same steps as in the [Release process](#release-process). Except in step #4 use the following command for creating and publishing the release.

```shell
pnpm exec nx release --skip-publish
pnpm exec nx release publish --registry https://npm.pkg.github.com/
```

## New packages

When you are working with a brand new package there are a few extra steps that need to be taken:

1. Set the initial version in the `package.json` to `0.1.0`.
2. Ensure `"private": true,` is **not** set in the `package.json`
3. When running the release command add `--first-release`

You might also want to test the package first on github:

Replace `<package>` with the full package name, e.g. `@minvws/mgo-utils`

```shell
# ensure types are in order
pnpm exec nx run <package>:typecheck
# ensure build runs ok
pnpm exec nx run <package>:build
# execute a dry run to see what will be in the changelog
pnpm exec nx release -p <package> --dry-run --skip-publish --first-release
# When happy with the results continue...
pnpm exec nx release -p <package> --skip-publish --first-release
pnpm exec nx release publish -p <package> --registry https://npm.pkg.github.com/
```

### Other useful commands

You can also publish a single package:

```shell
pnpm exec nx release publish -p mgo-utils --registry https://npm.pkg.github.com/

# or to (public) npm registry

pnpm exec nx release publish -p mgo-utils --access public

```

<hr>

[MGO]: ../README.md
[npm]: https://www.npmjs.com/org/minvws
[Nx]: https://nx.dev/
[nx-graph]: https://nx.dev/reference/nx-commands#graph
[nx-commands]: https://nx.dev/reference/nx-commands
[nx-release-subcommands]: https://nx.dev/features/manage-releases#using-nx-release-subcommands-independently
[github-npm-auth]: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry
