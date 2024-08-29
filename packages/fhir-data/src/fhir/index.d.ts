import { type Bundle, type FhirResource } from 'fhir/r3';
import { type Lossless } from '../types/Lossless';

export type * from 'fhir/r3';

export type ResourceType = FhirResource['resourceType'];
export type ResourceByType<T extends ResourceType> = Extract<FhirResource, { resourceType: T }>;

export type BundleResource<T extends Lossless<Bundle>> = NonNullable<
    NonNullable<T['entry']>[number]['resource']
>;

export { type DateString, type DateTimeString } from './dates';
export { type NictizNlProfile } from './nictizNlProfile';
