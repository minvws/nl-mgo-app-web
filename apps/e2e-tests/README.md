# [MGO] - End-to-end tests

This package contains the end-to-end tests for the MGO application. It uses [Playwright][playwright] for running the tests.

## Directory structure

```shell

├── src
│    └── pages              # Page fixtures
│    └── setup              # Setup for custom fixtures and assertions
│    └── tests              # All the tests
│    └── utils              # Small utility functions
├── results
│    └── ...                # Results from test runs
└── .env.example            # Example config file for environment variables
└── README.md               <-- you are here
```

## Getting started

To get started you will first need to [set up the development environment][development].

Once this is done you will need to provide the required environment variables. You can do this by making a copy of the `.env.example`, rename it as `.env` and fill in the variables.

```shell
BASIC_AUTH_USER=******          # username for the basic authentication used for connecting to MGO environments
BASIC_AUTH_PASSWORD=******      # password

APP_ENVIRONMENT=local           # Choose the environment you wish to test: `local`, `test`, or `acc`
```

Now you can run the following commands from this (`apps/e2e-tests`) directory:

```
pnpm e2e     # Runs all the e2e tests in headless mode
pnpm e2e:ui  # Starts Playwright in UI mode
pnpm e2e:ci  # Runs all the e2e tests with the same settings as is used in the CI
```

## Docker setup for the End-to-end tests

In the CI pipeline we use a [docker] container for running the MGO application as well as the E2E tests. This ensures the tests are alway run under the same conditions. You can also run the E2E tests using this docker container to ensure you are running the tests under the same conditions as in the CI.

### Getting started with docker

To run the E2E tests using docker, ensure you have the latest [Docker (Desktop) installed][docker]

1. From the root of this repository, copy of the `.env.example`, rename it as `.env` and fill in the variables.
2. From the root of this repository, Start up all docker containers with `docker compose up --build`
3. Connect to the `playwright` instance with `docker exec -it playwright bash`
4. From the `playwright` shell, run the tests with `pnpm e2e` or `pnpm e2e:ci`

> Test results will still be stored in the `apps/e2e-tests/results` as this folder is volume mounted.

> `pnpm e2e:ui` will not work from the docker container as the image does not contain the dependencies needed for running the tests in [headed mode][playwright-headed].

[MGO]: ../../README.md
[docker]: https://www.docker.com/products/docker-desktop/
[playwright]: https://playwright.dev/
[playwright-headed]: https://playwright.dev/docs/running-tests#run-tests-in-headed-mode
[mgo-test]: https://web.test.mgo.irealisatie.nl/
[development]: ../../docs/development.md
