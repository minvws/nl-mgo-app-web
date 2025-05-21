import { isNonNullish } from '@minvws/mgo-mgo-utils';
import { type MgoString } from '../../../parse/type';
import { valueOf } from '../../helpers/valueOf/valueOf';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiHelperContext,
} from '../../types';

export const string: WithUiHelperContext<
    UiFunction<MgoString | MgoString[], SingleValue | MultipleValues>
> =
    ({ formatLabel }) =>
    (label, value, options = {}) => {
        if (Array.isArray(value)) {
            return {
                label: formatLabel(label, value, options.defaultLabel),
                type: 'MULTIPLE_VALUES',
                display: value.map((x) => valueOf(x)).filter(isNonNullish),
            };
        }

        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: 'SINGLE_VALUE',
            display: valueOf(value),
        };
    };
