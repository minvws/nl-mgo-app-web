# Medical Data Review Facility - web

This repository contains the Medical Data Review Facility (PGO).

## Deployment

The release package can be downloaded from the artifacts of [the "Create release package" CI workflow](https://github.com/minvws/nl-pgo-app-web-private/actions/workflows/package.yml).

The contents of the package can be hosted as an SPA, with non-existing routes being served the `index.html`.

Configuration can be provided by overwriting the `config.js` file with environment-specific values. The structure of this file is as follows:

```js
window.config = {
    oidc_authority: '...',
    oidc_client_id: '...',
    oidc_redirect_uri: '...',
};
```

| Field               | Description                                                                          | Default value                      |
| ------------------- | ------------------------------------------------------------------------------------ | ---------------------------------- |
| `oidc_authority`    | URI of the OIDC authority (the root path before `.well-known/openid-configuration`). | `'https://max.acc.coronacheck.nl'` |
| `oidc_client_id`    | OIDC client ID.                                                                      | `'pgo_dev'`                        |
| `oidc_redirect_uri` | URI of the application itself, as allowlisted for the given client ID.               | `'http://localhost:8000'`          |

## Development

The main application lives in `packages/app/`.

The UI components live in `packages/app-ui/` and a storybook environment is available.

### Running a local development server

This project uses [pnpm](https://pnpm.io/installation).

First, install the dependencies by running:

```sh
pnpm install
```

Then, start the development server by running (from the project root):

```sh
pnpm dev
```

By default, the server will be available at [http://localhost:8000](http://localhost:8000). While it is possible to change the port by providing a `--port` argument, doing so is not advisable as only port `8000` is allowlisted for the OIDC `redirect_uri`.

#### Storybook

The storybook development server can be started by running (from the project root):

```sh
pnpm storybook
```

### Running a development server in docker

**NB**: the dockerfile is only meant for local development, not for deployment.

You can start the development server in docker by running:

```sh
docker compose up
```

By default, the server will be available at [http://localhost:8000](http://localhost:8000). You can change the port via the `PORT` environment variable (e.g. via a `.env` file), but doing so is not advisable as only port `8000` is allowlisted for the OIDC `redirect_uri`.
