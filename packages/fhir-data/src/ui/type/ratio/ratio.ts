import { type MgoRatio } from '../../../parse/type';
import { changeDescriptionType } from '../../helpers';
import { type SingleValue, type UiFunction } from '../../types';
import { quantity } from '../quantity/quantity';

export const ratio: UiFunction<MgoRatio, SingleValue[]> = (label, value, options) => {
    return [
        ...quantity(`${label}.numerator`, value?.numerator, options).map((valueDescription) =>
            changeDescriptionType(valueDescription, 'quantity', 'ratio.numerator')
        ),
        ...quantity(`${label}.denominator`, value?.denominator, options).map((valueDescription) =>
            changeDescriptionType(valueDescription, 'quantity', 'ratio.denominator')
        ),
    ];
};
