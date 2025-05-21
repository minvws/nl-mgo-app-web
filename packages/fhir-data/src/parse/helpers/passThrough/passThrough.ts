export function passThrough<T>(value: unknown) {
    return value as T;
}
