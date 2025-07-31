# @minvws/mgo-hcim

This package contains functionality for transforming HCIM [FHIR] data to MGO resources and Health Ui Schemas.

For more context on why / how this is used please [visit the about documentation][about-hcim-ui].

## Installation

```shell
npm i --save @minvws/mgo-hcim

# or

pnpm add @minvws/mgo-hcim
```

## Use

```typescript
import { type Bundle, type MedicationStatement } from '@minvws/mgo-fhir/r3';
import { getBundleResources, getSummary, getDetails, type HealthUiSchema } from '@minvws/mgo-hcim';

// The FHIR data needs to be according to the Nictiz HCIM
// e.g.: https://simplifier.net/packages/nictiz.fhir.nl.stu3.zib2017/2.2.18/files/2317279
const hcimMedicationUseBundle: Bundle<MedicationStatement> = [ ... ]

const hcimMedicationUse: MedicationStatement[] = getBundleResources(fhirBundle);
const mgoMedicationUse = getMgoResource(zibMedicationUse[0]);

const medicationUseSummary: HealthUiSchema = getSummary(mgoMedicationUse);
const medicationUseDetails: HealthUiSchema = getDetails(mgoMedicationUse);
```

## API

### getBundleResources( bundle )

The `getBundleResources()` function returns the entry resources of a [Fhir Bundle][fhir-bundle] as an Array..

- **@param** `{Bundle} bundle`
  The bundle FHIR Resource.
- **@returns** `{Array.<FhirResource>}`
  Returns the entry values of the `Bundle`.

### getMgoResource( fhirResource, fhirOptions )

The `getMgoResource()` function extracts the `MgoResource` (the parsed result) from a `FhirResource`.

- **@param** `{FhirResource} fhirResource`
  A FhirResource
- **@param** `{{ fhirVersion: 'R3' | 'R4' }} fhirOptions`
  Options for parsing the `FhirResource`
- **@returns** `{MgoResource}`
  Returns the `MgoResource` that was extracted from the input

### SchemaOptions

- `{string} .locale : "nl_NL"`
  What language to use for the schema. ( **Currently only `"nl_NL"` is supported** )
- `{Array.<MgoResource>} .resources : []`
  Other resources from the same data service. This information might be used to show more detailed information if the input resource has a reference to one of these resources.

### getSummary( mgoResource [, schemaOptions] )

The `getSummary()` function returns the `HealthUiSchema` for a summary of the input resource.

- **@param** `{MgoResource} mgoResource`
- **@param** `{SchemaOptions} schemaOptions`
- **@returns** `{HealthUiSchema}`

### getDetails( mgoResource [, schemaOptions] )

The `getDetails()` function returns the full `HealthUiSchema` containing all details of the input resource.

- **@param** `{MgoResource} mgoResource`
- **@param** `{SchemaOptions} schemaOptions`
- **@returns** `{HealthUiSchema}`

<hr>

See the **[package source][source]** for more details

_This package and its documentation are still under development._

[FHIR]: https://github.com/minvws/nl-mgo-app-web/blob/main/docs/glossary.md#FHIR
[ZIB]: https://github.com/minvws/nl-mgo-app-web/blob/main/docs/glossary.md#ZIB
[about-hcim-ui]: https://github.com/minvws/nl-mgo-app-web/blob/main/docs/about.md#from-hcim-to-ui
[fhir-bundle]: https://build.fhir.org/bundle.html
[source]: https://github.com/minvws/nl-mgo-app-web/tree/main/packages/hcim
