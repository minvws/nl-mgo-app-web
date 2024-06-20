import { type FhirResource, type Bundle } from 'fhir/r3';
import { type LosslessJson } from '@minvws/mgo-fhir-client';

export type * from 'fhir/r3';

export type ResourceType = FhirResource['resourceType'];
export type ResourceByType<T extends ResourceType> = Extract<FhirResource, { resourceType: T }>;

export type InputFhir<T> = T | LosslessJson<T>;
export type OutputFhir<Input, Output> =
    Input extends LosslessJson<Record<string, unknown>> ? LosslessJson<Output> : Output;

export type BundleResource<T extends InputFhir<Bundle>> = NonNullable<
    NonNullable<T['entry']>[number]['resource']
>;
