import { type Nullable } from '../../types/Nullable';
import { isNonNullish } from '../isNonNullish/isNonNullish';

/**
 * Creates an array of values by running each element in collection thru iteratee.
 * It can return null if the collection is empty or undefined.
 * The resulting array will NOT contain any undefined or null values.
 * @example
 * const iteratee = (x: string | null | undefined) => x;
 * map(undefined, iteratee); // => null
 * map([], iteratee); // => null
 * map(['foo', 'bar'], iteratee); // => ['foo', 'bar']
 * map(['foo', undefined, 'bar', null, undefined], iteratee); // => ['foo', 'bar']
 */
export function map<Items extends unknown[], Iteratee extends (arg: Items[number]) => unknown>(
    items: Nullable<Items>,
    iteratee: Iteratee
) {
    if (!items?.length) return;
    return (items.map(iteratee) as ReturnType<Iteratee>[]).filter(isNonNullish);
}
