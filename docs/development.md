# [MGO] - Development

## Setting up a local development environment

### Setup

In this repository we are using [asdf] to manage the `node`/`pnpm` version for the local development environment.
The versions are set in the `.tool-versions` file.

To install [asdf] please see the [official installation instructions][asdf-install].

After having installed asdf you will need to add the required plugins, followed by the install command to install the specified version.

```sh
# add plugins
asdf plugin add nodejs
asdf plugin add pnpm

# install specified versions
asdf install
```

When this is set up, asdf will ensure you will always have the correct (node) version in any terminal that is opened within this project directory.

The last step to finish the setup is to install the project dependencies using `pnpm`:

```sh
# install project dependencies
pnpm install
```

### Running a local development server

To start the development server run the following command from the project root:

```sh
pnpm dev
```

### UI Components

The `packages/mgo-ui/` contains most of the UI components that we use in the MGO app. They are all documented using [Storybook]. The storybook development server can be started by running (from the project root):

```sh
pnpm storybook
```

### Package information

For more details on a package you can check out the README at the root of a package.

[MGO]: ../README.md
[asdf]: https://asdf-vm.com/guide/introduction.html
[asdf-install]: https://asdf-vm.com/guide/getting-started.html#_3-install-asdf
[Storybook]: https://storybook.js.org/
