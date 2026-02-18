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
    const { baseProps } = context;
    const formatSystemValue = systemValue(context);

    return [
        {
            ...baseProps(label, value, { defaultLabel: `fhir.ratio.numerator` }),
            type: `SINGLE_VALUE`,
            value: { display: formatSystemValue(value?.numerator) },
        },
        {
            ...baseProps(label, value, { defaultLabel: `fhir.ratio.denominator` }),
            type: `SINGLE_VALUE`,
            value: { display: formatSystemValue(value?.denominator) },
        },
    ];
};
