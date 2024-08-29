import { type MgoRange } from '../../../parse/type';
import { changeDescriptionType } from '../../helpers';
import { type SingleValue, type UiFunction } from '../../types';
import { quantity } from '../quantity/quantity';

export const range: UiFunction<MgoRange, SingleValue[]> = (label, value, options) => {
    return [
        ...quantity(`${label}.low`, value?.low, options).map((valueDescription) =>
            changeDescriptionType(valueDescription, 'quantity', 'range.low')
        ),
        ...quantity(`${label}.high`, value?.high, options).map((valueDescription) =>
            changeDescriptionType(valueDescription, 'quantity', 'range.high')
        ),
    ];
};
