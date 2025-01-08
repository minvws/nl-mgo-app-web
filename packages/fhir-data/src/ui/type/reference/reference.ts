import { type MgoReference } from '../../../parse/type';
import { isNonNullish } from '../../../utils';
import {
    type MultipleValues,
    type ReferenceValue,
    type UiFunction,
    type WithUiHelperContext,
} from '../../types';

export const reference: WithUiHelperContext<
    UiFunction<MgoReference | MgoReference[], ReferenceValue | MultipleValues>
> =
    ({ intl }) =>
    (label, value) => {
        if (Array.isArray(value)) {
            return {
                label: intl.formatMessage({ id: label }),
                type: 'MULTIPLE_VALUES',
                display: value.map((x) => x.display).filter(isNonNullish),
            };
        }

        return {
            label: intl.formatMessage({ id: label }),
            type: 'REFERENCE_VALUE',
            display: value?.display,
            reference: value?.reference,
        };
    };
