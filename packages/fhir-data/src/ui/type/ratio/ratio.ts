import { type MessagesIds } from '../../../i18n/messages';
import { type MgoRatio } from '../../../parse/type';
import { systemValue } from '../../format/systemValue/systemValue';
import { type SingleValue, type UiFunction, type WithUiHelperContext } from '../../types';

type HasNumeratorLabel =
    Extract<MessagesIds, `${string}.numerator`> extends `${infer R}.numerator` ? R : never;
type HasDenominatorLabel =
    Extract<MessagesIds, `${string}.denominator`> extends `${infer R}.denominator` ? R : never;
type RatioLabel = HasNumeratorLabel | HasDenominatorLabel; // eslint-disable-line @typescript-eslint/no-duplicate-type-constituents

export const ratio: WithUiHelperContext<
    UiFunction<MgoRatio, SingleValue[], MessagesIds | RatioLabel>
> = (context) => (label, value) => {
    const { hasMessage, formatMessage } = context;
    const numeratorLabel = `${label}.numerator`;
    const denominatorLabel = `${label}.denominator`;
    const formatSystemValue = systemValue(context);

    return [
        {
            label: formatMessage(
                hasMessage(numeratorLabel) ? numeratorLabel : `fhir.ratio.numerator`
            ),
            type: `SINGLE_VALUE`,
            display: formatSystemValue(value?.numerator),
        },
        {
            label: formatMessage(
                hasMessage(denominatorLabel) ? denominatorLabel : `fhir.ratio.denominator`
            ),
            type: `SINGLE_VALUE`,
            display: formatSystemValue(value?.denominator),
        },
    ];
};
