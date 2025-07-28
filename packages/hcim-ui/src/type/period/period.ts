import { type MgoPeriod } from '@minvws/mgo-hcim-parse';
import { type FhirMessagesIds } from '@minvws/mgo-intl';
import { date } from '../../format/date/date.js';
import { type SingleValue, type UiFunction, type WithUiContext } from '../../types/index.js';

type HasStartLabel =
    Extract<FhirMessagesIds, `${string}.start`> extends `${infer R}.start` ? R : never;
type HasEndLabel = Extract<FhirMessagesIds, `${string}.end`> extends `${infer R}.end` ? R : never;
type PeriodLabel = HasStartLabel | HasEndLabel;

export const period: WithUiContext<
    UiFunction<MgoPeriod, SingleValue[], FhirMessagesIds | PeriodLabel>
> = (context) => (label, value) => {
    const { formatLabel } = context;
    const startLabel = `${label}.start`;
    const endLabel = `${label}.end`;

    const formatDate = date(context);

    return [
        {
            label: formatLabel(startLabel, value, `fhir.period.start`),
            type: `SINGLE_VALUE`,
            display: formatDate(value?.start),
        },
        {
            label: formatLabel(endLabel, value, `fhir.period.end`),
            type: `SINGLE_VALUE`,
            display: formatDate(value?.end),
        },
    ];
};
