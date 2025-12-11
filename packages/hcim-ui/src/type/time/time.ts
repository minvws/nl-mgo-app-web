import { type MgoTime } from '@minvws/mgo-hcim-parse';
import { valueOf } from '../../helpers/valueOf/valueOf.js';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiContext,
} from '../../types/index.js';

export const time: WithUiContext<UiFunction<MgoTime | MgoTime[], SingleValue | MultipleValues>> =
    (context) =>
    (label, value, options = {}) => {
        const { formatLabel } = context;

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
