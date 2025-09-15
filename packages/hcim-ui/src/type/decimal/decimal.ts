import { type MgoDecimal } from '@minvws/mgo-hcim-parse';
import { numberToString } from '../../helpers/index.js';
import { type SingleValue, type UiFunction, type WithUiContext } from '../../types/index.js';

export const decimal: WithUiContext<UiFunction<MgoDecimal, SingleValue>> =
    ({ formatLabel }) =>
    (label, value, options = {}) => {
        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: 'SINGLE_VALUE',
            display: numberToString(value?.value),
        };
    };
