import {
    type DateString,
    type DateTimeString,
    type InstantDateTimeString,
} from '@minvws/mgo-fhir-types';
import { isNullish } from '@minvws/mgo-utils';
import { type FormatFunction, type WithUiHelperContext } from '../../types';

const milliseconds = /T\d\d:\d\d:\d\d\.\d+/i;
const seconds = /T\d\d:\d\d:\d\d/i;
const minutes = /T\d\d:\d\d/i;
const hours = /T\d\d/i;
const dateRegexp = /^\d\d\d\d-\d\d-\d\d/;
const month = /^\d\d\d\d-\d\d/;
const year = /^\d\d\d\d/;
const timezone = /(([+-][\d:]+)|Z)$/i;

function getDateFormatOptions(dateString: string, isSummary = false): Intl.DateTimeFormatOptions {
    const hasMilliseconds = milliseconds.test(dateString);
    const hasSeconds = hasMilliseconds || seconds.test(dateString);
    const hasMinutes = hasSeconds || minutes.test(dateString);
    const hasHours = hasMinutes || hours.test(dateString);
    const hasDate = dateRegexp.test(dateString);
    const hasMonth = hasDate || month.test(dateString);
    const hasYear = hasMonth || year.test(dateString);
    const hasTimezone = hasHours && timezone.test(dateString);

    return {
        year: hasYear ? 'numeric' : undefined,
        month: hasMonth ? 'long' : undefined,
        day: hasDate ? 'numeric' : undefined,
        hour: hasHours ? 'numeric' : undefined,
        minute: hasMinutes ? 'numeric' : undefined,
        ...(!isSummary && {
            second: hasSeconds ? 'numeric' : undefined,
            fractionalSecondDigits: hasMilliseconds ? 3 : undefined,
            timeZoneName: hasTimezone ? 'shortOffset' : undefined,
        }),
    };
}

export const date: WithUiHelperContext<
    FormatFunction<DateString | DateTimeString | InstantDateTimeString>
> =
    ({ intl: { locale }, isSummary }) =>
    (value) => {
        if (isNullish(value)) return;

        const date = new Date(value);
        const dateTimeFormat = new Intl.DateTimeFormat(
            locale,
            getDateFormatOptions(value, isSummary)
        );

        try {
            return dateTimeFormat.format(date);
            // eslint-disable-next-line sonarjs/no-ignored-exceptions
        } catch (_error: unknown) {
            return `${value}`;
        }
    };
