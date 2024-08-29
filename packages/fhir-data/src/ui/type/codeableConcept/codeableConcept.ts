import { type MgoCodeableConcept } from '../../../parse/type';
import { changeDescriptionType, multipleValue } from '../../helpers';
import { type MultipleValue, type UiFunction } from '../../types';
import { coding } from '../coding/coding';

export const codeableConcept: UiFunction<MgoCodeableConcept, MultipleValue> = (
    label,
    value,
    options
) => {
    return changeDescriptionType(
        multipleValue(label, value, coding, options),
        'coding',
        'codable_concept'
    );
};
