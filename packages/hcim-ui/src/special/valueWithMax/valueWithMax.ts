import { format } from '../../format';
import { type CombinedUiFunction, type SingleValue, type WithUiContext } from '../../types';

export const valueWithMax: WithUiContext<CombinedUiFunction<number, number, SingleValue>> =
    ({ formatLabel }) =>
    (label, value, max) => {
        return {
            label: formatLabel(label, value),
            display: format.valueWithMaxValue(value, max),
            type: 'SINGLE_VALUE',
        };
    };
