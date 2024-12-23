import { type MgoIdentifier } from '../../../parse/type';
import { isNonNullish } from '../../../utils';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithI18nContext,
} from '../../types';

export const identifier: WithI18nContext<
    UiFunction<MgoIdentifier | MgoIdentifier[], SingleValue | MultipleValues>
> =
    ({ intl }) =>
    (label, value, options) => {
        if (Array.isArray(value)) {
            return {
                label: intl.formatMessage({ id: label }),
                type: 'MULTIPLE_VALUES',
                display: value?.map((x) => x?.value).filter(isNonNullish),
                ...options,
            };
        }
        return {
            label: intl.formatMessage({ id: label }),
            type: 'SINGLE_VALUE',
            display: value?.value,
            ...options,
        };
    };
