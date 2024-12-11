import { format } from '../../format';
import { type WithUiContext, type CombinedUiFunction, type SingleValue } from '../../types';

export const valueWithUnit: WithUiContext<CombinedUiFunction<number, string, SingleValue>> =
    ({ intl }) =>
    (label, value, unit, options) => {
        return {
            label: intl.formatMessage({ id: label }),
            display: format.valueWithUnit(value, unit),
            type: 'SINGLE_VALUE',
            ...options,
        };
    };
