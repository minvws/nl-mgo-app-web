# [MGO] - Internationalization

All our internationalization related code can be found in the `/packages/intl`. We use [lokalise] for managing the content and translations. We use [FormatJS][formatjs] to integrate the text content within the application.

## Making text changes

To change any text content you will have to change it in [lokalise]. Go to [lokalise.com][lokalise] and log in. From there you can go into one of the projects and add new translation keys. Or change the content of any existing keys.

> Any keys containing `.markdown` will have the content converted from markdown to (sanitized) html during the precompile process.

There is some content that is not managed (yet) via lokalise. This is placed in the `locales/static` folder. This contains default labels for [ZIB] related keys that have been extracted from the ZIB Structure definitions. We use these keys as a default value for ZIB related labels. They can be overruled by a same key in lokalise.

## Updating the text content

There is a bash script which utilises a docker image for downloading the latest content from [lokalise]. In order for this to work you will need to:

- have a local development environment set up and installed [see development for more information][dev].
- have [Docker (desktop)][docker] installed and running.
- have a `.env` file with the following variables (also see the `.env.example`):
    - `LOKALISE_API_TOKEN` - api token for lokalise with read-only access to both projects.
    - `LOKALISE_PROJECT_ID_MGO_APP` - the id for the mgo-app project
    - `LOKALISE_PROJECT_ID_MGO_FHIR` - the id for the mgo-fhir project

When you have these requirements set up you can run:

```sh
pnpm run messages:update
```

This will:

- Delete the old translation files
- Download the latest content
- [Precompile the messages][precompile]
    - During this precompile step, any `.markdown` keys will be converted from markdown to sanitized html.

## Testing

Because we don't want our tests to break if the text content from lokalise changes. We also export some helpers for matching texts during (unit) tests. And a mock implementation if you don't want to use any translations. All the test related code is exported from `@minvws/mgo-intl`.

### Mock intl

```typescript
import { createTestIntl } from '@minvws/mgo-intl';

const mockIntl = createTestIntl(); // only supports `formatMessage`

mockIntl.formatMessage({ id: 'foobar' }); // "intl(foobar)"
mockIntl.formatMessage({ id: 'foobar' }, { name: 'test' }); // "intl(foobar, {"name": "test"})"
```

### Message helpers

There are 3 message helpers for matching translated content. One for `mgo-app`, `mgo-first` and the mock intl.

```typescript
import { testMessage } from '@minvws/mgo-intl';

const mockedMessage = mockIntl.formatMessage({ id: 'foobar' });

expect(mockedMessage).toBe(testMessage('foobar')); // pass
```

```typescript
import { appMessage } from '@minvws/mgo-intl';

const heading = appIntl.formatMessage({ id: 'overview.heading' });

expect(heading).toBe(appMessage('overview.heading')); // pass
```

```typescript
import { fhirMessage } from '@minvws/mgo-intl';

const fhirLabel = fhirIntl.formatMessage({ id: 'r3.nl_core_patient.name' });

expect(fhirLabel).toBe(fhirMessage('r3.nl_core_patient.name')); // pass
```

## Other

Because we use TypeScript to ensure we don't have any references in the code referring to non-existent translation keys, we included the translation content in this repository. This makes it easy to get started with the project and ensures you will not have TypeScript errors everywhere immediately after downloading this repository.
However when a production build is created the latest content will be downloaded first. So there is a possibility that locally things run fine. But the build fails because a translation key was removed in lokalise.

---

[MGO]: https://github.com/minvws/nl-mgo-app-web/blob/main/README.md
[lokalise]: https://lokalise.com/
[formatjs]: https://formatjs.github.io/
[dev]: ./development.md
[docker]: https://www.docker.com/products/docker-desktop/
[precompile]: https://formatjs.github.io/docs/guides/advanced-usage/#pre-compiling-messages
