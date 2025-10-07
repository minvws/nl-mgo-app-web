import { type MgoString } from '@minvws/mgo-hcim-parse';
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
                value: value.map((x) => ({ display: valueOf(x) })),
            };
        }

        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: 'SINGLE_VALUE',
            value: { display: valueOf(value) },
        };
    };
