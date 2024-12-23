import { type MgoInstant } from '../../../parse/type';
import { format } from '../../format';
import { type SingleValue, type UiFunction, type WithI18nContext } from '../../types';

export const instant: WithI18nContext<UiFunction<MgoInstant, SingleValue>> =
    ({ intl }) =>
    (label, value, options) => {
        return {
            label: intl.formatMessage({ id: label }),
            type: 'SINGLE_VALUE',
            display: format.dateTime(value),
            ...options,
        };
    };
