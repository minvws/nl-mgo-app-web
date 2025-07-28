import { type MgoCoding } from '@minvws/mgo-hcim-parse';
import { isNonNullish } from '@minvws/mgo-utils';
import { system } from '../../format/system/system.js';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiContext,
} from '../../types/index.js';

export const coding: WithUiContext<
    UiFunction<MgoCoding | MgoCoding[], SingleValue | MultipleValues>
> =
    (context) =>
    (label, value, options = {}) => {
        const { formatLabel } = context;
        const display = system(context);

        if (Array.isArray(value)) {
            return {
                label: formatLabel(label, value, options.defaultLabel),
                type: 'MULTIPLE_VALUES',
                display: value.map(display).filter(isNonNullish),
            };
        }
        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: 'SINGLE_VALUE',
            display: display(value),
        };
    };
