import { isNullish, type Nullable } from '@minvws/mgo-mgo-utils';
import { isPrimitiveValueType, type PrimitiveValueType } from '../../../parse/types';

export function valueOf<T extends string, V>(
    value: Nullable<V | PrimitiveValueType<T, V>>
): V | undefined {
    if (isNullish(value)) {
        return;
    }

    if (isPrimitiveValueType<T>(value)) {
        return value.value;
    }

    return value;
}
