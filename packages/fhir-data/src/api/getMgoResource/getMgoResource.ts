import { type FhirResource as FhirResourceR3 } from 'fhir/r3';
import { type FhirResource as FhirResourceR4 } from 'fhir/r4';

import { FhirVersion, type FhirR3R4 } from '../../types/Fhir';
import {
    resourcesMapR3,
    resourcesMapR4,
    type MgoResourceR3,
    type MgoResourceR4,
    type ResourceTypeConfigR3,
    type ResourceTypeConfigR4,
} from '../resources/resources';

function getResourceConfig<
    T extends FhirR3R4<V, FhirResourceR3, FhirResourceR4>,
    V extends FhirVersion,
>(
    resource: T,
    fhirVersion: V
): FhirR3R4<V, ResourceTypeConfigR3, ResourceTypeConfigR4> | undefined {
    const resourcesMap = fhirVersion === FhirVersion.R3 ? resourcesMapR3 : resourcesMapR4;
    const profiles = resource.meta?.profile ?? [];
    for (const profile of profiles) {
        const config = resourcesMap[profile];
        if (config) return config as FhirR3R4<V, ResourceTypeConfigR3, ResourceTypeConfigR4>;
    }

    console.error(
        `No config found for fhir resourceType: "${resource.resourceType}" with profile: "${resource.meta?.profile}" for fhir version: "${fhirVersion}"`
    );
}

export function getMgoResource<
    T extends FhirR3R4<V, FhirResourceR3, FhirResourceR4>,
    V extends FhirVersion,
>(resource: T, fhirVersion: V): FhirR3R4<V, MgoResourceR3, MgoResourceR4> | undefined {
    const config = getResourceConfig<T, V>(resource, fhirVersion);

    if (!config) return;

    // Doesn't seem to accept this structure, but the signature of this function is correct
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return config.parse(resource as any) as FhirR3R4<V, MgoResourceR3, MgoResourceR4>;
}
