import { isNonNullish } from '@minvws/mgo-utils';
import { type MgoCoding } from '../../../parse/type';
import { system } from '../../format/system/system';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiHelperContext,
} from '../../types';

export const coding: WithUiHelperContext<
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
