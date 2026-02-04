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
    ({ baseProps }) =>
    (label, value, options = {}) => {
        if (Array.isArray(value)) {
            return {
                ...baseProps(label, value, options),
                type: 'MULTIPLE_VALUES',
                value: value.map((x) => ({ display: valueOf(x) })),
            };
        }

        return {
            ...baseProps(label, value, options),
            type: 'SINGLE_VALUE',
            value: { display: valueOf(value) },
        };
    };
