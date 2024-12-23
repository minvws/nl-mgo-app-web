import { type MgoString } from '../../../parse/type';
import { isNonNullish } from '../../../utils';
import { toString } from '../../helpers';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithI18nContext,
} from '../../types';

export const string: WithI18nContext<
    UiFunction<MgoString | MgoString[], SingleValue | MultipleValues>
> =
    ({ intl }) =>
    (label, value, options) => {
        if (Array.isArray(value)) {
            return {
                label: intl.formatMessage({ id: label }),
                type: 'MULTIPLE_VALUES',
                display: value.map(toString).filter(isNonNullish),
                ...options,
            };
        }

        return {
            label: intl.formatMessage({ id: label }),
            type: 'SINGLE_VALUE',
            display: toString(value),
            ...options,
        };
    };
