export type SafeGetFunc<T, R = any> = (obj: T) => R; // eslint-disable-line @typescript-eslint/no-explicit-any

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
) {
    try {
        const result: R = getFunction(object!);
        return result === undefined ? defaultValue : result;
    } catch (error) {
        if (error instanceof TypeError) {
            return defaultValue;
        }
        throw error;
    }
}
