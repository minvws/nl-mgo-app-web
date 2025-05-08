import { type MgoSimpleQuantityProps } from '../../../parse/type/simpleQuantity/simpleQuantity';
import { systemValue } from '../../format/systemValue/systemValue';
import { type SingleValue, type UiFunction, type WithUiHelperContext } from '../../types';

export const simpleQuantity: WithUiHelperContext<UiFunction<MgoSimpleQuantityProps, SingleValue>> =
    (context) => (label, value) => {
        const { formatLabel } = context;

        return {
            label: formatLabel(label, value),
            type: `SINGLE_VALUE`,
            display: systemValue(context)(value),
        };
    };
