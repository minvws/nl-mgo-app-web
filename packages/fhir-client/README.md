# [MGO] - FHIR Client

This package contains a basic HTTP client for sending requests to a [FHIR](https://hl7.org/fhir/) server. Responses are fully typed according to the FHIR specifications. The client is based on the [ky instance (_ky.create_)][ky] and all its functionality is also available on the fhir client.

## Usage

```typescript
const client = createClient({
    prefixUrl: 'http://localhost:8000',
    fhirVersion: 'R3',
});

const patient = await client
    .getResource({
        id: '1',
        resource: 'Patient',
    })
    .json(); // Patient

const patientBundle = await client.getResources({ resource: 'Patient' }).json(); // Bundle<Patient>
```

## API

### `type` ClientOptions

```typescript
{
    prefixUrl: string,
    fhirVersion: "R3" | "R4",
    ...kyOptions
}
```

- **prefixUrl** : A prefix to prepend to the request urls. [See `ky` `prefixUrl` for more info][ky-prefixurl].
- **fhirVersion** : What FHIR version of fhir to use. The [version parameter][fhir-version] will be set accordingly.
- **...kyOptions** : [See `ky` for all other options][ky].

### `type` FhirClient

```typescript
{
    fhirVersion: "R3" | "R4",
    instance: KyInstance,
    getResource( request, kyOptions ): ResponsePromise<T>
    getResources( request, kyOptions ): ResponsePromise<T>
}
```

### `method` createClient( )

```typescript
createClient( options: ClientOptions ): FhirClient
```

<hr>

_This package and its documentation are still under development._

[MGO]: ../../README.md
[ky]: https://www.npmjs.com/package/ky
[ky-prefixurl]: https://www.npmjs.com/package/ky#prefixurl
[fhir-version]: https://build.fhir.org/http.html#version-parameter
