import { type Nullable } from '../../types/Nullable';
import { isNonNullish } from '../isNonNullish/isNonNullish';

/**
 * Creates an array of values by running each element in collection thru iteratee.
 * If the collection is empty or undefined it will return undefined, unless the `returnEmpty` parameter is set to true.
 * The resulting array will NOT contain any undefined or null values.
 * @example
 * const iteratee = (x: string | null | undefined) => x;
 * map(undefined, iteratee); // => undefined
 * map(undefined, iteratee, true); // => []
 * map([], iteratee); // => undefined
 * map(['foo', 'bar'], iteratee); // => ['foo', 'bar']
 * map(['foo', undefined, 'bar', null, undefined], iteratee); // => ['foo', 'bar']
 */
export function map<Items extends unknown[], Iteratee extends (arg: Items[number]) => unknown>(
    items: Nullable<Items>,
    iteratee: Iteratee,
    returnEmpty: true
): NonNullable<ReturnType<Iteratee>>[];
export function map<Items extends unknown[], Iteratee extends (arg: Items[number]) => unknown>(
    items: Nullable<Items>,
    iteratee: Iteratee,
    returnEmpty?: false
): NonNullable<ReturnType<Iteratee>>[] | undefined;
export function map<Items extends unknown[], Iteratee extends (arg: Items[number]) => unknown>(
    items: Nullable<Items>,
    iteratee: Iteratee,
    returnEmpty: boolean = false
) {
    if (!items?.length) {
        return returnEmpty ? [] : undefined;
    }
    return items.map(iteratee).filter(isNonNullish);
}
