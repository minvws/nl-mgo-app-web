import { type MgoResourceMeta } from '@minvws/mgo-hcim-parse';
import { type HcimCardDetails } from '../../resourceTypes.js';
import { isMgoResource } from '../../utils/isMgoResource/isMgoResource.js';
import { getResourceConfig } from '../getResourceConfig/getResourceConfig.js';
import { createSchemaContext, SchemaOptions } from '../schemaContext/schemaContext.js';

export function getCard<T extends MgoResourceMeta>(
    resource: T,
    options?: SchemaOptions<T['fhirVersion']>
): HcimCardDetails {
    // As this method is also used with JSON parsed inputs,
    // we want to ensure we're really dealing with a MGO Resource.
    if (!isMgoResource(resource)) {
        throw new Error(
            `input does not seem to be a valid MGO Resource. Received MGO resource profile: "${(resource as MgoResourceMeta)?.profile}"`
        );
    }

    const config = getResourceConfig<T, T['fhirVersion']>(resource.profile, resource.fhirVersion);

    if (!config) {
        throw new Error(
            `No config found for MGO Resource with profile: "${resource.profile}" and fhir version: "${resource.fhirVersion}"`
        );
    }

    if (!config.card) {
        return {
            title: resource.id ?? '',
            description: resource.profile,
        };
    }

    const context = createSchemaContext({
        locale: options?.locale ?? 'nl-NL',
        ignoreMissingTranslations: true,
        isSummary: true,
        ...options,
    });

    return config.card(resource, context);
}
