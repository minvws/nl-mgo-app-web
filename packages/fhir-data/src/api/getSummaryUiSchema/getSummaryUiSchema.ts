import { type MgoResourceMeta } from '../../parse/helpers/resourceMeta/resourceMeta';
import { type UiSchema, createUiSchemaContext } from '../../ui';
import { isMgoResource } from '../../utils/isMgoResource/isMgoResource';
import { getResourceConfig } from '../getResourceConfig/getResourceConfig';
import { type UiSchemaOptions } from '../getUiSchema/getUiSchema';

export function getSummaryUiSchema<T extends MgoResourceMeta>(
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

    if (!config.summary) {
        return {
            label: resource.id,
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

    const context = createUiSchemaContext({
        ignoreMissingTranslations: true,
        isSummary: true,
        ...options,
    });

    const summaryUiSchema = config.summary(resource, context);

    return context.setEmptyEntries(summaryUiSchema);
}
