import { type MgoCodeableConcept } from '../../../parse/type';
import { type Nullable } from '../../../types/Nullable';
import { isNonNullish } from '../../../utils';
import {
    type MultipleGroupedValues,
    type MultipleValues,
    type UiFunction,
    type WithUiContext,
} from '../../types';
import { codingDisplay } from '../coding/coding';

function codeableDisplay(value: Nullable<MgoCodeableConcept>) {
    if (value?.text?.length) {
        return [value.text];
    }

    return value?.coding.map(codingDisplay).filter(isNonNullish) ?? [];
}

export const codeableConcept: WithUiContext<
    UiFunction<MgoCodeableConcept | MgoCodeableConcept[], MultipleValues | MultipleGroupedValues>
> =
    ({ intl }) =>
    (label, value, options) => {
        if (Array.isArray(value)) {
            return {
                label: intl.formatMessage({ id: label }),
                type: 'MULTIPLE_GROUPED_VALUES',
                display: value.map(codeableDisplay),
                ...options,
            };
        }

        return {
            label: intl.formatMessage({ id: label }),
            type: 'MULTIPLE_VALUES',
            display: codeableDisplay(value),
            ...options,
        };
    };
