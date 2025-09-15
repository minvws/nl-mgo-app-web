import { type FhirVersion } from './fhirVersion.js';
import type { Bundle as BundleR3, FhirResource as FhirResourceR3 } from './r3.js';
import type { Bundle as BundleR4, FhirResource as FhirResourceR4 } from './r4.js';

type Version = FhirVersion | `${FhirVersion}`;

export type FhirR3R4<T extends Version, R3, R4> = T extends FhirVersion.R3 | `${FhirVersion.R3}`
    ? R3
    : T extends FhirVersion.R4 | `${FhirVersion.R4}`
      ? R4
      : R3 | R4;

export type ResourceType<V extends Version = FhirVersion> = FhirResource<V>['resourceType'];

export type ResourceByType<T extends ResourceType<V>, V extends Version = FhirVersion> = Extract<
    FhirResource<V>,
    { resourceType: T }
>;

export type FhirResource<V extends Version = FhirVersion> = FhirR3R4<
    V,
    FhirResourceR3,
    FhirResourceR4
>;

export type Bundle<
    V extends Version = FhirVersion,
    T extends ResourceType<V> = ResourceType,
    Resource = ResourceByType<T, V>,
> = FhirR3R4<V, BundleR3<Resource>, BundleR4<Resource>>;
