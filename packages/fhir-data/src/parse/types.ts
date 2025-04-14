import { isNonNullish } from '@minvws/mgo-mgo-utils';

export interface ValueType<T extends string = string> {
    _type: T;
}

export interface PrimitiveValueType<T extends string = string, V = unknown> {
    _type: T;
    value: V;
}

export function isValueType<T extends string>(value: unknown): value is ValueType<T> {
    return (
        isNonNullish(value) &&
        typeof value === 'object' &&
        typeof (value as ValueType<T>)['_type'] === 'string'
    );
}

export function isPrimitiveValueType<T extends string>(
    value: unknown
): value is PrimitiveValueType<T, unknown> {
    return (
        isNonNullish(value) &&
        typeof value === 'object' &&
        typeof (value as PrimitiveValueType<T, unknown>)['_type'] === 'string' &&
        Object.prototype.hasOwnProperty.call(value, 'value')
    );
}
