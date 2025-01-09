import { type MessagesIds } from '../../../i18n/messages';
import { type MgoRange } from '../../../parse/type';
import { count } from '../../format/count/count';
import { type SingleValue, type UiFunction, type WithUiHelperContext } from '../../types';

type HasLowLabel = Extract<MessagesIds, `${string}.low`> extends `${infer R}.low` ? R : never;
type HasHighLabel = Extract<MessagesIds, `${string}.high`> extends `${infer R}.high` ? R : never;
type RangeLabel = HasLowLabel | HasHighLabel; // eslint-disable-line @typescript-eslint/no-duplicate-type-constituents

export const range: WithUiHelperContext<
    UiFunction<MgoRange, SingleValue[], MessagesIds | RangeLabel>
> = (context) => (label, value) => {
    const { hasMessage, formatMessage } = context;
    const lowLabel = `${label}.low`;
    const highLabel = `${label}.high`;
    const formatCount = count(context);

    return [
        {
            label: formatMessage(hasMessage(lowLabel) ? lowLabel : `fhir.range.low`),
            type: `SINGLE_VALUE`,
            display: formatCount(value?.low),
        },
        {
            label: formatMessage(hasMessage(highLabel) ? highLabel : `fhir.range.high`),
            type: `SINGLE_VALUE`,
            display: formatCount(value?.high),
        },
    ];
};
