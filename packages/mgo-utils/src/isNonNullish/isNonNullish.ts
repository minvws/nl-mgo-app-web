import { isNullish } from '../isNullish/isNullish';

export function isNonNullish<T>(value?: T): value is NonNullable<typeof value> {
    return !isNullish(value);
}
