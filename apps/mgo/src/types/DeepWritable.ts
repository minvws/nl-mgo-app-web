/**
 * Make all readonly properties in T writable, including deeply nested properties
 *
 * @template T - The original type.
 * 
 * @example
 * type X = {
 *    readonly foo: string;
 *    readonly bar: {
 *        readonly baz: number;
 *    }
 * }
 *
 
 * DeepWriteable<X>; 
 * // {
 * //    foo: string;
 * //    bar: {
 * //       baz: number;
 * //    }
 * // }
 */
export type DeepWriteable<T> = { -readonly [P in keyof T]: DeepWriteable<T[P]> };
