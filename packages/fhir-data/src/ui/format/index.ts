import * as value from './value/value';
import * as date from './date/date';
import * as dateTime from './dateTime/dateTime';
import * as code from './code/code';

export const format = {
    ...value,
    ...date,
    ...dateTime,
    ...code,
};
