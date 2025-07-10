export type * from './date';
export * from './fhirVersion';
export type * from './rX';
export type * from './utils';

export type SystemSnomed = 'http://snomed.info/sct'; // NOSONAR
export type SystemLoinc = 'http://loinc.org'; // NOSONAR
export type SystemUrn = `urn:oid:${string}`;
export type SystemTerminologyFhir = `http://terminology.hl7.org/${string}`;
export type SystemFhir = `http://hl7.org/fhir/v${3 | 4}/${string}`;
export type SystemFhirNL = `http://fhir.nl/fhir/${string}`;
export type SystemNictiz = `http://nictiz.nl/fhir/${string}`;
export type SystemWhocc = 'http://www.whocc.no/atc'; // NOSONAR

/**
 * More strict type for coding systems.
 * This can help to reduce typos.
 */
export type CodingSystem =
    | SystemSnomed
    | SystemLoinc
    | SystemUrn
    | SystemFhir
    | SystemFhirNL
    | SystemTerminologyFhir
    | SystemNictiz
    | SystemWhocc;
