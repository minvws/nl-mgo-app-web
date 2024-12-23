import { Locale } from '../../i18n';
import { FhirVersion } from '../../types/Fhir';
import { createUiSchemaContext, type UiSchema, type UiSchemaOptions } from '../../ui';
import { type UiSchemaContext } from '../../ui/types';
import { isMgoResource } from '../../utils/isMgoResource/isMgoResource';
import {
    resourcesMapR3,
    resourcesMapR4,
    type MgoResourceR3,
    type MgoResourceR4,
} from '../resources/resources';

export type ResourceConfig<T extends MgoResourceR3 | MgoResourceR4> = {
    uiSchema: (arg: T, context: UiSchemaContext) => UiSchema;
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

export function getUiSchema<T extends MgoResourceR3 | MgoResourceR4>(
    resource: T,
    options?: UiSchemaOptions
) {
    // As this method is also used with JSON parsed inputs,
    // we want to ensure we're really dealing with a MGO Resource.
    if (!isMgoResource(resource)) {
        throw new Error(
            `input does not seem to be a valid MGO Resource. Received MGO resource profile: "${resource?.profile}"`
        );
    }

    const config = getResourceConfig(resource);

    const uiSchemaContext = createUiSchemaContext({
        ignoreMissingTranslations: true,
        locale: options?.locale ?? Locale.NL_NL,
    });

    return config.uiSchema(resource, uiSchemaContext);
}
