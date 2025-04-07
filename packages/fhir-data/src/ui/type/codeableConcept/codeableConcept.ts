import { type MgoCodeableConcept } from '../../../parse/type';
import { isNonNullish } from '../../../utils';
import { system } from '../../format/system/system';
import {
    type FormatDisplayFunction,
    type MultipleGroupedValues,
    type MultipleValues,
    type UiFunction,
    type WithUiHelperContext,
} from '../../types';

const codeableDisplay: WithUiHelperContext<FormatDisplayFunction<MgoCodeableConcept, string[]>> =
    (context) => (value) => {
        if (value?.text?.length) {
            return [value.text];
        }

        const formatSystem = system(context);
        return value?.coding.map(formatSystem).filter(isNonNullish) ?? [];
    };

export const codeableConcept: WithUiHelperContext<
    UiFunction<MgoCodeableConcept | MgoCodeableConcept[], MultipleValues | MultipleGroupedValues>
> = (context) => (label, value) => {
    const { formatLabel } = context;
    const display = codeableDisplay(context);

    if (Array.isArray(value)) {
        return {
            label: formatLabel(label, value),
            type: 'MULTIPLE_GROUPED_VALUES',
            display: value.map(display),
        };
    }

    return {
        label: formatLabel(label, value),
        type: 'MULTIPLE_VALUES',
        display: display(value),
    };
};
