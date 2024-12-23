import { type MgoReference } from '../../../parse/type';
import { isNonNullish } from '../../../utils';
import {
    type MultipleValues,
    type ReferenceValue,
    type UiFunction,
    type WithI18nContext,
} from '../../types';

export const reference: WithI18nContext<
    UiFunction<MgoReference | MgoReference[], ReferenceValue | MultipleValues>
> =
    ({ intl }) =>
    (label, value, options) => {
        if (Array.isArray(value)) {
            return {
                label: intl.formatMessage({ id: label }),
                type: 'MULTIPLE_VALUES',
                display: value.map((x) => x.display).filter(isNonNullish),
                ...options,
            };
        }

        return {
            label: intl.formatMessage({ id: label }),
            type: 'REFERENCE_VALUE',
            display: value?.display,
            reference: value?.reference,
            ...options,
        };
    };
