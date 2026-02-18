import { type MgoPositiveInt } from '@minvws/mgo-hcim-parse';
import { numberToString } from '../../helpers/index.js';
import { type SingleValue, type UiFunction, type WithUiContext } from '../../types/index.js';

export const positiveInt: WithUiContext<UiFunction<MgoPositiveInt, SingleValue>> =
    ({ baseProps }) =>
    (label, value, options = {}) => {
        return {
            ...baseProps(label, value, options),
            type: 'SINGLE_VALUE',
            value: { display: numberToString(value?.value) },
        };
    };
