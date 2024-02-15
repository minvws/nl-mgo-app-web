export interface FhirClientOptions {
    defaultQueryParams?: Record<string, string | number | boolean>;
}

export * from './ky';
export * from './fhir';
