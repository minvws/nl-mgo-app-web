import { type MgoDate } from '../../../parse/type';
import { type Nullable } from '../../../types/Nullable';
import { dateTime } from '../dateTime/dateTime';

export function date(value: Nullable<MgoDate>) {
    return dateTime(value);
}
