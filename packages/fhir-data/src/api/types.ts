/* c8 ignore start */

import { type FhirVersion } from '../types/Fhir';

// Exporting the string values of the FhirVersion enum will look better in the swift / kotlin code
// As they reuse existing similar values in the references.
export type FhirVersionR3 = `${FhirVersion.R3}`;
export type FhirVersionR4 = `${FhirVersion.R4}`;

export * from '../parse/type';
export { type UiSchema, type UiSchemaGroup, type UiEntry } from '../ui/types';
export * from '../r3/elements';
export * from '../r3/resources';
export * from '../r4/resources';
