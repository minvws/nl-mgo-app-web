import { isNonNullish } from '@minvws/mgo-utils';
import * as typeParsers from './type';

export type ExtensionValue<T extends object> = T & {
    _ext: boolean;
};

export interface ValueType<T extends string = string> {
    _type: T;
}

export interface PrimitiveValueType<T extends string = string, V = unknown> {
    _type: T;
    value: V;
}

export function isExtensionValue<T extends Record<string, unknown>>(
    value: unknown
): value is ExtensionValue<T> {
    return (
        isNonNullish(value) &&
        typeof value === 'object' &&
        (value as ExtensionValue<T>)['_ext'] === true
    );
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
    return isValueType(value) && Object.prototype.hasOwnProperty.call(value, 'value');
}

type TypeParsers = typeof typeParsers;
type MgoTypes = NonNullable<ReturnType<TypeParsers[keyof TypeParsers]>>;

export type MgoTypeId = NonNullable<MgoTypes['_type']>;
export type MgoType<T extends MgoTypeId | '' = ''> = T extends MgoTypeId
    ? Extract<MgoTypes, { _type: T }>
    : MgoTypes;

// Ensures parsers are listed with their id
typeParsers satisfies Record<MgoTypeId, (...args: any[]) => any>; // eslint-disable-line @typescript-eslint/no-explicit-any
