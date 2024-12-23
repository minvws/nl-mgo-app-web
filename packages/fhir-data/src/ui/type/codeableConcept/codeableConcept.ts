import { type MgoCodeableConcept } from '../../../parse/type';
import { isNonNullish } from '../../../utils';
import {
    type FormatDisplayFunction,
    type MultipleGroupedValues,
    type MultipleValues,
    type UiFunction,
    type WithI18nContext,
} from '../../types';
import { codingDisplay } from '../coding/coding';

const codeableDisplay: WithI18nContext<FormatDisplayFunction<MgoCodeableConcept, string[]>> =
    (context) => (value) => {
        if (value?.text?.length) {
            return [value.text];
        }

        const coding = codingDisplay(context);
        return value?.coding.map(coding).filter(isNonNullish) ?? [];
    };

export const codeableConcept: WithI18nContext<
    UiFunction<MgoCodeableConcept | MgoCodeableConcept[], MultipleValues | MultipleGroupedValues>
> = (context) => (label, value, options) => {
    const { formatMessage } = context;
    const display = codeableDisplay(context);
    if (Array.isArray(value)) {
        return {
            label: formatMessage(label),
            type: 'MULTIPLE_GROUPED_VALUES',
            display: value.map(display),
            ...options,
        };
    }

    return {
        label: formatMessage(label),
        type: 'MULTIPLE_VALUES',
        display: display(value),
        ...options,
    };
};
