import { format } from '../../format';
import { type WithUiContext, type CombinedUiFunction, type SingleValue } from '../../types';

export const valueWithMax: WithUiContext<CombinedUiFunction<number, number, SingleValue>> =
    ({ intl }) =>
    (label, value, max, options) => {
        return {
            label: intl.formatMessage({ id: label }),
            display: format.valueWithMaxValue(value, max),
            type: 'SINGLE_VALUE',
            ...options,
        };
    };
