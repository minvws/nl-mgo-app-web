import { type MgoUnsignedInt } from '../../../parse/type';
import { numberToString } from '../../helpers';
import { type SingleValue, type UiFunction, type WithI18nContext } from '../../types';

export const unsignedInt: WithI18nContext<UiFunction<MgoUnsignedInt, SingleValue>> =
    ({ intl }) =>
    (label, value, options) => {
        return {
            label: intl.formatMessage({ id: label }),
            type: 'SINGLE_VALUE',
            display: numberToString(value),
            ...options,
        };
    };
