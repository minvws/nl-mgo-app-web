import { format } from '../../format';
import { type WithUiHelperContext, type CombinedUiFunction, type SingleValue } from '../../types';

export const valueWithMax: WithUiHelperContext<CombinedUiFunction<number, number, SingleValue>> =
    ({ intl }) =>
    (label, value, max) => {
        return {
            label: intl.formatMessage({ id: label }),
            display: format.valueWithMaxValue(value, max),
            type: 'SINGLE_VALUE',
        };
    };
