import type { Options as KyOptions } from 'ky';

export type WithRequired<T, K extends keyof T> = T & { [P in K]-?: T[P] };

export * from './ky';
export * from './fhir';

export interface FhirClientOptions extends WithRequired<KyOptions, 'prefixUrl'> {}
