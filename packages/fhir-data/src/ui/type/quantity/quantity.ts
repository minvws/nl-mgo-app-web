import { type MgoQuantity } from '../../../parse/type';
import { count } from '../../format/count/count';
import { type SingleValue, type UiFunction, type WithUiHelperContext } from '../../types';

export const quantity: WithUiHelperContext<UiFunction<MgoQuantity, SingleValue>> =
    (context) => (label, value) => {
        const { formatMessage } = context;

        return {
            label: formatMessage(label),
            type: `SINGLE_VALUE`,
            display: count(context)(value),
        };
    };
