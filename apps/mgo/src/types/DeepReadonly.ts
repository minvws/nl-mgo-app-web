type DeepReadonlyObject<T> = {
    readonly [P in keyof T]: DeepReadonly<T[P]>;
};

interface DeepReadonlyArray<T> extends ReadonlyArray<DeepReadonly<T>> {}

/**
 * Make all properties in T readonly, including deeply nested properties
 *
 * @template T - The original type.
 *
 * @example
 * type X = {
 *    foo: string;
 *    bar: {
 *        baz: number;
 *    }
 * }
 *
 * DeepReadonly<X>;
 * // {
 * //    readonly foo: string;
 * //    readonly bar: {
 * //      readonly baz: number;
 * //    }
 * // }
 */
export type DeepReadonly<T> = T extends (infer R)[]
    ? DeepReadonlyArray<R>
    : T extends (...args: unknown[]) => unknown
      ? T
      : T extends object
        ? DeepReadonlyObject<T>
        : T;
