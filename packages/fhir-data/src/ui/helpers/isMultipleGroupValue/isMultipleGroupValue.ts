import {
    type MultipleGroupValue,
    type MultipleValue,
    type ReferenceValue,
    type SingleValue,
} from '../../types';

export function isMultipleGroupValue(
    value: SingleValue | MultipleValue | MultipleGroupValue | ReferenceValue
): value is MultipleGroupValue {
    return Array.isArray(value.display) && Array.isArray(value.display[0]);
}
