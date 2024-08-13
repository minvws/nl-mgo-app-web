import { type DateString, type DateTimeString } from '../../../fhir';
import { isNullish } from '../../../utils';
import { type Nullable } from '../../../types/Nullable';

export function dateTime(value: Nullable<DateTimeString>) {
    if (isNullish(value)) return null;

    return `${value}`;
}

// eslint-disable-next-line sonarjs/no-identical-functions
export function date(value: Nullable<DateString>) {
    if (isNullish(value)) return null;

    return `${value}`;
}
