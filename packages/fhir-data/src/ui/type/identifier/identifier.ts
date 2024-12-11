import { type MgoIdentifier } from '../../../parse/type';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiContext,
} from '../../types';

export const identifier: WithUiContext<
    UiFunction<MgoIdentifier | MgoIdentifier[], SingleValue | MultipleValues>
> =
    ({ intl }) =>
    (label, value, options) => {
        if (Array.isArray(value)) {
            return {
                label: intl.formatMessage({ id: label }),
                type: 'MULTIPLE_VALUES',
                display: value?.map((x) => x?.value),
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
