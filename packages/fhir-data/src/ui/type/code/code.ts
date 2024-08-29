import { type MgoCode } from '../../../parse/type';
import { toString } from '../../helpers';
import { type SingleValue, type UiFunction } from '../../types';

export const code: UiFunction<MgoCode, SingleValue> = (label, value, options) => {
    return {
        label,
        type: 'code',
        display: toString(value),
        ...options,
    };
};
