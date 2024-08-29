import { type MgoDate } from '../../../parse/type';
import { type Nullable } from '../../../types/Nullable';
import { isNullish } from '../../../utils';

export function date(value: Nullable<MgoDate>) {
    if (isNullish(value)) return;

    return `${value}`;
}
