# [MGO] - FHIR Types

This package contains utility [TypeScript] types for dealing with FHIR models and versions.

## Usage

```typescript
import { type FhirVersion, type ResourceByType, type ResourceType } from '@minvws/mgo-fhir-types';

type PatientR3R4 = ResourceByType<'Patient'>; // PatientR3 | PatientR4
type PatientR3 = ResourceByType<'Patient', FhirVersion.R3>;

// FhirResourceR3.resourceType | FhirResourceR4.resourceType
const type: ResourceType = 'ProcedureRequest';

// error: "ProcedureRequest" does not exists in FhirResourceR4.resourceType
const type: ResourceType<FhirVersion.R4> = 'ProcedureRequest'; // error
```

<hr>

_This package and its documentation are still under development._

[MGO]: ../../README.md
[TypeScript]: https://www.typescriptlang.org/
