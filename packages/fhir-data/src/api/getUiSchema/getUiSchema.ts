import { type Locale } from '../../i18n';
import { type MgoResourceMeta } from '../../parse/helpers/resourceMeta/resourceMeta';
import { type FhirVersion, type FhirR3R4 } from '../../types/Fhir';
import { type UiSchema, createUiSchemaContext } from '../../ui';
import { isMgoResource } from '../../utils/isMgoResource/isMgoResource';
import { getResourceConfig } from '../getResourceConfig/getResourceConfig';
import { type MgoResourceR3, type MgoResourceR4 } from '../resources/resources';

export interface UiSchemaOptions<T extends `${FhirVersion}`> {
    locale?: Locale;
    resources?: FhirR3R4<T, MgoResourceR3[], MgoResourceR4[]>;
}

export function getUiSchema<T extends MgoResourceMeta>(
    resource: T,
    options?: UiSchemaOptions<T['fhirVersion']>
): UiSchema {
    // As this method is also used with JSON parsed inputs,
    // we want to ensure we're really dealing with a MGO Resource.
    if (!isMgoResource(resource)) {
        throw new Error(
            `input does not seem to be a valid MGO Resource. Received MGO resource profile: "${resource?.profile}"`
        );
    }

    const config = getResourceConfig<T>(resource.profile, resource.fhirVersion);

    if (!config) {
        throw new Error(
            `No config found for MGO Resource with profile: "${resource.profile}" and fhir version: "${resource.fhirVersion}"`
        );
    }

    const context = createUiSchemaContext<T['fhirVersion']>({
        ignoreMissingTranslations: true,
        ...options,
    });

    const uiSchema = config.uiSchema(resource, context);

    return context.setEmptyEntries(uiSchema);
}
