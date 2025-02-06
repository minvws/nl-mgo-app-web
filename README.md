<h1 align="center">Mijn Gezondheidsoverzicht (web) ❤️</h1>
<br />

This repository contains the "Mijn Gezondheidsoverzicht" or MGO, application and SDK components. It is a monorepository which contains multiple individual apps and packages.

## Table of contents

- 📋 [Directory structure](#directory-structure)
- 💻 [Running locally](#running-locally)
- 📦 [Development](#development)
- 🚀 [Deployment](#deployment)
- ⚖️ [License](#license)

## Directory structure

This repository is a monorepository in that all directories under `apps/*` and `packages/*` are condisered their own individual package and contain their own dependencies and scripts. A few things are organised at the root level, such as formatting and linting.

    .
    ├── apps
    │    └── mgo                # The main MGO application
    ├── packages
    │    ├── fhir-client        # HTTP client for making requests to a FHIR server
    │    ├── fhir-data          # Helpers for parsing FHIR data structures
    │    ├── mgo-ui             # UI library for MGO
    │    └── tailwind           # MGO Tailwind theme
    ├── LICENSE
    └── README.md

## Running locally

To run the MGO app locally there is a `docker-compose` configuration available. This is only meant for testing the application, **it is not to be used in production**. For actual development, we recommend you use the [Development](#development) instructions instead. To run the MGO app locally using docker ensure you have the latest [Docker (Desktop) installed](https://www.docker.com/products/docker-desktop/)

```sh
# Run a local development server using docker
docker compose build --no-cache && docker compose up mgo -d
```

## Development

The main MGO application lives in `apps/mgo/`.

The UI components live in `packages/mgo-ui/` and a storybook environment is available.

### Prerequisites

In this repository we are using [asdf](https://asdf-vm.com/guide/introduction.html) to manage the `node`/`pnpm` version for the local development environment.
The versions are set in the `.tool-versions` file.

To install [asdf](https://asdf-vm.com/guide/introduction.html) please see the [official installation instructions](https://asdf-vm.com/guide/getting-started.html#_3-install-asdf).

After having installed asdf you will need to add the required plugins, followed by the install command to install the specified version.

```sh
# add plugins
asdf plugin-add nodejs
asdf plugin-add pnpm

# install specified versions
asdf install
```

When this is set up, asdf will ensure you will always have the correct (node) version in any teminal that is opened within this project directory.

### Running a local development server

First, install the dependencies by running:

```sh
pnpm install
```

Then, start the development server by running (from the project root):

```sh
pnpm dev
```

> By default, the server will be available at [http://localhost:8000](http://localhost:8000). While it is possible to change the port by providing a `--port` argument, doing so is not advisable as only port `8000` is allowlisted for the OIDC `redirect_uri`.

### Storybook

`packages/mgo-ui/` contains most MGO styled components, the storybook development server can be started by running:

```sh
pnpm storybook
```

### Playwright e2e tests

For the end-to-end testing of this Web application we make use of [Playwright](https://playwright.dev/).
If you want to know more about those tests and how to execute them, please read further in [e2e tests Readme](apps/e2e-tests/README.md)

## Deployment

The release package can be downloaded from the artifacts of [the "Create release package" CI workflow](https://github.com/minvws/nl-mgo-app-web-private/actions/workflows/package.yml).
The contents of the package can be hosted as an SPA, with non-existing routes being served the `index.html`.
Configuration can be provided by overwriting the `config.js` file with environment-specific values. The structure of this file is as follows:

```js
window.config = {
    oidc_authority: '...',
    oidc_client_id: '...',
    oidc_redirect_uri: '...',
    load_url: '...',
    dva_url: '...',
};
```

| Field               | Description                                                                          | Default value              |
| ------------------- | ------------------------------------------------------------------------------------ | -------------------------- |
| `oidc_authority`    | URI of the OIDC authority (the root path before `.well-known/openid-configuration`). | `'https://max.acc.mgo.nl'` |
| `oidc_client_id`    | OIDC client ID.                                                                      | `'mgo_dev'`                |
| `oidc_redirect_uri` | URI of the application itself, as allowlisted for the given client ID.               | `'http://localhost:8000'`  |

## License

This repository follows the [REUSE Specfication v3.0](https://reuse.software/spec/). Please see [.reuse/dep5](./.reuse/dep5) and the individual `*.license` files for copyright and license information.
