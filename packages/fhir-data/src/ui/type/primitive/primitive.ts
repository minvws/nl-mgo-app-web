import { type MgoCode, type MgoBoolean, type MgoDate, type MgoDateTime } from '../../../parse/type';
import { type Nullable } from '../../../types/Nullable';
import { format } from '../../format';
import { changeDescriptionType, toString } from '../../helpers';
import { type ValueOptions, type ValueDescription } from '../../types';

export function date(label: string, value: Nullable<MgoDate>, options?: ValueOptions) {
    return {
        label,
        type: 'date',
        display: format.date(value),
        ...options,
    } satisfies ValueDescription;
}

export function dateTime(label: string, value: Nullable<MgoDateTime>, options?: ValueOptions) {
    return {
        label,
        type: 'date_time',
        display: format.dateTime(value),
        ...options,
    } satisfies ValueDescription;
}

function toStringField<T extends string | boolean>(
    label: string,
    value: Nullable<T>,
    options?: ValueOptions
) {
    return {
        label,
        type: 'string',
        display: toString(value),
        ...options,
    } satisfies ValueDescription;
}

export function boolean(label: string, value: Nullable<MgoBoolean>, options?: ValueOptions) {
    return changeDescriptionType(toStringField(label, value, options), 'string', 'boolean');
}

export function code(label: string, value: Nullable<MgoCode>, options?: ValueOptions) {
    return changeDescriptionType(toStringField(label, value, options), 'string', 'code');
}
