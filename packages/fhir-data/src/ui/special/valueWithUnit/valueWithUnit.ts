import { format } from '../../format';
import { type CombinedUiFunction, type SingleValue } from '../../types';

export const valueWithUnit: CombinedUiFunction<number, string, SingleValue> = (
    label,
    value,
    unit,
    options
) => {
    return {
        label,
        display: format.valueWithUnit(value, unit),
        type: 'valueWithUnit',
        ...options,
    };
};
