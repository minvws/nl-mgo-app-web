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
    ({ formatLabel }) =>
    (label, value) => {
        if (Array.isArray(value)) {
            return {
                label: formatLabel(label, value),
                type: 'MULTIPLE_VALUES',
                display: value.map((x) => valueOf(x)).filter(isNonNullish),
            };
        }

        return {
            label: formatLabel(label, value),
            type: 'SINGLE_VALUE',
            display: valueOf(value),
        };
    };
