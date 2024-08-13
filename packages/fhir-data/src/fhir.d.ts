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

/**
 * A date, or partial date (e.g. just year or year + month) as used in human communication.
 * The format is a subset of [ISO8601] icon: YYYY, YYYY-MM, or YYYY-MM-DD
 * @see: https://build.fhir.org/datatypes.html#date
 * @example
 * 2018
 * 1973-06
 * 1905-08-23
 */
export type DateString = `${number}` | `${number}-${number}` | `${number}-${number}-${number}`;

/**
 * A date, date-time or partial date (e.g. just year or year + month) as used in human communication.
 * The format is a subset of [ISO8601] icon: YYYY, YYYY-MM, YYYY-MM-DD or YYYY-MM-DDThh:mm:ss+zz:zz,
 * @see: https://build.fhir.org/datatypes.html#dateTime
 * @example
 * 2018,
 * 1973-06,
 * 1905-08-23,
 * 2015-02-07T13:28:17-05:00,
 * 2017-01-01T00:00:00.000Z.
 */
export type DateTimeString =
    | `${number}`
    | `${number}-${number}`
    | `${number}-${number}-${number}`
    | `${number}-${number}-${number}T${number}:${number}:${number}${string}`;
