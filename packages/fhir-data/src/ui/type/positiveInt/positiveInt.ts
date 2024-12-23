import { type MgoPositiveInt } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { type SingleValue, type UiFunction, type WithI18nContext } from '../../types';

export const positiveInt: WithI18nContext<UiFunction<MgoPositiveInt, SingleValue>> =
    ({ intl }) =>
    (label, value, options) => {
        return {
            label: intl.formatMessage({ id: label }),
            type: 'SINGLE_VALUE',
            display: numberToString(value),
            ...options,
        };
    };
