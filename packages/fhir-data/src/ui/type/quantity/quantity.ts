import { type MgoQuantityProps } from '../../../parse/type';
import { systemValue } from '../../format/systemValue/systemValue';
import { type SingleValue, type UiFunction, type WithUiHelperContext } from '../../types';

export const quantity: WithUiHelperContext<UiFunction<MgoQuantityProps, SingleValue>> =
    (context) => (label, value) => {
        const { formatLabel } = context;

        return {
            label: formatLabel(label, value),
            type: `SINGLE_VALUE`,
            display: systemValue(context)(value),
        };
    };
