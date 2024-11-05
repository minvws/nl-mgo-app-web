import { type MgoCodeableConcept } from '../../../parse/type';
import { multipleValues } from '../../special';
import { type MultipleValues, type UiFunction } from '../../types';
import { coding } from '../coding/coding';

export const codeableConcept: UiFunction<MgoCodeableConcept, MultipleValues> = (
    label,
    value,
    options
) => {
    return multipleValues(label, value, coding, options);
};
