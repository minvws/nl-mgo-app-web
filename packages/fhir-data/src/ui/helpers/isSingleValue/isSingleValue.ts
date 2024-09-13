import {
    type MultipleGroupValue,
    type MultipleValue,
    type ReferenceValue,
    type SingleValue,
} from '../../types';
import { isReferenceValue } from '../isReferenceValue/isReferenceValue';

export function isSingleValue(
    value: SingleValue | MultipleValue | MultipleGroupValue | ReferenceValue
): value is SingleValue {
    return (
        (typeof value.display === 'undefined' || typeof value.display === 'string') &&
        !isReferenceValue(value)
    );
}
