import { type MgoString } from '@minvws/mgo-hcim-parse';
import { isNonNullish } from '@minvws/mgo-utils';
import { valueOf } from '../../helpers/valueOf/valueOf.js';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiContext,
} from '../../types/index.js';

export const string: WithUiContext<
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
