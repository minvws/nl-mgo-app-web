import { type MgoBoolean } from '../../../parse/type';
import { toString } from '../../helpers';
import { type SingleValue, type UiFunction } from '../../types';

export const boolean: UiFunction<MgoBoolean, SingleValue> = (label, value, options) => {
    return {
        label,
        type: 'boolean',
        display: toString(value),
        ...options,
    };
};
