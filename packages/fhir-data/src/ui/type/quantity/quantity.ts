import { type MgoDuration, type MgoQuantity } from '../../../parse/type';
import { systemValue } from '../../format/systemValue/systemValue';
import { type SingleValue, type UiFunction, type WithUiHelperContext } from '../../types';

export const quantity: WithUiHelperContext<UiFunction<MgoQuantity | MgoDuration, SingleValue>> =
    (context) =>
    (label, value, options = {}) => {
        const { formatLabel } = context;

        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: `SINGLE_VALUE`,
            display: systemValue(context)(value),
        };
    };
