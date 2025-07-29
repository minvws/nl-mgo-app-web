import { type FhirR3R4, type FhirVersion } from '@minvws/mgo-fhir';
import * as resourcesR3 from '../../r3/resources/index.js';
import * as resourcesR4 from '../../r4/resources/index.js';
import { type ResourceConfig } from '../../resourceTypes.js';

// Ensures only resource configs are listed
resourcesR3 satisfies Record<string, ResourceConfig<FhirVersion.R3, any, any>>; // eslint-disable-line @typescript-eslint/no-explicit-any
resourcesR4 satisfies Record<string, ResourceConfig<FhirVersion.R4, any, any>>; // eslint-disable-line @typescript-eslint/no-explicit-any

export const resourcesMapR3 = Object.fromEntries(
    Object.entries(resourcesR3).map(([_name, config]) => [config.profile.toLowerCase(), config])
);
export const resourcesMapR4 = Object.fromEntries(
    Object.entries(resourcesR4).map(([_name, config]) => [config.profile.toLowerCase(), config])
);

type ResourcesMapR3 = typeof resourcesMapR3;
type ResourcesMapR4 = typeof resourcesMapR4;

export type ResourceTypeConfigR3 = ResourcesMapR3[keyof ResourcesMapR3];
export type ResourceTypeConfigR4 = ResourcesMapR4[keyof ResourcesMapR4];

type MgoResourceR3 = ReturnType<ResourceTypeConfigR3['parse']>;
type MgoResourceR4 = ReturnType<ResourceTypeConfigR4['parse']>;

export type MgoResource<V extends FhirVersion | `${FhirVersion}` = FhirVersion> = FhirR3R4<
    V,
    MgoResourceR3,
    MgoResourceR4
>;
