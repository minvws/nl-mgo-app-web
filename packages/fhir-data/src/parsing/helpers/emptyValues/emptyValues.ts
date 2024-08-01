import { type OptionalKeysOf } from 'type-fest';
import { EMPTY_VALUE } from '../../type';

type ReplaceUndefinedWithType<T extends object, R = typeof EMPTY_VALUE> = {
    [P in keyof T]-?: P extends OptionalKeysOf<T>
        ? Exclude<T[P], undefined> | R
        : T[P] extends undefined
          ? Exclude<T[P], undefined> | R
          : T[P];
};

/**
 * Replace all values that are `undefined` with the EMPTY_VALUE (null) value.
 * We do this to ensure that the FHIR data is always consistent also when compared to the data used in the mobile apps.
 *
 * @example
 * const value = { a: 1, b: undefined, c: 3 };
 * const result = setEmptyValues(value);
 * // result = { a: 1, b: null, c: 3 }
 */
export function setEmptyValues<T extends object>(value: T) {
    return Object.fromEntries(
        Object.entries(value).map(([key, value]) => [
            key,
            value === undefined ? EMPTY_VALUE : value,
        ])
    ) as ReplaceUndefinedWithType<T, typeof EMPTY_VALUE>;
}
