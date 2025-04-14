/* eslint-disable @typescript-eslint/ban-types */

import { isNonNullish, type Nullable } from '@minvws/mgo-mgo-utils';

/**
 * Creates an array of values by running each element in collection thru iteratee.
 * If the collection is empty or undefined it will return undefined, unless the `returnEmpty` parameter is set to true.
 * The resulting array will NOT contain any undefined or null values.
 *
 * NOTE:
 * The return type uses `& {}` which is the same as using `NonNullable<T>`.
 * However having the return type wrapped inside another generic type doesn't
 * translate well when exporting the types to the json schema as it loses the
 * reference to the original type.
 *
 * @example
 * const iteratee = (x: string | null | undefined) => x;
 * map(undefined, iteratee); // => undefined
 * map(undefined, iteratee, true); // => []
 * map([], iteratee); // => undefined
 * map(['foo', 'bar'], iteratee); // => ['foo', 'bar']
 * map(['foo', undefined, 'bar', null, undefined], iteratee); // => ['foo', 'bar']
 */
export function map<
    Items extends unknown[],
    Iteratee extends (arg: Items[number], key: number) => unknown,
    T = ReturnType<Iteratee> & {}, // NOSONAR
>(items: Nullable<Items>, iteratee: Iteratee, returnEmpty: true): T[];
export function map<
    Items extends unknown[],
    Iteratee extends (arg: Items[number], key: number) => unknown,
    T = ReturnType<Iteratee> & {}, // NOSONAR
>(items: Nullable<Items>, iteratee: Iteratee, returnEmpty?: false): T[] | undefined;
export function map<
    Items extends unknown[],
    Iteratee extends (arg: Items[number], key: number) => unknown,
    T = ReturnType<Iteratee> & {}, // NOSONAR
>(items: Nullable<Items>, iteratee: Iteratee, returnEmpty: boolean = false) {
    if (!items?.length) {
        return returnEmpty ? ([] as T[]) : undefined;
    }

    return items.map(iteratee).filter(isNonNullish) as T[];
}
