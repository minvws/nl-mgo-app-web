// type DeepReplaceUndefined<T, Replacement> = T extends undefined
//     ? Exclude<T, undefined> | Replacement
//     : T extends object
//       ? DeepReplaceUndefinedInObject<T, Replacement>

import { isLosslessNumber, type LosslessNumber } from 'lossless-json';

//       : T;
type DeepReplaceUndefined<T, Replacement> = T extends undefined
    ? Exclude<T, undefined> | Replacement
    : T extends LosslessNumber
      ? T
      : T extends object
        ? DeepReplaceUndefinedInObject<T, Replacement>
        : T;

type DeepReplaceUndefinedInObject<T extends object, Replacement> = {
    [key in keyof T]-?: T[key] extends object
        ? DeepReplaceUndefinedInObject<T[key], Replacement>
        : T[key] extends (infer U)[]
          ? DeepReplaceUndefined<U, Replacement>[]
          : DeepReplaceUndefined<T[key], Replacement>;
};

const EMPTY_VALUE = null;

export type DeepReplacedUndefined<T> = DeepReplaceUndefined<T, typeof EMPTY_VALUE>;

/**
 * Replace all values that are `undefined` with the EMPTY_VALUE (null) value.
 * We do this so to keep the output JSON clean and consistent.
 *
 * @example
 * const value = { a: 1, b: undefined, c: 3 };
 * const result = deepReplaceUndefined(value);
 * // result = { a: 1, b: null, c: 3 }
 */
export function deepReplaceUndefined<T>(value: T): DeepReplaceUndefined<T, typeof EMPTY_VALUE> {
    if (value === undefined || value === null) {
        return EMPTY_VALUE as DeepReplaceUndefined<T, typeof EMPTY_VALUE>;
    }

    if (Array.isArray(value)) {
        return value.map(deepReplaceUndefined) as DeepReplaceUndefined<T, typeof EMPTY_VALUE>;
    }

    if (typeof value === 'object' && !isLosslessNumber(value)) {
        return Object.fromEntries(
            Object.entries(value).map(([key, value]) => [key, deepReplaceUndefined(value)])
        ) as DeepReplaceUndefined<T, typeof EMPTY_VALUE>;
    }

    return value as DeepReplaceUndefined<T, typeof EMPTY_VALUE>;
}
