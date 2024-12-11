import { type MessagesIds } from '../../../i18n/messages';
import { type MgoRatio } from '../../../parse/type';
import { format } from '../../format';
import { type SingleValue, type UiFunction, type WithUiContext } from '../../types';

type HasNumeratorLabel =
    Extract<MessagesIds, `${string}.numerator`> extends `${infer R}.numerator` ? R : never;
type HasDenominatorLabel =
    Extract<MessagesIds, `${string}.denominator`> extends `${infer R}.denominator` ? R : never;
type RatioLabel = HasNumeratorLabel | HasDenominatorLabel;

export const ratio: WithUiContext<UiFunction<MgoRatio, SingleValue[], MessagesIds | RatioLabel>> =
    (context) => (label, value, options) => {
        const { hasMessage, formatMessage } = context;
        const numeratorLabel = `${label}.numerator`;
        const denominatorLabel = `${label}.denominator`;

        return [
            {
                label: formatMessage(
                    hasMessage(numeratorLabel) ? numeratorLabel : `fhir.ratio.numerator`
                ),
                type: `SINGLE_VALUE`,
                display: format.valueWithUnit(value?.numerator?.value, value?.numerator?.unit),
                ...options,
            },
            {
                label: formatMessage(
                    hasMessage(denominatorLabel) ? denominatorLabel : `fhir.ratio.denominator`
                ),
                type: `SINGLE_VALUE`,
                display: format.valueWithUnit(value?.denominator?.value, value?.denominator?.unit),
                ...options,
            },
        ];
    };
