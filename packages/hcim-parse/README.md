# @minvws/mgo-hcim-parse

This package contains functionality for parsing [FHIR] data into MGO resources which are used within [MGO][repo].

For more context on why / how this is used please [visit the about documentation][about-zib-ui].

## Installation

```shell
npm i --save @minvws/mgo-hcim-parse

# or

pnpm add @minvws/mgo-hcim-parse
```

## Use

```typescript

import { parse } from '@minvws/mgo-hcim-parse'

...

const fhirPatient = { ... }

const mgoPatient = {
    birthDate: parse.date(fhirPatient.birthdate)
}

```

See the **[package source][source]** for more details

<hr>

_This package and its documentation are still under development._

[FHIR]: https://fhir.org/
[about-zib-ui]: https://github.com/minvws/nl-mgo-app-web/tree/main/docs/about.md#from-zib-to-ui
[repo]: https://github.com/minvws/nl-mgo-app-web
[source]: https://github.com/minvws/nl-mgo-app-web/tree/main/packages/hcim-parse
