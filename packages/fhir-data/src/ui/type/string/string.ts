import { type MgoString } from '../../../parse/type';
import { isNonNullish } from '../../../utils';
import { valueOf } from '../../helpers/valueOf/valueOf';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiHelperContext,
} from '../../types';

export const string: WithUiHelperContext<
    UiFunction<MgoString | string | MgoString[] | string[], SingleValue | MultipleValues>
> =
    ({ intl }) =>
    (label, value) => {
        if (Array.isArray(value)) {
            return {
                label: intl.formatMessage({ id: label }),
                type: 'MULTIPLE_VALUES',
                display: value.map((x) => valueOf(x)).filter(isNonNullish),
            };
        }

        return {
            label: intl.formatMessage({ id: label }),
            type: 'SINGLE_VALUE',
            display: valueOf(value),
        };
    };
