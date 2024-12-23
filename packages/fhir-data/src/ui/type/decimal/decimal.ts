import { type MgoDecimal } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { type SingleValue, type UiFunction, type WithI18nContext } from '../../types';

export const decimal: WithI18nContext<UiFunction<MgoDecimal, SingleValue>> =
    ({ intl }) =>
    (label, value, options) => {
        return {
            label: intl.formatMessage({ id: label }),
            type: 'SINGLE_VALUE',
            display: numberToString(value),
            ...options,
        };
    };
