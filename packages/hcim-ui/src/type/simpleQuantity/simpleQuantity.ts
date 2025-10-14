import { type MgoSimpleQuantity } from '@minvws/mgo-hcim-parse';
import { systemValue } from '../../format/systemValue/systemValue.js';
import { type SingleValue, type UiFunction, type WithUiContext } from '../../types/index.js';

export const simpleQuantity: WithUiContext<UiFunction<MgoSimpleQuantity, SingleValue>> =
    (context) =>
    (label, value, options = {}) => {
        const { formatLabel } = context;

        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: `SINGLE_VALUE`,
            value: { display: systemValue(context)(value) },
        };
    };
