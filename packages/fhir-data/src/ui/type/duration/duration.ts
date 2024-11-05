import { type MgoDuration } from '../../../parse/type';
import { type SingleValue, type UiFunction } from '../../types';
import { quantity } from '../quantity/quantity';

export const duration: UiFunction<MgoDuration, SingleValue[]> = (label, value, options) => {
    return quantity(label, value, options);
};
