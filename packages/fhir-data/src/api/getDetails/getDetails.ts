import { type FhirVersion } from '@minvws/mgo-fhir-types';
import { Locale } from '@minvws/mgo-mgo-intl';
import { type MgoResourceMeta } from '../../parse/helpers/resourceMeta/resourceMeta';
import { createSchemaContext, type HealthUiSchema } from '../../ui';
import { setEmptyEntries } from '../../ui/helpers';
import { isMgoResource } from '../../utils/isMgoResource/isMgoResource';
import { getResourceConfig } from '../getResourceConfig/getResourceConfig';
import { type MgoResource } from '../resources/resources';

export type HealthUiSchemaOrganization = {
    name?: string;
};
export interface HealthUiSchemaOptions<V extends `${FhirVersion}`> {
    locale?: Locale;
    resources?: MgoResource<V>[];
    organization?: HealthUiSchemaOrganization;
}

export function getDetails<T extends MgoResourceMeta>(
    resource: T,
    options?: HealthUiSchemaOptions<T['fhirVersion']>
): HealthUiSchema {
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

    const context = createSchemaContext<T['fhirVersion']>({
        locale: options?.locale ?? Locale.NL_NL,
        ignoreMissingTranslations: true,
        ...options,
    });

    const uiSchema = config.uiSchema(resource, context);

    return setEmptyEntries(context)(uiSchema);
}
