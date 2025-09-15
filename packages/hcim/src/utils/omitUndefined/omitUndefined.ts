/**
 * Omits all undefined values from an object.
 * @example
 * ```ts
 * omitUndefined({ a: 1, b: undefined, c: 3 }) // { a: 1, c: 3 }
 * ```
 */
export function omitUndefined<T extends Record<string, unknown>>(value: T): Partial<T> {
    return Object.fromEntries(
        Object.entries(value).filter(([_, propValue]) => propValue !== undefined)
    ) as Partial<T>;
}
