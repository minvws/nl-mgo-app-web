import { type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { type MgoResource } from '../../../api/resources/resources';
import { type UiHelperContext } from '../../context';
import { type HealthUiGroup } from '../../types';

type ShowDetailsLabel =
    Extract<
        FhirMessagesIds,
        `summary.${string}.show_details`
    > extends `summary.${infer R}.show_details`
        ? R
        : never;

export function summaryOptions(
    { formatMessage }: UiHelperContext,
    i18n: ShowDetailsLabel,
    resource: MgoResource
): HealthUiGroup {
    return {
        label: formatMessage(`summary.options`),
        children: [
            {
                type: 'REFERENCE_LINK',
                label: formatMessage(`summary.${i18n}.show_details`),
                reference: resource.referenceId,
            },
        ],
    };
}
