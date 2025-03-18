# Mijn Gezondheidsoverzicht (web)

This repository contains the "Mijn Gezondheidsoverzicht", or MGO, application and components. It is a monorepo which contains multiple individual apps and packages. To [learn more about the MGO app itself][mgo-about] please visit the `about` page.

## Documentation

- [About the app][mgo-about]
- [Development setup][mgo-development]
- [End-to-end tests](apps/e2e-tests/README.md)
- [Deployment][mgo-deployment]
- [Internationalization / copy content][mgo-intl]
- [Glossary][mgo-glossary]

## Directory structure

This repository is a monorepo in that all directories under `apps/*` and `packages/*` are condisered their own individual package and contain their own dependencies and scripts. Only a few things are organised at the root level, such as formatting and linting.

```shell
├── apps
│    └── mgo                # The main MGO application
│    └── e2e-tests          # End-to-end tests for the mgo application
├── packages
│    ├── data-services      # HTTP client for making requests to data services
│    ├── fhir-client        # A basic HTTP client for making requests to a FHIR server
│    ├── fhir-data          # Helpers for parsing FHIR data structures and generating "health ui schema"'s
│    ├── fhir-types         # Collection of TypeScript types for dealing with different Fhir (version) elements
│    ├── mgo-ui             # UI library for the MGO app
│    ├── mgo-intl           # Contains all the text content and translations for the MGO app and the "health ui schema"'s
│    └── tailwind           # MGO Tailwind theme
├── docs
│    └── ...                # Documentation files
├── LICENSE
└── README.md               <-- you are here
```

## Quick run

To run the MGO app locally there is a `docker-compose` configuration available. This is only meant for testing the application, **it is not to be used in production**. For actual development, we recommend you use the [Development][mgo-development] instructions instead. To run the MGO app locally using docker, ensure you have the latest [Docker (Desktop) installed][docker].

```sh
# Build and run a local test server using docker
docker compose up --build mgo
# Stop local test server
docker compose down
```

By default it will connect to the test environments, however this can be changed by adding a `.env` at the root. You can copy the `.env.example` for some default values.

> After changing `.env` values you will have to **rebuild** and **restart** the container. (Rerun the first command above)

## Scripts

Once you have a [local development environment][mgo-development]] set up, there are several `pnpm` scripts you can run from this root directory. To run a command, open a new terminal from this root directory and enter the following command:

```bash
pnpm run <command>
```

| Command         | Description                                                                                          |
| --------------- | ---------------------------------------------------------------------------------------------------- |
| `dev`           | Starts a new [vite development server][vite-dev].                                                    |
| `test`          | Runs all unit tests using [vitest].                                                                  |
| `test:coverage` | Runs all unit tests using [vitest] and publishes a coverage report.                                  |
| `lint`          | Lints all the code using [eslint].                                                                   |
| `lint:fix`      | Fixes all fixable lint errors using [eslint].                                                        |
| `check-types`   | Checks all the types using [TypeScript]                                                              |
| `storybook`     | Starts a new server with the documentation on components from the `mgo-ui` package using [Storybook] |
| `format`        | Checks if all the code follows the formatting rules using [Prettier]                                 |
| `format:fix`    | Fixed all fixable formatting error using [Prettier]                                                  |
| `pr`            | Runs all the checks that are normally also ran for a pull request                                    |
| `e2e`           | Runs the end-to-end tests for the mgo app using [Playwright]                                         |

## License

This repository follows the [REUSE Specfication v3.0](https://reuse.software/spec/). Please see [.reuse/dep5](./.reuse/dep5) and the individual `*.license` files for copyright and license information.

[vite-dev]: https://vite.dev/guide/cli.html#dev-server
[vitest]: https://vitest.dev/
[eslint]: https://eslint.org/
[TypeScript]: https://www.typescriptlang.org/
[Storybook]: https://storybook.js.org/
[Prettier]: https://prettier.io/
[Playwright]: https://playwright.dev/
[docker]: https://www.docker.com/products/docker-desktop/

<!-- Docs -->

[mgo-about]: ./docs/about.md
[mgo-development]: ./docs/development.md
[mgo-deployment]: ./docs/deployment.md
[mgo-glossary]: ./docs/glossary.md
[mgo-intl]: ./packages/mgo-intl/README.md
