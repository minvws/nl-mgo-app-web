import { setEmptyEntries, type HealthUiSchema } from '@minvws/mgo-hcim-ui';
import { Locale } from '@minvws/mgo-intl';
import { type MgoResourceMeta } from '../../../../hcim-parse/src/helpers/resourceMeta/resourceMeta';
import { isMgoResource } from '../../utils/isMgoResource/isMgoResource';
import { getResourceConfig } from '../getResourceConfig/getResourceConfig';
import { createSchemaContext, SchemaOptions } from '../schemaContext/schemaContext';

export function getSummary<T extends MgoResourceMeta>(
    resource: T,
    options?: SchemaOptions<T['fhirVersion']>
): HealthUiSchema {
    // As this method is also used with JSON parsed inputs,
    // we want to ensure we're really dealing with a MGO Resource.
    if (!isMgoResource(resource)) {
        throw new Error(
            `input does not seem to be a valid MGO Resource. Received MGO resource profile: "${resource?.profile}"`
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
