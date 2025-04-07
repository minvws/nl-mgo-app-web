import { type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { type MgoRange } from '../../../parse/type';
import { systemValue } from '../../format/systemValue/systemValue';
import { type SingleValue, type UiFunction, type WithUiHelperContext } from '../../types';

type HasLowLabel = Extract<FhirMessagesIds, `${string}.low`> extends `${infer R}.low` ? R : never;
type HasHighLabel =
    Extract<FhirMessagesIds, `${string}.high`> extends `${infer R}.high` ? R : never;
type RangeLabel = HasLowLabel | HasHighLabel; // eslint-disable-line @typescript-eslint/no-duplicate-type-constituents

export const range: WithUiHelperContext<
    UiFunction<MgoRange, SingleValue[], FhirMessagesIds | RangeLabel>
> = (context) => (label, value) => {
    const { formatLabel } = context;
    const lowLabel = `${label}.low`;
    const highLabel = `${label}.high`;
    const formatSystemValue = systemValue(context);

    return [
        {
            label: formatLabel(lowLabel, value, `fhir.range.low`),
            type: `SINGLE_VALUE`,
            display: formatSystemValue(value?.low),
        },
        {
            label: formatLabel(highLabel, value, `fhir.range.high`),
            type: `SINGLE_VALUE`,
            display: formatSystemValue(value?.high),
        },
    ];
};
