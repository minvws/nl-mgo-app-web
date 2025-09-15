# @minvws/mgo-utils

This package contains utility [TypeScript] types for dealing with FHIR models and R3 / R4 versions that are using within [MGO][repo].

## Installation

```shell
npm i --save @minvws/mgo-fhir

# or

pnpm add @minvws/mgo-fhir
```

## Usage

```typescript
import { type FhirVersion, type ResourceByType, type ResourceType } from '@minvws/mgo-fhir';

type PatientR3R4 = ResourceByType<'Patient'>; // PatientR3 | PatientR4
type PatientR3 = ResourceByType<'Patient', FhirVersion.R3>;

// FhirResourceR3.resourceType | FhirResourceR4.resourceType
const type: ResourceType = 'ProcedureRequest';

// error: "ProcedureRequest" does not exists in FhirResourceR4.resourceType
const type: ResourceType<FhirVersion.R4> = 'ProcedureRequest'; // error
```

<hr>

See the **[package source][source]** for more details

_This package and its documentation are still under development._

[TypeScript]: https://www.typescriptlang.org/
[repo]: https://github.com/minvws/nl-mgo-app-web
[source]: https://github.com/minvws/nl-mgo-app-web/tree/main/packages/fhir
