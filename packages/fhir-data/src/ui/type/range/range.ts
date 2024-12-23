import { type MessagesIds } from '../../../i18n/messages';
import { type MgoRange } from '../../../parse/type';
import { format } from '../../format';
import { type SingleValue, type UiFunction, type WithI18nContext } from '../../types';

type HasLowLabel = Extract<MessagesIds, `${string}.low`> extends `${infer R}.low` ? R : never;
type HasHighLabel = Extract<MessagesIds, `${string}.high`> extends `${infer R}.high` ? R : never;
type RangeLabel = HasLowLabel | HasHighLabel;

export const range: WithI18nContext<
    UiFunction<MgoRange, SingleValue[], MessagesIds | RangeLabel>
> = (context) => (label, value, options) => {
    const { hasMessage, formatMessage } = context;
    const lowLabel = `${label}.low`;
    const highLabel = `${label}.high`;

    return [
        {
            label: formatMessage(hasMessage(lowLabel) ? lowLabel : `fhir.range.low`),
            type: `SINGLE_VALUE`,
            display: format.valueWithUnit(value?.low?.value, value?.low?.unit),
            ...options,
        },
        {
            label: formatMessage(hasMessage(highLabel) ? highLabel : `fhir.range.high`),
            type: `SINGLE_VALUE`,
            display: format.valueWithUnit(value?.high?.value, value?.high?.unit),
            ...options,
        },
    ];
};
