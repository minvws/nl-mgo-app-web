import { type MgoCoding } from '../../../parse/type';
import { isNonNullish } from '../../../utils';
import { system } from '../../format/system/system';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiHelperContext,
} from '../../types';

export const coding: WithUiHelperContext<
    UiFunction<MgoCoding | MgoCoding[], SingleValue | MultipleValues>
> = (context) => (label, value) => {
    const { formatMessage } = context;
    const display = system(context);

    if (Array.isArray(value)) {
        return {
            label: formatMessage(label),
            type: 'MULTIPLE_VALUES',
            display: value.map(display).filter(isNonNullish),
        };
    }
    return {
        label: formatMessage(label),
        type: 'SINGLE_VALUE',
        display: display(value),
    };
};
