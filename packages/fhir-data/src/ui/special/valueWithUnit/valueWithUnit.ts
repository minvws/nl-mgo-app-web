import { format } from '../../format';
import { type WithI18nContext, type CombinedUiFunction, type SingleValue } from '../../types';

export const valueWithUnit: WithI18nContext<CombinedUiFunction<number, string, SingleValue>> =
    ({ intl }) =>
    (label, value, unit, options) => {
        return {
            label: intl.formatMessage({ id: label }),
            display: format.valueWithUnit(value, unit),
            type: 'SINGLE_VALUE',
            ...options,
        };
    };
