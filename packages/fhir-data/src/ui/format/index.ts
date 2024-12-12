import * as value from './value/value';
import * as date from './date/date';
import * as dateTime from './dateTime/dateTime';

export const format = {
    ...value,
    ...date,
    ...dateTime,
};
