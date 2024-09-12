import { type MgoInteger } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { type SingleValue, type UiFunction } from '../../types';

export const integer: UiFunction<MgoInteger, SingleValue> = (label, value, options) => {
    return {
        label,
        type: 'integer',
        display: numberToString(value),
        ...options,
    };
};
