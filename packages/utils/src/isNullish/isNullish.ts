export type Nullish<T> = Extract<T, undefined | null>;

export function isNullish<T>(value: T): value is Nullish<T> {
    return value === undefined || value === null;
}
