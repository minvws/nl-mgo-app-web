import { type MgoDateTime } from '../../../parse/type';
import { type Nullable } from '../../../types/Nullable';
import { isNullish } from '../../../utils';

const milliseconds = /T\d\d:\d\d:\d\d\.\d+/i;
const seconds = /T\d\d:\d\d:\d\d/i;
const minutes = /T\d\d:\d\d/i;
const hours = /T\d\d/i;
const date = /^\d\d\d\d-\d\d-\d\d/;
const month = /^\d\d\d\d-\d\d/;
const year = /^\d\d\d\d/;
const timezone = /(([+-][\d:]+)|Z)$/i;

function getDateFormatOptions(dateString: string): Intl.DateTimeFormatOptions {
    const hasMilliseconds = milliseconds.test(dateString);
    const hasSeconds = hasMilliseconds || seconds.test(dateString);
    const hasMinutes = hasSeconds || minutes.test(dateString);
    const hasHours = hasMinutes || hours.test(dateString);
    const hasDate = date.test(dateString);
    const hasMonth = hasDate || month.test(dateString);
    const hasYear = hasMonth || year.test(dateString);
    const hasTimezone = hasHours && timezone.test(dateString);

    return {
        year: hasYear ? 'numeric' : undefined,
        month: hasMonth ? 'long' : undefined,
        day: hasDate ? 'numeric' : undefined,
        hour: hasHours ? 'numeric' : undefined,
        minute: hasMinutes ? 'numeric' : undefined,
        second: hasSeconds ? 'numeric' : undefined,
        fractionalSecondDigits: hasMilliseconds ? 3 : undefined,
        timeZoneName: hasTimezone ? 'shortOffset' : undefined,
    };
}

export function dateTime(value: Nullable<MgoDateTime>) {
    if (isNullish(value)) return;

    const date = new Date(value);
    const dateTimeFormat = new Intl.DateTimeFormat('nl-NL', getDateFormatOptions(value));

    try {
        return dateTimeFormat.format(date);
    } catch (_error: unknown) {
        return `${value}`;
    }
}
