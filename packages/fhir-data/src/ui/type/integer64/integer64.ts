import { type MgoInteger64 } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { type SingleValue, type UiFunction, type WithI18nContext } from '../../types';

export const integer64: WithI18nContext<UiFunction<MgoInteger64, SingleValue>> =
    ({ intl }) =>
    (label, value, options) => {
        return {
            label: intl.formatMessage({ id: label }),
            type: 'SINGLE_VALUE',
            display: numberToString(value),
            ...options,
        };
    };
