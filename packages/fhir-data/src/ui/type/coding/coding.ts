import { type MgoCoding } from '../../../parse/type';
import { type MgoCodingProps } from '../../../parse/type/coding/coding';
import { isNonNullish } from '../../../utils';
import { system } from '../../format/system/system';
import {
    type MultipleValues,
    type SingleValue,
    type UiFunction,
    type WithUiHelperContext,
} from '../../types';

export const coding: WithUiHelperContext<
    UiFunction<
        MgoCoding | MgoCodingProps | MgoCoding[] | MgoCodingProps[],
        SingleValue | MultipleValues
    >
> = (context) => (label, value) => {
    const { formatLabel } = context;
    const display = system(context);

    if (Array.isArray(value)) {
        return {
            label: formatLabel(label, value),
            type: 'MULTIPLE_VALUES',
            display: value.map(display).filter(isNonNullish),
        };
    }
    return {
        label: formatLabel(label, value),
        type: 'SINGLE_VALUE',
        display: display(value),
    };
};
