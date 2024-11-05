import { type MgoRange } from '../../../parse/type';
import { type SingleValue, type UiFunction } from '../../types';
import { quantity } from '../quantity/quantity';

export const range: UiFunction<MgoRange, SingleValue[]> = (label, value, options) => {
    return [
        ...quantity(`${label}.low`, value?.low, options),
        ...quantity(`${label}.high`, value?.high, options),
    ];
};
