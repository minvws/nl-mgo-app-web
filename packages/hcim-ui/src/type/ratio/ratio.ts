import { type MgoRatio } from '@minvws/mgo-hcim-parse';
import { type FhirMessagesIds } from '@minvws/mgo-intl';
import { systemValue } from '../../format/systemValue/systemValue.js';
import { type SingleValue, type UiFunction, type WithUiContext } from '../../types/index.js';

type HasNumeratorLabel =
    Extract<FhirMessagesIds, `${string}.numerator`> extends `${infer R}.numerator` ? R : never;
type HasDenominatorLabel =
    Extract<FhirMessagesIds, `${string}.denominator`> extends `${infer R}.denominator` ? R : never;
type RatioLabel = HasNumeratorLabel | HasDenominatorLabel;

export const ratio: WithUiContext<
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
            value: { display: formatSystemValue(value?.numerator) },
        },
        {
            label: formatLabel(denominatorLabel, value, `fhir.ratio.denominator`),
            type: `SINGLE_VALUE`,
            value: { display: formatSystemValue(value?.denominator) },
        },
    ];
};
