import { format } from '../../format';
import { type CombinedUiFunction, type SingleValue, type WithUiHelperContext } from '../../types';

export const valueWithMax: WithUiHelperContext<CombinedUiFunction<number, number, SingleValue>> =
    ({ formatLabel }) =>
    (label, value, max) => {
        return {
            label: formatLabel(label, value),
            display: format.valueWithMaxValue(value, max),
            type: 'SINGLE_VALUE',
        };
    };
