import { isNullish } from '../../../utils';

export function replaceUndefined<T>(value: T) {
    if (isNullish(value)) return null;
    return value as NonNullable<T>;
}
