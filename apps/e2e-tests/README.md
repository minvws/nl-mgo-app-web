# [MGO] - End-to-end tests

For the end-to-end testing of this Web application we make use of [Playwright].

Those tests live under the directory `apps/e2e-tests`, and more specifically under `apps/e2e-tests/src/tests`.

1.  Run `pnpm install`, to install all the needed packages
    After you have installed all the appropriate packages with `pnpm install`.

2.  Under the folder `apps/e2e-tests` you will find a `.env.example` file.
    Copy that into a file with the name `.env` and add the missing passwords.

    If you want to run the tests against our [Test Environment][mgo-test], don't folget to pass to `APP_ENVIRONMENT` the value `test`.

    Differently, if you want to run the tests locally, then `APP_ENVIRONMENT` should have the value `local`.
    For that you also need to run `pnpm dev` in a separate terminal, in order to have the local environment running.

Now you can execute the tests with the command `pnpm e2e` from the `apps/e2e-tests` folder:

```sh
cd apps/e2e-tests
pnpm e2e
```

[MGO]: ../../README.md
[Playwright]: https://playwright.dev/
[mgo-test]: https://web.test.mgo.irealisatie.nl/
