import { isNullish, type Nullable } from '@minvws/mgo-utils';
import { type LosslessNumber } from 'lossless-json';

export function numberToString(value: Nullable<number | LosslessNumber>) {
    if (isNullish(value)) return;
    return value.toString();
}
