type LiteralToCollectiveType<T> = T extends number
    ? number
    : T extends string
      ? string
      : T extends boolean
        ? boolean
        : T extends symbol
          ? symbol
          : T;

type LiteralToCollectiveObject<T extends object> = {
    -readonly [K in keyof T]: T[K] extends object
        ? LiteralToCollectiveObject<T[K]>
        : LiteralToCollectiveType<T[K]>;
};

/**
 * Convert a literal type to a collective type, also removes any readonly modifiers
 * This is particularly useful when you want to use a literal type (e.g. an `as const` value) as a prop type.
 *
 * @template T - The original type.
 *
 * @example
 * type X = {
 *    readonly foo: 'foo';
 *    bar: 42;
 *    baz: true;
 * }
 *
 * LiteralToCollective<X>;
 * // {
 * //    foo: string;
 * //    bar: number;
 * //    baz: boolean;
 * // }
 */
export type LiteralToCollective<T> = T extends object
    ? LiteralToCollectiveObject<T>
    : LiteralToCollectiveType<T>;
