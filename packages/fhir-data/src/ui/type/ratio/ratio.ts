import { type MgoRatio } from '../../../parse/type';
import { type SingleValue, type UiFunction } from '../../types';
import { quantity } from '../quantity/quantity';

export const ratio: UiFunction<MgoRatio, SingleValue[]> = (label, value, options) => {
    return [
        ...quantity(`${label}.numerator`, value?.numerator, options),
        ...quantity(`${label}.denominator`, value?.denominator, options),
    ];
};
