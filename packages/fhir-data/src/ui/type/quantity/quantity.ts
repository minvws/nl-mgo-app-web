import { type MgoQuantity } from '../../../parse/type';
import { format } from '../../format';
import { type SingleValue, type UiFunction } from '../../types';

export const quantity: UiFunction<MgoQuantity, SingleValue[]> = (label, value, options) => {
    const { value: quantityValue, unit, code, system } = value ?? {};

    return [
        {
            label: `${label}.value`,
            type: `quantity.value`,
            display: format.valueWithUnit(quantityValue, unit),
            ...options,
        },
        {
            label: `${label}.code`,
            type: `quantity.code`,
            display: format.codeWithSystem(code, system),
            ...options,
        },
    ];
};
