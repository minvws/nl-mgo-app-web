import { type MgoDuration } from '../../../parse/type';
import { changeDescriptionType } from '../../helpers';
import { type SingleValue, type UiFunction } from '../../types';
import { quantity } from '../quantity/quantity';

export const duration: UiFunction<MgoDuration, SingleValue[]> = (label, value, options) => {
    const values = quantity(label, value, options);
    return values.map((valueDescription) =>
        changeDescriptionType(valueDescription, 'quantity', 'duration')
    );
};
