import { type MgoDuration, type MgoQuantity } from '@minvws/mgo-hcim-parse';
import { systemValue } from '../../format/systemValue/systemValue.js';
import { type SingleValue, type UiFunction, type WithUiContext } from '../../types/index.js';

export const quantity: WithUiContext<UiFunction<MgoQuantity | MgoDuration, SingleValue>> =
    (context) =>
    (label, value, options = {}) => {
        const { formatLabel } = context;

        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: `SINGLE_VALUE`,
            value: { display: systemValue(context)(value) },
        };
    };
