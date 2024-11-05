import { format } from '../../format';
import { type CombinedUiFunction, type SingleValue } from '../../types';

export const valueWithMax: CombinedUiFunction<number, number, SingleValue> = (
    label,
    value,
    max,
    options
) => {
    return {
        label,
        display: format.valueWithMaxValue(value, max),
        type: 'SINGLE_VALUE',
        ...options,
    };
};
