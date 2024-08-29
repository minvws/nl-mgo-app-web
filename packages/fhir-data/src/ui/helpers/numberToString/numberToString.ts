import { isNullish } from '../../../utils';
import { type Nullable } from '../../../types/Nullable';
import { type LosslessNumber } from 'lossless-json';

export function numberToString(value: Nullable<number | LosslessNumber>) {
    if (isNullish(value)) return;
    return value.toString();
}
