import { isNullish } from '../../../utils';
import { type Nullable } from '../../../types/Nullable';

export type MgoCode<T extends string = string> = T;

export function code<T extends string>(value: Nullable<T>): MgoCode<T> | undefined {
    if (isNullish(value)) return;
    return value;
}
