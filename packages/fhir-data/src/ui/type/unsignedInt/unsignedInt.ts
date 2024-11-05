import { type MgoUnsignedInt } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { type SingleValue, type UiFunction } from '../../types';

export const unsignedInt: UiFunction<MgoUnsignedInt, SingleValue> = (label, value, options) => {
    return {
        label,
        type: 'SINGLE_VALUE',
        display: numberToString(value),
        ...options,
    };
};
