import {
    type MultipleGroupValue,
    type MultipleValue,
    type ReferenceValue,
    type SingleValue,
} from '../../types';

export function isReferenceValue(
    value: SingleValue | MultipleValue | MultipleGroupValue | ReferenceValue
): value is ReferenceValue {
    return (
        (typeof value.display === 'undefined' || typeof value.display === 'string') &&
        Object.prototype.hasOwnProperty.call(value, 'reference')
    );
}
