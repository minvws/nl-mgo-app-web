import { isNullish } from '../../../utils';
import { type Nullable } from '../../../types/Nullable';

export function toString<T extends string | boolean>(value?: Nullable<T>) {
    if (isNullish(value)) return;
    return `${value}`;
}
