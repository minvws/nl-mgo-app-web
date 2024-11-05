import { type MgoDecimal } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { type SingleValue, type UiFunction } from '../../types';

export const decimal: UiFunction<MgoDecimal, SingleValue> = (label, value, options) => {
    return {
        label,
        type: 'SINGLE_VALUE',
        display: numberToString(value),
        ...options,
    };
};
