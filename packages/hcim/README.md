# @minvws/mgo-hcim

This package contains functionality for transforming HCIM [FHIR] data to MGO resources and Health Ui Schemas.

For more context on why / how this is used please [visit the about documentation][about-zib-ui].

## Usage

```

const fhirBundle: Bundle<Patient> = await fhirClient.getResources({ resource: 'Patient' }).json()

const patients: Patient[] = getBundleResources( fhirBundle )

const mgoPatient = getMgoResource( patients[0], { fhirVersion: 'R3' })

const patientSummarySchema: HealthUiSchema = getSummary( mgoPatient )
const patientDetailsSchema: HealthUiSchema = getDetails( mgoPatient )
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

## JSON API

Each of the API functions describer above are also available with a `JSON` interface. This takes the argument(s) as a `JSON` string and returns the result as a `JSON` string as well. These are used by the mobile applications. It will be the same function name with `Json` appended:

- getBundleResourcesJson
- getMgoResourceJson
- getSummaryJson
- getDetailsJson

For example:

```
getSummaryJson( resource: JsonString.<MgoResource>), options: JsonString.<SchemaOptions> ): JsonString.<HealthUiSchema>
```

<hr>

See the **[package source][source]** for more details

_This package and its documentation are still under development._

[MGO]: ../../README.md
[FHIR]: ../../docs/glossary.md#FHIR
[ZIB]: ../../docs/glossary.md#ZIB
[about-zib-ui]: ../../docs/about.md#from-zib-to-ui
[fhir-bundle]: https://build.fhir.org/bundle.html
[repo]: https://github.com/minvws/nl-mgo-app-web
[source]: https://github.com/minvws/nl-mgo-app-web/tree/main/packages/hcim
