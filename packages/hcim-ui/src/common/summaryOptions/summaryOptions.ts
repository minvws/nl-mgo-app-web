import { MgoResourceMeta } from '@minvws/mgo-hcim-parse';
import { type FhirMessagesIds } from '@minvws/mgo-intl';
import { type UiContext } from '../../context/index.js';
import { type HealthUiGroup } from '../../types/index.js';

type ShowDetailsLabel =
    Extract<
        FhirMessagesIds,
        `summary.${string}.show_details`
    > extends `summary.${infer R}.show_details`
        ? R
        : never;

export function summaryOptions(
    { formatMessage }: UiContext,
    i18n: ShowDetailsLabel,
    resource: MgoResourceMeta
): HealthUiGroup {
    return {
        id: formatMessage(`summary.options`),
        label: formatMessage(`summary.options`),
        excludeFromPrint: true,
        children: [
            {
                id: `summary.${i18n}.show_details`,
                type: 'REFERENCE_LINK',
                label: formatMessage(`summary.${i18n}.show_details`),
                reference: resource.referenceId,
            },
        ],
    };
}
