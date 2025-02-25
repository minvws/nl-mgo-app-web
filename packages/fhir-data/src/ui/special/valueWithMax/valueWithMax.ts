import { format } from '../../format';
import { type CombinedUiFunction, type SingleValue, type WithUiHelperContext } from '../../types';

export const valueWithMax: WithUiHelperContext<CombinedUiFunction<number, number, SingleValue>> =
    ({ intl }) =>
    (label, value, max) => {
        return {
            label: intl.formatMessage({ id: label }),
            display: format.valueWithMaxValue(value, max),
            type: 'SINGLE_VALUE',
        };
    };
