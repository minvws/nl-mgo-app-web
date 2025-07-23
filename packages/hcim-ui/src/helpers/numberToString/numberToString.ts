import { isNullish, type LosslessNumber, type Nullable } from '@minvws/mgo-utils';

export function numberToString(value: Nullable<number | LosslessNumber>) {
    if (isNullish(value)) return;
    return value.toString();
}
