import { format } from '../../format';
import { type WithUiHelperContext, type CombinedUiFunction, type SingleValue } from '../../types';

export const valueWithUnit: WithUiHelperContext<CombinedUiFunction<number, string, SingleValue>> =
    ({ intl }) =>
    (label, value, unit) => {
        return {
            label: intl.formatMessage({ id: label }),
            display: format.valueWithUnit(value, unit),
            type: 'SINGLE_VALUE',
        };
    };
