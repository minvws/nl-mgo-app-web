import { type MgoAnnotation } from '../../../parse/type';
import { type SingleValue, type UiFunction } from '../../types';

export const annotation: UiFunction<MgoAnnotation, SingleValue> = (label, value, options) => {
    return {
        label,
        display: value?.text,
        type: 'SINGLE_VALUE',
        ...options,
    };
};
