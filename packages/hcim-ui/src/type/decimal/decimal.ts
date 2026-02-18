import { type MgoDecimal } from '@minvws/mgo-hcim-parse';
import { numberToString } from '../../helpers/index.js';
import { type SingleValue, type UiFunction, type WithUiContext } from '../../types/index.js';

export const decimal: WithUiContext<UiFunction<MgoDecimal, SingleValue>> =
    ({ baseProps }) =>
    (label, value, options = {}) => {
        return {
            ...baseProps(label, value, options),
            type: 'SINGLE_VALUE',
            value: { display: numberToString(value?.value) },
        };
    };
