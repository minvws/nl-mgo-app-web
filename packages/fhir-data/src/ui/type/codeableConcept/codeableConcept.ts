import { type MgoCodeableConcept } from '../../../parse/type';
import { multipleValues } from '../../special/multipleValues/multipleValues';
import { type MultipleValues, type UiFunction } from '../../types';
import { coding } from '../coding/coding';

export const codeableConcept: UiFunction<MgoCodeableConcept, MultipleValues> = (
    label,
    value,
    options
) => {
    if (value?.text?.length) {
        return {
            label,
            type: 'MULTIPLE_VALUES',
            display: [value.text],
            ...options,
        };
    }

    return multipleValues(label, value?.coding, coding, options);
};
