import { type FhirResource } from '../../fhir';
import { type Lossless } from '../../types/Lossless';
import { type ResourceTypeConfig, resourcesMap } from '../resources/resources';

export type ResourceConfig<T extends FhirResource> = Extract<
    ResourceTypeConfig,
    { parse: (arg: Lossless<T>) => any } // eslint-disable-line @typescript-eslint/no-explicit-any
>;

function getResourceConfig<T extends FhirResource>(resource: Lossless<T>) {
    const profiles = resource.meta?.profile ?? [];
    for (const profile of profiles) {
        const config = resourcesMap[profile];
        if (config) return config as ResourceConfig<T>;
    }

    console.error(
        `No config found for fhir resourceType: "${resource.resourceType}" with profile: "${resource.meta?.profile}"`
    );
}

export function getMgoResource<T extends FhirResource>(resource: Lossless<T>) {
    const config = getResourceConfig(resource);
    if (!config) return;

    return config.parse(resource);
}
