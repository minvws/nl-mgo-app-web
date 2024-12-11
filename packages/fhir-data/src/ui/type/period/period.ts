import { type MessagesIds } from '../../../i18n/messages';
import { type MgoPeriod } from '../../../parse/type';
import { format } from '../../format';
import { type SingleValue, type UiFunction, type WithUiContext } from '../../types';

type HasStartLabel = Extract<MessagesIds, `${string}.start`> extends `${infer R}.start` ? R : never;
type HasEndLabel = Extract<MessagesIds, `${string}.end`> extends `${infer R}.end` ? R : never;
type PeriodLabel = HasStartLabel | HasEndLabel;

export const period: WithUiContext<
    UiFunction<MgoPeriod, SingleValue[], MessagesIds | PeriodLabel>
> =
    ({ formatMessage, hasMessage }) =>
    (label, value, options) => {
        const startLabel = `${label}.start`;
        const endLabel = `${label}.end`;

        return [
            {
                label: formatMessage(hasMessage(startLabel) ? startLabel : `fhir.period.start`),
                type: `SINGLE_VALUE`,
                display: format.dateTime(value?.start),
                ...options,
            },
            {
                label: formatMessage(hasMessage(endLabel) ? endLabel : `fhir.period.end`),
                type: `SINGLE_VALUE`,
                display: format.dateTime(value?.end),
                ...options,
            },
        ];
    };
