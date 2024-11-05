import { type MgoDate } from '../../../parse/type';
import { format } from '../../format';
import { type SingleValue, type UiFunction } from '../../types';

export const date: UiFunction<MgoDate, SingleValue> = (label, value, options) => {
    return {
        label,
        type: 'SINGLE_VALUE',
        display: format.date(value),
        ...options,
    };
};
