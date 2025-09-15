# @minvws/mgo-intl

This package contains all the text content used within [MGO][repo]. It utilizes [lokalise] for managing the content and translations. We use [FormatJS][formatjs] to integrate the text content within the application.

The content is divided into 2 parts:

- **mgo-app**
  This contains all the text content that is used within the application. For all the pages, buttons and forms etc. This content is also used by the mobile apps.
- **mgo-fhir**
  This contains all the text content that is used for creating the [Health Ui Schemas][hui-schema]. It contains the labels for fields related to the [ZIB] information. And code / system translations that are used. This content is only used by `web` as the mobile apps only use the already translated [Health Ui Schemas][hui-schema].

## Installation

```shell
npm i --save @minvws/mgo-intl

# or

pnpm add @minvws/mgo-intl
```

## Use

Because the [core intl][core-intl] isn't necessarily compatible with each framework specific variant we don't export an `intl` instance from the package. Instead we export a function to create a config that is to be used when creating one. This config will already have all the relevant (precompiled) `messages` included. There are 2 available configs:

- `getAppIntlConfig` - contains all the mgo-app messages.
- `getFhirIntlConfig` - contains all the mgo-fhir messages

They both accept the [all the options from the `IntlConfig`][intl-config] except for `messages` as this will be preconfigured. In additions it accepts a `ignoreMissingTranslations` `boolean` which you can use to silence missing translation errors if needed.
Here is an example of how to get the app config when using react for rich text elements.

```typescript
import { Locale, getAppIntlConfig } from '@minvws/mgo-intl';

const appConfig = getAppIntlConfig<ReactNode>({
        locale: Locale.NL_NL,
        defaultRichTextElements: {
            b: (chunks) => <b className="font-bold">{chunks}</b>,
            i: (chunks) => <i className="italic">{chunks}</i>,
        },
    });
```

### Types

The way FormatJS relies on a [global type][global-type] for applying a type to the message id's doesn't work well when you have multiple different intl configurations. Instead of relying on this global type we export our own types for each project. This type changes the type specification for the `MessageDescriptor` so only message id's from that specific project are accepted.

```typescript
import { Locale, getFhirIntlConfig, createIntl, type FhirIntlShape } from '@minvws/mgo-intl

const intl = createIntl(getFhirIntlConfig({ locale: Locale.NL_NL }));

intl.formatMessage({ id: 'foobar' }); // ok :/

const fhirIntl = intl as FhirIntlShape;

fhirIntl.formatMessage({ id: 'foobar' }); // TypeError
fhirIntl.formatMessage({ id: 'r3.nl_core_patient.name' }); // ok
```

### Helpers

We added 2 useful helpers for working with the translations: `formatMessage` and `hasMessage`. You can create the by passing an `IntlShape`, be sure it has the correct types before creating the helpers because it will reuse the same types for the message id.

```typescript
import {
    Locale,
    getFhirIntlConfig,
    createIntl,
    createHelpers,
    type FhirIntlShape,
} from '@minvws/mgo-intl

const intl = createIntl(getFhirIntlConfig({ locale: Locale.NL_NL })) as FhirIntlShape;
const { formatMessage, hasMessage } = createHelpers(intl);

intl.formatMessage({ id: 'r3.nl_core_patient.name' }); // "Naamgegevens"
formatMessage('r3.nl_core_patient.name'); // The same result: "Naamgegevens"

hasMessage('r3.nl_core_patient.name'); // true
hasMessage('foobar'); // false
```

<hr>

See the **[package source][source]** for more details

_This package and its documentation are still under development._

[MGO]: https://github.com/minvws/nl-mgo-app-web/blob/main/README.md
[lokalise]: https://lokalise.com/
[formatjs]: https://formatjs.github.io/
[hui-schema]: https://github.com/minvws/nl-mgo-app-web/blob/main/docs/glossary.md#health-ui-schema
[ZIB]: https://github.com/minvws/nl-mgo-app-web/blob/main/docs/glossary.md#ZIB
[core-intl]: https://formatjs.github.io/docs/intl
[global-type]: https://formatjs.github.io/docs/react-intl/#typing-message-ids-and-locale
[intl-config]: https://formatjs.github.io/docs/intl#intlshape
[repo]: https://github.com/minvws/nl-mgo-app-web
[source]: https://github.com/minvws/nl-mgo-app-web/tree/main/packages/intl
