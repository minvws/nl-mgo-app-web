# [MGO] - MGO internationalization

This package contains all the text content used within MGO. It utilises [lokalise] for managing the content and translations. We use [FormatJS][formatjs] to integrate the text content within the application.

The content is divided into 2 parts:

- **mgo-app**
  This contains all the text content that is used within the application. For all the pages, buttons and forms etc. This content is also used by the mobile apps.
- **mgo-fhir**
  This contains all the text content that is used for creating the [Health Ui Schemas][hui-schema]. It contains the labels for fields related to the [ZIB] information. And code / system translations that are used. This content is only used by `web` as the mobile apps only use the already translated [Health Ui Schemas][hui-schema].

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

## Development

Because the [core intl][core-intl] isn't necessarily compatible with each framework specific variant we don't export an `intl` instance from the package. Instead we export a function to create a config that is to be used when creating one. This config will already have all the relevant (precompiled) `messages` included. There are 2 available configs:

- `getAppIntlConfig` - contains all the mgo-app messages.
- `getFhirIntlConfig` - contains all the mgo-fhir messages

They both accept the [all the options from the `IntlConfig`][intl-config] except for `messages` as this will be preconfigured. In additions it accepts a `ignoreMissingTranslations` `boolean` which you can use to silence missing translation errors if needed.
Here is an example of how to get the app config when using react for rich text elements.

```typescript
import { Locale, getAppIntlConfig } from '@minvws/mgo-mgo-intl';

const appConfig = getAppIntlConfig<ReactNode>({
        locale: Locale.NL_NL,
        defaultRichTextElements: {
            b: (chunks) => <b className="font-bold">{chunks}</b>,
            i: (chunks) => <i className="italic">{chunks}</i>,
        },
    });
```

## Types

The way FormatJS relies on a [global type][global-type] for applying a type to the message id's doesn't work well when you have multiple different intl configurations. Instead of relying on this global type we export our own types for each project. This type changes the type specification for the `MessageDescriptor` so only message id's from that specific project are accepted.

```typescript
import { Locale, getFhirIntlConfig, createIntl, type FhirIntlShape } from '@minvws/mgo-mgo-intl';

const intl = createIntl(getFhirIntlConfig({ locale: Locale.NL_NL }));

intl.formatMessage({ id: 'foobar' }); // ok :/

const fhirIntl = intl as FhirIntlShape;

fhirIntl.formatMessage({ id: 'foobar' }); // TypeError
fhirIntl.formatMessage({ id: 'r3.nl_core_patient.name' }); // ok
```

## Helpers

We added 2 useful helpers for working with the translations: `formatMessage` and `hasMessage`. You can create the by passing an `IntlShape`, be sure it has the correct types before creating the helpers because it will reuse the same types for the message id.

```typescript
import {
    Locale,
    getFhirIntlConfig,
    createIntl,
    createHelpers,
    type FhirIntlShape,
} from '@minvws/mgo-mgo-intl';

const intl = createIntl(getFhirIntlConfig({ locale: Locale.NL_NL })) as FhirIntlShape;
const { formatMessage, hasMessage } = createHelpers(intl);

intl.formatMessage({ id: 'r3.nl_core_patient.name' }); // "Naamgegevens"
formatMessage('r3.nl_core_patient.name'); // The same result: "Naamgegevens"

hasMessage('r3.nl_core_patient.name'); // true
hasMessage('foobar'); // false
```

## Testing

Because we don't want our tests to break if the text content from lokalise changes. We also export some helpers for matching texts during (unit) tests. And a mock implementation if you don't want to use any translations. All the test related code is exported from `@minvws/mgo-mgo-intl/test`.

### Mock intl

```typescript
import { createTestIntl } from '@minvws/mgo-mgo-intl/test';

const mockIntl = createTestIntl(); // only supports `formatMessage`

mockIntl.formatMessage({ id: 'foobar' }); // "intl(foobar)"
mockIntl.formatMessage({ id: 'foobar' }, { name: 'test' }); // "intl(foobar, {"name": "test"})"
```

### Message helpers

There are 3 message helpers for matching translated content. One for `mgo-app`, `mgo-first` and the mock intl.

```typescript
import { testMessage } from '@minvws/mgo-mgo-intl/test';

const mockedMessage = mockIntl.formatMessage({ id: 'foobar' });

expect(mockedMessage).toBe(testMessage('foobar')); // pass
```

```typescript
import { appMessage } from '@minvws/mgo-mgo-intl/test';

const heading = appIntl.formatMessage({ id: 'overview.heading' });

expect(heading).toBe(appMessage('overview.heading')); // pass
```

```typescript
import { fhirMessage } from '@minvws/mgo-mgo-intl/test';

const fhirLabel = fhirIntl.formatMessage({ id: 'r3.nl_core_patient.name' });

expect(fhirLabel).toBe(fhirMessage('r3.nl_core_patient.name')); // pass
```

## Other

Because we use TypeScript to ensure we don't have any references in the code referring to non-existent translation keys, we included the translation content in this repository. This makes it easy to get started with the project and ensures you will not have TypeScript errors everywhere immediately after downloading this repository.
However when a production build is created the latest content will be downloaded first. So there is a possibility that locally things run fine. But the build fails because a translation key was removed in lokalise.

[MGO]: ../../README.md
[lokalise]: https://lokalise.com/
[formatjs]: https://formatjs.github.io/
[hui-schema]: ../../docs/glossary.md#health-ui-schema
[dev]: ../../docs/development.md
[ZIB]: ../../docs/glossary.md#zib
[docker]: https://www.docker.com/products/docker-desktop/
[precompile]: https://formatjs.github.io/docs/guides/advanced-usage/#pre-compiling-messages
[core-intl]: https://formatjs.github.io/docs/intl
[global-type]: https://formatjs.github.io/docs/react-intl/#typing-message-ids-and-locale
[intl-config]: https://formatjs.github.io/docs/intl#intlshape
