import { isNullish } from '../isNullish/isNullish.js';

export function isNonNullish<T>(value?: T): value is NonNullable<typeof value> {
    return !isNullish(value);
}
