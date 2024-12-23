import { format } from '../../format';
import { type WithI18nContext, type CombinedUiFunction, type SingleValue } from '../../types';

export const valueWithMax: WithI18nContext<CombinedUiFunction<number, number, SingleValue>> =
    ({ intl }) =>
    (label, value, max, options) => {
        return {
            label: intl.formatMessage({ id: label }),
            display: format.valueWithMaxValue(value, max),
            type: 'SINGLE_VALUE',
            ...options,
        };
    };
