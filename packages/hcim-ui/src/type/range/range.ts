import { type MgoRange } from '@minvws/mgo-hcim-parse';
import { type FhirMessagesIds } from '@minvws/mgo-intl';
import { systemValue } from '../../format/systemValue/systemValue.js';
import { type SingleValue, type UiFunction, type WithUiContext } from '../../types/index.js';

type HasLowLabel = Extract<FhirMessagesIds, `${string}.low`> extends `${infer R}.low` ? R : never;
type HasHighLabel =
    Extract<FhirMessagesIds, `${string}.high`> extends `${infer R}.high` ? R : never;
type RangeLabel = HasLowLabel | HasHighLabel;

export const range: WithUiContext<
    UiFunction<MgoRange, SingleValue[], FhirMessagesIds | RangeLabel>
> = (context) => (label, value) => {
    const { baseProps } = context;
    const formatSystemValue = systemValue(context);

    return [
        {
            ...baseProps(label, value, { defaultLabel: `fhir.range.low` }),
            type: `SINGLE_VALUE`,
            value: { display: formatSystemValue(value?.low) },
        },
        {
            ...baseProps(label, value, { defaultLabel: `fhir.range.high` }),
            type: `SINGLE_VALUE`,
            value: { display: formatSystemValue(value?.high) },
        },
    ];
};
