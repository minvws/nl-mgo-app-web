import { type MgoDateTime } from '../../../parse/type';
import { isNonNullish } from '../../../utils';
import { format } from '../../format';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithI18nContext,
} from '../../types';

export const dateTime: WithI18nContext<
    UiFunction<MgoDateTime | MgoDateTime[], SingleValue | MultipleValues>
> =
    ({ intl }) =>
    (label, value, options) => {
        if (Array.isArray(value)) {
            return {
                label: intl.formatMessage({ id: label }),
                type: 'MULTIPLE_VALUES',
                display: value.map(format.dateTime).filter(isNonNullish),
                ...options,
            };
        }

        return {
            label: intl.formatMessage({ id: label }),
            type: 'SINGLE_VALUE',
            display: format.dateTime(value),
            ...options,
        };
    };
