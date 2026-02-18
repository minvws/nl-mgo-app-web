import { type MgoUnsignedInt } from '@minvws/mgo-hcim-parse';
import { numberToString } from '../../helpers/index.js';
import { valueOf } from '../../helpers/valueOf/valueOf.js';
import { type SingleValue, type UiFunction, type WithUiContext } from '../../types/index.js';

export const unsignedInt: WithUiContext<UiFunction<MgoUnsignedInt, SingleValue>> =
    ({ baseProps }) =>
    (label, value, options = {}) => {
        return {
            ...baseProps(label, value, options),
            type: 'SINGLE_VALUE',
            value: { display: numberToString(valueOf(value)) },
        };
    };
