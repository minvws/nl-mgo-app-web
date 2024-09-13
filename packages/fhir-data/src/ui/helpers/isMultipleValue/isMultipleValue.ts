import {
    type MultipleGroupValue,
    type MultipleValue,
    type ReferenceValue,
    type SingleValue,
} from '../../types';

export function isMultipleValue(
    value: SingleValue | MultipleValue | MultipleGroupValue | ReferenceValue
): value is MultipleValue {
    return Array.isArray(value.display) && !Array.isArray(value.display[0]);
}
