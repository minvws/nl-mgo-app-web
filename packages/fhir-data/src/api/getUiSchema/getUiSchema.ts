import { FhirVersion } from '../../types/Fhir';
import { type UiSchema } from '../../ui';
import {
    resourcesMapR3,
    resourcesMapR4,
    type MgoResourceR3,
    type MgoResourceR4,
} from '../resources/resources';

export type ResourceConfig<T extends MgoResourceR3 | MgoResourceR4> = {
    uiSchema: (arg: T) => UiSchema;
};

function getResourceConfig<T extends MgoResourceR3 | MgoResourceR4>(resource: T) {
    const { profile, fhirVersion } = resource;
    let config;

    if (fhirVersion === FhirVersion.R3) {
        config = resourcesMapR3[profile];
    } else if (fhirVersion === FhirVersion.R4) {
        config = resourcesMapR4[profile];
    }

    if (!config) {
        throw new Error(
            `No config found for MGO Resource with profile: "${profile}" and fhir version: "${fhirVersion}"`
        );
    }

    return config as ResourceConfig<T>;
}

export function getUiSchema<T extends MgoResourceR3 | MgoResourceR4>(resource: T) {
    const config = getResourceConfig(resource);
    return config.uiSchema(resource);
}
