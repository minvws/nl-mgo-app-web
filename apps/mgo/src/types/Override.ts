type FinalType<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

/**
 * Override properties in T with properties in U
 *
 * @template T - The original type.
 * @template U - The type containing the properties to override.
 *
 * @example
 * type X = {
 *    foo: string;
 *    bar: number;
 * }
 *
 * Override<X, { foo: boolean }>;
 * // {
 * //    foo: boolean;
 * //    bar: number;
 * // }
 */
export type Override<T, U extends Partial<Record<keyof T, unknown>>> = FinalType<
    Omit<T, keyof U> & U
>;
