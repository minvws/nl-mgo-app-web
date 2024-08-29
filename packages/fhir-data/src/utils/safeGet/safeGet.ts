import type { RequiredDeep } from 'type-fest';

export type SafeGetFunc<T, R = any> = (obj: RequiredDeep<T>) => R | undefined; // eslint-disable-line @typescript-eslint/no-explicit-any

/**
 * Safely get a value from an object, returning a default value if the value is undefined or the object is undefined.
 * This function is useful for safely accessing deeply nested properties of an object.
 * It is similar to lodash's `get` function, but with a type-safe API.
 * It will swallow any caused TypeErrors and return the default value instead.
 *
 * @example
 *
 * type MyType = { a?: { b?: { c?: string } } };
 * const myObject: MyType = undefined;
 *
 * const c = safeGet(myObject, (x) => x.a!.b!.c, 'default'); // returns "default"
 */
export function safeGet<T, R>(object: T | undefined, getFunction: SafeGetFunc<T, R>): R | undefined;
export function safeGet<T, R>(
    object: T | undefined,
    getFunction: SafeGetFunc<T, R>,
    defaultValue: R
): R;
export function safeGet<T, R>(
    object: T | undefined,
    getFunction: SafeGetFunc<T, R>,
    defaultValue?: R
): R | undefined {
    try {
        // const result: R = getFunction(object as RequiredDeep<T>);
        const result = getFunction(object as RequiredDeep<T>);
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        return result === undefined ? defaultValue : result;
    } catch (error) {
        if (error instanceof TypeError) {
            return defaultValue;
        }
        throw error;
    }
}
