import { type MgoDateTime } from '../../../parse/type';
import { type Nullable } from '../../../types/Nullable';
import { isNullish } from '../../../utils';

export function dateTime(value: Nullable<MgoDateTime>) {
    if (isNullish(value)) return;

    return `${value}`;
}
