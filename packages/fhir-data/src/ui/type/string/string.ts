import { type MgoString } from '../../../parse/type';
import { toString } from '../../helpers';
import { type SingleValue, type UiFunction } from '../../types';

export const string: UiFunction<MgoString, SingleValue> = (label, value, options) => {
    return {
        label,
        type: 'SINGLE_VALUE',
        display: toString(value),
        ...options,
    };
};
