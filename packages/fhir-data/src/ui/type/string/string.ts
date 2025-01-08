import { type MgoString } from '../../../parse/type';
import { isNonNullish } from '../../../utils';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiHelperContext,
} from '../../types';

export const string: WithUiHelperContext<
    UiFunction<MgoString | MgoString[], SingleValue | MultipleValues>
> =
    ({ intl }) =>
    (label, value) => {
        if (Array.isArray(value)) {
            return {
                label: intl.formatMessage({ id: label }),
                type: 'MULTIPLE_VALUES',
                display: value.filter(isNonNullish) as string[],
            };
        }

        return {
            label: intl.formatMessage({ id: label }),
            type: 'SINGLE_VALUE',
            display: value as string,
        };
    };
