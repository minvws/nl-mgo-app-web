import { type MgoDate } from '../../../parse/type';
import { format } from '../../format';
import { type SingleValue, type UiFunction } from '../../types';

export const date: UiFunction<MgoDate, SingleValue> = (label, value, options) => {
    return {
        label,
        type: 'date',
        display: format.date(value),
        ...options,
    };
};
