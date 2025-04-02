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
    ({ formatMessage }) =>
    (label, value) => {
        if (Array.isArray(value)) {
            return {
                label: formatMessage(label),
                type: 'MULTIPLE_VALUES',
                display: value.map((x) => x.display).filter(isNonNullish),
            };
        }

        return {
            label: formatMessage(label),
            type: 'REFERENCE_VALUE',
            display: value?.display,
            reference: value?.reference,
        };
    };
