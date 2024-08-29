import { type MgoDateTime } from '../../../parse/type';
import { format } from '../../format';
import { type SingleValue, type UiFunction } from '../../types';

export const dateTime: UiFunction<MgoDateTime, SingleValue> = (label, value, options) => {
    return {
        label,
        type: 'date_time',
        display: format.dateTime(value),
        ...options,
    };
};
