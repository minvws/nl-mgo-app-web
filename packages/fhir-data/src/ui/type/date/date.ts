import { type MgoDate } from '../../../parse/type';
import { format } from '../../format';
import { type SingleValue, type UiFunction, type WithI18nContext } from '../../types';

export const date: WithI18nContext<UiFunction<MgoDate, SingleValue>> =
    ({ intl }) =>
    (label, value, options) => {
        return {
            label: intl.formatMessage({ id: label }),
            type: 'SINGLE_VALUE',
            display: format.date(value),
            ...options,
        };
    };
