# [MGO] - NPM Packages

We publish certain packages to the npm registry. We do so manually using `nx` to generate a CHANGELOG.md and tag the commit with the package version. Nx will decide which packages to release and how to update the CHANGELOG based on the commits since the previous release that touches the package.

### Release process

> If you want to test the package first to ensure everything is in order you can publish to the github registry first. [See below.](#releasing-to-the-github-registry)

To start a new release:

1. Create a new branch `release/npm`
2. Run the command `pnpm exec nx release --dry-run`
3. Check if the proposed changes are in order.
4. Run the command `pnpm exec nx release`
5. Create a PR for the `release/npm` branch.
6. Get an approval and merge the `release/npm` branch back to main.

```
nx release --registry https://npm.pkg.github.com/
```

### [Using nx release subcommands independently][nx-release-subcommands]

Using nx release subcommands independently
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

```
pnpm exec nx release --skip-publish
pnpm exec nx release publish --registry https://npm.pkg.github.com/
```

<hr>

[MGO]: ../README.md
[nx]: https://nx.dev/
[nx-graph]: https://nx.dev/reference/nx-commands#graph
[nx-commands]: https://nx.dev/reference/nx-commands
[nx-release-subcommands]: https://nx.dev/features/manage-releases#using-nx-release-subcommands-independently
[github-npm-auth]: https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-npm-registry
