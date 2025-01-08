import { type MgoResourceR4, type MgoResourceR3 } from '../../../api/resources/resources';
import { type I18nContext, type MessagesIds } from '../../../i18n';
import { type UiSchemaGroup } from '../../types';

type ShowDetailsLabel =
    Extract<MessagesIds, `summary.${string}.show_details`> extends `summary.${infer R}.show_details`
        ? R
        : never;

export function summaryOptions(
    { formatMessage }: I18nContext,
    i18n: ShowDetailsLabel,
    resource: MgoResourceR3 | MgoResourceR4
): UiSchemaGroup {
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
