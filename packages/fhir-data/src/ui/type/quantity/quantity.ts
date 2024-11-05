import { type MgoQuantity } from '../../../parse/type';
import { format } from '../../format';
import { type SingleValue, type UiFunction } from '../../types';

export const quantity: UiFunction<MgoQuantity, SingleValue[]> = (label, value, options) => {
    const { value: quantityValue, unit, code, system } = value ?? {};

    return [
        {
            label: `${label}.value`,
            type: `SINGLE_VALUE`,
            display: format.valueWithUnit(quantityValue, unit),
            ...options,
        },
        {
            label: `${label}.code`,
            type: `SINGLE_VALUE`,
            display: format.codeWithSystem(code, system),
            ...options,
        },
    ];
};

export const simpleQuantity: UiFunction<MgoQuantity, SingleValue> = (label, value, options) => {
    const { value: quantityValue, unit } = value ?? {};

    return {
        label: label,
        type: `SINGLE_VALUE`,
        display: format.valueWithUnit(quantityValue, unit),
        ...options,
    };
};
