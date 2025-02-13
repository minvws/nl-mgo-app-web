# [MGO] - Data services

This package contains http clients for each [data service][data-service] that we support. They are built on top of the `fhir-client` package. Each service has several methods that can return health data based on the [medmij specifications][data-services] for that service.

## Usage

```typescript
const commonClinicalDataService = createCommonClinicalDatasetService({ prefixUrl: '...' });
const generalPractitionerService = createGeneralPractitionerService({ prefixUrl: '...' });
const pdfAService = createPdfAService({ prefixUrl: '...' });
const vaccinationImmunizationService = createVaccinationImmunizationService({ prefixUrl: '...' });

console.log(commonClinicalDataService.dataServiceId); // 48
console.log(commonClinicalDataService.fhirVersion); // "R3"

console.log(vaccinationImmunizationService.dataServiceId); // 63
console.log(vaccinationImmunizationService.fhirVersion); // "R4"

const patient: Bundle<Patient> = await commonClinicalDataService.getPatientInformation().json();
const vaccinationEvents: Bundle<Immunization> = await vaccinationImmunizationService
    .getVaccinations()
    .json();
```

## API

### `type` DataService

```typescript
{
    dataServiceId: number,
    fhirVersion: "R3" | "R4",
    instance: KyInstance,
    ... // getMethods for this data sevice
}
```

### `method` createCommonClinicalDatasetService( )

```typescript
createCommonClinicalDatasetService( options: FhirClientOptions ): DataService
```

### `method` createGeneralPractitionerService( )

```typescript
createGeneralPractitionerService( options: FhirClientOptions ): DataService
```

### `method` createPdfAService( )

```typescript
createPdfAService( options: FhirClientOptions ): DataService
```

### `method` createVaccinationImmunizationService( )

```typescript
createVaccinationImmunizationService( options: FhirClientOptions ): DataService
```

<hr>

_This package and its documentation are still under development._

[MGO]: ../../README.md
[data-service]: ../../docs/about.md#data-service
[data-services]: ../../docs/data-services.md
