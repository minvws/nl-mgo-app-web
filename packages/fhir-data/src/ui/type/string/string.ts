import { type MgoString } from '../../../parse/type';
import { toString } from '../../helpers';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiContext,
} from '../../types';

export const string: WithUiContext<
    UiFunction<MgoString | MgoString[], SingleValue | MultipleValues>
> =
    ({ intl }) =>
    (label, value, options) => {
        if (Array.isArray(value)) {
            return {
                label: intl.formatMessage({ id: label }),
                type: 'MULTIPLE_VALUES',
                display: value.map(toString),
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
