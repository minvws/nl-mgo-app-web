import { type MgoResourceMeta } from '@minvws/mgo-hcim-parse';
import { setEmptyEntries, type HealthUiSchema } from '@minvws/mgo-hcim-ui';
import { Locale } from '@minvws/mgo-intl';
import { isMgoResource } from '../../utils/isMgoResource/isMgoResource.js';
import { getResourceConfig } from '../getResourceConfig/getResourceConfig.js';
import { createSchemaContext, SchemaOptions } from '../schemaContext/schemaContext.js';

export function getSummary<T extends MgoResourceMeta>(
    resource: T,
    options?: SchemaOptions<T['fhirVersion']>
): HealthUiSchema {
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

    if (!config.summary) {
        return {
            label: resource.id ?? resource.profile,
            children: [
                {
                    label: 'Opties',
                    children: [
                        {
                            type: 'REFERENCE_LINK',
                            label: 'Bekijk alle gegevens',
                            reference: resource.referenceId,
                        },
                    ],
                },
            ],
        };
    }

    const context = createSchemaContext({
        locale: options?.locale ?? Locale.NL_NL,
        ignoreMissingTranslations: true,
        isSummary: true,
        ...options,
    });

    const summaryUiSchema = config.summary(resource, context);

    return setEmptyEntries(context)(summaryUiSchema);
}
