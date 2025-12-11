import { type MgoUnsignedInt } from '@minvws/mgo-hcim-parse';
import { numberToString } from '../../helpers/index.js';
import { valueOf } from '../../helpers/valueOf/valueOf.js';
import { type SingleValue, type UiFunction, type WithUiContext } from '../../types/index.js';

export const unsignedInt: WithUiContext<UiFunction<MgoUnsignedInt, SingleValue>> =
    ({ formatLabel }) =>
    (label, value, options = {}) => {
        return {
            label: formatLabel(label, value, options.defaultLabel),
            type: 'SINGLE_VALUE',
            value: { display: numberToString(valueOf(value)) },
        };
    };
