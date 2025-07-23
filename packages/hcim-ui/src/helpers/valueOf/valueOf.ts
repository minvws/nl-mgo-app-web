import { isPrimitiveValueType, type PrimitiveValueType } from '@minvws/mgo-hcim-parse';
import { isNullish, type Nullable } from '@minvws/mgo-utils';

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
