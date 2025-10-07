import { format } from '../../format/index.js';
import {
    type CombinedUiFunction,
    type SingleValue,
    type WithUiContext,
} from '../../types/index.js';

export const valueWithMax: WithUiContext<CombinedUiFunction<number, number, SingleValue>> =
    ({ formatLabel }) =>
    (label, value, max) => {
        return {
            label: formatLabel(label, value),
            value: { display: format.valueWithMaxValue(value, max) },
            type: 'SINGLE_VALUE',
        };
    };
