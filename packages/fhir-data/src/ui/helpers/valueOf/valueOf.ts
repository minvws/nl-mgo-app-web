import { type PrimitiveValueType } from '../../../parse/types';
import { type Nullable } from '../../../types/Nullable';
import { isNullish } from '../../../utils';

function isPrimitiveValue<T>(
    value: Nullable<T | PrimitiveValueType<string, T>>
): value is PrimitiveValueType<string, T> {
    return (
        typeof (value as PrimitiveValueType<string, T>)['_type'] === 'string' &&
        Object.prototype.hasOwnProperty.call(value, 'value')
    );
}

export function valueOf<T>(value: Nullable<T | PrimitiveValueType<string, T>>): T | undefined {
    if (isNullish(value)) {
        return;
    }

    if (isPrimitiveValue<T>(value)) {
        return value.value;
    }

    return value;
}
