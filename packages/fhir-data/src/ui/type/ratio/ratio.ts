import { type FhirMessagesIds } from '@minvws/mgo-mgo-intl';
import { type MgoRatio } from '../../../parse/type';
import { systemValue } from '../../format/systemValue/systemValue';
import { type SingleValue, type UiFunction, type WithUiHelperContext } from '../../types';

type HasNumeratorLabel =
    Extract<FhirMessagesIds, `${string}.numerator`> extends `${infer R}.numerator` ? R : never;
type HasDenominatorLabel =
    Extract<FhirMessagesIds, `${string}.denominator`> extends `${infer R}.denominator` ? R : never;
type RatioLabel = HasNumeratorLabel | HasDenominatorLabel; // eslint-disable-line @typescript-eslint/no-duplicate-type-constituents

export const ratio: WithUiHelperContext<
    UiFunction<MgoRatio, SingleValue[], FhirMessagesIds | RatioLabel>
> = (context) => (label, value) => {
    const { formatLabel } = context;
    const numeratorLabel = `${label}.numerator`;
    const denominatorLabel = `${label}.denominator`;
    const formatSystemValue = systemValue(context);

    return [
        {
            label: formatLabel(numeratorLabel, value, `fhir.ratio.numerator`),
            type: `SINGLE_VALUE`,
            display: formatSystemValue(value?.numerator),
        },
        {
            label: formatLabel(denominatorLabel, value, `fhir.ratio.denominator`),
            type: `SINGLE_VALUE`,
            display: formatSystemValue(value?.denominator),
        },
    ];
};
