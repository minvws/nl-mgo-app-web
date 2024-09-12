import { type MgoCodeableConcept } from '../../../parse/type';
import { type MultipleValue, type UiFunction } from '../../types';
import { changeDescriptionType } from '../../helpers';
import { multipleValue } from '../../special';
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
