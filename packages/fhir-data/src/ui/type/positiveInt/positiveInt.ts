import { type MgoPositiveInt } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { type SingleValue, type UiFunction } from '../../types';

export const positiveInt: UiFunction<MgoPositiveInt, SingleValue> = (label, value, options) => {
    return {
        label,
        type: 'positiveInt',
        display: numberToString(value),
        ...options,
    };
};
