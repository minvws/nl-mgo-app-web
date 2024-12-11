import { type MgoReference } from '../../../parse/type';
import {
    type MultipleValues,
    type ReferenceValue,
    type UiFunction,
    type WithUiContext,
} from '../../types';

export const reference: WithUiContext<
    UiFunction<MgoReference | MgoReference[], ReferenceValue | MultipleValues>
> =
    ({ intl }) =>
    (label, value, options) => {
        if (Array.isArray(value)) {
            return {
                label: intl.formatMessage({ id: label }),
                type: 'MULTIPLE_VALUES',
                display: value.map((x) => x.display),
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
